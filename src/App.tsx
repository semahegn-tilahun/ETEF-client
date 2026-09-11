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
  ["/partners", "partners"],
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

      <PartnersPreview />

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

function PartnersPreview() {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<any[]>([]);
  const am = i18n.language.startsWith("am");
  useEffect(() => { api<{items:any[]}>("/partners").then(r => setItems(r.items.slice(0,8))).catch(() => setItems([])); }, []);
  if (!items.length) return null;
  return <section className="section partners-section"><div className="container"><div className="section-topline"><span className="section-index">03 / PARTNERS</span><span className="topline-copy">{am?"አጋሮች እና ስፖንሰሮች":"Partners & sponsors"}</span></div><div className="partners-heading"><div><span className="eyebrow">{am?"የETEF አጋሮች":"OUR PARTNERS"}</span><h2>{am?"ከETEF ጋር የሚሰሩ አጋሮችን ይወቁ":"Organizations working with and supporting ETEF."}</h2></div><Link className="arrow-link" to="/partners">{am?"ሁሉንም ይመልከቱ":"Explore all partners"} <span>↗</span></Link></div><div className="partners-grid">{items.map(x=><PartnerCard key={x.id} item={x} am={am}/>)}</div></div></section>;
}

function PartnerCard({item,am}:{item:any;am:boolean}) {
  const name=am?(item.name_am||item.name_en):(item.name_en||item.name_am);
  const label=item.category==="SPONSOR"?(am?"ስፖንሰር":"SPONSOR"):item.category==="BOTH"?(am?"አጋር · ስፖንሰር":"PARTNER · SPONSOR"):(am?"አጋር":"PARTNER");
  return <article className="partner-card">{item.logo_url?<img src={`${API_ORIGIN}${item.logo_url}`} alt={name}/> : <div className="partner-logo-fallback">{name?.slice(0,2).toUpperCase()}</div>}<div><span>{label}</span><h3>{name}</h3>{(am?item.description_am||item.description_en:item.description_en||item.description_am)&&<p>{am?(item.description_am||item.description_en):(item.description_en||item.description_am)}</p>}{item.website_url&&<a href={item.website_url} target="_blank" rel="noreferrer">{am?"ድረ-ገጽ":"Website"} ↗</a>}</div></article>;
}

function Partners() {
  const {i18n}=useTranslation(); const [items,setItems]=useState<any[]>([]); const am=i18n.language.startsWith("am");
  useEffect(()=>{api<{items:any[]}>("/partners").then(r=>setItems(r.items)).catch(()=>setItems([]))},[]);
  const sponsors=items.filter(x=>x.category==="SPONSOR"||x.category==="BOTH"); const partners=items.filter(x=>x.category==="PARTNER"||x.category==="BOTH");
  return <Page title={am?"የETEF አጋሮች እና ስፖንሰሮች":"Our partners & sponsors"} eyebrow="PARTNERS"><p className="page-lead">{am?"ETEFን ከሚደግፉ፣ ከሚተባበሩ እና አብረው ከሚሰሩ ድርጅቶች ጋር ይተዋወቁ።":"Meet the organizations that work with, collaborate with, and support ETEF."}</p>{partners.length>0&&<><span className="eyebrow">{am?"አጋሮች":"PARTNERS"}</span><div className="partners-page-grid">{partners.map(x=><PartnerCard key={`p-${x.id}`} item={x} am={am}/>)}</div></>}{sponsors.length>0&&<><span className="eyebrow partner-section-label">{am?"ስፖንሰሮች":"SPONSORS"}</span><div className="partners-page-grid">{sponsors.map(x=><PartnerCard key={`s-${x.id}`} item={x} am={am}/>)}</div></>}{!items.length&&<div className="empty-state"><span>ETEF</span><h2>{am?"አሁን የታተሙ አጋሮች የሉም":"No partners published yet"}</h2></div>}</Page>;
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

function usePublicContent(key:string){
  const {i18n}=useTranslation();
  const [item,setItem]=useState<any>(null);
  useEffect(()=>{api<{items:any[]}>("/content").then(r=>setItem(r.items.find(x=>x.content_key===key)||null)).catch(()=>setItem(null))},[key]);
  const am=i18n.language.startsWith("am");
  return {item,title:am?(item?.title_am||item?.title_en):(item?.title_en||item?.title_am),body:am?(item?.body_am||item?.body_en):(item?.body_en||item?.body_am),am};
}

function PublicState({children}:{children:ReactNode}){return <>{children}</>}

function About() {
  const about=usePublicContent("about");const vision=usePublicContent("vision");const mission=usePublicContent("mission");
  return <Page title={about.title||"About ETEF"} eyebrow="ABOUT ETEF"><p className="page-lead">{about.body||"The Ethiopian Transport Employers Federation is a premier apex organization dedicated to safeguarding the rights and benefits of its members within the transportation sector."}</p><div className="page-block"><span className="eyebrow">{vision.title||"Vision"}</span><h2>{vision.body||"Seeing strong and representing voice in Ethiopian transport industry."}</h2></div><div className="page-block"><span className="eyebrow">{mission.title||"Mission"}</span><p>{mission.body||"ETEF works to safeguard the rights and benefits of its members and support their performance toward industrial peace."}</p></div></Page>;
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
  const {i18n}=useTranslation();const [items,setItems]=useState<any[]>([]);const [open,setOpen]=useState<number|null>(0);const am=i18n.language.startsWith("am");
  useEffect(()=>{api<{items:any[]}>("/faqs").then(r=>setItems(r.items)).catch(()=>setItems([]))},[]);
  return <Page title={am?"ተደጋጋሚ ጥያቄዎች":"Frequently asked questions"} eyebrow="FAQ"><div className="faq-list">{items.map((x,index)=>{const q=am?(x.question_am||x.question_en):(x.question_en||x.question_am);const a=am?(x.answer_am||x.answer_en):(x.answer_en||x.answer_am);return <button className={`faq-row ${open===index?"open":""}`} key={x.id} onClick={()=>setOpen(open===index?null:index)}><span><strong>{q}</strong>{open===index&&<p>{a}</p>}</span><b>{open===index?"−":"+"}</b></button>})}{!items.length&&<div className="empty-state"><span>ETEF</span><h2>{am?"ጥያቄዎች እስካሁን አልታተሙም":"No FAQs published yet"}</h2><p>{am?"የተፈቀዱ ጥያቄዎች እዚህ ይታያሉ።":"Approved FAQ entries will appear here."}</p></div>}</div></Page>;
}
function FaqRow({question,answer,index}:{question:string;answer:string;index:number}) {
  const [open,setOpen]=useState(index===0);
  return <button className={`faq-row ${open?"open":""}`} onClick={()=>setOpen(v=>!v)}><span><strong>{question}</strong>{open&&<p>{answer}</p>}</span><b>{open?"−":"+"}</b></button>;
}

function Gallery() {
  const {i18n}=useTranslation();const [albums,setAlbums]=useState<any[]>([]);const am=i18n.language.startsWith("am");
  useEffect(()=>{api<{items:any[]}>("/gallery/albums").then(r=>setAlbums(r.items)).catch(()=>setAlbums([]))},[]);
  return <Page title={am?"የETEF ዝግጅቶች የፎቶ ማዕከል":"ETEF event gallery"} eyebrow="GALLERY"><p className="page-lead">{am?"የተፈቀዱ የዝግጅት ፎቶዎች እዚህ ይታያሉ።":"Approved event photographs and albums are published here."}</p><div className="gallery-grid">{albums.map((album:any,index:number)=><article className="album" key={album.id}><div className={`album-image album-${(index%4)+1}`}>{album.cover_image_url?<img src={`${API_ORIGIN}${album.cover_image_url}`} alt=""/>:<span>ETEF</span>}</div><div className="album-meta"><span>EVENT ALBUM</span><h3>{am?(album.title_am||album.title_en):(album.title_en||album.title_am)}</h3>{(am?album.description_am||album.description_en:album.description_en||album.description_am)&&<p>{am?(album.description_am||album.description_en):(album.description_en||album.description_am)}</p>}<b>{am?"ይመልከቱ →":"View album →"}</b></div></article>)}{!albums.length&&<div className="empty-state"><span>ETEF</span><h2>{am?"የፎቶ አልበሞች የሉም":"No gallery albums published yet"}</h2></div>}</div></Page>;
}
function Vacancies() {
  const {i18n}=useTranslation();const [items,setItems]=useState<any[]>([]);const am=i18n.language.startsWith("am");
  useEffect(()=>{api<{items:any[]}>("/vacancies").then(r=>setItems(r.items)).catch(()=>setItems([]))},[]);
  return <Page title={am?"የሥራ ዕድሎች":"Job vacancies"} eyebrow="CAREERS"><p className="page-lead">{am?"በETEF የታተሙ የሥራ ዕድሎች።":"Current opportunities published by ETEF."}</p>{items.length?<div className="vacancy-list">{items.map(x=><article className="page-card" key={x.id}><span className="eyebrow">{x.employment_type||"OPPORTUNITY"}</span><h2>{am?(x.title_am||x.title_en):(x.title_en||x.title_am)}</h2><p>{x.location||""}{x.closing_date?` · ${am?"የመጨረሻ ቀን":"Deadline"}: ${new Date(x.closing_date).toLocaleDateString()}`:""}</p>{(am?x.description_am||x.description_en:x.description_en||x.description_am)&&<p>{am?(x.description_am||x.description_en):(x.description_en||x.description_am)}</p>} {(am?x.requirements_am||x.requirements_en:x.requirements_en||x.requirements_am)&&<div className="page-block"><span className="eyebrow">{am?"መስፈርቶች":"REQUIREMENTS"}</span><p>{am?(x.requirements_am||x.requirements_en):(x.requirements_en||x.requirements_am)}</p></div>}</article>)}</div>:<div className="empty-state"><span>ETEF</span><h2>{am?"አሁን የታተመ የሥራ ዕድል የለም":"No vacancies published yet"}</h2><p>{am?"የታተሙ የሥራ ዕድሎች እዚህ ይታያሉ።":"Published vacancies will automatically appear here."}</p></div>}</Page>;
}
function Contact() {
  const {i18n}=useTranslation();const [settings,setSettings]=useState<Record<string,string>>({});const am=i18n.language.startsWith("am");
  useEffect(()=>{api<{settings:Record<string,string>}>("/settings").then(r=>setSettings(r.settings)).catch(()=>setSettings({}))},[]);
  const links=[['facebook_url','Facebook'],['linkedin_url','LinkedIn'],['telegram_url','Telegram'],['youtube_url','YouTube']].filter(([k])=>settings[k]);
  return <Page title={am?"ETEFን ያግኙ":"Connect with ETEF"} eyebrow="CONTACT"><p className="page-lead">{am?"የተረጋገጠ የETEF የግንኙነት መረጃ።":"Official ETEF contact information and approved social channels."}</p><div className="contact-grid"><div className="page-card"><span className="eyebrow">{am?"ኢሜይል":"EMAIL"}</span><h2>{settings.organization_email||"—"}</h2>{settings.organization_email&&<a className="button button-gold" href={`mailto:${settings.organization_email}`}>{am?"ኢሜይል ይላኩ":"Send email"} ↗</a>}</div><div className="page-card"><span className="eyebrow">{am?"ማህበራዊ ሚዲያ":"SOCIAL"}</span><h2>{links.length?links.map(([k,label])=><a key={k} href={settings[k]} target="_blank" rel="noreferrer" style={{display:"block",margin:".4rem 0"}}>{label} ↗</a>):"—"}</h2></div><div className="page-card"><span className="eyebrow">{am?"መስሪያ ቤት":"OFFICE"}</span><h2>{am?"የቢሮ መረጃ":"Office information"}</h2><p>{am?"የቢሮ አድራሻና ስልክ መረጃ በአስተዳደር ፖርታሉ ይዘምናል።":"Office address and telephone details can be maintained by the administrator."}</p></div></div></Page>;
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
        <Route path="/partners" element={<Partners />} />
        <Route path="/membership/register" element={<MembershipRegister />} />
      </Route>
    </Routes>
  );
}

export default App;
