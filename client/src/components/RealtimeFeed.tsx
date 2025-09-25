import { useEffect, useState } from 'react';
import { AlertTriangle, Shield, Globe, Activity } from 'lucide-react';

type ThreatEvent = {
    id: string;
    type: 'alert' | 'detection' | 'incident';
    message: string;
    timestamp: Date;
    severity: 'low' | 'medium' | 'high' | 'critical';
};

const mockEvents: ThreatEvent[] = [
    {
        id: '1',
        type: 'alert',
        message: 'Suspicious traffic detected from IP 192.168.1.100',
        timestamp: new Date(),
        severity: 'high'
    },
    {
        id: '2',
        type: 'detection',
        message: 'Malware signature matched: Trojan.Generic',
        timestamp: new Date(Date.now() - 120000),
        severity: 'critical'
    },
    {
        id: '3',
        type: 'incident',
        message: 'Brute force attack attempted on admin portal',
        timestamp: new Date(Date.now() - 300000),
        severity: 'medium'
    }
];

export function RealtimeFeed({ className }: { className?: string }) {
    const [events, setEvents] = useState<ThreatEvent[]>(mockEvents);

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            const newEvent: ThreatEvent = {
                id: Math.random().toString(36),
                type: ['alert', 'detection', 'incident'][Math.floor(Math.random() * 3)] as ThreatEvent['type'],
                message: `New threat detected at ${new Date().toLocaleTimeString()}`,
                timestamp: new Date(),
                severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as ThreatEvent['severity']
            };
            setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getIcon = (type: ThreatEvent['type']) => {
        switch (type) {
            case 'alert':
                return <AlertTriangle className="w-4 h-4" />;
            case 'detection':
                return <Shield className="w-4 h-4" />;
            case 'incident':
                return <Activity className="w-4 h-4" />;
        }
    };

    const getSeverityColor = (severity: ThreatEvent['severity']) => {
        switch (severity) {
            case 'critical':
                return 'text-red-500';
            case 'high':
                return 'text-orange-500';
            case 'medium':
                return 'text-yellow-500';
            case 'low':
                return 'text-green-500';
        }
    };

    return (
        <div className={`overflow-hidden ${className}`}>
            <div className="h-full overflow-y-auto space-y-2 p-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                        <div className={getSeverityColor(event.severity)}>
                            {getIcon(event.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground truncate">
                                {event.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {event.timestamp.toLocaleTimeString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}