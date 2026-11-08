import { useEffect, useRef, useState } from 'react'
import './App.css'
import { BRAND, FEATURES, NAV, PARTNERS, PLANS, SERVICES, STATS, SUPPORT } from './content.ts'

type IconName = 'tap' | 'shield' | 'badge' | 'logo' | 'menu' | 'close' | 'check' | 'arrow'

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  switch (name) {
    case 'tap':
      return (
        <svg {...common}>
          <rect x="6" y="2" width="12" height="20" rx="2.5" />
          <path d="M10 18h4" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" />
          <rect x="9" y="10" width="6" height="5" rx="1" />
          <path d="M10 10V8.5a2 2 0 0 1 4 0V10" />
        </svg>
      )
    case 'badge':
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="6" />
          <path d="m9.5 9 1.7 1.7L14.5 7.5" />
          <path d="M8.5 14 7 22l5-2.5 5 2.5-1.5-8" />
        </svg>
      )
    case 'logo':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
          <path d="M16 2 4 7v8c0 7.5 5.1 13.4 12 15 6.9-1.6 12-7.5 12-15V7z" fill="currentColor" />
          <path d="m10.5 16 4 4 7-8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12 4.5 4.5L19 7" />
        </svg>
      )
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )
  }
}

function Header({ onIssue }: { onIssue: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="brand" href="#top">
          <Icon name="logo" size={28} />
          <span>{BRAND} 인증서</span>
        </a>
        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="주 메뉴">
          {NAV.map((item) => (
            <a key={item} href="#top" onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
          <button
            className="btn btn--primary btn--sm nav__cta"
            onClick={() => {
              setOpen(false)
              onIssue()
            }}
          >
            발급하기
          </button>
        </nav>
        <button
          className="icon-btn header__toggle"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

function Hero({ onIssue }: { onIssue: () => void }) {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">금융부터 일상까지</p>
          <h1>
            어디서든 나를 증명하는
            <br />
            <strong>{BRAND} 인증서</strong>
          </h1>
          <p className="hero__lead">
            로그인, 전자서명, 본인확인까지. 앱 하나로 수십 개 사이트에서 같은 인증서를 써보세요.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary" onClick={onIssue}>
              발급하기
            </button>
            <a className="btn btn--ghost" href="#plans">
              제휴 신청하기
            </a>
          </div>
        </div>
        <div className="hero__visual" aria-hidden>
          <div className="phone">
            <div className="phone__notch" />
            <div className="phone__screen">
              <Icon name="logo" size={44} />
              <p className="phone__title">인증 요청</p>
              <p className="phone__sub">한빛시청 · 민원 신청</p>
              <div className="pin">
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i} className={i < 4 ? 'pin__dot pin__dot--on' : 'pin__dot'} />
                ))}
              </div>
              <div className="phone__ok">
                <Icon name="check" size={18} /> 인증 완료
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">왜 {BRAND}인가요?</h2>
        <div className="features">
          {FEATURES.map((f) => (
            <article key={f.title} className="card feature">
              <div className="feature__icon">
                <Icon name={f.icon} size={28} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0)
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    if (!run || reduced) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, run, reduced])
  return <>{(run && reduced ? to : n).toLocaleString('ko-KR')}</>
}

function Stats() {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section className="section section--tint" ref={ref}>
      <div className="container">
        <h2 className="section__title">숫자로 보는 {BRAND}</h2>
        <dl className="stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd>
                <CountUp to={s.value} run={seen} />
                <span>{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="note">* 데모용 가상 수치입니다.</p>
      </div>
    </section>
  )
}

function Partners() {
  const row = [...PARTNERS, ...PARTNERS]
  return (
    <section className="section section--tight">
      <div className="container">
        <h2 className="section__title section__title--sm">이런 곳에서 쓰고 있어요</h2>
      </div>
      <div className="marquee" aria-label="이용 기관 목록">
        <ul className="marquee__track">
          {row.map((p, i) => (
            <li key={i} aria-hidden={i >= PARTNERS.length}>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">하나의 인증서, 다섯 가지 서비스</h2>
        <ol className="services">
          {SERVICES.map((s, i) => (
            <li key={s.title} className="card service">
              <span className="service__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Plans({ onIssue }: { onIssue: () => void }) {
  return (
    <section className="section section--tint" id="plans">
      <div className="container">
        <h2 className="section__title">용도에 맞게 골라 쓰세요</h2>
        <div className="plans">
          {PLANS.map((p) => (
            <article key={p.title} className="card plan">
              <span className="plan__tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <ul>
                {p.items.map((it) => (
                  <li key={it}>
                    <Icon name="check" size={18} />
                    {it}
                  </li>
                ))}
              </ul>
              <button className="btn btn--outline" onClick={onIssue}>
                {p.cta} <Icon name="arrow" size={18} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Cta({ onIssue }: { onIssue: () => void }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta">
          <h2>{BRAND}를 만나볼 시간이에요</h2>
          <p>1분이면 발급 완료. 지금 바로 체험해 보세요.</p>
          <div className="hero__actions">
            <button className="btn btn--light" onClick={onIssue}>
              체험하기
            </button>
            <a className="btn btn--ghost-light" href="#plans">
              제휴 신청하기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <a className="brand brand--muted" href="#top">
            <Icon name="logo" size={22} />
            <span>{BRAND} 인증서</span>
          </a>
          <ul className="footer__links">
            <li>
              <a href="#top">개인정보 처리방침</a>
            </li>
            <li>
              <a href="#top">인증업무준칙</a>
            </li>
            <li>
              <a href="#top">Lite 인증업무준칙</a>
            </li>
          </ul>
        </div>
        <dl className="footer__support">
          {SUPPORT.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="container footer__copy">
        이 페이지는 CI/CD 실습용 데모이며, 실제 서비스·기관과 관련이 없습니다.
      </p>
    </footer>
  )
}

// 장식용 QR 모양 패턴 (실제로 스캔되는 코드가 아님)
function FakeQr() {
  const n = 25
  const cells: boolean[] = []
  let seed = 7
  for (let i = 0; i < n * n; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    cells.push(seed % 3 === 0)
  }
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= n - 8 && y < 8) || (x < 8 && y >= n - 8)
  const finder = (ox: number, oy: number) => (
    <g key={`${ox}-${oy}`}>
      <rect x={ox} y={oy} width="7" height="7" fill="currentColor" />
      <rect x={ox + 1} y={oy + 1} width="5" height="5" fill="var(--surface)" />
      <rect x={ox + 2} y={oy + 2} width="3" height="3" fill="currentColor" />
    </g>
  )
  return (
    <svg className="qr" viewBox={`-1 -1 ${n + 2} ${n + 2}`} role="img" aria-label="데모용 QR 이미지">
      {cells.map((on, i) => {
        const x = i % n
        const y = Math.floor(i / n)
        return on && !inFinder(x, y) ? <rect key={i} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
      })}
      {[finder(0, 0), finder(n - 7, 0), finder(0, n - 7)]}
    </svg>
  )
}

function QrModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      className="modal"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="qr-title"
    >
      <div className="modal__body">
        <button className="icon-btn modal__close" aria-label="닫기" onClick={onClose}>
          <Icon name="close" />
        </button>
        <h2 id="qr-title">스마트폰 카메라로 QR코드를 스캔해 주세요</h2>
        <p className="modal__sub">{BRAND} 앱에서 인증서 발급을 이어서 진행해요.</p>
        <FakeQr />
        <details className="modal__help">
          <summary>QR 스캔이 어렵다면?</summary>
          <p>앱 스토어에서 '{BRAND}'를 검색해 앱을 설치한 뒤, [인증서 발급] 메뉴를 눌러 주세요.</p>
        </details>
        <p className="note">* 데모 화면입니다. 실제 발급은 진행되지 않아요.</p>
      </div>
    </dialog>
  )
}

export default function App() {
  const [qrOpen, setQrOpen] = useState(false)
  const openQr = () => setQrOpen(true)
  return (
    <>
      <div className="demo-bar">데모 페이지 · 가상의 서비스입니다</div>
      <Header onIssue={openQr} />
      <main>
        <Hero onIssue={openQr} />
        <Features />
        <Stats />
        <Partners />
        <Services />
        <Plans onIssue={openQr} />
        <Cta onIssue={openQr} />
      </main>
      <Footer />
      <QrModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  )
}
