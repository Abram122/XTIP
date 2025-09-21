export interface ThreatIndicator {
  id: string;
  indicator: string;
  type: 'ip' | 'domain' | 'hash' | 'url';
  threatType: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  source: string;
  description: string;
  confidence: number;
}

export interface DashboardStats {
  totalFeeds: number;
  highSeverityThreats: number;
  uniqueIPs: number;
  uniqueDomains: number;
  totalIndicators: number;
}

// Generate mock threat data
const generateMockThreats = (): ThreatIndicator[] => {
  const threatTypes = ['Malware', 'Phishing', 'C2', 'Botnet', 'Ransomware', 'APT', 'Trojan'];
  const severities: ('critical' | 'high' | 'medium' | 'low')[] = ['critical', 'high', 'medium', 'low'];
  const sources = ['AlienVault OTX', 'Abuse.ch', 'VirusTotal', 'GreyNoise', 'MISP'];
  
  const ips = [
    '192.168.1.100', '10.0.0.45', '172.16.0.33', '203.0.113.195', '198.51.100.42',
    '185.220.101.45', '91.240.118.172', '104.244.76.13', '89.248.165.2', '37.139.53.118'
  ];
  
  const domains = [
    'malicious-site.com', 'phishing-bank.net', 'fake-update.org', 'evil-payload.io',
    'c2-server.biz', 'ransomware-drop.xyz', 'botnet-command.club', 'trojan-loader.site'
  ];

  const threats: ThreatIndicator[] = [];
  
  for (let i = 0; i < 150; i++) {
    const isIP = Math.random() > 0.6;
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
    
    threats.push({
      id: `threat_${i + 1}`,
      indicator: isIP ? ips[Math.floor(Math.random() * ips.length)] : domains[Math.floor(Math.random() * domains.length)],
      type: isIP ? 'ip' : 'domain',
      threatType,
      severity,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      source: sources[Math.floor(Math.random() * sources.length)],
      description: `${threatType} activity detected from this ${isIP ? 'IP address' : 'domain'}`,
      confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
    });
  }
  
  return threats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const mockThreats = generateMockThreats();

export const mockStats: DashboardStats = {
  totalFeeds: 5,
  highSeverityThreats: mockThreats.filter(t => t.severity === 'critical' || t.severity === 'high').length,
  uniqueIPs: new Set(mockThreats.filter(t => t.type === 'ip').map(t => t.indicator)).size,
  uniqueDomains: new Set(mockThreats.filter(t => t.type === 'domain').map(t => t.indicator)).size,
  totalIndicators: mockThreats.length,
};

export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'text-cti-critical';
    case 'high': return 'text-cti-high';
    case 'medium': return 'text-cti-medium';
    case 'low': return 'text-cti-low';
    default: return 'text-cti-info';
  }
};

export const getSeverityBadgeClass = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-cti-critical/10 text-cti-critical border-cti-critical/20';
    case 'high': return 'bg-cti-high/10 text-cti-high border-cti-high/20';
    case 'medium': return 'bg-cti-medium/10 text-cti-medium border-cti-medium/20';
    case 'low': return 'bg-cti-low/10 text-cti-low border-cti-low/20';
    default: return 'bg-cti-info/10 text-cti-info border-cti-info/20';
  }
};