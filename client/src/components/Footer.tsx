import { Shield, Github, Globe, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-gradient-to-r from-card/40 via-card/20 to-card/40 backdrop-blur-md mt-auto shadow-lg">
      <div className="px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed max-w-md">
              © {currentYear} <span className="font-semibold text-foreground">CTI Platform MVP</span>. Built for cybersecurity research and education.
            </div>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="p-2 rounded-full bg-muted/30 hover:bg-muted transition-all shadow-sm hover:shadow-md"
            >
              <Globe className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/30 hover:bg-muted transition-all shadow-sm hover:shadow-md"
            >
              <Github className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-muted/30 hover:bg-muted transition-all shadow-sm hover:shadow-md"
            >
              <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
