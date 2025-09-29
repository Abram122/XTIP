import {
  BarChart3, Database, Home, Settings, Activity, AlertTriangle, Newspaper,
  Sun, Moon, User, LogIn, LogOut, Shield, Layout, Sparkles, ChevronDown
} from "lucide-react"
import { FaEnvelope } from "react-icons/fa"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabaseClient"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useUnifiedUser } from "@/hooks/useUnifiedUser"
import { logout } from "@/services/api"
import { cn } from "@/lib/utils"

const menuItems = [
  { title: "Overview", url: "/overview", icon: Layout },
  { title: "Threat Feeds", url: "/feeds", icon: Database },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Active Alerts", url: "/alerts", icon: AlertTriangle, badge: "New" },
  { title: "Incidents", url: "/incidents", icon: Shield },
  { title: "Intel News", url: "/news", icon: Newspaper },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const collapsed = state === "collapsed"
  const { user } = useUnifiedUser()
  const [isDark, setIsDark] = useState(false)
  const [open, setOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleLogin = (provider: "google" | "github") => {
    supabase.auth.signInWithOAuth({ provider })
    setOpen(false)
  }

  const handleLogout = async () => {
    await Promise.all([
      supabase.auth.signOut(),
      logout()
    ]).then(() => {
      window.location.href = "/"
    })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") === "dark"
    setIsDark(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const isActive = (path: string) => location.pathname.startsWith(path)

  const navLinkClasses = ({ isActive }: { isActive: boolean }) => cn(
    "group relative flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium",
    "transition-all duration-300 ease-in-out",
    isActive
      ? "bg-primary/15 text-primary shadow-sm"
      : "text-foreground/70 hover:bg-accent/50 hover:text-foreground",
    !collapsed && "backdrop-blur-sm"
  )

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Sidebar className="h-full min-h-screen w-full max-w-[255px] border-r border-border/50 bg-background/95 shadow-xl backdrop-blur-md">
        <SidebarContent className="flex flex-col h-full">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4"
          >
            <Link to="/" aria-label="CTIP Dashboard">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                {!collapsed && (
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">CTIP Dashboard</span>
                    <span className="text-xs text-muted-foreground">Enterprise</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>

          <SidebarGroup>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SidebarGroupLabel className="px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Navigation
                  </SidebarGroupLabel>
                </motion.div>
              )}
            </AnimatePresence>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col space-y-1 px-2">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    onHoverStart={() => setHoveredItem(item.title)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to={item.url} className={navLinkClasses}>
                          <item.icon className={cn(
                            "w-5 h-5 flex-shrink-0 transition-all duration-300",
                            hoveredItem === item.title && "scale-110 text-primary"
                          )} />
                          {!collapsed && (
                            <div className="flex items-center justify-between flex-1">
                              <span>{item.title}</span>
                              {item.badge && (
                                <span className="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          )}
                          {isActive(item.url) && !collapsed && (
                            <motion.span
                              layoutId="activeIndicator"
                              className="absolute left-0 h-full w-1 bg-primary rounded-r-md"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mt-auto space-y-3">
            {user && (
              <div className="px-4 pb-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-accent/50 hover:bg-accent/70 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {user.user_metadata?.avatar_url ? (
                          <img 
                            src={user.user_metadata.avatar_url} 
                            alt={user.email} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      {!collapsed && (
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <div className="truncate">
                            <p className="text-sm font-medium truncate">
                              {user.user_metadata?.full_name || user.email}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </p>
                          </div>
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[240px]">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        View Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <div className="px-4 py-4 border-t border-border/50">
              <button
                onClick={() => setIsDark(!isDark)}
                className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium
                  transition-all duration-200 hover:shadow-md hover:scale-[1.02]
                  bg-accent/50 text-foreground hover:bg-accent"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4" />
                    {!collapsed && "Light Mode"}
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4" />
                    {!collapsed && "Dark Mode"}
                  </>
                )}
              </button>

              {!user && (
                <>
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium
                      bg-primary text-primary-foreground hover:bg-primary/90 mt-3
                      transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                  >
                    <LogIn className="w-4 h-4" />
                    {!collapsed && "Login"}
                  </button>

                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Welcome Back</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col gap-3 pt-4">
                        <Button
                          variant="outline"
                          className="flex items-center gap-3 h-12 text-base hover:scale-[1.02] transition-transform"
                          onClick={() => handleLogin("google")}
                        >
                          <FcGoogle className="w-5 h-5" />
                          Continue with Google
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-3 h-12 text-base hover:scale-[1.02] transition-transform"
                          onClick={() => handleLogin("github")}
                        >
                          <FaGithub className="w-5 h-5" />
                          Continue with GitHub
                        </Button>
                        <Button variant="outline" asChild className="h-12">
                          <Link to="/login-form" className="flex items-center gap-3 text-base hover:scale-[1.02] transition-transform">
                            <FaEnvelope className="w-5 h-5 text-blue-500" />
                            Continue with Email
                          </Link>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    </motion.div>
  )
}