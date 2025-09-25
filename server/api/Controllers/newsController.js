import axios from "axios"
import * as xml2js from "xml2js"

let cache = { items: null, timestamp: 0 }
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

// Feeds list
const FEED_URLS = [
    { url: "https://feeds.feedburner.com/TheHackersNews", type: "TheHackerNews" },
    { url: "https://www.cshub.com/rss/categories/security-strategy", type: "CSHub-Strategy" },
    { url: "https://www.cshub.com/rss/categories/threat-defense", type: "CSHub-ThreatDefense" }
]

function detectCategory(item) {
    const text =
        (item.title?._ || item.title || "") + " " + (item.description || "")
    const t = text.toLowerCase()

    if (t.includes("ransomware") || t.includes("malware") || t.includes("trojan") || t.includes("exploit") || t.includes("backdoor")) {
        return "Threat"
    }
    if (t.includes("phishing") || t.includes("scam") || t.includes("fraud")) {
        return "Phishing"
    }
    if (t.includes("cve") || t.includes("vulnerability") || t.includes("zero-day") || t.includes("patch")) {
        return "Vulnerability"
    }
    if (t.includes("strategy") || t.includes("compliance") || t.includes("policy") || t.includes("governance")) {
        return "Strategy"
    }
    if (t.includes("cloud") || t.includes("ai") || t.includes("iot") || t.includes("blockchain")) {
        return "Technology"
    }

    return "General"
}

export async function getNews(req, res) {
    const now = Date.now()
    if (cache.items && now - cache.timestamp < CACHE_TTL) {
        return res.json(cache.items)
    }

    try {
        const allPromises = FEED_URLS.map(feed =>
            axios
                .get(feed.url, {
                    headers: { "User-Agent": "Mozilla/5.0" },
                    responseType: "text"
                })
                .then(r => ({ data: r.data, type: feed.type, url: feed.url }))
                .catch(err => ({ error: err.message, type: feed.type, url: feed.url }))
        )

        const xmlResponses = await Promise.all(allPromises)
        const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true })

        let combined = []

        for (const resp of xmlResponses) {
            if (!resp || resp.error) {
                console.warn("⚠️ Feed fetch error:", resp.url, resp.error)
                continue
            }

            try {
                const parsed = await parser.parseStringPromise(resp.data)
                let items = []

                if (parsed.rss?.channel?.item) {
                    items = Array.isArray(parsed.rss.channel.item)
                        ? parsed.rss.channel.item
                        : [parsed.rss.channel.item]
                } else if (parsed.feed?.entry) {
                    items = Array.isArray(parsed.feed.entry)
                        ? parsed.feed.entry
                        : [parsed.feed.entry]
                }

                if (!items.length) {
                    console.warn("⚠️ No items found for feed:", resp.type, resp.url)
                }

                const norm = items.map(item => ({
                    title: item.title?._ || item.title,
                    link: item.link?.href || item.link,
                    pubDate: item.pubDate || item.updated || item.published || item.isoDate,
                    description:
                        item.description ||
                        item.summary ||
                        item["content:encoded"] ||
                        item.content?._,
                    type: resp.type,
                    category: detectCategory(item)
                }))

                combined = combined.concat(norm)
            } catch (e) {
                console.error("Parsing error:", resp.url, e.message)
            }
        }

        // Deduplicate
        const map = new Map()
        for (const it of combined) {
            const key = (it.link || it.title).slice(0, 300)
            if (!map.has(key)) map.set(key, it)
        }
        const deduped = Array.from(map.values())

        // Sort by date
        deduped.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

        cache.items = deduped
        cache.timestamp = now

        res.json(deduped)
    } catch (err) {
        console.error("❌ News aggregation failed:", err.message)
        res.status(500).json({ message: err.message || "Failed to aggregate news" })
    }
}
