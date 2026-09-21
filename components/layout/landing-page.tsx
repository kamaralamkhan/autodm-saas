"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Zap, MessageCircle, ArrowRight, Github, Star,
  Brain, Inbox, AtSign, CheckCircle2
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const GITHUB_URL = "https://github.com/kamaralamkhan/autodm-saas"

export function LandingPage() {
  const [stars, setStars] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch("https://api.github.com/repos/kamaralamkhan/autodm-saas")
      .then(r => r.json())
      .then(d => { if (typeof d.stargazers_count === "number") setStars(d.stargazers_count) })
      .catch(() => {})
  }, [])

  const handleLogin = () => {
    if (!process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID || process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID.includes("placeholder")) {
      handleTestLogin()
      return
    }
    window.location.href = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI}&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments`
  }

  const handleTestLogin = () => {
    localStorage.setItem("ig_user_id", "123456789")
    localStorage.setItem("ig_username", "testuser")
    fetch("/api/instagram/test-login", { method: "POST" }).catch(() => {})
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden antialiased">
      {/* Floating Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-20 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-lg shadow-sm">
            <Zap className="w-4 h-4" strokeWidth={3} />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">AutoDM Flow</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href={GITHUB_URL} target="_blank" rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
            {stars !== null && <span className="text-primary ml-1 font-semibold">{stars}</span>}
          </a>
          <button
            onClick={handleLogin}
            className="text-sm font-semibold bg-primary text-primary-foreground rounded-full px-6 py-2.5 hover:opacity-90 transition-opacity shadow-md"
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section (ManyChat Style: Left Text, Right Mockup) */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <div className="flex-1 max-w-2xl text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>#1 Instagram Automation Tool</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground mb-6">
            Automate your Instagram DMs and scale your business.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            AutoDM Flow automatically replies to comments, sends custom DMs with links, and uses AI to answer questions so you can focus on creating.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button
              onClick={handleLogin}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground text-lg font-bold px-8 py-4 rounded-full shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-all"
            >
              Start for Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <span className="text-sm text-muted-foreground font-medium">No credit card required.</span>
          </div>
        </div>

        {/* Hero Illustration / Mockup */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl relative z-10 hidden md:block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative bg-card border border-border shadow-2xl rounded-2xl p-6 lg:p-8 flex flex-col gap-6 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Mockup Header */}
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <div className="w-12 h-12 bg-muted rounded-full overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full" />
              </div>
              <div>
                <p className="font-bold text-foreground">@newfollower</p>
                <p className="text-sm text-muted-foreground">Commented "guide"</p>
              </div>
            </div>
            {/* Mockup Chat Bubbles */}
            <div className="flex flex-col gap-4">
              <div className="bg-primary/10 border border-primary/20 rounded-2xl rounded-bl-none p-4 w-4/5">
                <p className="text-sm text-foreground">Hey! I saw your reel. Can I get the guide?</p>
              </div>
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-none p-4 w-4/5 self-end shadow-md">
                <p className="text-sm">Absolutely! Here is the link to the free guide: <strong>autodmflow.com/guide</strong></p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end pr-2">
                <CheckCircle2 className="w-3 h-3 text-success" />
                Sent automatically by AutoDM Flow
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-secondary/30 border-y border-border py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built for growth.</h2>
            <p className="text-lg text-muted-foreground">Everything you need to capture leads and close sales directly inside Instagram.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Comment to DM</h3>
              <p className="text-muted-foreground">Instantly send a DM containing a link, promo code, or lead magnet whenever someone comments a specific keyword on your posts.</p>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Auto-Replies</h3>
              <p className="text-muted-foreground">Connect Groq AI. Train it on your business info, and let it handle generic questions and unmatched DMs naturally.</p>
            </div>
            <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unified CRM Inbox</h3>
              <p className="text-muted-foreground">Manage all active automated conversations in one beautiful dashboard. Take over manually whenever a human touch is needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="pricing">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing.</h2>
          <p className="text-lg text-muted-foreground">Start for free, upgrade when you need more power.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm flex flex-col">
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-muted-foreground mb-6">For creators just getting started.</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold">$0</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-medium">Up to 100 Automations/mo</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-medium">3 Keyword Triggers</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-medium">Basic Inbox</span></li>
            </ul>
            <button onClick={handleLogin} className="w-full bg-secondary text-secondary-foreground font-bold py-3 rounded-xl hover:bg-secondary/80 transition-colors">Get Started</button>
          </div>

          {/* Pro Tier (Highlighted) */}
          <div className="bg-primary border-2 border-primary p-8 rounded-3xl shadow-xl flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2 text-primary-foreground">Pro</h3>
            <p className="text-primary-foreground/80 mb-6">For growing businesses and creators.</p>
            <div className="mb-8 text-primary-foreground">
              <span className="text-4xl font-extrabold">$15</span>
              <span className="text-primary-foreground/80">/mo</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1 text-primary-foreground">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 shrink-0" /><span className="text-sm font-medium">Unlimited Automations</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 shrink-0" /><span className="text-sm font-medium">Unlimited Keyword Triggers</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 shrink-0" /><span className="text-sm font-medium">AI Auto-Replies</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 shrink-0" /><span className="text-sm font-medium">Priority Support</span></li>
            </ul>
            <button onClick={handleLogin} className="w-full bg-background text-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">Upgrade to Pro</button>
          </div>

          {/* Agency Tier */}
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm flex flex-col">
            <h3 className="text-xl font-bold mb-2">Agency</h3>
            <p className="text-muted-foreground mb-6">For agencies managing multiple clients.</p>
            <div className="mb-8">
              <span className="text-4xl font-extrabold">$49</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-medium">Everything in Pro</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-medium">Manage up to 5 Instagram Accounts</span></li>
              <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary shrink-0" /><span className="text-sm font-medium">White-labeled Dashboard</span></li>
            </ul>
            <button onClick={handleLogin} className="w-full bg-secondary text-secondary-foreground font-bold py-3 rounded-xl hover:bg-secondary/80 transition-colors">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center rounded-md">
              <Zap className="w-3 h-3" strokeWidth={3} />
            </div>
            <span className="font-bold text-lg">AutoDM Flow</span>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AutoDM Flow. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
            <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Sparkles(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}
