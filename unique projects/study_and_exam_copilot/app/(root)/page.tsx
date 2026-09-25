'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  Archive,
  ArrowUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileUp,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Menu,
  Moon,
  PanelLeft,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Sun,
  Upload,
  X,
} from 'lucide-react'
import { useTheme } from 'next-themes'

const studyBackendConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  nebiusApiKey: process.env.NEXT_PUBLIC_NEBIUS_API_KEY,
}
void studyBackendConfig

const recentSessions = ['Quadratic functions', 'The water cycle', 'Newton’s second law']
const savedExperiments = ['Pendulum lab', 'Visual proofs']

function Sidebar({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <aside className={`fixed inset-y-0 left-0 z-30 flex w-[272px] flex-col border-r border-border/50 bg-sidebar/85 px-5 py-6 backdrop-blur-xl transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm"><GraduationCap className="size-5" /></div>
          <div><p className="text-sm font-semibold tracking-tight">Study Copilot</p><p className="text-[11px] text-muted-foreground">Learn by making sense</p></div>
        </div>
        <button aria-label="Collapse sidebar" onClick={onToggle} className="hidden rounded-lg p-1.5 text-muted-foreground transition hover:bg-accent hover:text-foreground lg:block"><ChevronLeft className="size-4" /></button>
      </div>
      <button className="mb-8 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"><Plus className="size-4" /> New study session</button>
      <nav className="flex flex-1 flex-col gap-8" aria-label="Study navigation">
        <SidebarSection icon={<BookOpen className="size-4" />} title="Recent sessions" items={recentSessions} />
        <SidebarSection icon={<FlaskConical className="size-4" />} title="Saved experiments" items={savedExperiments} />
        <div className="mt-auto"><button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-accent hover:text-foreground"><Settings className="size-4" /> Settings</button></div>
      </nav>
      <div className="mt-6 rounded-2xl bg-accent/60 p-4"><div className="mb-2 flex items-center gap-2 text-xs font-medium"><Sparkles className="size-3.5 text-amber-500" /> Keep exploring</div><p className="text-xs leading-relaxed text-muted-foreground">Small questions make strong understanding.</p></div>
    </aside>
  )
}

function SidebarSection({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return <section><div className="mb-2 flex items-center gap-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{icon}{title}</div><div className="flex flex-col gap-1">{items.map((item, index) => <button key={item} className={`truncate rounded-xl px-3 py-2 text-left text-sm transition hover:bg-accent ${index === 0 ? 'bg-accent/70 text-foreground' : 'text-muted-foreground'}`}>{item}</button>)}</div></section>
}

function ChatInterface() {
  const [studentInput, setStudentInput] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleQuestionSubmit = () => { if (studentInput.trim()) { setIsSubmitted(true); setStudentInput('') } }
  return <section className="flex min-h-[520px] flex-col rounded-3xl bg-card/80 p-5 shadow-[0_16px_50px_-28px_rgba(30,45,35,0.3)] ring-1 ring-border/50 sm:p-7">
    <div className="mb-8 flex items-start justify-between"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Logic engine</p><h2 className="font-serif text-2xl tracking-tight">Ask a better question.</h2></div><div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600"><Lightbulb className="size-5" /></div></div>
    <div className="flex flex-1 flex-col justify-end gap-4"><div className="rounded-2xl bg-accent/55 p-4"><p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Your question</p><p className="text-sm leading-relaxed">Can you walk me through solving x² − 5x + 6 = 0?</p></div>{isSubmitted && <div className="self-end rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground">Let&apos;s explore that together.</div>}<div className="mt-4 rounded-2xl border border-border/70 bg-background/70 p-2 transition focus-within:ring-2 focus-within:ring-ring/30"><textarea value={studentInput} onChange={(event) => setStudentInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); handleQuestionSubmit() } }} placeholder="What are you curious about?" aria-label="Ask a study question" className="min-h-20 w-full resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground/70" /><div className="flex items-center justify-between px-1 pt-2"><button aria-label="Upload a file" className="rounded-lg p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"><FileUp className="size-4" /></button><button onClick={handleQuestionSubmit} aria-label="Send question" className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:scale-105"><ArrowUp className="size-4" /></button></div></div></div>
    <div className="mt-5 flex items-center gap-2 text-[11px] text-muted-foreground"><Archive className="size-3.5" /> Ask for a hint, an example, or a new angle.</div>
  </section>
}

function DynamicCanvas() {
  const stepRefs = useRef<HTMLDivElement[]>([])
  useEffect(() => { gsap.from(stepRefs.current, { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' }) }, [])
  const steps = [{ label: 'Notice', body: 'We need two numbers that multiply to 6 and add to −5.', equation: 'a · b = 6     a + b = −5' }, { label: 'Factor', body: 'Rewrite the quadratic as a product of two simple expressions.', equation: 'x² − 5x + 6 = (x − 2)(x − 3)' }, { label: 'Solve', body: 'A product is zero when either factor is zero.', equation: 'x − 2 = 0  or  x − 3 = 0' }]
  return <section className="relative overflow-hidden rounded-3xl bg-[#e7ece5] p-5 text-[#25352e] shadow-[0_20px_60px_-28px_rgba(55,75,55,0.35)] dark:bg-[#202a27] dark:text-[#edf3ec] sm:p-8"><div className="absolute -right-20 -top-24 size-64 rounded-full bg-amber-300/20 blur-3xl" /><div className="relative"><div className="mb-8 flex items-start justify-between"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-60">Dynamic canvas · Algebra</p><h2 className="font-serif text-2xl tracking-tight">Quadratic functions</h2></div><button aria-label="Reset solution" className="rounded-xl bg-white/45 p-2 transition hover:bg-white/70 dark:bg-black/15 dark:hover:bg-black/25"><RotateCcw className="size-4" /></button></div><div className="mb-7 rounded-2xl bg-white/50 p-5 dark:bg-black/15"><p className="mb-3 text-xs font-medium opacity-60">The question</p><p className="font-serif text-xl tracking-tight">Solve for <span className="italic">x</span>: x² − 5x + 6 = 0</p></div><div className="flex flex-col gap-3">{steps.map((step, index) => <div key={step.label} ref={(element) => { if (element) stepRefs.current[index] = element }} className="rounded-2xl bg-white/55 p-4 dark:bg-black/15"><div className="mb-3 flex items-center gap-3"><span className="flex size-7 items-center justify-center rounded-lg bg-[#c6d7c7] text-xs font-bold text-[#36503d] dark:bg-[#354a40] dark:text-[#d9ebdb]">0{index + 1}</span><span className="text-xs font-semibold uppercase tracking-[0.15em] opacity-60">{step.label}</span></div><p className="mb-3 text-sm opacity-80">{step.body}</p><div className="rounded-xl bg-white/65 px-4 py-3 font-mono text-sm dark:bg-black/20">{step.equation}</div></div>)}</div><div className="mt-5 flex items-center gap-2 rounded-2xl bg-amber-100/70 px-4 py-3 text-sm text-amber-950 dark:bg-amber-200/10 dark:text-amber-100"><Sparkles className="size-4" /> <span><strong>Key insight:</strong> factoring turns one problem into two tiny ones.</span></div></div></section>
}

function ThemeToggle() { const { resolvedTheme, setTheme } = useTheme(); return <button aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground">{resolvedTheme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}</button> }

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return <main className="min-h-screen bg-background"><div className="flex min-h-screen"><Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(false)} /><div className="flex min-w-0 flex-1 flex-col"><header className="flex h-16 items-center justify-between border-b border-border/40 px-5 sm:px-8"><div className="flex items-center gap-3"><button onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar" className="rounded-xl p-2 text-muted-foreground transition hover:bg-accent lg:hidden"><Menu className="size-5" /></button><div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="hidden sm:inline">Workspace</span><ChevronRight className="hidden size-4 sm:block" /><span className="font-medium text-foreground">Today&apos;s study</span></div></div><div className="flex items-center gap-1"><button aria-label="Search sessions" className="rounded-xl p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"><Search className="size-4" /></button><ThemeToggle /></div></header><div className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400"><span className="size-1.5 rounded-full bg-emerald-500" /> In focus</div><h1 className="max-w-xl font-serif text-4xl tracking-tight sm:text-5xl">Make room for <span className="text-muted-foreground">wonder.</span></h1><p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">A calm space to untangle difficult ideas and turn curiosity into understanding.</p></div><div className="flex items-center gap-3 text-xs text-muted-foreground"><div className="rounded-full bg-accent px-3 py-1.5">3 concepts explored</div><div className="rounded-full bg-accent px-3 py-1.5">12 min today</div></div></div><div className="grid gap-6 xl:grid-cols-[minmax(300px,0.78fr)_minmax(500px,1.22fr)]"><ChatInterface /><DynamicCanvas /></div></div></div></div>{isSidebarOpen && <button aria-label="Close sidebar" onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-20 bg-black/20 lg:hidden" />}</main>
}
