import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Save, RefreshCw, AlertTriangle } from "lucide-react";
import axios from "axios";

interface FeedConfig {
  name: string;
  endpoint: string;
  apiKey: string;
  enabled: boolean;
  format: "json" | "xml" | "stix";
  response?: any;
  error?: string;
}

export default function Settings() {
  const [feeds, setFeeds] = useState<FeedConfig[]>([
    {
      name: "AlienVault OTX",
      endpoint: "https://otx.alienvault.com/api/v1/indicators",
      apiKey: "",
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
      endpoint: "https://www.virustotal.com/api/v3/files",
      apiKey: "",
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

  const testConnection = async (feedIndex: number) => {
    const feed = feeds[feedIndex];
    try {
      const response = await axios.get(feed.endpoint, {
        headers: feed.apiKey
          ? {
              Authorization: `Bearer ${feed.apiKey}`,
              "x-apikey": feed.apiKey,
            }
          : {},
      });
      const updatedFeeds = [...feeds];
      updatedFeeds[feedIndex].response = response.data;
      updatedFeeds[feedIndex].error = undefined;
      setFeeds(updatedFeeds);
    } catch (error: any) {
      const updatedFeeds = [...feeds];
      updatedFeeds[feedIndex].response = undefined;
      updatedFeeds[feedIndex].error = error.response?.data?.message || error.message;
      setFeeds(updatedFeeds);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">General Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Auto Refresh Interval (seconds)</Label>
              <Input
                type="number"
                value={generalSettings.autoRefreshInterval}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, autoRefreshInterval: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Data Retention (days)</Label>
              <Input
                type="number"
                value={generalSettings.retainDataDays}
                onChange={(e) =>
                  setGeneralSettings({ ...generalSettings, retainDataDays: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Real-time Alerts</Label>
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
                <Label>Email Notifications</Label>
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

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Threat Feed Configuration</CardTitle>
          <p className="text-sm text-muted-foreground">Add your endpoint and API key, then test.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {feeds.map((feed, index) => (
            <div key={feed.name} className="space-y-4 p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{feed.name}</h3>
                  <Badge variant={feed.enabled ? "default" : "secondary"}>
                    {feed.enabled ? "Active" : "Inactive"}
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
                <div>
                  <Label>API Endpoint</Label>
                  <Input
                    value={feed.endpoint}
                    onChange={(e) => updateFeed(index, "endpoint", e.target.value)}
                  />
                </div>
                <div>
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    value={feed.apiKey}
                    onChange={(e) => updateFeed(index, "apiKey", e.target.value)}
                  />
                </div>
              </div>

              {feed.response && (
                <pre className="bg-muted p-3 rounded text-xs overflow-x-auto max-h-64">
                  {JSON.stringify(feed.response, null, 2)}
                </pre>
              )}
              {feed.error && (
                <div className="text-sm text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {feed.error}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
