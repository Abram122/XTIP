import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthButtons from "@/components/AuthButtons";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-background/80 dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-md shadow-2xl border border-border relative overflow-hidden rounded-2xl bg-card">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5 opacity-20 pointer-events-none" />

        {/* Header */}
        <CardHeader className="relative z-10 text-center space-y-2 pb-6">
          <div className="flex justify-center items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <CardTitle className="text-2xl font-bold text-foreground">
              CTI Platform Login
            </CardTitle>
          </div>
          <p className="text-muted-foreground text-sm">
            Secure access to your dashboard
          </p>
        </CardHeader>

        {/* Auth Options */}
        <CardContent className="relative z-10 space-y-6">
          <AuthButtons />

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Email Button */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 border-border text-foreground hover:bg-muted/20"
          >
            <Mail className="w-4 h-4" />
            Sign in with Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
