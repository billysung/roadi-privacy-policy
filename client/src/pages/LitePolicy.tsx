// Design philosophy: 車庫晨光。沿用 Roadi 的編輯式文件排版、道路標線與溫暖紙白，為 Lite 版本提供清楚、可靠、適合手機閱讀的雙語政策頁面。
import { ArrowUpRight, CarFront, Check, ChevronRight, Mail, ShieldCheck } from "lucide-react";

type Language = "zh" | "en";

type Section = {
  id: string;
  number: string;
  title: string;
  intro: string;
  items?: string[];
  body?: string[];
  note?: { title: string; body: string };
};

const content = {
  zh: {
    languageLabel: "EN",
    languageHref: "en/",
    brand: "Roadi Lite",
    subbrand: "輕量車輛管理",
    eyebrow: "DOCUMENT / LITE PRIVACY",
    headline: <>把愛車紀錄<br /><em>留在自己的車庫裡。</em></>,
    lede: "Roadi Lite 以本機優先設計，提供簡單清楚的車輛、加油、保養與花費紀錄。",
    updatedLabel: "最後更新",
    updated: "2026 年 8 月 29 日",
    platformLabel: "適用平台",
    platform: "Android App",
    intro: <><strong>Roadi Lite 重視您的隱私。</strong> 本政策說明您使用 Roadi Lite 時，我們如何處理相關資訊。主要資料儲存在您的裝置本機，核心功能不需要帳號或雲端同步。</>,
    navKicker: "ON THIS PAGE",
    navNote: <>資料留在本機<br />是 Lite 的預設。</>,
    contentLabel: "ROADi LITE / PRIVACY POLICY",
    backLabel: "Roadi 隱私政策",
    sections: [
      { id: "data", number: "01", title: "我們收集的資訊", intro: "Roadi Lite 不要求您建立帳號，也不要求您提供姓名、電子郵件地址、電話號碼、密碼等個人資訊。您在 Roadi Lite 中輸入的車輛資料、加油紀錄、保養紀錄、花費紀錄及其他資訊，主要儲存在您的裝置本機。使用核心功能不需要雲端同步。" },
      { id: "vehicle", number: "02", title: "車輛與使用資料", intro: "您可以在 Roadi Lite 中輸入以下資訊：", items: ["車輛名稱", "車牌號碼", "里程數", "加油量與加油金額", "加油紀錄與計算出的油耗", "保養紀錄", "自訂保養項目", "其他車輛花費與自訂花費分類", "備註及您自行輸入的其他資訊"], body: ["這些資訊用於提供車輛紀錄、油耗計算、統計及相關功能。Roadi Lite 不會利用這些資訊直接識別您的個人身分。"] },
      { id: "local", number: "03", title: "本機資料儲存", intro: "Roadi Lite 的設計以裝置本機儲存為主，您的車輛紀錄會儲存在裝置上的 App 本機資料中。由於資料儲存在裝置本機，刪除 App、清除 App 資料、更換裝置或失去裝置存取權限，都可能導致本機儲存的資料遺失。Roadi Lite 不提供雲端備份或帳號同步功能。" },
      { id: "fuel", number: "04", title: "油耗與統計", intro: "Roadi Lite 會根據您輸入的資料計算並顯示油耗及相關統計資訊，也可以根據歷史加油紀錄顯示油耗趨勢。Roadi Lite 不提供 Premium 版本的智慧油耗驟降偵測、連續油耗下降分析，以及根據油耗分析產生的保養建議。" },
      { id: "maintenance", number: "05", title: "保養紀錄", intro: "Roadi Lite 可以讓您自行記錄及管理車輛保養資訊。Roadi Lite 不提供自動保養提醒或保養通知排程功能。即使 Lite 版本沒有保養提醒功能，您自行建立的保養紀錄仍會保留在本機資料中，不會因提醒功能未提供而被刪除。" },
      { id: "excel", number: "06", title: "Excel 匯出", intro: "Roadi Lite 提供 Excel 匯出功能，讓您可以主動將車輛紀錄匯出成 Excel 檔案。匯出操作由您主動執行。Roadi Lite 不會自動將匯出的檔案上傳至我們的伺服器。匯出後的 Excel 檔案由您自行管理，您可以透過裝置上的其他 App 或服務儲存或分享。這些第三方 App 或服務可能有各自的隱私權政策。" },
      { id: "json", number: "07", title: "JSON 備份與還原", intro: "Roadi Lite 不提供 JSON 資料庫備份與還原功能。" },
      { id: "location", number: "08", title: "位置資訊", intro: "Roadi Lite 的核心車輛紀錄功能不需要 GPS 或精確位置資訊。如果您在車輛紀錄中自行輸入地點或維修地點，該資訊視為您主動提供的資料，並與您的紀錄一同儲存在本機。" },
      { id: "notifications", number: "09", title: "通知", intro: "Roadi Lite 不提供自動保養提醒通知。因此，Lite 版本不需要建立保養提醒通知排程。" },
      { id: "third-party", number: "10", title: "第三方服務", intro: "Roadi Lite 的設計以裝置本機儲存為主，其核心車輛紀錄功能不需要帳號、雲端同步或我們自己的後端伺服器。如果 App 或其發行平台使用 Google Play 服務、作業系統服務或其他第三方元件，這些服務可能依其各自的隱私權政策處理有限的技術資訊。Roadi 不會販售您的車輛紀錄或個人資訊。" },
      { id: "sharing", number: "11", title: "資料分享與販售", intro: "Roadi Lite 不會販售您的車輛紀錄或個人資訊，也不會刻意將您輸入的車輛資訊分享給廣告商或其他第三方。如果 App 的運作、發行平台、裝置作業系統，或您主動使用的資料匯出／分享服務需要處理相關資訊，該資訊可能由相應的第三方服務依其隱私權政策處理。" },
      { id: "children", number: "12", title: "兒童隱私", intro: "Roadi Lite 並非特別針對兒童設計。我們不會透過本 App 明知故意收集兒童的個人資訊。" },
      { id: "security", number: "13", title: "資料安全", intro: "由於您的車輛資料主要儲存在裝置本機，因此裝置及其作業系統的安全性也十分重要。我們建議您使用適當的裝置安全措施，例如螢幕鎖定、保持系統更新，以及裝置製造商提供的其他安全功能。" },
      { id: "control", number: "14", title: "您對資料的控制", intro: "您可以控制自己輸入 Roadi Lite 的資料。您可以透過 App 提供的功能編輯或刪除車輛、加油、保養及花費紀錄。由於 Roadi Lite 不提供雲端同步或 JSON 備份／還原功能，如果您希望保護本機資料，建議您使用裝置本身提供的備份功能。" },
      { id: "changes", number: "15", title: "隱私權政策變更", intro: "我們可能會不定期更新本隱私權政策，以反映 Roadi Lite 的功能、適用法律或隱私權處理方式的變更。如果政策有所變更，我們會更新本頁內容及「最後更新日期」。" },
      { id: "contact", number: "16", title: "聯絡我們", intro: "如果您對本隱私權政策或 Roadi Lite 的隱私權處理方式有任何疑問，請透過 Roadi Lite 官方 App 商店頁面或網站所提供的聯絡方式與我們聯絡。" },
    ] as Section[],
    footer: "ROADi LITE / LOCAL-FIRST VEHICLE CARE",
    contactAppLabel: "App",
    developerLabel: "Developer",
    developer: "Billy Song",
    appName: "Roadi Lite",
    mail: "attila700@yahoo.com.tw",
  },
  en: {
    languageLabel: "中文",
    languageHref: "../lite/",
    brand: "Roadi Lite",
    subbrand: "Lightweight vehicle care",
    eyebrow: "DOCUMENT / LITE PRIVACY",
    headline: <>Keep your car records<br /><em>in your own garage.</em></>,
    lede: "Roadi Lite is local-first by design, giving you a simple way to manage vehicle, fuel, maintenance, and expense records.",
    updatedLabel: "Last updated",
    updated: "August 29, 2026",
    platformLabel: "Platform",
    platform: "Android App",
    intro: <><strong>Roadi Lite respects your privacy.</strong> This Privacy Policy explains how we handle information when you use Roadi Lite. Your primary records are stored locally on your device, and core features do not require an account or cloud synchronization.</>,
    navKicker: "ON THIS PAGE",
    navNote: <>Your records stay local<br />by default in Lite.</>,
    contentLabel: "ROADi LITE / PRIVACY POLICY",
    backLabel: "Roadi Privacy Policy",
    sections: [
      { id: "data", number: "01", title: "Information We Collect", intro: "Roadi Lite does not require you to create an account or provide personal information such as your name, email address, phone number, or password. Vehicle information, fuel records, maintenance records, expense records, and other information that you enter into Roadi Lite are stored locally on your device. Roadi Lite does not require cloud synchronization to use these features." },
      { id: "vehicle", number: "02", title: "Vehicle and Usage Data", intro: "You may enter information such as:", items: ["Vehicle name", "License plate number", "Odometer readings", "Fuel amount and fuel cost", "Fuel records and calculated fuel economy", "Maintenance records", "Custom maintenance items", "Other vehicle expenses and custom expense categories", "Notes and other information you choose to enter"], body: ["This information is used to provide the application's vehicle record, fuel calculation, statistics, and related features. Roadi Lite does not use this information to identify you personally."] },
      { id: "local", number: "03", title: "Local Storage", intro: "Roadi Lite is designed to store your vehicle records locally on your device using local application storage. Because these records are stored locally, deleting the application, clearing application data, changing devices, or losing access to the device may result in the loss of locally stored information. Roadi Lite does not provide cloud backup or account-based synchronization." },
      { id: "fuel", number: "04", title: "Fuel Economy and Statistics", intro: "Roadi Lite calculates and displays fuel economy and related statistics based on the information you enter. Roadi Lite may display fuel economy trends based on your historical fuel records. Roadi Lite does not provide the Premium smart fuel-drop detection, continuous fuel-decline analysis, or maintenance recommendations based on fuel economy." },
      { id: "maintenance", number: "05", title: "Maintenance Records", intro: "Roadi Lite allows you to record and manage maintenance information. Roadi Lite does not provide automatic maintenance reminders or maintenance notification scheduling. Your maintenance records remain stored locally and are not deleted simply because reminder features are unavailable in the Lite version." },
      { id: "excel", number: "06", title: "Excel Export", intro: "Roadi Lite allows you to voluntarily export your vehicle records to an Excel file. The export is initiated by you. Roadi Lite does not automatically upload exported files to our servers. Once exported, the Excel file is under your control and may be stored or shared using other applications or services on your device. Those third-party applications or services may have their own privacy policies." },
      { id: "json", number: "07", title: "JSON Backup and Restore", intro: "Roadi Lite does not provide JSON database backup or restore functionality." },
      { id: "location", number: "08", title: "Location Information", intro: "Roadi Lite does not require GPS or precise location information to provide its core vehicle-recording features. If you manually enter a location or service location as part of a vehicle record, that information is treated as information you voluntarily provide and is stored locally with your records." },
      { id: "notifications", number: "09", title: "Notifications", intro: "Roadi Lite does not provide automatic maintenance reminder notifications. Accordingly, Roadi Lite does not need to schedule maintenance reminder notifications in the Lite version." },
      { id: "third-party", number: "10", title: "Third-Party Services", intro: "Roadi Lite is designed to operate using local device storage and does not require an account, cloud synchronization, or our own backend server for its core vehicle-recording functions. If the application or its distribution platform uses third-party services such as Google Play services, operating-system services, or other third-party components, those services may process limited technical information according to their own privacy policies. Roadi does not sell your vehicle records or personal information." },
      { id: "sharing", number: "11", title: "Data Sharing and Sale", intro: "Roadi Lite does not sell your vehicle records or personal information. Roadi Lite does not intentionally share the vehicle information you enter with advertisers or other third parties. Information may be processed by third-party services when required for the operation of the application, distribution platform, device operating system, or services you voluntarily use to export or share your data." },
      { id: "children", number: "12", title: "Children's Privacy", intro: "Roadi Lite is not specifically directed to children. We do not knowingly collect personal information from children through the application." },
      { id: "security", number: "13", title: "Data Security", intro: "Because your vehicle records are primarily stored locally on your device, the security of the device and its operating system is also important. We recommend using appropriate device security measures, such as a screen lock, system updates, and other security features provided by your device manufacturer." },
      { id: "control", number: "14", title: "Your Control Over Your Data", intro: "You control the information you enter into Roadi Lite. You can edit or delete vehicle, fuel, maintenance, and expense records using the application's available functions. Because Roadi Lite does not provide cloud synchronization or JSON backup/restore, you should consider your own device backup options if you want to protect locally stored data." },
      { id: "changes", number: "15", title: "Changes to This Privacy Policy", intro: "We may update this Privacy Policy from time to time to reflect changes to Roadi Lite, applicable laws, or our privacy practices. When changes are made, the updated policy will be published with a revised “Last Updated” date." },
      { id: "contact", number: "16", title: "Contact Us", intro: "If you have questions about this Privacy Policy or Roadi Lite's privacy practices, please contact us through the contact information provided on the official Roadi Lite app listing or website." },
    ] as Section[],
    footer: "ROADi LITE / LOCAL-FIRST VEHICLE CARE",
    contactAppLabel: "App",
    developerLabel: "Developer",
    developer: "Billy Song",
    appName: "Roadi Lite",
    mail: "attila700@yahoo.com.tw",
  },
};

function BulletList({ items }: { items: string[] }) {
  return <ul className="policy-list">{items.map((item) => <li key={item}><span className="list-check"><Check size={13} strokeWidth={3} /></span><span>{item}</span></li>)}</ul>;
}

export default function LitePolicy({ language }: { language: Language }) {
  const copy = content[language];
  const sections = copy.sections;
  const siteBase = import.meta.env.BASE_URL;
  const liteBase = `${siteBase}lite/`;
  const switchHref = language === "zh" ? `${liteBase}en/` : liteBase;
  const roadHref = language === "zh" ? siteBase : `${siteBase}en/`;

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href={liteBase} aria-label="Roadi Lite privacy policy home">
        <img src="https://roadiprivacy-aekum4hy.manus.space/manus-storage/roadi-mark_5db22b61.png" alt="" className="brand-mark" />
        <span><strong>{copy.brand}</strong><small>{copy.subbrand}</small></span>
      </a>
      <div className="topbar-meta"><span className="status-dot" /> Privacy policy <span className="meta-divider" /> 2026.08 <a className="language-switch" href={switchHref}>{copy.languageLabel}</a></div>
    </header>
    <main id="top">
      <section className="hero-section">
        <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" /> {copy.eyebrow}</div><h1>{copy.headline}</h1><p className="hero-lede">{copy.lede}</p><div className="hero-details"><span>{copy.updatedLabel}</span><strong>{copy.updated}</strong><span className="detail-rule" /><span>{copy.platformLabel}</span><strong>{copy.platform}</strong></div></div>
        <div className="hero-visual" aria-hidden="true"><img src="https://roadiprivacy-aekum4hy.manus.space/manus-storage/roadi-policy-hero_8d71e61f.jpg" alt="" /><div className="hero-stamp">LOCAL<br /><span>LITE</span></div><div className="road-mark" /></div>
      </section>
      <section className="intro-band"><div className="intro-icon"><ShieldCheck size={25} /></div><p>{copy.intro}</p><ArrowUpRight size={21} className="intro-arrow" /></section>
      <div className="policy-layout">
        <aside className="section-nav" aria-label="Policy section navigation"><div className="nav-kicker">{copy.navKicker}</div><div className="nav-list">{sections.map((section) => <a key={section.id} href={`#${section.id}`}><span>{section.number}</span>{section.title}<ChevronRight size={14} /></a>)}</div><div className="nav-note"><CarFront size={17} /><span>{copy.navNote}</span></div></aside>
        <article className="policy-content"><div className="content-label"><span>{copy.contentLabel}</span><a href={roadHref}>{copy.backLabel}</a></div>
          {sections.map((section) => <section className="policy-section" id={section.id} key={section.id}><div className="section-heading"><span>{section.number}</span><h2>{section.title}</h2></div><p>{section.intro}</p>{section.items && <BulletList items={section.items} />}{section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.id === "contact" && <div className="contact-card"><div className="contact-card-icon"><Mail size={22} /></div><div><span>{copy.contactAppLabel}</span><strong>{copy.appName}</strong><span>{copy.developerLabel}</span><strong>{copy.developer}</strong><a href={`mailto:${copy.mail}`}>{copy.mail} <ArrowUpRight size={15} /></a></div></div>}</section>)}
          <footer className="policy-footer"><span>© 2026 Billy Song. All rights reserved.</span><span>{copy.footer}</span></footer>
        </article>
      </div>
    </main>
  </div>;
}
