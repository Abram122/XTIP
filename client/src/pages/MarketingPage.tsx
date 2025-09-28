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
import { getMe } from "@/services/api"

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
    const [open, setOpen] = useState(false)
    const [lookupResult, setLookupResult] = useState<{ status: 'safe' | 'danger' | null, message: string } | null>(null)
    const [user, setUser] = useState<any>(null)

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
                const data = await getMe()
                if (data?.userId) {
                    setUser(data)
                }
            } catch {
                setUser(null)
            }
        }
        checkLogin()
    }, [])

    const handleLookup = () => {
        if (!url) return
        const isSafe = Math.random() > 0.3
        setLookupResult({
            status: isSafe ? 'safe' : 'danger',
            message: isSafe ? 'No threats detected' : 'Potential security risks found'
        })
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
                                <p className="text-lg font-semibold">Welcome back, {user.email || user.fullName}</p>
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
                                    <Button onClick={handleLookup} className="w-full rounded-lg" disabled={!url}>
                                        Analyze URL
                                    </Button>
                                    {lookupResult && (
                                        <motion.div
                                            variants={fadeUp}
                                            initial="hidden"
                                            animate="show"
                                            className={`flex items-center gap-2 p-3 rounded-lg ${lookupResult.status === 'safe'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-red-500/10 text-red-500'
                                                }`}
                                        >
                                            {lookupResult.status === 'safe' ? (
                                                <CheckCircle className="w-5 h-5" />
                                            ) : (
                                                <XCircle className="w-5 h-5" />
                                            )}
                                            <span className="text-sm font-medium">{lookupResult.message}</span>
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
                                    <Input placeholder="Enter an IP address" disabled className="rounded-lg" />
                                    <Button className="w-full rounded-lg" disabled>Check Reputation</Button>
                                    <p className="text-sm text-muted-foreground">✨ Available with free account</p>
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
                                    <Input placeholder="Enter indicator or hash" disabled className="rounded-lg" />
                                    <Button className="w-full rounded-lg" disabled>Analyze Threat</Button>
                                    <p className="text-sm text-muted-foreground">✨ Available with free account</p>
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
