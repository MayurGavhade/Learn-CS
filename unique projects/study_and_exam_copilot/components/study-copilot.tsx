'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import {
  Archive,
  ArrowUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  FlaskConical,
  Lightbulb,
  Menu,
  Moon,
  Paperclip,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  X,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

const recentSessions = [
  { title: 'Quadratic functions', time: 'Today, 10:42 AM', active: true },
  { title: "Newton's laws of motion", time: 'Yesterday', active: false },
  { title: 'The water cycle', time: 'Mon, Sep 22', active: false },
]

const solutionSteps = [
  { number: '01', title: 'Identify the structure', body: 'We have a quadratic expression in standard form: $$ax^2 + bx + c = 0$$' },
  { number: '02', title: 'Choose a strategy', body: 'Since the expression does not factor easily, the quadratic formula gives us a reliable path.' },
  { number: '03', title: 'Substitute the values', body: 'For $$2x^2 + 3x - 5 = 0$$, we have $$a = 2, b = 3, c = -5$$.' },
  { number: '04', title: 'Simplify the result', body: '$$x = \\frac{-3 \\pm \\sqrt{49}}{4} = 1 \\quad \\text{or} \\quad -\\frac{5}{2}$$' },
]

function BrandMark() {
  return (
    <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background shadow-sm">
      <Sparkles className="size-4" aria-hidden="true" />
    </div>
  )
}

function Sidebar({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
  return (
    <aside className={`flex shrink-0 flex-col border-r border-border/60 bg-card/55 transition-[width] duration-300 ${isCollapsed ? 'w-[76px]' : 'w-[270px]'}`}>
      <div className="flex h-[76px] items-center justify-between px-5">
        <div className="flex items-center gap-3 overflow-hidden">
          <BrandMark />
          {!isCollapsed && <span className="whitespace-nowrap text-sm font-semibold tracking-[-0.02em]">Study Copilot</span>}
        </div>
        <Button variant="ghost" size="icon" className="size-8 shrink-0 rounded-lg text-muted-foreground" onClick={onToggle} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="flex flex-1 flex-col gap-8 px-3 py-5">
        <Button variant="secondary" className={`h-10 justify-start gap-2 rounded-xl px-3 shadow-none ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <Plus data-icon="inline-start" />
          {!isCollapsed && 'New session'}
        </Button>

        <nav className="flex flex-col gap-7" aria-label="Study navigation">
          <section>
            {!isCollapsed && <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Recent sessions</p>}
            <div className="flex flex-col gap-1">
              {recentSessions.map((session) => (
                <button key={session.title} className={`group flex min-h-10 w-full items-center gap-3 rounded-xl px-2 text-left transition-colors hover:bg-muted ${session.active ? 'bg-muted' : ''} ${isCollapsed ? 'justify-center' : ''}`}>
                  <BookOpen className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  {!isCollapsed && <span className="truncate text-xs font-medium">{session.title}</span>}
                </button>
              ))}
            </div>
          </section>
          <section>
            {!isCollapsed && <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Library</p>}
            <div className="flex flex-col gap-1">
              <button className={`flex min-h-10 items-center gap-3 rounded-xl px-2 text-left text-xs font-medium hover:bg-muted ${isCollapsed ? 'justify-center' : ''}`}><FlaskConical className="size-4 text-muted-foreground" aria-hidden="true" />{!isCollapsed && 'Saved experiments'}</button>
              <button className={`flex min-h-10 items-center gap-3 rounded-xl px-2 text-left text-xs font-medium hover:bg-muted ${isCollapsed ? 'justify-center' : ''}`}><Archive className="size-4 text-muted-foreground" aria-hidden="true" />{!isCollapsed && 'Resource vault'}</button>
            </div>
          </section>
        </nav>
      </div>
      <div className="border-t border-border/60 p-3">
        <button className={`flex min-h-10 w-full items-center gap-3 rounded-xl px-2 text-left text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground ${isCollapsed ? 'justify-center' : ''}`}><Settings className="size-4" aria-hidden="true" />{!isCollapsed && 'Settings'}</button>
        {!isCollapsed && <p className="px-2 pt-4 text-[10px] text-muted-foreground">Connected to your curiosity</p>}
      </div>
    </aside>
  )
}

function ChatInterface({ isMobileOpen, onClose }: { isMobileOpen: boolean; onClose: () => void }) {
  const [studentInput, setStudentInput] = useState('')
  const handleSubmit = () => {
    if (studentInput.trim()) setStudentInput('')
  }
  return (
    <section className={`flex w-full flex-col bg-background lg:w-[390px] lg:border-r lg:border-border/60 ${isMobileOpen ? 'fixed inset-0 z-20' : 'hidden lg:flex'}`} aria-label="Logic engine">
      <div className="flex h-[76px] items-center justify-between border-b border-border/60 px-6">
        <div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Zone A</p><h2 className="mt-1 text-sm font-semibold">Logic engine</h2></div>
        <Button variant="ghost" size="icon" className="size-8 rounded-lg lg:hidden" onClick={onClose} aria-label="Close logic engine"><X /></Button>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-6 overflow-y-auto px-6 py-7">
        <div className="flex items-start gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-foreground text-background"><Sparkles className="size-3.5" aria-hidden="true" /></div>
          <div className="max-w-[270px] rounded-2xl rounded-tl-md bg-muted px-4 py-3 text-sm leading-6">Let's explore this together. What part of the problem feels most interesting to you?</div>
        </div>
        <div className="ml-auto max-w-[270px] rounded-2xl rounded-tr-md bg-foreground px-4 py-3 text-sm leading-6 text-background">I'm stuck on how to solve this quadratic equation.</div>
        <div className="flex items-start gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-foreground text-background"><Sparkles className="size-3.5" aria-hidden="true" /></div>
          <div className="max-w-[280px] text-sm leading-6 text-muted-foreground">Great place to pause. I've mapped out the logic on the canvas so we can take it one small step at a time.</div>
        </div>
      </div>
      <div className="p-5 pt-0">
        <div className="rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring/20">
          <textarea value={studentInput} onChange={(event) => setStudentInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); handleSubmit() } }} placeholder="Ask a follow-up question..." className="min-h-20 w-full resize-none bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground" aria-label="Ask a follow-up question" />
          <div className="flex items-center justify-between pt-2"><Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" aria-label="Attach a file"><Paperclip /></Button><Button size="icon" className="size-8 rounded-lg" onClick={handleSubmit} disabled={!studentInput.trim()} aria-label="Send question"><ArrowUp /></Button></div>
        </div>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">Copilot can make mistakes. Stay curious and verify.</p>
      </div>
    </section>
  )
}

function DynamicCanvas() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  useEffect(() => {
    const visibleSteps = stepRefs.current.filter(Boolean)
    gsap.from(visibleSteps, { y: 20, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out' })
  }, [])
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-muted/30" aria-label="Dynamic canvas">
      <div className="flex h-[76px] items-center justify-between border-b border-border/60 px-6 md:px-10"><div><p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Zone B</p><h2 className="mt-1 text-sm font-semibold">Dynamic canvas</h2></div><div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><span className="size-2 rounded-full bg-emerald-500" />Live reasoning</div></div>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 py-8 md:px-10 md:py-12"><div className="mx-auto w-full max-w-3xl"><div className="mb-10 flex items-start justify-between gap-5"><div><div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground"><Lightbulb className="size-4" /> Algebra · Foundations</div><h1 className="max-w-xl text-2xl font-semibold tracking-[-0.04em] md:text-4xl">Let's make the quadratic formula feel intuitive.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">We'll unpack the structure, then watch each choice lead naturally to the answer.</p></div><Button variant="outline" size="icon" className="size-9 shrink-0 rounded-xl" aria-label="Search resources"><Search /></Button></div>
        <div className="rounded-3xl border border-border/60 bg-card p-5 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.28)] md:p-8"><div className="mb-8 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Your problem</p><p className="mt-2 text-xl font-medium tracking-[-0.02em]">Solve: 2x² + 3x − 5 = 0</p></div><FileText className="size-5 text-muted-foreground" aria-hidden="true" /></div><div className="flex flex-col gap-3">{solutionSteps.map((step, index) => <div key={step.number} ref={(element) => { stepRefs.current[index] = element }} className="rounded-2xl bg-muted/60 p-4 md:p-5"><div className="flex gap-4"><span className="font-mono text-xs text-muted-foreground">{step.number}</span><div><h3 className="text-sm font-semibold">{step.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p></div></div></div>)}</div></div><p className="mt-5 text-center text-xs text-muted-foreground">A solution is more than an answer — it's a trail of decisions you can follow.</p></div></div>
    </section>
  )
}

export default function StudyCopilot() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  return <main className="flex min-h-svh bg-background text-foreground"><Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} /><div className="flex min-w-0 flex-1 flex-col"><header className="flex h-14 items-center justify-between border-b border-border/60 px-4 lg:hidden"><Button variant="ghost" size="icon" className="size-9 rounded-lg" onClick={() => setIsMobileChatOpen(true)} aria-label="Open logic engine"><Menu /></Button><div className="flex items-center gap-2"><BrandMark /><span className="text-sm font-semibold">Study Copilot</span></div><Button variant="ghost" size="icon" className="size-9 rounded-lg" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? <Sun /> : <Moon />}</Button></header><div className="hidden justify-end px-8 pt-5 lg:flex"><Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted-foreground" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? <Sun /> : <Moon />}</Button></div><div className="flex min-h-0 flex-1"><ChatInterface isMobileOpen={isMobileChatOpen} onClose={() => setIsMobileChatOpen(false)} /><DynamicCanvas /></div></div></main>
}

export { Sidebar, ChatInterface, DynamicCanvas }
