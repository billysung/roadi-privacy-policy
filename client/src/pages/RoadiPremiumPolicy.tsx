// Design philosophy: 車庫晨光。Roadi Premium 政策頁延續溫暖紙白、深墨綠、Safety Orange 與清楚的車庫文件閱讀系統。
import { useEffect, useMemo } from "react";
import { ArrowUpRight, CarFront, Check, ChevronRight, Mail, ShieldCheck } from "lucide-react";
import { roadiPremiumPolicies, roadiPremiumTitles } from "@/data/roadi-premium-policies";

type Language = keyof typeof roadiPremiumPolicies;
const SITE_BASE = import.meta.env.BASE_URL;
const ASSET_BASE = "https://roadiprivacy-aekum4hy.manus.space/manus-storage/";
const languages: Array<{ code: Language; label: string; path: string }> = [
  { code: "zh", label: "中文", path: "" },
  { code: "en", label: "EN", path: "en" },
  { code: "vi", label: "VI", path: "vi" },
  { code: "th", label: "TH", path: "th" },
  { code: "ms", label: "MS", path: "ms" },
  { code: "id", label: "ID", path: "id" },
];
const navNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];

function parseSections(markdown: string) {
  const blocks = markdown.split(/(?=^##\s+\d+\.)/gm).filter((block) => /^##\s+\d+\./m.test(block));
  return blocks.map((block) => {
    const lines = block.trim().split("\n");
    const title = lines.shift()?.replace(/^##\s+/, "") ?? "";
    const paragraphs: string[] = [];
    const bullets: string[] = [];
    let paragraph = "";
    const flush = () => { if (paragraph.trim()) paragraphs.push(paragraph.trim()); paragraph = ""; };
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line === "---") { flush(); continue; }
      if (/^(•|-|\*)\s+/.test(line)) { flush(); bullets.push(line.replace(/^(•|-|\*)\s+/, "")); continue; }
      if (/^\*\*.+\*\*$/.test(line)) { flush(); paragraphs.push(line.replace(/^\*\*|\*\*$/g, "")); continue; }
      paragraph = paragraph ? `${paragraph} ${line}` : line;
    }
    flush();
    return { title, paragraphs, bullets };
  });
}

function LinkifiedText({ text }: { text: string }) {
  const email = "attila700@yahoo.com.tw";
  if (!text.includes(email)) return <>{text}</>;
  const [before, after] = text.split(email);
  return <>{before}<a href={`mailto:${email}`}>{email}</a>{after}</>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="policy-list">{items.map((item) => <li key={item}><span className="list-check"><Check size={13} strokeWidth={3} /></span><span><LinkifiedText text={item} /></span></li>)}</ul>;
}

export default function RoadiPremiumPolicy({ language }: { language: Language }) {
  const markdown = roadiPremiumPolicies[language];
  const sections = useMemo(() => parseSections(markdown), [markdown]);
  const title = roadiPremiumTitles[language];
  const isChinese = language === "zh";
  const summary = {
    zh: "Roadi Premium 採用本機優先設計，讓主要車輛資料留在您的裝置，並清楚說明資料如何被處理。",
    en: "Roadi Premium follows a Local-First approach, keeping primary vehicle data on your device and explaining how information is handled.",
    vi: "Roadi Premium áp dụng thiết kế Local-First, lưu dữ liệu xe chủ yếu trên thiết bị của bạn và giải thích rõ cách xử lý thông tin.",
    th: "Roadi Premium ใช้แนวคิด Local-First โดยจัดเก็บข้อมูลรถหลักไว้บนอุปกรณ์ของคุณ และอธิบายวิธีจัดการข้อมูลอย่างชัดเจน",
    ms: "Roadi Premium menggunakan pendekatan Local-First, menyimpan data kenderaan utama pada peranti anda dan menerangkan cara maklumat dikendalikan.",
    id: "Roadi Premium menggunakan pendekatan Local-First, menyimpan data kendaraan utama di perangkat Anda dan menjelaskan cara informasi ditangani.",
  }[language];
  const navLabel = { zh: "本頁索引", en: "ON THIS PAGE", vi: "TRÊN TRANG NÀY", th: "ในหน้านี้", ms: "DALAM HALAMAN INI", id: "DI HALAMAN INI" }[language];
  const updatedLabel = { zh: "最後更新", en: "Last updated", vi: "Cập nhật lần cuối", th: "อัปเดตล่าสุด", ms: "Kemas kini terakhir", id: "Terakhir diperbarui" }[language];
  const updated = { zh: "2026 年 8 月 29 日", en: "August 29, 2026", vi: "29 tháng 8 năm 2026", th: "29 สิงหาคม 2026", ms: "29 Ogos 2026", id: "29 Agustus 2026" }[language];
  const activePath = languages.find((item) => item.code === language)?.path ?? "";
  useEffect(() => { document.title = title; }, [title]);
  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return <div className="site-shell">
    <header className="topbar"><a className="brand" href={`${SITE_BASE}`} aria-label="Roadi home"><img src={`${ASSET_BASE}roadi-mark_5db22b61.png`} alt="" className="brand-mark" /><span><strong>Roadi</strong><small>Vehicle Companion</small></span></a><div className="topbar-meta"><span className="status-dot" /> PRIVACY POLICY <span className="meta-divider" /> 2026.08 <span className="language-links">{languages.map((item) => <a key={item.code} href={`${SITE_BASE}${item.path ? `${item.path}/` : ""}`} className={item.code === language ? "active" : ""}>{item.label}</a>)}</span></div></header>
    <main id="top"><section className="hero-section"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> DOCUMENT / PRIVACY</div><h1>{title}</h1><p className="hero-lede">{summary}</p><div className="hero-details"><span>{updatedLabel}</span><strong>{updated}</strong><span className="detail-rule" /><span>Platform</span><strong>Android App</strong></div></div><div className="hero-visual" aria-hidden="true"><img src={`${ASSET_BASE}roadi-policy-hero_8d71e61f.jpg`} alt="" /><div className="hero-stamp">LOCAL<br /><span>FIRST</span></div><div className="road-mark" /></div></section>
      <section className="intro-band"><div className="intro-icon"><ShieldCheck size={25} /></div><p><strong>{isChinese ? "我們重視您的隱私。" : title}</strong> {sections[0]?.paragraphs[0] ?? summary}</p><ArrowUpRight size={21} className="intro-arrow" /></section>
      <div className="policy-layout"><aside className="section-nav" aria-label={navLabel}><div className="nav-kicker">{navLabel}</div><div className="nav-list">{sections.map((section, index) => <button key={section.title} onClick={() => jumpTo(`premium-section-${index}`)}><span>{navNumbers[index] ?? String(index + 1).padStart(2, "0")}</span>{section.title.replace(/^\d+\.\s*/, "")}<ChevronRight size={14} /></button>)}</div><div className="nav-note"><CarFront size={17} /><span>{summary}</span></div></aside>
        <article className="policy-content"><div className="content-label"><span>ROADi PREMIUM / PRIVACY POLICY</span><span>REV. 02 / {language.toUpperCase()}</span></div>{sections.map((section, index) => <section className="policy-section" id={`premium-section-${index}`} key={section.title}><div className="section-heading"><span>{navNumbers[index] ?? String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2></div>{section.paragraphs.map((paragraph) => <p key={paragraph}><LinkifiedText text={paragraph} /></p>)}{section.bullets.length > 0 && <BulletList items={section.bullets} />}{section.title.includes("聯絡") || section.title.toLowerCase().includes("contact") || section.title.includes("Liên hệ") || section.title.includes("ติดต่อ") || section.title.includes("Hubungi") ? <div className="contact-card"><div className="contact-card-icon"><Mail size={22} /></div><div><span>App</span><strong>Roadi Premium｜Vehicle Companion</strong><span>Developer</span><strong>Billy Song</strong><a href="mailto:attila700@yahoo.com.tw">attila700@yahoo.com.tw <ArrowUpRight size={15} /></a></div></div> : null}</section>)}<footer className="policy-footer"><span>© 2026 Billy Song. All rights reserved.</span><span>ROADi PREMIUM / LOCAL-FIRST VEHICLE CARE</span></footer></article></div></main>
  </div>;
}
