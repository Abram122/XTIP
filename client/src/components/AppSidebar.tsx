import {
  BarChart3,
  Database,
  Home,
  Settings,
  Activity,
  AlertTriangle,
  Sun,
  Moon,
  User,
  LogIn,
  LogOut,
} from "lucide-react"
import { FaEnvelope } from "react-icons/fa"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabaseClient"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useUnifiedUser } from "@/hooks/useUnifiedUser"

const menuItems = [
  { title: "Overview", url: "/overview", icon: Home },
  { title: "Feeds", url: "/feeds", icon: Database },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Alerts", url: "/alerts", icon: AlertTriangle },
  { title: "Incidents", url: "/incidents", icon: AlertTriangle },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const collapsed = state === "collapsed"
  const { user } = useUnifiedUser()

  const [isDark, setIsDark] = useState(false)
  const [open, setOpen] = useState(false)

  const handleLogin = (provider: "google" | "github") => {
    supabase.auth.signInWithOAuth({ provider })
    setOpen(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    })
    window.location.href = "/login"
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `group relative flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
    ${
      isActive
        ? "bg-primary/20 text-foreground shadow-md"
        : "text-foreground/70 hover:bg-accent hover:text-foreground"
    }`

  return (
    <Sidebar className="h-full min-h-screen w-full max-w-[260px] border-r border-border bg-background shadow-lg backdrop-blur-sm overflow-hidden transition-colors duration-300">
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3 text-sm font-semibold text-foreground/60 uppercase tracking-wide">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col space-y-1 mt-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={navLinkClasses}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0 transition-transform duration-150 group-hover:scale-110" />
                      {!collapsed && <span className="flex-1">{item.title}</span>}
                      {isActive(item.url) && !collapsed && (
                        <span className="absolute left-0 h-full w-1 bg-primary rounded-r-md" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {user && (
                <SidebarMenuItem key="Profile">
                  <SidebarMenuButton asChild>
                    <NavLink to="/profile" className={navLinkClasses}>
                      <User className="w-5 h-5 flex-shrink-0 transition-transform duration-150 group-hover:scale-110" />
                      {!collapsed && <span className="flex-1">Profile</span>}
                      {isActive("/profile") && !collapsed && (
                        <span className="absolute left-0 h-full w-1 bg-primary rounded-r-md" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto px-4 py-5 border-t border-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md flex-shrink-0">
              <Activity className="w-5 h-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex flex-col text-sm leading-tight">
                <span className="text-foreground font-semibold">CTI Platform</span>
                <span className="text-foreground/60">v1.0.0</span>
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 bg-accent text-accent-foreground hover:shadow-md hover:scale-[1.02]"
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

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 bg-destructive text-destructive-foreground hover:shadow-md hover:scale-[1.02]"
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && "Logout"}
            </button>
          ) : (
            <>
              <button
                onClick={() => setOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 bg-primary text-primary-foreground hover:shadow-md hover:scale-[1.02]"
              >
                <LogIn className="w-4 h-4" />
                {!collapsed && "Login"}
              </button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sign in</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-3">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleLogin("google")}
                    >
                      <FcGoogle className="w-5 h-5" />
                      Continue with Google
                    </Button>

                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleLogin("github")}
                    >
                      <FaGithub className="w-5 h-5" />
                      Continue with GitHub
                    </Button>

                    <Button variant="outline" asChild>
                      <Link to="/login-form" className="flex items-center gap-2 w-full justify-center">
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
      </SidebarContent>
    </Sidebar>
  )
}
