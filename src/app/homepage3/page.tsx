"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarPro from "@/components/pro/NavbarPro";
import FooterPro from "@/components/pro/FooterPro";
import anime from "animejs/lib/anime.es.js";

export default function Homepage3() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const featuresRefs = useRef<HTMLDivElement[]>([]);
  const [health, setHealth] = useState<"healthy" | "degraded" | "down" | "unknown">("unknown");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://studysyncapi.rfas.software";
  const features = useMemo(
    () => [
      {
        title: "AI Study Chat",
        desc: "Context-aware tutoring, flashcards and quizzes.",
        icon: "/globe.svg",
        href: "/edubot",
      },
      {
        title: "Smart Notes",
        desc: "Record, transcribe and summarize lectures in real-time.",
        icon: "/file.svg",
        href: "/smartnotes",
      },
      {
        title: "Voice Bot",
        desc: "Hands-free Q&A with natural speech and instant feedback.",
        icon: "/vercel.svg",
        href: "/voicebot",
      },
      {
        title: "LearnSphere",
        desc: "Personalized insights and course recommendations.",
        icon: "/window.svg",
        href: "/learnsphere",
      },
      {
        title: "Agent Mode",
        desc: "Automate routine tasks and research flows.",
        icon: "/next.svg",
        href: "/agent-mode",
      },
      {
        title: "Privacy-First",
        desc: "Transparent policies with control over your data.",
        icon: "/logo.svg",
        href: "/privacy",
      },
    ],
    []
  );

  // Quick badges shown under the hero with hover tooltips
  const quickBadges = useMemo(
    () => [
      {
        icon: "/file.svg",
        label: "Live transcription",
        desc: "Capture lectures in real-time with accurate speech-to-text.",
      },
      {
        icon: "/globe.svg",
        label: "AI chat & quizzes",
        desc: "Ask questions, generate flashcards, and take adaptive quizzes.",
      },
      {
        icon: "/window.svg",
        label: "Voice assistant",
        desc: "Hands-free voice Q&A and guidance while studying.",
      },
      {
        icon: "/logo.svg",
        label: "Privacy-first",
        desc: "Your data stays private with clear controls and policies.",
      },
    ],
    []
  );

  // Small badge component with animated tooltip
  function QuickBadge({ icon, label, desc }: { icon: string; label: string; desc: string }) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const tipRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<"top" | "bottom">("top");

    const show = () => {
      setOpen(true);
      requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        const tip = tipRef.current;
        if (!wrap || !tip) return;
        const r = wrap.getBoundingClientRect();
        const tipRect = tip.getBoundingClientRect();
        const hasSpaceAbove = r.top >= tipRect.height + 12;
        setPlacement(hasSpaceAbove ? "top" : "bottom");
        anime.remove(tip);
        anime({
          targets: tip,
          opacity: [0, 1],
          translateY: [hasSpaceAbove ? 8 : -8, 0],
          scale: [0.98, 1],
          duration: 180,
          easing: "easeOutQuad",
        });
      });
    };

    const hide = () => {
      const tip = tipRef.current;
      if (!tip) return setOpen(false);
      anime.remove(tip);
      anime({
        targets: tip,
        opacity: [1, 0],
        translateY: [0, placement === "top" ? 8 : -8],
        duration: 140,
        easing: "easeOutQuad",
        complete: () => setOpen(false),
      });
    };

    return (
      <div
        ref={wrapRef}
        className="relative flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-3 py-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        tabIndex={0}
        aria-describedby={`tip-${label.replace(/\s+/g, "-")}`}
      >
        <Image src={icon} alt="" width={16} height={16} />
        {label}
        {open && (
          <div
            ref={tipRef}
            id={`tip-${label.replace(/\s+/g, "-")}`}
            role="tooltip"
            className={`absolute z-20 w-64 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-md p-3 ${
              placement === "top" ? "bottom-full mb-2" : "top-full mt-2"
            }`}
          >
            <div className="text-xs leading-relaxed">{desc}</div>
          </div>
        )}
      </div>
    );
  }

  useEffect(() => {
    let es: EventSource | null = null;
    let pollTimer: number | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const applyHealth = (payload: any) => {
      const status = (payload?.status || payload?.state || "").toString().toLowerCase();
      if (status === "ok" || status.includes("healthy")) return setHealth("healthy");
      if (status.includes("degraded")) return setHealth("degraded");

      const mongo = payload?.checks?.mongodb as string | undefined;
      if (mongo && mongo.toLowerCase() === "down") return setHealth("down");

      const cpuPct = Number(payload?.cpu?.processPercent ?? NaN);
      const p99 = Number(payload?.eventLoopDelay?.p99 ?? NaN);
      const heapPct = Number(payload?.memory?.heapUsedPercentOfLimit ?? NaN);
      if ((isFinite(cpuPct) && cpuPct > 85) || (isFinite(p99) && p99 > 200) || (isFinite(heapPct) && heapPct > 90)) {
        return setHealth("degraded");
      }

      setHealth("unknown");
    };

    const applyHealthFromText = (text?: string) => {
      const s = (text || "").toLowerCase();
      if (s.includes("healthy") || s === "ok") return setHealth("healthy");
      if (s.includes("degraded")) return setHealth("degraded");
      if (s.includes("down") || s.includes("fail")) return setHealth("down");
      setHealth("unknown");
    };

    try {
      es = new EventSource(`${API_BASE_URL}/health/stream`, { withCredentials: false });
      es.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          applyHealth(data);
        } catch {
          applyHealthFromText(e.data);
        }
      };
      es.onerror = () => {
        es?.close();
        es = null;
        if (!pollTimer) {
          const poll = async () => {
            try {
              const res = await fetch(`${API_BASE_URL}/health`, { cache: "no-store" });
              if (!res.ok) throw new Error(String(res.status));
              const ct = res.headers.get("content-type") || "";
              if (ct.includes("application/json")) {
                const j = await res.json();
                applyHealth(j);
              } else {
                const t = await res.text();
                applyHealthFromText(t);
              }
            } catch {
              setHealth("down");
            }
          };
          poll();
          pollTimer = window.setInterval(poll, 15000);
        }
      };
    } catch {
      setHealth("unknown");
    }

    return () => {
      es?.close();
      if (pollTimer) window.clearInterval(pollTimer);
    };
  }, [API_BASE_URL]);

  useEffect(() => {
    let io: IntersectionObserver | null = null;

    const tl = anime.timeline({ easing: "easeOutExpo", duration: 900 });

    tl.add({
      targets: heroRef.current,
      opacity: [0, 1],
      translateY: [24, 0],
    })
      .add(
        {
          targets: titleRef.current,
          opacity: [0, 1],
          translateY: [24, 0],
        },
        "-=400"
      )
      .add(
        {
          targets: subtitleRef.current,
          opacity: [0, 1],
          translateY: [24, 0],
        },
        "-=500"
      )
      .add(
        {
          targets: ctaRef.current?.querySelectorAll(".cta-btn"),
          opacity: [0, 1],
          translateY: [16, 0],
          delay: anime.stagger(100),
        },
        "-=500"
      );

    anime({
      targets: ".float-shape",
      translateY: [0, 18],
      translateX: [0, 12],
      direction: "alternate",
      easing: "easeInOutSine",
      duration: 3000,
      delay: anime.stagger(200),
      loop: true,
    });

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target as Element,
              opacity: [0, 1],
              translateY: [28, 0],
              scale: [0.98, 1],
              easing: "easeOutQuint",
              duration: 700,
            });
            io?.unobserve(entry.target as Element);
          }
        });
      },
      { threshold: 0.2 }
    );

    featuresRefs.current.forEach((el) => el && io!.observe(el));

    return () => io?.disconnect();
  }, []);

  useEffect(() => {
    // Button hover/press micro-interactions
    const buttons = Array.from(
      document.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
        ".btn-animate"
      )
    );

    const listeners: Array<{
      el: Element;
      onEnter: () => void;
      onLeave: () => void;
      onDown: () => void;
      onUp: () => void;
    }> = [];

    const enter = (el: Element) => {
      anime.remove(el);
      anime({ targets: el, scale: 1.06, translateY: -1, duration: 180, easing: "easeOutQuad" });
    };
    const leave = (el: Element) => {
      anime.remove(el);
      anime({ targets: el, scale: 1, translateY: 0, duration: 180, easing: "easeOutQuad" });
    };
    const down = (el: Element) => {
      anime.remove(el);
      anime({ targets: el, scale: 0.96, duration: 90, easing: "easeOutQuad" });
    };
    const up = (el: Element) => {
      anime.remove(el);
      anime
        .timeline({ easing: "easeOutQuad" })
        .add({ targets: el, scale: 1.04, duration: 110 })
        .add({ targets: el, scale: 1, duration: 140 });
    };

    buttons.forEach((el) => {
      const onEnter = () => enter(el);
      const onLeave = () => leave(el);
      const onDown = () => down(el);
      const onUp = () => up(el);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("mousedown", onDown);
      el.addEventListener("mouseup", onUp);
      el.addEventListener("focus", onEnter);
      el.addEventListener("blur", onLeave);
      listeners.push({ el, onEnter, onLeave, onDown, onUp });
    });

    return () => {
      listeners.forEach(({ el, onEnter, onLeave, onDown, onUp }) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("mousedown", onDown);
        el.removeEventListener("mouseup", onUp);
        el.removeEventListener("focus", onEnter);
        el.removeEventListener("blur", onLeave);
      });
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-50">
      {/* Swap to redesigned components for this page */}
      <NavbarPro />

      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="float-shape absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="float-shape absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="float-shape absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <div ref={heroRef} className="max-w-6xl mx-auto px-6 pt-10 pb-16 md:pt-20 md:pb-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/60 dark:border-gray-800/60 px-3 py-1 text-xs md:text-sm mb-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur">
              {
                (() => {
                  const color = (
                    {
                      healthy: "bg-emerald-500",
                      degraded: "bg-amber-500",
                      down: "bg-rose-500",
                      unknown: "bg-gray-400",
                    } as const
                  )[health];
                  return <span className={`inline-flex h-2 w-2 rounded-full ${color} animate-pulse`} aria-live="polite" aria-label={`System health: ${health}`} />;
                })()
              }
              Realtime AI for smarter studying
            </div>

            <h1
              ref={titleRef}
              className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-violet-600 bg-clip-text text-transparent">
                Study smarter, remember longer.
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-5 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              StudySync unifies transcription, voice, and AI chat so you can capture lectures, quiz yourself, and turn insights into action in one place.
            </p>

            <div ref={ctaRef} className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/login"
                className="btn-animate cta-btn inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-colors"
              >
                Get started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a
                href="#features"
                className="btn-animate cta-btn inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
              >
                Explore features
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600 dark:text-gray-300">
              {quickBadges.map((b) => (
                <QuickBadge key={b.label} icon={b.icon} label={b.label} desc={b.desc} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Everything you need to learn effectively</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Modular tools that work beautifully together and keep you in flow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                ref={(el) => {
                  if (el) featuresRefs.current[i] = el;
                }}
                className="opacity-0 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 backdrop-blur p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 inline-flex items-center justify-center text-white">
                    <Image src={f.icon} alt="" width={20} height={20} />
                  </div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{f.desc}</p>
                <Link
                  href={f.href}
                  className="btn-animate mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  Open
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA and footer */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-blue-600 via-cyan-600 to-violet-600 p-8 md:p-12">
            <div aria-hidden className="absolute inset-0 -z-0 opacity-30">
              <div className="float-shape absolute -top-12 left-1/3 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
              <div className="float-shape absolute -bottom-10 right-10 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Ready to boost your study sessions?
                </h3>
                <p className="mt-2 text-white/90 max-w-xl">
                  Create an account and start transcribing, quizzing, and learning with AI in minutes.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/signup"
                  className="btn-animate cta-btn inline-flex items-center gap-2 rounded-xl bg-white text-blue-700 px-5 py-3 font-medium shadow-md hover:bg-gray-100"
                >
                  Create account
                </Link>
                <Link
                  href="/free-software"
                  className="btn-animate cta-btn inline-flex items-center gap-2 rounded-xl bg-white/10 text-white px-5 py-3 font-medium ring-1 ring-white/30 hover:bg-white/15"
                >
                  Our philosophy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterPro />
    </div>
  );
}
