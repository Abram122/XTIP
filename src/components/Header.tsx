import { Shield, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-50">
      <SidebarTrigger />
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
          <Shield className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">CTI Platform MVP</h1>
          <p className="text-sm text-muted-foreground">Advanced Cyber Threat Intelligence Dashboard</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground font-medium">Live Monitoring</span>
        </div>
      </div>
    </header>
  );
}