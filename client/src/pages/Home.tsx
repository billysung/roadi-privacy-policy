// Design philosophy: 車庫晨光。以編輯式文件排版、道路標線與溫暖紙白，讓隱私政策清楚、可靠且適合手機閱讀。
import { useEffect, useState } from "react";
import { ArrowUpRight, CarFront, Check, ChevronRight, Mail, Menu, ShieldCheck, X } from "lucide-react";

const sections = [
  { id: "data", number: "01", label: "處理哪些資料" },
  { id: "account", number: "02", label: "不要求建立帳號" },
  { id: "not-collect", number: "03", label: "不主動收集的資料" },
  { id: "local", number: "04", label: "本機資料儲存" },
  { id: "export", number: "05", label: "匯出、匯入與分享" },
  { id: "notification", number: "06", label: "通知功能" },
  { id: "third-party", number: "07", label: "第三方軟體與服務" },
  { id: "sharing", number: "08", label: "資料分享與出售" },
  { id: "retention", number: "09", label: "資料保存與刪除" },
  { id: "security", number: "10", label: "資料安全" },
  { id: "children", number: "11", label: "兒童隱私" },
  { id: "changes", number: "12", label: "政策變更" },
  { id: "contact", number: "13", label: "聯絡我們" },
  { id: "scope", number: "14", label: "適用範圍" },
];

function BulletList({ items }: { items: string[] }) {
  return <ul className="policy-list">{items.map((item) => <li key={item}><span className="list-check"><Check size={13} strokeWidth={3} /></span><span>{item}</span></li>)}</ul>;
}

export default function Home() {
  const [active, setActive] = useState("data");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-18% 0px -70% 0px", threshold: [0.1, 0.35, 0.7] });
    sections.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Roadi 路迪首頁">
          <img src="/manus-storage/roadi-mark_5db22b61.png" alt="" className="brand-mark" />
          <span><strong>Roadi</strong><small>路迪｜車管家</small></span>
        </a>
        <div className="topbar-meta"><span className="status-dot" /> Privacy policy <span className="meta-divider" /> 2026.08 <a className="language-switch" href="/en">EN</a></div>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="開啟章節選單" aria-expanded={menuOpen}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> DOCUMENT / PRIVACY</div>
            <h1>把資料留在<br /><em>自己的車庫裡。</em></h1>
            <p className="hero-lede">Roadi 採用本機優先設計，讓車輛紀錄留在您的裝置，並清楚說明每一項資料如何被處理。</p>
            <div className="hero-details"><span>最後更新</span><strong>2026 年 8 月 26 日</strong><span className="detail-rule" /><span>適用平台</span><strong>Android App</strong></div>
          </div>
          <div className="hero-visual" aria-hidden="true"><img src="/manus-storage/roadi-policy-hero_8d71e61f.jpg" alt="" /><div className="hero-stamp">LOCAL<br /><span>FIRST</span></div><div className="road-mark" /></div>
        </section>

        <section className="intro-band"><div className="intro-icon"><ShieldCheck size={25} /></div><p><strong>我們重視您的隱私。</strong> 本政策說明 Roadi 如何處理您在使用本 App 時產生、輸入或使用的資料。主要車輛資料儲存在您的裝置本機，不要求建立使用者帳號，也不會主動上傳至由開發者營運的伺服器。</p><ArrowUpRight size={21} className="intro-arrow" /></section>

        <div className="policy-layout">
          <aside className={`section-nav ${menuOpen ? "is-open" : ""}`} aria-label="政策章節導覽">
            <div className="nav-kicker">ON THIS PAGE</div>
            <div className="nav-list">{sections.map((section) => <button key={section.id} className={active === section.id ? "active" : ""} onClick={() => jumpTo(section.id)}><span>{section.number}</span>{section.label}<ChevronRight size={14} /></button>)}</div>
            <div className="nav-note"><CarFront size={17} /><span>資料留在本機<br />是 Roadi 的預設。</span></div>
          </aside>

          <article className="policy-content">
            <div className="content-label"><span>ROADi / PRIVACY POLICY</span><span>REV. 01</span></div>
            <section className="policy-section" id="data"><div className="section-heading"><span>01</span><h2>Roadi 處理哪些資料？</h2></div><p>為提供車輛管理、加油紀錄、保養紀錄、費用統計及提醒等功能，您可以在 Roadi 中主動輸入或建立以下資料：</p><BulletList items={["車輛名稱或暱稱", "車牌／車號", "車輛類型", "購車日期", "購車時里程", "目前里程", "加油日期", "加油量", "加油金額", "加油站或店家名稱", "保養及維修紀錄", "自訂保養項目", "其他車輛支出", "備註", "其他由您主動輸入的車輛管理資訊"]} /><p>上述資料主要儲存在您的裝置本機資料庫中。Roadi 不會主動將上述車輛資料傳送至由開發者營運的伺服器。</p></section>
            <section className="policy-section" id="account"><div className="section-heading"><span>02</span><h2>Roadi 不要求建立使用者帳號</h2></div><p>Roadi 的主要功能不需要您建立帳號或登入。Roadi 不會要求您提供：</p><BulletList items={["使用者帳號", "密碼", "登入憑證", "個人社群帳號"]} /><p>因此，Roadi 也沒有由開發者管理的使用者帳號資料庫。</p></section>
            <section className="policy-section" id="not-collect"><div className="section-heading"><span>03</span><h2>Roadi 不主動收集的資料</h2></div><p>Roadi 不會為提供主要功能而主動收集以下資料：</p><BulletList items={["GPS 或精確位置資訊", "聯絡人", "相片或影片", "麥克風或錄音", "通話或簡訊", "健康資訊", "信用卡或付款資訊", "廣告識別碼", "使用者帳號或登入資訊"]} /><p>Roadi 也不使用 GPS 追蹤您的行駛位置。</p></section>
            <section className="policy-section" id="local"><div className="section-heading"><span>04</span><h2>本機資料儲存</h2></div><p>Roadi 使用裝置上的本機資料庫儲存您的車輛及相關紀錄。因此，您的主要車輛資料並不是儲存在 Roadi 的雲端伺服器中。</p><div className="callout"><strong>請注意資料備份</strong><p>如果您解除安裝 Roadi、清除 App 資料、重置裝置，或因裝置及作業系統因素導致本機資料被移除，尚未匯出或備份的資料可能會遺失。因此，我們建議您定期使用 Roadi 提供的匯出或備份功能保存重要資料。</p></div></section>
            <section className="policy-section" id="export"><div className="section-heading"><span>05</span><h2>資料匯出、匯入與分享</h2></div><p>Roadi 提供資料匯出及備份功能，包括 Excel 與 JSON 等格式。當您主動使用 Android 或其他作業系統提供的分享、儲存或雲端服務時，您選擇的第三方服務可能會接收到您主動分享的資料。</p><p>例如 Google Drive、電子郵件服務、即時通訊 App，以及其他檔案儲存或分享服務。這類資料傳輸是由您主動操作及選擇第三方服務所產生。第三方服務如何處理您主動提供的資料，請參閱該第三方服務自己的隱私權政策。</p></section>
            <section className="policy-section" id="notification"><div className="section-heading"><span>06</span><h2>通知功能</h2></div><p>Roadi 可以使用 Android 裝置的通知功能，提醒您即將到期或已到期的車輛保養項目。通知內容主要依據您在 Roadi 中建立的車輛及保養資料產生。Roadi 不會透過通知功能收集您的個人資料。您可以透過 Android 系統設定管理 Roadi 的通知權限。</p></section>
            <section className="policy-section" id="third-party"><div className="section-heading"><span>07</span><h2>第三方軟體與服務</h2></div><p>Roadi 使用必要的第三方軟體套件及平台元件，以支援 App 的執行、資料儲存、通知、檔案處理及其他必要功能。Roadi 不使用第三方廣告服務，也不會出售您的車輛資料或個人資料。如果未來 App 使用的第三方軟體或服務發生重大變更，可能需要相應更新本隱私權政策。</p></section>
            <section className="policy-section" id="sharing"><div className="section-heading"><span>08</span><h2>資料分享與出售</h2></div><p>Roadi 不會出售、出租或提供您的車輛資料給第三方作為廣告或行銷用途，也不會主動將您的車輛紀錄分享給其他公司或組織。當您主動使用匯出、分享、儲存或備份功能時，資料可能依照您的操作傳送至您所選擇的第三方服務。</p><p>該第三方服務對資料的處理方式，受其自身隱私權政策及服務條款所規範。</p></section>
            <section className="policy-section" id="retention"><div className="section-heading"><span>09</span><h2>資料保存與刪除</h2></div><p>Roadi 的車輛及相關紀錄主要儲存在您的裝置本機。您可以直接在 Roadi 中刪除車輛及相關紀錄。如果您希望移除 Roadi 儲存在裝置上的資料，可以使用 Android 系統提供的「清除 App 資料」功能或解除安裝 Roadi。</p><p>由於 Roadi 不使用使用者帳號，因此不存在由開發者管理的帳號及帳號刪除程序。開發者不會保留一份獨立的 Roadi 車輛資料副本。</p></section>
            <section className="policy-section" id="security"><div className="section-heading"><span>10</span><h2>資料安全</h2></div><p>Roadi 採用本機儲存設計，以降低車輛資料傳輸至外部伺服器的需求。然而，任何電子儲存方式都無法保證絕對安全。您應妥善保護自己的裝置、作業系統及匯出的資料，並建議定期備份重要資訊。</p><p>當您將 Roadi 匯出的資料交由第三方服務儲存或分享時，該資料的安全性及處理方式將受到該第三方服務的安全措施及隱私權政策所規範。</p></section>
            <section className="policy-section" id="children"><div className="section-heading"><span>11</span><h2>兒童隱私</h2></div><p>Roadi 並非專門針對兒童設計。Roadi 不會主動收集兒童的個人資料。</p></section>
            <section className="policy-section" id="changes"><div className="section-heading"><span>12</span><h2>隱私權政策的變更</h2></div><p>我們可能因 App 功能、資料處理方式、第三方服務或適用法律的變更而更新本隱私權政策。更新後的版本將發布於本頁面，並更新「最後更新日期」。如果發生重大變更，我們將在合理範圍內提供適當的通知。</p></section>
            <section className="policy-section contact-section" id="contact"><div className="section-heading"><span>13</span><h2>聯絡我們</h2></div><p>如果您對本隱私權政策、Roadi 的資料處理方式或您的隱私權有任何問題，歡迎與我們聯絡。</p><div className="contact-card"><div className="contact-card-icon"><Mail size={22} /></div><div><span>App</span><strong>Roadi路迪｜車管家</strong><span>Developer</span><strong>Billy Song</strong><a href="mailto:attila700@yahoo.com.tw">attila700@yahoo.com.tw <ArrowUpRight size={15} /></a></div></div></section>
            <section className="policy-section" id="scope"><div className="section-heading"><span>14</span><h2>適用範圍</h2></div><p>本隱私權政策適用於 Roadi路迪｜車管家 Android App。本政策不適用於您透過 Roadi 主動使用的第三方服務，例如 Google Drive、電子郵件、即時通訊或其他檔案分享及儲存服務。這些第三方服務受其各自的隱私權政策及服務條款所規範。</p></section>
            <footer className="policy-footer"><span>© 2026 Billy Song. All rights reserved.</span><span>ROADi / LOCAL-FIRST VEHICLE CARE</span></footer>
          </article>
        </div>
      </main>
      {showTop && <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="回到頁面頂端">↑</button>}
    </div>
  );
}
