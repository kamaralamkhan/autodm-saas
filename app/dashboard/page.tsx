"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useInstagramSession } from "@/hooks/use-instagram-session"
import { Activity, Users, MessageCircle, Zap, Loader2 } from "lucide-react"

interface DashboardStats {
    metrics: {
        totalAutomations: number
        activeTriggers: number
        audienceReached: number
        messagesSent: number
    }
    recentActivity: Array<{
        id: string
        content: string
        created_at: string
        recipient?: {
            recipient_username: string
        }
    }>
}

export default function DashboardPage() {
    const { username, userId, isLoading: isSessionLoading } = useInstagramSession()
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return

        const fetchStats = async () => {
            try {
                const res = await fetch(`/api/dashboard/stats?userId=${userId}`)
                const data = await res.json()
                if (data && !data.error) {
                    setStats(data)
                }
            } catch (err) {
                console.error("Failed to load dashboard stats", err)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [userId])

    if (isSessionLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
            </div>
        )
    }

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-700">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Overview</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-none">Hey, {username}.</h1>
                    <p className="text-muted-foreground text-sm mt-3">Here's what your automations did while you were away.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Automations"
                    value={stats?.metrics.totalAutomations.toString() || "0"}
                    trend="Active"
                    icon={<Zap className="w-5 h-5 text-primary" />}
                />
                <StatCard
                    title="Messages Sent"
                    value={stats?.metrics.messagesSent.toString() || "0"}
                    trend="Lifetime"
                    icon={<MessageCircle className="w-5 h-5 text-primary" />}
                />
                <StatCard
                    title="Active Triggers"
                    value={stats?.metrics.activeTriggers.toString() || "0"}
                    trend="Running"
                    icon={<Activity className="w-5 h-5 text-primary" />}
                />
                <StatCard
                    title="Audience Reached"
                    value={stats?.metrics.audienceReached.toString() || "0"}
                    trend="Unique Users"
                    icon={<Users className="w-5 h-5 text-primary" />}
                />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-card border-border shadow-sm">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground mb-5">Recent activity</h3>
                    <div className="space-y-4">
                        {stats?.recentActivity && stats.recentActivity.length > 0 ? (
                            stats.recentActivity.map((msg) => (
                                <div key={msg.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <MessageCircle className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm text-foreground font-semibold truncate">
                                            Auto-reply to @{msg.recipient?.recipient_username || "user"}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate w-full max-w-[300px]">{msg.content}</p>
                                    </div>
                                    <div className="ml-auto text-[10px] text-muted-foreground whitespace-nowrap">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-muted-foreground text-sm">
                                No recent activity found.
                            </div>
                        )}
                    </div>
                </Card>

                <Card className="p-6 bg-card border-border shadow-sm">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground mb-5">Quick actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center justify-center hover:bg-primary/10 hover:border-primary/40 cursor-pointer transition-all shadow-sm group">
                            <Zap className="w-6 h-6 text-primary mb-2" />
                            <span className="text-xs font-bold text-foreground">New Rule</span>
                        </div>
                        <div className="h-24 rounded-2xl bg-secondary/30 border border-border flex flex-col items-center justify-center hover:bg-secondary/60 hover:border-border/80 cursor-pointer transition-all shadow-sm group">
                            <Users className="w-6 h-6 text-muted-foreground group-hover:text-foreground mb-2 transition-colors" />
                            <span className="text-xs font-bold text-foreground">View Audience</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

function StatCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: React.ReactNode }) {
    return (
        <div className="p-6 rounded-3xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {icon}
                </div>
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{trend}</span>
            </div>
            <div className="mt-4">
                <p className="text-5xl font-extrabold tracking-tight text-foreground leading-none">{value}</p>
                <p className="font-mono-ui text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold mt-3">{title}</p>
            </div>
        </div>
    )
}