"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Zap, MessageCircle, Sparkles, ArrowRight, Github, Star,
  Send, AtSign, Brain, Inbox, Lock, Terminal,
} from "lucide-react"

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
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-blue selection:text-white overflow-x-hidden antialiased">
      <style>{`
        @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
        
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Ambient Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob dark:mix-blend-screen" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-pink/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000 dark:mix-blend-screen" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-accent-yellow-soft/20 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000 dark:mix-blend-screen" />
      </div>

      {/* Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
        <nav className="flex items-center justify-between px-6 h-14 bg-background/70 backdrop-blur-xl border border-border rounded-full shadow-sm max-w-5xl w-full pointer-events-auto transition-all">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-full shadow-inner">
              <Zap className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <span className="font-semibold tracking-tight text-foreground">AutoDM Flow</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={GITHUB_URL} target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Star on GitHub</span>
              {stars !== null && <span className="text-accent-blue ml-1 font-semibold">{stars}</span>}
            </a>
            {process.env.NODE_ENV === "development" && (
              <button
                onClick={handleTestLogin}
                className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Dev Login
              </button>
            )}
            <button
              onClick={handleLogin}
              className="text-sm font-semibold bg-primary text-primary-foreground rounded-full px-5 py-2 hover:opacity-90 transition-opacity shadow-sm"
            >
              Log in
            </button>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 md:pt-48 pb-24 px-5">
        <section className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="fade-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-secondary-foreground font-medium mb-8 backdrop-blur-sm" style={{ animationDelay: "0ms" }}>
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span>The completely automated inbound engine</span>
          </div>

          <h1 className="fade-up text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-8 text-foreground" style={{ animationDelay: "100ms" }}>
            Scale your Instagram inbound on <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-pink">autopilot.</span>
          </h1>

          <p className="fade-up text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10" style={{ animationDelay: "200ms" }}>
            Turn comments into customers. AutoDM Flow sends tailored DMs, handles keyword triggers, and uses AI to naturally reply to your audience 24/7.
          </p>

          <div className="fade-up flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto" style={{ animationDelay: "300ms" }}>
            <button
              onClick={handleLogin}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground text-base font-semibold px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Connect Instagram
              <ArrowRight className="w-4 h-4" />
            </button>
            {process.env.NODE_ENV === "development" && (
              <button
                onClick={handleTestLogin}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary text-secondary-foreground text-base font-semibold px-8 py-4 rounded-full hover:bg-secondary/80 transition-all"
              >
                <Terminal className="w-4 h-4" />
                Dev Login
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Bento Grid Features */}
      <section className="relative z-10 px-5 md:px-10 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to scale.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Built for modern creators and brands who want full control over their Instagram funnels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Feature 1 */}
          <div className="md:col-span-2 bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-shadow flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-foreground">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Comment-to-DM Funnels</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Whenever someone comments a trigger word on your posts or reels, instantly send them a DM with your link or lead magnet.
              </p>
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-shadow group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow-soft/20 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-foreground">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Auto-Reply</h3>
            <p className="text-muted-foreground">
              Feed it your context, and let the AI handle unmatched DMs natively in your own tone of voice.
            </p>
          </div>

          {/* Small Feature 2 */}
          <div className="bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-shadow group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-foreground">
              <AtSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Story Triggers</h3>
            <p className="text-muted-foreground">
              Automatically react to story mentions, emoji reactions, and story replies.
            </p>
          </div>

          {/* Large Feature 2 */}
          <div className="md:col-span-2 bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-shadow flex flex-col justify-between overflow-hidden relative group">
             <div className="absolute top-0 left-0 w-64 h-64 bg-success/10 rounded-full blur-3xl -ml-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-foreground">
                <Inbox className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Live Inbox & CRM</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                View all your active conversations in a beautiful dashboard. Jump in manually anytime and fire quick responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community / Final CTA */}
      <section className="relative z-10 px-5 md:px-10 pb-32 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-b from-card to-background border border-border rounded-3xl p-12 md:p-16 shadow-2xl">
          <h3 className="text-3xl md:text-5xl font-bold mb-6">Ready to scale?</h3>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
            Join thousands of creators using AutoDM Flow to automate their inbound funnels and reclaim their time.
          </p>
          <button
            onClick={handleLogin}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-lg font-semibold px-10 py-5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            Connect Instagram Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary text-primary-foreground flex items-center justify-center rounded-sm">
              <Zap className="w-3 h-3" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-sm">AutoDM Flow</span>
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AutoDM Flow. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors font-medium">GitHub</a>
            <a href="/privacy" className="hover:text-foreground transition-colors font-medium">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
