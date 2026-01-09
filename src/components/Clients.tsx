import { useEffect, useState, useCallback, useRef } from 'react';

type ClientItem = { src?: string; name: string };

const Clients = () => {
  useEffect(() => {
    document.title = 'Code Craft Pakistan';
  }, []);

  // Load client images from `src/Assets` (Vite). Include nested folders and use eager glob.
  const modules = import.meta.glob('../Assets/**/*.{png,jpg,jpeg,svg}', { eager: true }) as Record<
    string,
    { default: string }
  >;

  // Map found modules to entries and keep the base file name for sorting/filtering
  const allEntries = Object.entries(modules).map(([path, mod]) => {
    const file = path.split('/').pop() || path;
    const base = file.replace(/\.(png|jpg|jpeg|svg)$/i, '');
    const name = base.replace(/[-_]/g, ' ');
    return { src: mod.default, name, file: base } as ClientItem & { file: string };
  });

  // Prefer logos named `logo1`, `logo2`, ... if present (sorted numerically)
  const logoEntries = allEntries
    .filter((e) => /^logo\d+$/i.test(e.file))
    .sort((a, b) => {
      const na = parseInt((a.file.match(/^logo(\d+)/i) || [])[1] || '0', 10);
      const nb = parseInt((b.file.match(/^logo(\d+)/i) || [])[1] || '0', 10);
      return na - nb;
    })
    .map((e) => ({ src: e.src, name: e.name } as ClientItem));

  const entries = logoEntries.length ? logoEntries : allEntries.map((e) => ({ src: e.src, name: e.name } as ClientItem));

  const placeholders = new Array(6).fill(null).map((_, i) => ({ name: `Client ${i + 1}` } as ClientItem));
  const clients: ClientItem[] = entries.length ? entries : placeholders;

  const [selected, setSelected] = useState<ClientItem | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) close();
  };

  // Auto-scroll logos horizontally (pauses on hover/focus)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start scroller at the right-most position so movement appears right->left.
    el.scrollLeft = el.scrollWidth - el.clientWidth;

    let timer: number | null = null;

    const start = () => {
      if (timer !== null) return;
      timer = window.setInterval(() => {
        if (!el || paused) return;
        // scroll left by a small amount; when at the start, jump to end to loop
        if (el.scrollLeft <= 0) {
          el.scrollLeft = el.scrollWidth - el.clientWidth;
        } else {
          el.scrollLeft = Math.max(0, el.scrollLeft - 1);
        }
      }, 16);
    };

    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };

    if (!paused) start();

    return () => stop();
  }, [paused]);

  return (
    <section id="clients" className="py-20 bg-transparent">
      <div className="container mx-auto text-center px-4">
        <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-primary/80">⌜</span> Our Clients <span className="text-primary/80">⌝</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          We don't just build software we build long-term partnerships with clients across industries.
        </p>

        <div className="w-full py-6">
          <style>{`
            .clients-scroll::-webkit-scrollbar{display:none}
            .clients-scroll{ -ms-overflow-style:none; scrollbar-width:none }
            @keyframes floatLogo { 0%{ transform: translateY(0) } 50%{ transform: translateY(-6px) } 100%{ transform: translateY(0) } }
          `}</style>

          <div
            ref={scrollRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="clients-scroll flex gap-6 items-center overflow-x-auto overflow-y-hidden py-2 px-4 scroll-smooth snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
            aria-label="Client logos carousel"
          >
            {clients.map((c, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => c.src && setSelected(c)}
                className="snap-center flex-shrink-0 w-36 sm:w-40 lg:w-44 p-3 bg-card/60 rounded-lg shadow-sm transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label={`Open ${c.name}`}
              >
                {c.src ? (
                  <img
                    src={c.src}
                    alt={c.name}
                    className="mx-auto max-h-20 object-contain"
                    style={{ animation: 'floatLogo 6s ease-in-out infinite' }}
                  />
                ) : (
                  <div className="w-full h-20 bg-white/70 rounded border-2 border-dashed border-muted-foreground flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">{c.name}</span>
                  </div>
                )}
                {/* name removed from visible UI by design */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div
          ref={overlayRef}
          onClick={onOverlayClick}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
        >
          <div className="max-w-3xl w-full bg-background rounded-lg p-4 relative">
            <button
              onClick={close}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="flex flex-col items-center gap-4">
              {selected.src ? (
                <img src={selected.src} alt={selected.name} className="max-h-[60vh] object-contain" />
              ) : null}
              <div className="text-center">
                <h3 className="font-semibold text-lg">{selected.name}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Clients;
