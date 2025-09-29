import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/Layout"
import { Shield, Search, Globe, Zap, AlertTriangle, Lock, CheckCircle, XCircle } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaEnvelope } from "react-icons/fa"
import { supabase } from "@/lib/supabaseClient"
import { getProfile, scanUrl, getReport, getIpReputation } from "@/services/api"

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
    })
}

function AuthButtons({ handleLogin }: { handleLogin: (provider: "google" | "github") => void }) {
    return (
        <div className="flex flex-col gap-3">
            <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl py-5 text-base font-medium shadow-sm hover:shadow-md transition"
                onClick={() => handleLogin("google")}
            >
                <FcGoogle className="w-6 h-6" />
                Continue with Google
            </Button>
            <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl py-5 text-base font-medium shadow-sm hover:shadow-md transition"
                onClick={() => handleLogin("github")}
            >
                <FaGithub className="w-6 h-6" />
                Continue with GitHub
            </Button>
            <Button variant="outline" asChild className="rounded-xl py-5 text-base font-medium shadow-sm hover:shadow-md transition">
                <Link to="/login" className="flex items-center gap-2 w-full justify-center">
                    <FaEnvelope className="w-6 h-6 text-blue-500" />
                    Continue with Email
                </Link>
            </Button>
        </div>
    )
}

export default function MarketingPage() {
    const [url, setUrl] = useState("")
    const [ip, setIp] = useState("")
    const [scanner, setScanner] = useState("")
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [lookupResult, setLookupResult] = useState<any>(null)
    const [loadingIp, setLoadingIp] = useState(false)
    const [ipResult, setIpResult] = useState<any>(null)

    const handleLogin = async (provider: "google" | "github") => {
        await supabase.auth.signInWithOAuth({ provider })
        setOpen(false)
    }

    useEffect(() => {
        async function checkLogin() {
            const { data } = await supabase.auth.getUser()
            if (data?.user) {
                setUser(data.user)
                return
            }
            try {
                const data = await getProfile()
                if (data.user?.id) {
                    setUser(data.user)
                }
            } catch {
                setUser(null)
            }
        }
        checkLogin()
    }, [])

    const handleLookup = async () => {
        if (!url) return
        setLoading(true)
        setLookupResult(null)

        try {
            const scan = await scanUrl(url)
            const analysisId = scan?.data?.id

            if (!analysisId) {
                setLookupResult({ status: "danger", error: "Failed to scan URL" })
                return
            }

            const report = await getReport(analysisId)
            const stats = report?.data?.attributes?.stats || {}

            const malicious = stats.malicious || 0
            const suspicious = stats.suspicious || 0
            const harmless = stats.harmless || 0
            const undetected = stats.undetected || 0

            const isMalicious = malicious > 0 || suspicious > 0

            setLookupResult({
                status: isMalicious ? "danger" : "safe",
                stats: { malicious, suspicious, harmless, undetected },
            })
        } catch (err) {
            setLookupResult({ status: "danger", error: "Error analyzing URL" })
        } finally {
            setLoading(false)
        }
    }

    const handleIpLookup = async () => {
        if (!ip) return
        setLoadingIp(true)
        setIpResult(null)

        try {
            const data = await getIpReputation(ip)
            setIpResult(data.data || data)
            console.log(data)
        } catch (err) {
            setIpResult({ error: "Failed to fetch IP reputation" })
        } finally {
            setLoadingIp(false)
        }
    }

    return (
        <Layout>
            <div className="flex flex-col bg-gradient-to-b from-background via-card/30 to-background text-foreground min-h-screen">
                <section className="flex flex-col items-center justify-center text-center py-32 relative overflow-hidden">
                    <motion.div initial="hidden" animate="show" variants={fadeUp}>
                        <Shield className="w-20 h-20 text-primary mx-auto mb-8" />
                    </motion.div>
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                    >
                        Cyber Threat Intelligence Platform
                    </motion.h1>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={1}
                        className="max-w-2xl text-xl text-muted-foreground mb-10"
                    >
                        Protect your digital assets with advanced threat intelligence.
                        Free security tools for everyone, enterprise features for professionals.
                    </motion.p>
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        custom={2}
                        className="flex gap-4"
                    >
                        {user ? (
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-lg font-semibold">Welcome back, {user.fullName || user.email}</p>
                                <Link to="/overview">
                                    <Button
                                        size="lg"
                                        className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition"
                                    >
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            size="lg"
                                            className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl hover:scale-105 transition"
                                            onClick={() => setOpen(true)}
                                        >
                                            Get Started Free
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="rounded-xl p-8">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-bold mb-4">Sign in</DialogTitle>
                                        </DialogHeader>
                                        <AuthButtons handleLogin={handleLogin} />
                                    </DialogContent>
                                </Dialog>
                                <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold rounded-xl shadow hover:shadow-md">
                                    Watch Demo
                                </Button>
                            </>
                        )}
                    </motion.div>
                </section>
                <section className="py-20 px-6">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">Free Security Tools</Badge>
                        <h2 className="text-3xl font-bold">Protect Your Digital Assets</h2>
                    </motion.div>
                    <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <Card className="hover:shadow-xl transition border-2 border-primary/20 rounded-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Search className="w-5 h-5 text-primary" />
                                        URL Lookup
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Input
                                        placeholder="Enter a URL to scan"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="rounded-lg"
                                    />
                                    <Button
                                        onClick={handleLookup}
                                        className="w-full rounded-lg"
                                        disabled={!url || loading}
                                    >
                                        {loading ? "Loading..." : "Analyze URL"}
                                    </Button>

                                    {lookupResult && (
                                        <motion.div
                                            variants={fadeUp}
                                            initial="hidden"
                                            animate="show"
                                            className={`p-4 rounded-lg border space-y-2 ${lookupResult.status === "safe"
                                                ? "border-green-500/30 bg-green-500/5"
                                                : "border-red-500/30 bg-red-500/5"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 font-medium">
                                                {lookupResult.status === "safe" ? (
                                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                                ) : (
                                                    <XCircle className="w-5 h-5 text-red-500" />
                                                )}
                                                <span>
                                                    {lookupResult.status === "safe"
                                                        ? "No threats detected"
                                                        : "Threats detected"}
                                                </span>
                                            </div>

                                            {lookupResult.stats && (
                                                <div className="mt-2 space-y-1 text-sm">
                                                    <p className="flex justify-between">
                                                        <span className="text-red-500">Malicious</span>
                                                        <span>{lookupResult.stats.malicious}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span className="text-yellow-500">Suspicious</span>
                                                        <span>{lookupResult.stats.suspicious}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span className="text-green-500">Harmless</span>
                                                        <span>{lookupResult.stats.harmless}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span className="text-gray-500">Undetected</span>
                                                        <span>{lookupResult.stats.undetected}</span>
                                                    </p>
                                                </div>
                                            )}

                                            {lookupResult.error && (
                                                <p className="text-red-500 text-sm">{lookupResult.error}</p>
                                            )}
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <Card className="hover:shadow-xl transition border-2 border-primary/20 rounded-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-primary" />
                                        IP Reputation
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Input
                                        placeholder="Enter an IP address"
                                        value={ip}
                                        disabled={!user}
                                        onChange={(e) => setIp(e.target.value)}
                                        className="rounded-lg"
                                    />
                                    <Button
                                        onClick={handleIpLookup}
                                        className="w-full rounded-lg"
                                        disabled={!ip || loadingIp}
                                    >
                                        {loadingIp ? "Loading..." : "Check Reputation"}
                                    </Button>
                                    {!user && <p className="text-sm text-muted-foreground">✨ Available with free account</p>}

                                    {ipResult && (
                                        (() => {
                                            const details = ipResult.details ?? ipResult // fallback if backend already flattened
                                            const riskStr = (details.risk ?? ipResult.reputation ?? "unknown").toString().toLowerCase()
                                            const manualRisk = typeof details.manualrisk === "number" ? details.manualrisk : 0

                                            const mapRiskToScore = (risk: string, manual = 0) => {
                                                if (manual > 0) return Math.max(0, Math.min(100, Math.round(manual)))
                                                switch (risk) {
                                                    case "none": return 0
                                                    case "unknown": return 20
                                                    case "low": return 35
                                                    case "medium": return 60
                                                    case "high": return 85
                                                    case "critical": return 95
                                                    default: return 0
                                                }
                                            }

                                            const score = mapRiskToScore(riskStr, manualRisk)

                                            return (
                                                <motion.div
                                                    variants={fadeUp}
                                                    initial="hidden"
                                                    animate="show"
                                                    className="p-4 rounded-lg border space-y-2 bg-card"
                                                >
                                                    {/* Risk header */}
                                                    <div className="flex items-center gap-2 font-medium">
                                                        {score > 50 ? (
                                                            <XCircle className="w-5 h-5 text-red-500" />
                                                        ) : (
                                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                                        )}
                                                        <span>
                                                            Risk Score: {score} / 100 — {(details.risk ?? ipResult.reputation ?? "N/A").toString()}
                                                        </span>
                                                    </div>

                                                    {/* Basic Info */}
                                                    <div className="mt-2 space-y-1 text-sm">
                                                        <p><span className="font-medium">Indicator:</span> {ipResult.indicator ?? details.indicator}</p>
                                                        <p><span className="font-medium">Type:</span> {details.type ?? ipResult.type ?? "ip"}</p>
                                                        <p><span className="font-medium">ASN:</span> {details.properties?.whois?.asn ?? "-"}</p>
                                                        <p><span className="font-medium">ISP:</span> {details.properties?.whois?.isp ?? "-"}</p>
                                                        <p><span className="font-medium">Country:</span> {details.properties?.geo?.country ?? details.properties?.geo?.country_name ?? "-"}</p>
                                                        <p><span className="font-medium">City:</span> {details.properties?.geo?.city ?? "-"}</p>
                                                        <p><span className="font-medium">Last Seen:</span> {details.stamp_seen ?? details.stamp_probed ?? "-"}</p>
                                                    </div>

                                                    {/* Threats */}
                                                    {Array.isArray(details.threats) && details.threats.length > 0 && (
                                                        <div className="mt-3">
                                                            <p className="font-semibold">Threats:</p>
                                                            <ul className="list-disc list-inside text-sm">
                                                                {details.threats.map((t: any, i: number) => (
                                                                    <li key={i} className="text-red-500">
                                                                        {t.name ?? t.threat ?? "Unknown"} {t.risk ? `(${t.risk})` : ""} {t.category ? `- ${t.category}` : ""}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Risk Factors */}
                                                    {Array.isArray(details.riskfactors) && details.riskfactors.length > 0 && (
                                                        <div className="mt-3">
                                                            <p className="font-semibold">Risk Factors:</p>
                                                            <ul className="list-disc list-inside text-sm">
                                                                {details.riskfactors.map((rf: any, i: number) => (
                                                                    <li key={i}>
                                                                        {rf.name ?? rf.factor ?? JSON.stringify(rf)}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Feeds */}
                                                    {Array.isArray(details.feeds) && details.feeds.length > 0 && (
                                                        <div className="mt-3">
                                                            <p className="font-semibold">Feeds:</p>
                                                            <ul className="list-disc list-inside text-sm max-h-32 overflow-y-auto">
                                                                {details.feeds.map((feed: any, i: number) => (
                                                                    <li key={i}>
                                                                        {feed.name ?? feed.title} {feed.organization ? `- ${feed.organization}` : ""}
                                                                        {feed.link && (
                                                                            <> — <a href={feed.link} target="_blank" rel="noreferrer" className="underline">Details</a></>
                                                                        )}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )
                                        })()
                                    )}
                                </CardContent>

                            </Card>
                        </motion.div>
                        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <Card className="hover:shadow-xl transition border-2 border-primary/20 rounded-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-primary" />
                                        Threat Scanner
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Input placeholder="Enter indicator or hash" disabled={!user} className="rounded-lg" />
                                    <Button className="w-full rounded-lg" disabled={!scanner}>Analyze Threat</Button>
                                    {!user && <p className="text-sm text-muted-foreground">✨ Available with free account</p>}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </section>
                <section className="py-20 px-6 bg-muted/20">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">Why Choose CTIP</Badge>
                            <h2 className="text-3xl font-bold">Enterprise-Grade Security For All</h2>
                        </motion.div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[Shield, Zap, Lock].map((Icon, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    custom={i}
                                    className="p-6 bg-background rounded-xl border shadow-sm hover:shadow-lg transition"
                                >
                                    <Icon className="w-12 h-12 text-primary mb-4" />
                                    <h3 className="font-semibold mb-2 text-xl">
                                        {i === 0 ? "Free Security Tools" : i === 1 ? "Real-time Analysis" : "Enterprise Features"}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {i === 0
                                            ? "Access essential threat detection tools at no cost"
                                            : i === 1
                                                ? "Instant threat detection and analysis"
                                                : "Advanced tools for professional teams"}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-20 px-6">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <h2 className="text-3xl font-bold mb-6">Ready to enhance your security?</h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Join thousands of security professionals who trust CTIP
                        </p>
                        {user ? (
                            <Link to="/overview">
                                <Button size="lg" className="px-8 py-6 text-lg font-semibold bg-primary rounded-xl shadow hover:shadow-md">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="lg" className="px-8 py-6 text-lg font-semibold bg-primary rounded-xl shadow hover:shadow-md">
                                        Get Started Free
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="rounded-xl p-8">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold mb-4">Sign in</DialogTitle>
                                    </DialogHeader>
                                    <AuthButtons handleLogin={handleLogin} />
                                </DialogContent>
                            </Dialog>
                        )}
                    </motion.div>
                </section>
            </div>
        </Layout>
    )
}
