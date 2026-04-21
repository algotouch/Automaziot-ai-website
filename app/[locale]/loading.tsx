export default function LocaleLoading() {
  return (
    <div className="relative min-h-[60vh] bg-hero-light pb-24 pt-14 md:pt-20" aria-busy="true" aria-live="polite">
      {/* Top-of-page progress bar — purely visual */}
      <div className="fixed inset-x-0 top-0 z-50 h-[2px] overflow-hidden bg-transparent">
        <div
          className="h-full w-1/3 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700"
          style={{ animation: "route-progress 1.2s ease-in-out infinite" }}
        />
      </div>

      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            {/* Eyebrow chip */}
            <div className="h-7 w-64 animate-pulse rounded-full bg-white/70 ring-1 ring-inset ring-rule" />

            {/* Headline */}
            <div className="mt-7 space-y-4">
              <div className="h-12 w-full max-w-xl animate-pulse rounded-xl bg-white/70 ring-1 ring-inset ring-rule md:h-16" />
              <div className="h-12 w-full max-w-md animate-pulse rounded-xl bg-white/70 ring-1 ring-inset ring-rule md:h-16" />
            </div>

            {/* Paragraph */}
            <div className="mt-6 space-y-2">
              <div className="h-3 w-full max-w-lg animate-pulse rounded-full bg-ink-100" />
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-ink-100" />
              <div className="h-3 w-2/3 animate-pulse rounded-full bg-ink-100" />
            </div>

            {/* CTAs */}
            <div className="mt-9 flex gap-3">
              <div className="h-12 w-52 animate-pulse rounded-full bg-white/80 ring-1 ring-inset ring-rule" />
              <div className="h-12 w-60 animate-pulse rounded-full bg-white/80 ring-1 ring-inset ring-rule" />
            </div>
          </div>

          {/* Right column card */}
          <div className="lg:col-span-5">
            <div className="rounded-[28px] bg-white/80 p-5 shadow-soft ring-1 ring-inset ring-rule">
              <div className="flex items-center gap-3 border-b border-rule-soft pb-4">
                <div className="h-10 w-10 animate-pulse rounded-2xl bg-ink-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-ink-100" />
                  <div className="h-2 w-32 animate-pulse rounded-full bg-ink-100" />
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {[68, 82, 56, 74].map((w, i) => (
                  <div
                    key={i}
                    className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className="h-7 animate-pulse rounded-2xl bg-ink-100"
                      style={{ width: `${w}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 h-16 animate-pulse rounded-2xl bg-cream" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes route-progress {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(120%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
