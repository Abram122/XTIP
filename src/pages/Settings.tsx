import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Save, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedConfig {
  name: string;
  endpoint: string;
  apiKey: string;
  enabled: boolean;
  format: "json" | "xml" | "stix";
}

export default function Settings() {
  const { toast } = useToast();

  const [feeds, setFeeds] = useState<FeedConfig[]>([
    {
      name: "AlienVault OTX",
      endpoint: "https://otx.alienvault.com/api/v1/indicators",
      apiKey: "your_otx_api_key_here",
      enabled: true,
      format: "json",
    },
    {
      name: "Abuse.ch URLhaus",
      endpoint: "https://urlhaus-api.abuse.ch/v1/urls/recent/",
      apiKey: "",
      enabled: true,
      format: "json",
    },
    {
      name: "VirusTotal Intelligence",
      endpoint: "https://www.virustotal.com/vtapi/v2/",
      apiKey: "your_vt_api_key_here",
      enabled: false,
      format: "json",
    },
    {
      name: "MISP Platform",
      endpoint: "https://your-misp-instance.com/attributes/restSearch",
      apiKey: "your_misp_auth_key_here",
      enabled: false,
      format: "json",
    },
    {
      name: "GreyNoise API",
      endpoint: "https://api.greynoise.io/v3/community/",
      apiKey: "your_greynoise_api_key_here",
      enabled: false,
      format: "json",
    },
  ]);

  const [generalSettings, setGeneralSettings] = useState({
    autoRefreshInterval: 300,
    retainDataDays: 30,
    enableRealTimeAlerts: true,
    enableEmailNotifications: false,
  });

  const updateFeed = (index: number, field: keyof FeedConfig, value: string | boolean) => {
    const updatedFeeds = [...feeds];
    updatedFeeds[index] = { ...updatedFeeds[index], [field]: value };
    setFeeds(updatedFeeds);
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Feed configurations have been updated successfully.",
    });
  };

  const testConnection = async (feedIndex: number) => {
    const feed = feeds[feedIndex];
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${feed.name}...`,
    });
    setTimeout(() => {
      const success = Math.random() > 0.3;
      toast({
        title: success ? "Connection Successful" : "Connection Failed",
        description: success
          ? `Successfully connected to ${feed.name}`
          : `Failed to connect to ${feed.name}. Please check your configuration.`,
        variant: success ? "default" : "destructive",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">General Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="refresh-interval" className="text-foreground">
                Auto Refresh Interval (seconds)
              </Label>
              <Input
                id="refresh-interval"
                type="number"
                value={generalSettings.autoRefreshInterval}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    autoRefreshInterval: parseInt(e.target.value),
                  })
                }
                className="bg-input text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retain-days" className="text-foreground">
                Data Retention (days)
              </Label>
              <Input
                id="retain-days"
                type="number"
                value={generalSettings.retainDataDays}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    retainDataDays: parseInt(e.target.value),
                  })
                }
                className="bg-input text-foreground"
              />
            </div>
          </div>
          <Separator className="bg-border" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Real-time Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Enable immediate notifications for high severity threats
                </p>
              </div>
              <Switch
                checked={generalSettings.enableRealTimeAlerts}
                onCheckedChange={(checked) =>
                  setGeneralSettings({ ...generalSettings, enableRealTimeAlerts: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-foreground">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send daily digest emails</p>
              </div>
              <Switch
                checked={generalSettings.enableEmailNotifications}
                onCheckedChange={(checked) =>
                  setGeneralSettings({ ...generalSettings, enableEmailNotifications: checked })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Threat Feed Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure API endpoints and credentials for threat intelligence feeds
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {feeds.map((feed, index) => (
            <motion.div
              key={feed.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-4 p-4 border border-border rounded-lg bg-background/50 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">{feed.name}</h3>
                  <Badge variant={feed.enabled ? "default" : "secondary"}>
                    {feed.enabled ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {feed.format.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => testConnection(index)}
                    disabled={!feed.enabled}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                  <Switch
                    checked={feed.enabled}
                    onCheckedChange={(checked) => updateFeed(index, "enabled", checked)}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-foreground">API Endpoint</Label>
                  <Input
                    value={feed.endpoint}
                    onChange={(e) => updateFeed(index, "endpoint", e.target.value)}
                    placeholder="https://api.example.com/v1/indicators"
                    className="bg-input text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">API Key</Label>
                  <Input
                    type="password"
                    value={feed.apiKey}
                    onChange={(e) => updateFeed(index, "apiKey", e.target.value)}
                    placeholder="Enter API key"
                    className="bg-input text-foreground"
                  />
                </div>
              </div>
              {!feed.enabled && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="w-4 h-4" />
                  This feed is currently disabled and not collecting data
                </div>
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Configuration
        </Button>
      </div>
    </div>
  );
}
