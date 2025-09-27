import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Newspaper, ExternalLink, Clock, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getNews } from "@/services/api"

interface NewsItem {
  title: string
  link: string
  pubDate: string
  description?: string
  type: string
  category: string
}

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [sourceFilter, setSourceFilter] = useState<string>("All Sources")
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories")

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getNews();
      setNews(res)
    } catch {
      setError("Failed to fetch news")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const filteredNews = news.filter((item) => {
    const matchesSource =
      sourceFilter === "All Sources" || item.type === sourceFilter
    const matchesCategory =
      categoryFilter === "All Categories" || item.category === categoryFilter
    return matchesSource && matchesCategory
  })

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const uniqueSources = ["All Sources", ...Array.from(new Set(news.map((n) => n.type)))]
  const uniqueCategories = ["All Categories", ...Array.from(new Set(news.map((n) => n.category)))]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="bg-gradient-to-br from-card via-background to-card/80 border-border shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Newspaper className="w-6 h-6 text-primary drop-shadow" />
              </motion.div>
              <CardTitle className="text-foreground text-lg font-bold tracking-tight">
                Cybersecurity News
              </CardTitle>
            </div>

            {/* Refresh button */}
            <Button size="sm" variant="outline" onClick={fetchNews} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Accordion Filters */}
          <Accordion type="single" collapsible className="mt-4 w-full">
            <AccordionItem value="filters">
              <AccordionTrigger>Filters</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  {/* Source filter */}
                  <div className="flex-1">
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Source
                    </label>
                    <Select value={sourceFilter} onValueChange={setSourceFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueSources.map((src) => (
                          <SelectItem key={src} value={src}>
                            {src}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category filter */}
                  <div className="flex-1">
                    <label className="text-sm text-muted-foreground mb-1 block">
                      Category
                    </label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted/60 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-6 text-muted-foreground">
              <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Unable to load news feed</p>
              <p className="text-xs mt-1">Please check your connection</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredNews.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 120 }}
                    whileHover={{ scale: 1.02 }}
                    className="block p-4 rounded-xl border border-border/50 bg-background/80 hover:bg-card transition-all cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 space-y-2">
                        <h4 className="text-base font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{getTimeAgo(item.pubDate)}</span>
                          <Badge variant="outline" className="ml-2">
                            {item.category}
                          </Badge>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2, color: "#6366f1" }}
                        className="flex-shrink-0 mt-1"
                      >
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
