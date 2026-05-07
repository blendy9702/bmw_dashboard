"use client";

import Image from "next/image";
import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

const sidebarItems = [
  { label: "대시보드", active: true },
  { label: "차량 라인업", active: false },
  { label: "재고 · 주문", active: false },
  { label: "서비스 센터", active: false },
  { label: "리포트", active: false },
  { label: "설정", active: false },
];

const stats = [
  {
    title: "이번 분기 딜리버리",
    endValue: 1248,
    valueVariant: "locale-int" as const,
    delta: "+12.4%",
    tone: "success" as const,
  },
  {
    title: "전시장 방문 예약",
    endValue: 386,
    valueVariant: "locale-int" as const,
    delta: "+4.1%",
    tone: "success" as const,
  },
  {
    title: "CSAT 평균",
    endValue: 4.7,
    valueVariant: "fixed1" as const,
    delta: "목표 대비 +0.2",
    tone: "neutral" as const,
  },
  {
    title: "리드 타임(일)",
    endValue: 18,
    valueVariant: "plain-int" as const,
    delta: "−2일",
    tone: "success" as const,
  },
];

const modelCards = [
  {
    name: "BMW i7 xDrive60",
    tag: "전기",
    meta: "출고 대기 42대",
    image: "/cars/BMW_i7_xDrive60.jpg",
  },
  {
    name: "BMW iX2",
    tag: "전기",
    meta: "구성 완료 128건",
    image: "/cars/BMW_iX2.jpg",
  },
  {
    name: "BMW 5 시리즈",
    tag: "하이브리드",
    meta: "시승 예약 56건",
    image: "/cars/BMW_5.jpg",
  },
  {
    name: "BMW X3",
    tag: "가솔린",
    meta: "재고 회전 31일",
    image: "/cars/BMW_X3.jpg",
  },
] as const;

const activity = [
  { time: "09:42", text: "강남 전시장 — iX1 시승 확정 (김○○)", type: "예약" },
  {
    time: "10:15",
    text: "부산 센터 — 정기 점검 완료 · 차량 인도",
    type: "서비스",
  },
  { time: "11:03", text: "온라인 — 520i M Sport 구성 저장", type: "리드" },
  {
    time: "13:27",
    text: "재고 이전 · 대전 → 수원 (X4 xDrive30i)",
    type: "물류",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const sidebarLink = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0 },
};

type StatValueVariant = "locale-int" | "fixed1" | "plain-int";

function formatStatValue(variant: StatValueVariant, n: number): string {
  switch (variant) {
    case "locale-int":
      return Math.round(n).toLocaleString("ko-KR");
    case "fixed1":
      return n.toFixed(1);
    case "plain-int":
      return String(Math.round(n));
  }
}

function AnimatedStatValue({
  endValue,
  variant,
  delay = 0,
}: {
  endValue: number;
  variant: StatValueVariant;
  delay?: number;
}) {
  const [text, setText] = useState(() => formatStatValue(variant, 0));

  useEffect(() => {
    const controls = animate(0, endValue, {
      delay,
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setText(formatStatValue(variant, v)),
      onComplete: () => setText(formatStatValue(variant, endValue)),
    });
    return () => controls.stop();
  }, [endValue, variant, delay]);

  return <>{text}</>;
}

export function BmwDashboard() {
  return (
    <div className="flex min-h-screen bg-bmw-surface-soft text-bmw-ink">
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="flex w-64 shrink-0 flex-col border-r border-bmw-hairline bg-bmw-surface-dark text-bmw-on-dark"
      >
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-bmw-on-dark">
            BMW
          </span>
          <span className="ml-2 text-xs font-light text-bmw-on-dark-soft">
            운영
          </span>
        </div>
        <motion.nav
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col gap-1 p-3"
        >
          {sidebarItems.map((nav) => (
            <motion.button
              key={nav.label}
              type="button"
              variants={sidebarLink}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.98 }}
              className={`flex w-full items-center rounded-none px-4 py-3 text-left text-sm transition-colors ${
                nav.active
                  ? "border-l-[3px] border-bmw-primary bg-bmw-surface-dark-elevated font-bold text-bmw-on-dark"
                  : "border-l-[3px] border-transparent font-normal text-bmw-on-dark-soft hover:text-bmw-on-dark"
              }`}
            >
              {nav.label}
            </motion.button>
          ))}
        </motion.nav>
        <div className="border-t border-white/10 p-4">
          <p className="text-[11px] font-normal uppercase tracking-widest text-bmw-on-dark-soft">
            버전
          </p>
          <p className="mt-1 text-sm font-bold text-bmw-on-dark">
            대시보드 1.0 · 내부
          </p>
        </div>
      </motion.aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex h-16 items-center justify-between border-b border-bmw-hairline bg-bmw-canvas px-8"
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-bmw-muted">
              홈
            </p>
            <h1 className="text-lg font-bold leading-tight text-bmw-body-strong">
              전시 · 재고 · 서비스 요약
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-none border border-bmw-hairline bg-bmw-canvas px-4 py-2 text-[13px] font-bold text-bmw-ink"
            >
              내보내기
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ backgroundColor: "#0653b6" }}
              whileTap={{ scale: 0.98 }}
              className="rounded-none bg-bmw-primary px-5 py-2 text-[13px] font-bold text-white"
            >
              새 보고서
            </motion.button>
          </div>
        </motion.header>

        <main className="flex-1 overflow-auto p-8">
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 bg-bmw-surface-dark px-8 py-10 text-bmw-on-dark"
          >
            <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-bmw-on-dark-soft">
              2026년 2분기 스냅샷
            </p>
            <h2 className="mt-2 max-w-2xl text-2xl font-bold leading-snug md:text-3xl">
              코리아 딜러 네트워크 — 전환율과 재고 밸런스가 목표 대비 안정
              구간입니다.
            </h2>
            <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-bmw-on-dark-soft">
              아래 지표는 샘플 데이터입니다. 실제 운영 지표로 교체해 사용할 수
              있는 레이아웃입니다.
            </p>
          </motion.section>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.title}
                variants={item}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="border border-bmw-hairline bg-bmw-canvas p-6"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-bmw-muted">
                  {s.title}
                </p>
                <p className="mt-3 text-3xl font-bold tabular-nums text-bmw-body-strong">
                  <AnimatedStatValue
                    endValue={s.endValue}
                    variant={s.valueVariant}
                    delay={0.1 + i * 0.11}
                  />
                </p>
                <p
                  className={`mt-2 text-sm font-light ${
                    s.tone === "success" ? "text-bmw-success" : "text-bmw-muted"
                  }`}
                >
                  {s.delta}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <motion.section
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              <div className="flex items-end justify-between">
                <h3 className="text-lg font-bold text-bmw-body-strong">
                  모델 카드
                </h3>
                <span className="text-xs font-normal text-bmw-muted">
                  4-up 그리드 · DESIGN 가이드
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {modelCards.map((m) => (
                  <motion.article
                    key={m.name}
                    variants={item}
                    whileHover={{ y: -4 }}
                    className="flex flex-col border border-bmw-hairline bg-bmw-canvas"
                  >
                    <div className="relative aspect-16/10 bg-bmw-surface-card">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-wide text-bmw-primary">
                        {m.tag}
                      </p>
                      <h4 className="mt-2 text-[17px] font-bold leading-snug text-bmw-ink">
                        {m.name}
                      </h4>
                      <p className="mt-2 text-sm font-light text-bmw-body">
                        {m.meta}
                      </p>
                      <motion.button
                        type="button"
                        whileHover={{ x: 2 }}
                        className="mt-4 text-[13px] font-bold uppercase tracking-wide text-bmw-ink"
                      >
                        자세히 →
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="h-fit border border-bmw-hairline bg-bmw-canvas"
            >
              <div className="border-b border-bmw-hairline px-5 py-4">
                <h3 className="text-base font-bold text-bmw-body-strong">
                  최근 활동
                </h3>
                <p className="mt-1 text-xs font-light text-bmw-muted">
                  실시간 피드 (데모)
                </p>
              </div>
              <ul className="divide-y divide-bmw-hairline">
                {activity.map((row, i) => (
                  <motion.li
                    key={`${row.time}-${i}`}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.05 }}
                    className="px-5 py-4"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-normal tabular-nums text-bmw-muted">
                        {row.time}
                      </span>
                      <span className="rounded-none bg-bmw-surface-soft px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-bmw-ink">
                        {row.type}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-light leading-relaxed text-bmw-body">
                      {row.text}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </main>
      </div>
    </div>
  );
}
