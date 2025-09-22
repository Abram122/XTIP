import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 120 }
  })
};

export function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mockNews: NewsItem[] = [
      {
        title: "Critical Zero-Day Vulnerability Discovered in Popular Web Framework",
        link: "#",
        pubDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        description: "Security researchers have identified a critical zero-day vulnerability affecting millions of web applications."
      },
      {
        title: "New Ransomware Campaign Targets Healthcare Organizations",
        link: "#",
        pubDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        description: "A sophisticated ransomware group has been observed targeting healthcare infrastructure with advanced encryption techniques."
      },
      {
        title: "Nation-State APT Group Deploys Novel Malware in Supply Chain Attack",
        link: "#",
        pubDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        description: "Intelligence agencies report a new advanced persistent threat targeting software supply chains."
      },
      {
        title: "Major Cloud Provider Patches Critical Security Flaw",
        link: "#",
        pubDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        description: "Emergency security update addresses privilege escalation vulnerability in cloud infrastructure."
      },
      {
        title: "Cybersecurity Framework Update Enhances Threat Detection",
        link: "#",
        pubDate: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
        description: "New framework version includes enhanced machine learning capabilities for automated threat detection."
      }
    ];

    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

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
            <Badge variant="secondary" className="text-xs px-3 py-1 animate-pulse">
              Live Feed
            </Badge>
          </div>
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
            <div className="space-y-4 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {news.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    custom={index}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 pt-4 border-t border-border/50"
          >
            <p className="text-xs text-muted-foreground text-center">
              News sourced from cybersecurity feeds • Updated every 15 minutes
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}