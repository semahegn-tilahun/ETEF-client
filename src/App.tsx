import React, { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MembershipRegister from "./pages/MembershipRegister";
import Admin from "./admin/Admin";
import { api, API_ORIGIN } from "./api";
import AdminLogin from "./auth/AdminLogin";
import ProtectedAdmin from "./auth/ProtectedAdmin";

const nav = [
  ["/", "home"],
  ["/about", "about"],
  ["/membership", "membership"],
  ["/faq", "faq"],
  ["/gallery", "gallery"],
  ["/vacancies", "vacancies"],
  ["/contact", "contact"],
] as const;

function Brand() {
  return (
    <Link className="brand" to="/">
      <span className="brand-seal">ETEF</span>
      <span className="brand-copy">
        <strong>ETHIOPIAN TRANSPORT</strong>
        <small>EMPLOYERS' FEDERATION</small>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: "en" | "am") => {
    i18n.changeLanguage(language);
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Brand />

        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navigation ${open ? "open" : ""}`}>
          <div className="nav-links">
            {nav.map(([path, key]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                onClick={() => setOpen(false)}
              >
                {t(key)}
              </NavLink>
            ))}
          </div>

          <div className="language-switcher" aria-label={t("language")}>
            <button
              className={i18n.language === "am" ? "active" : ""}
              onClick={() => changeLanguage("am")}
            >
              አማ
            </button>
            <button
              className={i18n.language === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>

          <Link className="nav-cta" to="/membership" onClick={() => setOpen(false)}>
            {t("register")}
            <span>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-brand-block">
          <Brand />
          <p>
            A professional digital home for Ethiopia's transport employers,
            members and partners.
          </p>
        </div>

        <div className="footer-column">
          <h3>{t("explore")}</h3>
          <Link to="/about">{t("about")}</Link>
          <Link to="/membership">{t("membership")}</Link>
          <Link to="/gallery">{t("gallery")}</Link>
          <Link to="/vacancies">{t("vacancies")}</Link>
        </div>

        <div className="footer-column">
          <h3>{t("connect")}</h3>
          <a href="#" onClick={(e) => e.preventDefault()}>Facebook</a>
          <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Telegram</a>
          <a href="#" onClick={(e) => e.preventDefault()}>YouTube</a>
        </div>

        <div className="footer-column">
          <h3>{t("contact")}</h3>
          <p className="footer-label">{t("officialEmail")}</p>
          <p className="footer-pending">To be confirmed by ETEF</p>
          <Link to="/contact" className="footer-contact-link">{t("contact")} →</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ETEF. All rights reserved.</span>
        <span>Amharic · English</span>
      </div>
    </footer>
  );
}

function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Header />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`section-heading ${align === "center" ? "center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <section className="hero">
        <div className="hero-grid container">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-light">{t("heroEyebrow")}</span>
            <h1>{t("hero")}</h1>
            <p>{t("heroText")}</p>

            <div className="hero-actions">
              <Link className="button button-gold" to="/membership">
                {t("register")} <span>↗</span>
              </Link>
              <Link className="button button-outline-light" to="/about">
                {t("discover")} <span>→</span>
              </Link>
            </div>

            <div className="hero-note">
              <span className="hero-note-dot" />
              <span>{t("heroNote")}</span>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-ring ring-one" />
            <div className="hero-ring ring-two" />
            <div className="hero-glow" />
            <div className="hero-emblem">
              <span className="emblem-top">ETHIOPIAN</span>
              <strong>ETEF</strong>
              <span className="emblem-bottom">TRANSPORT EMPLOYERS' FEDERATION</span>
              <i />
            </div>
            <div className="floating-card floating-card-top">
              <span className="floating-label">MEMBERSHIP</span>
              <strong>Join the federation</strong>
              <span>Online registration</span>
            </div>
            <div className="floating-card floating-card-bottom">
              <span className="floating-label">ETHIOPIA</span>
              <strong>Transport employers</strong>
              <span>Connected through one voice</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="container stats-grid">
          <div><strong>01</strong><span>Unified representation</span></div>
          <div><strong>02</strong><span>Member-focused support</span></div>
          <div><strong>03</strong><span>Industry collaboration</span></div>
          <div><strong>04</strong><span>Digital access</span></div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container intro-grid">
          <div>
            <span className="section-index">01 / ABOUT</span>
            <SectionHeading
              eyebrow="ETEF"
              title="A clear digital gateway to the federation."
              text="The ETEF website brings institutional information, membership access, events, opportunities and official contact channels together in one trusted public platform."
            />
            <Link className="arrow-link" to="/about">Explore ETEF <span>↗</span></Link>
          </div>

          <div className="intro-visual">
            <div className="visual-line line-a" />
            <div className="visual-line line-b" />
            <div className="visual-number">ETEF</div>
            <div className="visual-caption">
              <span>ETHIOPIAN</span>
              <span>TRANSPORT</span>
              <span>EMPLOYERS'</span>
              <span>FEDERATION</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section principles-section">
        <div className="container">
          <div className="section-topline">
            <span className="section-index">02 / OUR DIRECTION</span>
            <span className="topline-copy">Vision & mission</span>
          </div>

          <div className="principles-grid">
            <article className="principle-card principle-featured">
              <span className="principle-tag">VISION</span>
              <h3>Seeing strong and representing voice in Ethiopian transport industry.</h3>
              <span className="principle-number">01</span>
            </article>

            <article className="principle-card">
              <span className="principle-tag">MISSION</span>
              <p>Safeguarding members' economic, legal, social and other rights and benefits while supporting their performance through training, education, legal support, technology and cooperation toward industrial peace.</p>
              <span className="principle-number">02</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section membership-section">
        <div className="container membership-panel">
          <div className="membership-copy">
            <span className="eyebrow">MEMBERSHIP</span>
            <h2>Make your organization part of the federation.</h2>
            <p>Access membership information and submit your registration through the official online application.</p>
            <Link className="button button-dark" to="/membership">Membership information <span>↗</span></Link>
          </div>
          <div className="membership-mark">
            <span>MEMBER</span>
            <strong>ETEF</strong>
            <span>CONNECTED · REPRESENTED · SUPPORTED</span>
          </div>
        </div>
      </section>

      <section className="section feature-section">
        <div className="container">
          <SectionHeading
            eyebrow="EXPLORE"
            title="Everything important, in one place."
            text="The public platform is intentionally focused on the information and services ETEF needs most."
          />

          <div className="feature-grid">
            <FeatureCard number="01" title={t("membership")} text="Membership information, requirements and online registration." to="/membership" />
            <FeatureCard number="02" title={t("gallery")} text="Event albums and approved photographs managed by ETEF." to="/gallery" />
            <FeatureCard number="03" title={t("vacancies")} text="Current job opportunities published by authorized administrators." to="/vacancies" />
            <FeatureCard number="04" title={t("faq")} text="Clear answers to common questions, updated by ETEF." to="/faq" />
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta-inner">
          <div>
            <span className="eyebrow eyebrow-light">OFFICIAL ETEF PLATFORM</span>
            <h2>One federation.<br />One trusted digital home.</h2>
          </div>
          <Link className="button button-gold" to="/contact">Connect with ETEF <span>↗</span></Link>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ number, title, text, to }: { number: string; title: string; text: string; to: string }) {
  return (
    <Link className="feature-card" to={to}>
      <div className="feature-card-top"><span>{number}</span><span>↗</span></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="feature-card-line" />
    </Link>
  );
}

function Page({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <section className="page">
      <div className="container narrow">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Page title="About ETEF" eyebrow="ABOUT ETEF">
      <p className="page-lead">The Ethiopian Transport Employers Federation is a premier apex organization dedicated to safeguarding the rights and benefits of its members within the transportation sector.</p>
      <div className="page-block"><span className="eyebrow">VISION</span><h2>Seeing strong and representing voice in Ethiopian transport industry.</h2></div>
      <div className="page-block"><span className="eyebrow">MISSION</span><p>ETEF will work to safeguard the economic, legal, social and other rights and benefits of its members and support their performance through training, education, legal support, current technologies and cooperation with local, international and social partners toward industrial peace.</p></div>
    </Page>
  );
}

function Membership() {
  return (
    <Page title="Membership" eyebrow="MEMBERSHIP">
      <p className="page-lead">Membership information and the official online registration process will be available here.</p>
      <div className="membership-page-grid">
        <div className="page-card"><span className="eyebrow">INFORMATION</span><h2>Membership access</h2><p>Learn about membership, requirements, benefits and the registration process.</p><ul><li>Membership information</li><li>Membership requirements</li><li>Online registration</li><li>Application review</li></ul></div>
        <div className="page-card page-card-dark"><span className="eyebrow eyebrow-light">ONLINE REGISTRATION</span><h2>Register your organization</h2><p>The full application form will be connected to the secure ETEF backend.</p><Link className="button button-gold" to="/membership/register">Start registration ↗</Link></div>
      </div>
    </Page>
  );
}

function FAQ() {
  const [items, setItems] = useState<{id:string;question_en:string;answer_en:string}[]>([]);
  useEffect(() => { api<{items:typeof items}>("/faqs").then(r => setItems(r.items)).catch(() => setItems([])); }, []);
  const fallback = [
    ["What is ETEF?", "The Ethiopian Transport Employers Federation is an apex organization representing transport employers and supporting the interests of its members."],
    ["How can an organization become a member?", "Organizations can submit an online membership application through the membership section."],
  ];
  const rows = items.length ? items.map(x => [x.question_en, x.answer_en]) : fallback;
  return (
    <Page title="Frequently asked questions" eyebrow="FAQ">
      <div className="faq-list">{rows.map(([question, answer], index) => (
        <FaqRow key={question} question={question} answer={answer} index={index} />
      ))}</div>
    </Page>
  );
}
function FaqRow({question,answer,index}:{question:string;answer:string;index:number}) {
  const [open,setOpen]=useState(index===0);
  return <button className={`faq-row ${open?"open":""}`} onClick={()=>setOpen(v=>!v)}><span><strong>{question}</strong>{open&&<p>{answer}</p>}</span><b>{open?"−":"+"}</b></button>;
}

function Gallery() {
  const [albums,setAlbums]=useState<{id:string;title_en:string;description_en?:string;event_date?:string;cover_image_url?:string;photos?:{id:string;image_url:string;title_en?:string}[]}[]>([]);
  useEffect(()=>{api<{items:typeof albums}>("/gallery/albums").then(r=>setAlbums(r.items)).catch(()=>setAlbums([]))},[]);
  return <Page title="ETEF event gallery" eyebrow="GALLERY">
    <p className="page-lead">Approved event albums published by ETEF will appear here.</p>
    {albums.length?<div className="gallery-grid">{albums.map((album,index)=><article className="album" key={album.id}>
      <div className={`album-image album-${(index%4)+1}`}>{album.cover_image_url?<img src={`${API_ORIGIN}${album.cover_image_url}`} alt={album.title_en}/>:(album.photos?.[0]?.image_url?<img src={`${API_ORIGIN}${album.photos[0].image_url}`} alt={album.title_en}/>:<span>ETEF</span>)}</div>
      <div className="album-meta"><span>EVENT ALBUM</span><h3>{album.title_en}</h3><b>{album.event_date||"ETEF event"}</b>{album.photos?.length?<div className="public-photo-strip">{album.photos.slice(0,4).map(p=><img key={p.id} src={`${API_ORIGIN}${p.image_url}`} alt=""/> )}</div>:null}</div>
    </article>)}</div>:<div className="empty-state"><span>ETEF</span><h2>No published albums yet</h2><p>Published gallery albums will automatically appear here.</p></div>}
  </Page>;
}

function Vacancies() {
  const [items,setItems]=useState<{id:string;title_en:string;description_en?:string;location?:string;employment_type?:string;closing_date?:string}[]>([]);
  useEffect(()=>{api<{items:typeof items}>("/vacancies").then(r=>setItems(r.items)).catch(()=>setItems([]))},[]);
  return <Page title="Job vacancies" eyebrow="CAREERS">
    <p className="page-lead">Current opportunities published by ETEF are displayed here.</p>
    {items.length?<div className="membership-page-grid">{items.map(v=><article className="page-card" key={v.id}><span className="eyebrow">OPEN POSITION</span><h2>{v.title_en}</h2><p>{v.description_en||"See the published position details and application instructions."}</p><p><strong>{v.location||"Ethiopia"}</strong>{v.employment_type?` · ${v.employment_type}`:""}{v.closing_date?` · Deadline ${v.closing_date}`:""}</p></article>)}</div>:<div className="empty-state"><span>ETEF</span><h2>No vacancies published yet</h2><p>Published vacancies will automatically appear on this page.</p></div>}
  </Page>;
}

function Contact() {
  const [settings,setSettings]=useState<Record<string,string>>({});
  useEffect(()=>{api<{settings:Record<string,string>}>("/settings").then(r=>setSettings(r.settings)).catch(()=>{})},[]);
  return <Page title="Connect with ETEF" eyebrow="CONTACT">
    <p className="page-lead">Official contact details and approved social-media links are managed through the ETEF administration system.</p>
    <div className="contact-grid">
      <div className="page-card"><span className="eyebrow">EMAIL</span><h2>Official organizational email</h2><p>{settings.organization_email||"To be confirmed by ETEF."}</p></div>
      <div className="page-card"><span className="eyebrow">SOCIAL</span><h2>ETEF online channels</h2><p>{[settings.facebook_url,settings.telegram_url,settings.linkedin_url,settings.youtube_url].filter(Boolean).join(" · ")||"Approved social links will be published here."}</p></div>
      <div className="page-card"><span className="eyebrow">OFFICE</span><h2>Office information</h2><p>Address and telephone details will be confirmed before production.</p></div>
    </div>
  </Page>;
}

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} /><Route element={<ProtectedAdmin />}><Route path="/admin" element={<Admin />} /></Route>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/membership/register" element={<MembershipRegister />} />
      </Route>
    </Routes>
  );
}

export default App;
