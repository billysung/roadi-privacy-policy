// Design philosophy: 車庫晨光。沿用 Roadi 的編輯式文件排版、道路標線與溫暖紙白，為 Lite 版本提供清楚、可靠、適合手機閱讀的雙語政策頁面。
import { useEffect } from "react";
import { ArrowUpRight, CarFront, Check, ChevronRight, Mail, ShieldCheck } from "lucide-react";

type Language = "zh" | "en" | "vi" | "th" | "ms" | "id";

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

type PolicyCopy = (typeof content)["en"];

const additionalContent: Record<"vi" | "th" | "ms" | "id", PolicyCopy> = {
  vi: {
    languageLabel: "English", languageHref: "../en/", brand: "Roadi Lite", subbrand: "Quản lý xe đơn giản", eyebrow: "DOCUMENT / LITE PRIVACY",
    headline: <>Lưu hồ sơ xe<br /><em>trong gara của riêng bạn.</em></>, lede: "Roadi Lite được thiết kế theo hướng ưu tiên lưu trữ cục bộ, giúp bạn quản lý đơn giản thông tin xe, nhiên liệu, bảo dưỡng và chi phí.", updatedLabel: "Cập nhật lần cuối", updated: "29 tháng 8 năm 2026", platformLabel: "Nền tảng", platform: "Android App",
    intro: <><strong>Roadi Lite tôn trọng quyền riêng tư của bạn.</strong> Chính sách này giải thích cách Roadi Lite xử lý thông tin khi bạn sử dụng ứng dụng. Dữ liệu chính được lưu trên thiết bị của bạn và các tính năng cốt lõi không yêu cầu tài khoản hoặc đồng bộ hóa đám mây.</>, navKicker: "ON THIS PAGE", navNote: <>Dữ liệu được lưu cục bộ<br />theo mặc định trong Lite.</>, contentLabel: "ROADi LITE / PRIVACY POLICY", backLabel: "Roadi Privacy Policy",
    sections: [
      { id: "data", number: "01", title: "Thông tin chúng tôi thu thập", intro: "Roadi Lite không yêu cầu bạn tạo tài khoản hoặc cung cấp thông tin cá nhân như tên, địa chỉ email, số điện thoại hoặc mật khẩu. Thông tin về xe, lịch sử đổ nhiên liệu, lịch sử bảo dưỡng, chi phí và các thông tin khác mà bạn nhập vào Roadi Lite chủ yếu được lưu trữ cục bộ trên thiết bị của bạn. Các tính năng chính của Roadi Lite không yêu cầu đồng bộ hóa dữ liệu lên đám mây." },
      { id: "vehicle", number: "02", title: "Dữ liệu về xe và việc sử dụng", intro: "Bạn có thể nhập các thông tin như:", items: ["Tên xe", "Biển số xe", "Số kilomet trên đồng hồ", "Lượng nhiên liệu và chi phí nhiên liệu", "Lịch sử đổ nhiên liệu và mức tiêu thụ nhiên liệu được tính toán", "Lịch sử bảo dưỡng", "Hạng mục bảo dưỡng tùy chỉnh", "Các chi phí khác của xe và danh mục chi phí tùy chỉnh", "Ghi chú và các thông tin khác do bạn tự nhập"], body: ["Những thông tin này được sử dụng để cung cấp các chức năng ghi chép xe, tính toán mức tiêu thụ nhiên liệu, thống kê và các tính năng liên quan. Roadi Lite không sử dụng những thông tin này để trực tiếp xác định danh tính cá nhân của bạn."] },
      { id: "local", number: "03", title: "Lưu trữ dữ liệu cục bộ", intro: "Roadi Lite được thiết kế để lưu trữ dữ liệu trên thiết bị. Dữ liệu xe của bạn được lưu trong bộ nhớ cục bộ của ứng dụng. Vì dữ liệu được lưu trữ cục bộ, việc xóa ứng dụng, xóa dữ liệu ứng dụng, thay đổi thiết bị hoặc mất quyền truy cập vào thiết bị có thể khiến dữ liệu được lưu cục bộ bị mất. Roadi Lite không cung cấp tính năng sao lưu đám mây hoặc đồng bộ hóa dữ liệu thông qua tài khoản." },
      { id: "fuel", number: "04", title: "Mức tiêu thụ nhiên liệu và thống kê", intro: "Roadi Lite tính toán và hiển thị mức tiêu thụ nhiên liệu cũng như các thông tin thống kê liên quan dựa trên dữ liệu bạn nhập. Roadi Lite có thể hiển thị xu hướng mức tiêu thụ nhiên liệu dựa trên lịch sử đổ nhiên liệu của bạn. Roadi Lite không cung cấp các tính năng Premium như phát hiện mức tiêu thụ nhiên liệu giảm đột ngột, phân tích mức tiêu thụ nhiên liệu giảm liên tiếp hoặc đề xuất bảo dưỡng dựa trên phân tích mức tiêu thụ nhiên liệu." },
      { id: "maintenance", number: "05", title: "Lịch sử bảo dưỡng", intro: "Roadi Lite cho phép bạn ghi chép và quản lý thông tin bảo dưỡng xe. Roadi Lite không cung cấp tính năng tự động nhắc bảo dưỡng hoặc lập lịch thông báo bảo dưỡng. Thông tin bảo dưỡng do bạn tạo vẫn được lưu trữ cục bộ và không bị xóa chỉ vì phiên bản Lite không cung cấp tính năng nhắc nhở." },
      { id: "excel", number: "06", title: "Xuất Excel", intro: "Roadi Lite cho phép bạn chủ động xuất dữ liệu xe sang tệp Excel. Việc xuất dữ liệu được thực hiện theo yêu cầu của bạn. Roadi Lite không tự động tải các tệp đã xuất lên máy chủ của chúng tôi. Sau khi được xuất, tệp Excel thuộc quyền quản lý của bạn và có thể được lưu trữ hoặc chia sẻ thông qua các ứng dụng hoặc dịch vụ khác trên thiết bị của bạn. Các ứng dụng hoặc dịch vụ bên thứ ba đó có thể có chính sách quyền riêng tư riêng." },
      { id: "json", number: "07", title: "Sao lưu và khôi phục JSON", intro: "Roadi Lite không cung cấp chức năng sao lưu hoặc khôi phục cơ sở dữ liệu bằng JSON." },
      { id: "location", number: "08", title: "Thông tin vị trí", intro: "Roadi Lite không yêu cầu GPS hoặc thông tin vị trí chính xác để cung cấp các tính năng ghi chép xe cơ bản. Nếu bạn tự nhập địa điểm hoặc địa điểm sửa chữa trong hồ sơ xe, thông tin đó được xem là thông tin do bạn chủ động cung cấp và được lưu trữ cục bộ cùng với hồ sơ của bạn." },
      { id: "notifications", number: "09", title: "Thông báo", intro: "Roadi Lite không cung cấp thông báo nhắc bảo dưỡng tự động. Do đó, phiên bản Lite không cần lập lịch thông báo nhắc bảo dưỡng." },
      { id: "third-party", number: "10", title: "Dịch vụ bên thứ ba", intro: "Roadi Lite được thiết kế để hoạt động chủ yếu bằng bộ nhớ cục bộ trên thiết bị và các chức năng ghi chép xe cơ bản không yêu cầu tài khoản, đồng bộ hóa đám mây hoặc máy chủ riêng của chúng tôi. Nếu ứng dụng hoặc nền tảng phân phối sử dụng các dịch vụ của Google Play, dịch vụ hệ điều hành hoặc các thành phần của bên thứ ba khác, các dịch vụ đó có thể xử lý một số thông tin kỹ thuật giới hạn theo chính sách quyền riêng tư của riêng họ. Roadi không bán dữ liệu xe hoặc thông tin cá nhân của bạn." },
      { id: "sharing", number: "11", title: "Chia sẻ và bán dữ liệu", intro: "Roadi Lite không bán dữ liệu xe hoặc thông tin cá nhân của bạn. Roadi Lite không cố ý chia sẻ thông tin xe bạn nhập với nhà quảng cáo hoặc các bên thứ ba khác. Thông tin có thể được xử lý bởi các dịch vụ bên thứ ba khi cần thiết cho hoạt động của ứng dụng, nền tảng phân phối, hệ điều hành của thiết bị hoặc các dịch vụ xuất/chia sẻ dữ liệu mà bạn chủ động sử dụng." },
      { id: "children", number: "12", title: "Quyền riêng tư của trẻ em", intro: "Roadi Lite không được thiết kế đặc biệt dành cho trẻ em. Chúng tôi không cố ý thu thập thông tin cá nhân của trẻ em thông qua ứng dụng." },
      { id: "security", number: "13", title: "Bảo mật dữ liệu", intro: "Vì dữ liệu xe của bạn chủ yếu được lưu trữ trên thiết bị, tính bảo mật của thiết bị và hệ điều hành cũng rất quan trọng. Chúng tôi khuyến nghị bạn sử dụng các biện pháp bảo mật phù hợp như khóa màn hình, cập nhật hệ thống và các tính năng bảo mật khác do nhà sản xuất thiết bị cung cấp." },
      { id: "control", number: "14", title: "Quyền kiểm soát dữ liệu của bạn", intro: "Bạn kiểm soát thông tin mà bạn nhập vào Roadi Lite. Bạn có thể chỉnh sửa hoặc xóa dữ liệu xe, nhiên liệu, bảo dưỡng và chi phí bằng các chức năng được cung cấp trong ứng dụng. Vì Roadi Lite không cung cấp đồng bộ hóa đám mây hoặc sao lưu/khôi phục JSON, nếu muốn bảo vệ dữ liệu được lưu cục bộ, bạn nên cân nhắc sử dụng các tính năng sao lưu do thiết bị cung cấp." },
      { id: "changes", number: "15", title: "Thay đổi Chính sách quyền riêng tư", intro: "Chúng tôi có thể cập nhật Chính sách quyền riêng tư này theo thời gian để phản ánh những thay đổi đối với Roadi Lite, luật hiện hành hoặc cách chúng tôi xử lý quyền riêng tư. Khi có thay đổi, chính sách được cập nhật sẽ được công bố cùng với ngày “Cập nhật lần cuối” mới." },
      { id: "contact", number: "16", title: "Liên hệ với chúng tôi", intro: "Nếu bạn có câu hỏi về Chính sách quyền riêng tư này hoặc cách Roadi Lite xử lý quyền riêng tư, vui lòng liên hệ với chúng tôi thông qua thông tin liên hệ được cung cấp trên trang ứng dụng Roadi Lite chính thức hoặc trang web của Roadi." },
    ] as Section[], footer: "ROADi LITE / LOCAL-FIRST VEHICLE CARE", contactAppLabel: "Ứng dụng", developerLabel: "Nhà phát triển", developer: "Billy Song", appName: "Roadi Lite", mail: "attila700@yahoo.com.tw",
  },
  th: {
    languageLabel: "English", languageHref: "../en/", brand: "Roadi Lite", subbrand: "การดูแลรถแบบเรียบง่าย", eyebrow: "DOCUMENT / LITE PRIVACY",
    headline: <>เก็บบันทึกรถของคุณ<br /><em>ไว้ในโรงรถของคุณเอง</em></>, lede: "Roadi Lite ออกแบบโดยให้ความสำคัญกับการจัดเก็บในอุปกรณ์ ช่วยให้คุณจัดการข้อมูลรถ น้ำมัน การบำรุงรักษา และค่าใช้จ่ายได้อย่างเรียบง่าย", updatedLabel: "อัปเดตล่าสุด", updated: "29 สิงหาคม 2026", platformLabel: "แพลตฟอร์ม", platform: "Android App",
    intro: <><strong>Roadi Lite ให้ความสำคัญกับความเป็นส่วนตัวของคุณ</strong> นโยบายนี้อธิบายวิธีที่ Roadi Lite จัดการข้อมูลเมื่อคุณใช้งานแอป ข้อมูลหลักจะถูกจัดเก็บไว้ในอุปกรณ์ของคุณ และฟังก์ชันหลักไม่จำเป็นต้องมีบัญชีหรือซิงโครไนซ์กับระบบคลาวด์</>, navKicker: "ON THIS PAGE", navNote: <>ข้อมูลของคุณจัดเก็บในอุปกรณ์<br />เป็นค่าเริ่มต้นของ Lite</>, contentLabel: "ROADi LITE / PRIVACY POLICY", backLabel: "Roadi Privacy Policy",
    sections: [
      { id: "data", number: "01", title: "ข้อมูลที่เราเก็บรวบรวม", intro: "Roadi Lite ไม่จำเป็นต้องให้คุณสร้างบัญชีหรือให้ข้อมูลส่วนบุคคล เช่น ชื่อ ที่อยู่อีเมล หมายเลขโทรศัพท์ หรือรหัสผ่าน ข้อมูลรถยนต์ บันทึกการเติมน้ำมัน บันทึกการบำรุงรักษา ค่าใช้จ่าย และข้อมูลอื่น ๆ ที่คุณป้อนลงใน Roadi Lite จะถูกจัดเก็บไว้ในอุปกรณ์ของคุณเป็นหลัก ฟังก์ชันหลักของ Roadi Lite ไม่จำเป็นต้องใช้การซิงโครไนซ์ข้อมูลกับระบบคลาวด์" },
      { id: "vehicle", number: "02", title: "ข้อมูลรถยนต์และการใช้งาน", intro: "คุณสามารถป้อนข้อมูล เช่น:", items: ["ชื่อรถ", "หมายเลขทะเบียนรถ", "เลขไมล์", "ปริมาณน้ำมันและค่าใช้จ่ายน้ำมัน", "ประวัติการเติมน้ำมันและอัตราสิ้นเปลืองน้ำมันที่คำนวณได้", "ประวัติการบำรุงรักษา", "รายการบำรุงรักษาที่กำหนดเอง", "ค่าใช้จ่ายอื่น ๆ ของรถและหมวดหมู่ค่าใช้จ่ายที่กำหนดเอง", "หมายเหตุและข้อมูลอื่น ๆ ที่คุณเลือกป้อน"], body: ["ข้อมูลเหล่านี้ใช้เพื่อให้บริการบันทึกข้อมูลรถ การคำนวณอัตราสิ้นเปลืองน้ำมัน สถิติ และฟังก์ชันที่เกี่ยวข้อง Roadi Lite ไม่ใช้ข้อมูลเหล่านี้เพื่อระบุตัวตนของคุณโดยตรง"] },
      { id: "local", number: "03", title: "การจัดเก็บข้อมูลภายในอุปกรณ์", intro: "Roadi Lite ได้รับการออกแบบให้จัดเก็บข้อมูลไว้ในอุปกรณ์ ข้อมูลรถของคุณจะถูกจัดเก็บไว้ในพื้นที่จัดเก็บข้อมูลภายในของแอปพลิเคชัน เนื่องจากข้อมูลถูกจัดเก็บไว้ในอุปกรณ์ การลบแอป การล้างข้อมูลแอป การเปลี่ยนอุปกรณ์ หรือการสูญเสียสิทธิ์ในการเข้าถึงอุปกรณ์ อาจทำให้ข้อมูลที่จัดเก็บไว้ในอุปกรณ์สูญหาย Roadi Lite ไม่มีบริการสำรองข้อมูลบนคลาวด์หรือการซิงโครไนซ์ข้อมูลผ่านบัญชีผู้ใช้" },
      { id: "fuel", number: "04", title: "อัตราสิ้นเปลืองน้ำมันและสถิติ", intro: "Roadi Lite จะคำนวณและแสดงอัตราสิ้นเปลืองน้ำมันและข้อมูลสถิติที่เกี่ยวข้องตามข้อมูลที่คุณป้อน Roadi Lite สามารถแสดงแนวโน้มอัตราสิ้นเปลืองน้ำมันจากประวัติการเติมน้ำมันของคุณ Roadi Lite ไม่มีฟีเจอร์ Premium เช่น การตรวจจับการลดลงอย่างฉับพลันของอัตราสิ้นเปลืองน้ำมัน การวิเคราะห์การลดลงอย่างต่อเนื่อง หรือคำแนะนำด้านการบำรุงรักษาจากการวิเคราะห์อัตราสิ้นเปลืองน้ำมัน" },
      { id: "maintenance", number: "05", title: "บันทึกการบำรุงรักษา", intro: "Roadi Lite ช่วยให้คุณบันทึกและจัดการข้อมูลการบำรุงรักษารถ Roadi Lite ไม่มีระบบแจ้งเตือนการบำรุงรักษาอัตโนมัติหรือการตั้งเวลาการแจ้งเตือนการบำรุงรักษา ข้อมูลการบำรุงรักษาที่คุณสร้างขึ้นจะยังคงถูกจัดเก็บไว้ในอุปกรณ์ และจะไม่ถูกลบเพียงเพราะฟีเจอร์แจ้งเตือนไม่มีให้ใช้งานในเวอร์ชัน Lite" },
      { id: "excel", number: "06", title: "การส่งออก Excel", intro: "Roadi Lite อนุญาตให้คุณส่งออกข้อมูลรถเป็นไฟล์ Excel ได้ด้วยตนเอง การส่งออกจะเกิดขึ้นเมื่อคุณเป็นผู้ดำเนินการ Roadi Lite จะไม่อัปโหลดไฟล์ที่ส่งออกไปยังเซิร์ฟเวอร์ของเราโดยอัตโนมัติ หลังจากส่งออกแล้ว ไฟล์ Excel จะอยู่ภายใต้การควบคุมของคุณ และสามารถจัดเก็บหรือแชร์ผ่านแอปพลิเคชันหรือบริการอื่นบนอุปกรณ์ของคุณ แอปพลิเคชันหรือบริการของบุคคลที่สามอาจมีนโยบายความเป็นส่วนตัวของตนเอง" },
      { id: "json", number: "07", title: "การสำรองและกู้คืนข้อมูล JSON", intro: "Roadi Lite ไม่มีฟังก์ชันสำรองหรือกู้คืนฐานข้อมูลด้วย JSON" },
      { id: "location", number: "08", title: "ข้อมูลตำแหน่ง", intro: "Roadi Lite ไม่จำเป็นต้องใช้ GPS หรือข้อมูลตำแหน่งที่แม่นยำสำหรับฟังก์ชันบันทึกข้อมูลรถพื้นฐาน หากคุณป้อนสถานที่หรือสถานที่ให้บริการซ่อมบำรุงด้วยตนเองในข้อมูลรถ ข้อมูลดังกล่าวถือเป็นข้อมูลที่คุณเลือกให้โดยสมัครใจ และจะถูกจัดเก็บไว้ในอุปกรณ์พร้อมกับข้อมูลของคุณ" },
      { id: "notifications", number: "09", title: "การแจ้งเตือน", intro: "Roadi Lite ไม่มีการแจ้งเตือนการบำรุงรักษาอัตโนมัติ ดังนั้น เวอร์ชัน Lite จึงไม่จำเป็นต้องตั้งเวลาการแจ้งเตือนการบำรุงรักษา" },
      { id: "third-party", number: "10", title: "บริการของบุคคลที่สาม", intro: "Roadi Lite ได้รับการออกแบบให้ทำงานโดยใช้พื้นที่จัดเก็บข้อมูลภายในอุปกรณ์เป็นหลัก และฟังก์ชันบันทึกข้อมูลรถพื้นฐานไม่จำเป็นต้องมีบัญชีผู้ใช้ การซิงโครไนซ์บนคลาวด์ หรือเซิร์ฟเวอร์ของเราเอง หากแอปพลิเคชันหรือแพลตฟอร์มที่ใช้เผยแพร่แอปมีการใช้บริการ Google Play บริการของระบบปฏิบัติการ หรือส่วนประกอบของบุคคลที่สาม บริการเหล่านั้นอาจประมวลผลข้อมูลทางเทคนิคบางส่วนตามนโยบายความเป็นส่วนตัวของตนเอง Roadi จะไม่ขายข้อมูลรถหรือข้อมูลส่วนบุคคลของคุณ" },
      { id: "sharing", number: "11", title: "การแบ่งปันและการขายข้อมูล", intro: "Roadi Lite จะไม่ขายข้อมูลรถหรือข้อมูลส่วนบุคคลของคุณ Roadi Lite จะไม่จงใจแบ่งปันข้อมูลรถที่คุณป้อนกับผู้โฆษณาหรือบุคคลที่สามอื่น ๆ ข้อมูลอาจถูกประมวลผลโดยบริการของบุคคลที่สามเมื่อจำเป็นต่อการทำงานของแอปพลิเคชัน แพลตฟอร์มการเผยแพร่ ระบบปฏิบัติการของอุปกรณ์ หรือบริการส่งออก/แชร์ข้อมูลที่คุณเลือกใช้งานด้วยตนเอง" },
      { id: "children", number: "12", title: "ความเป็นส่วนตัวของเด็ก", intro: "Roadi Lite ไม่ได้ออกแบบมาโดยเฉพาะสำหรับเด็ก เราไม่มีเจตนารวบรวมข้อมูลส่วนบุคคลของเด็กผ่านแอปพลิเคชัน" },
      { id: "security", number: "13", title: "ความปลอดภัยของข้อมูล", intro: "เนื่องจากข้อมูลรถของคุณถูกจัดเก็บไว้ในอุปกรณ์เป็นหลัก ความปลอดภัยของอุปกรณ์และระบบปฏิบัติการจึงมีความสำคัญเช่นกัน เราขอแนะนำให้คุณใช้มาตรการรักษาความปลอดภัยที่เหมาะสม เช่น การล็อกหน้าจอ การอัปเดตระบบ และฟีเจอร์ด้านความปลอดภัยอื่น ๆ ที่ผู้ผลิตอุปกรณ์จัดให้" },
      { id: "control", number: "14", title: "การควบคุมข้อมูลของคุณ", intro: "คุณเป็นผู้ควบคุมข้อมูลที่คุณป้อนลงใน Roadi Lite คุณสามารถแก้ไขหรือลบข้อมูลรถ ข้อมูลการเติมน้ำมัน ข้อมูลการบำรุงรักษา และข้อมูลค่าใช้จ่ายผ่านฟังก์ชันที่มีอยู่ในแอปพลิเคชัน เนื่องจาก Roadi Lite ไม่มีการซิงโครไนซ์บนคลาวด์หรือการสำรอง/กู้คืน JSON หากคุณต้องการปกป้องข้อมูลที่จัดเก็บไว้ในอุปกรณ์ เราแนะนำให้พิจารณาใช้ฟังก์ชันสำรองข้อมูลที่อุปกรณ์ของคุณมีให้" },
      { id: "changes", number: "15", title: "การเปลี่ยนแปลงนโยบายความเป็นส่วนตัว", intro: "เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว เพื่อให้สอดคล้องกับการเปลี่ยนแปลงของ Roadi Lite กฎหมายที่เกี่ยวข้อง หรือแนวทางการจัดการความเป็นส่วนตัวของเรา เมื่อมีการเปลี่ยนแปลง เราจะเผยแพร่นโยบายฉบับปรับปรุงพร้อมวันที่ “อัปเดตล่าสุด” ใหม่" },
      { id: "contact", number: "16", title: "ติดต่อเรา", intro: "หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวนี้หรือแนวทางการจัดการความเป็นส่วนตัวของ Roadi Lite โปรดติดต่อเราผ่านข้อมูลติดต่อที่ระบุไว้ในหน้ารายการแอป Roadi Lite อย่างเป็นทางการหรือเว็บไซต์ของ Roadi" },
    ] as Section[], footer: "ROADi LITE / LOCAL-FIRST VEHICLE CARE", contactAppLabel: "แอปพลิเคชัน", developerLabel: "ผู้พัฒนา", developer: "Billy Song", appName: "Roadi Lite", mail: "attila700@yahoo.com.tw",
  },
  ms: {
    languageLabel: "English", languageHref: "../en/", brand: "Roadi Lite", subbrand: "Penjagaan kenderaan ringkas", eyebrow: "DOCUMENT / LITE PRIVACY",
    headline: <>Simpan rekod kereta anda<br /><em>di garaj anda sendiri.</em></>, lede: "Roadi Lite direka dengan keutamaan penyimpanan setempat untuk membantu anda mengurus rekod kenderaan, bahan api, penyelenggaraan dan perbelanjaan dengan mudah.", updatedLabel: "Kemas kini terakhir", updated: "29 Ogos 2026", platformLabel: "Platform", platform: "Android App",
    intro: <><strong>Roadi Lite menghormati privasi anda.</strong> Dasar Privasi ini menerangkan cara Roadi Lite mengendalikan maklumat apabila anda menggunakan aplikasi. Rekod utama anda disimpan pada peranti dan fungsi teras tidak memerlukan akaun atau penyegerakan awan.</>, navKicker: "ON THIS PAGE", navNote: <>Rekod anda disimpan secara setempat<br />secara lalai dalam Lite.</>, contentLabel: "ROADi LITE / PRIVACY POLICY", backLabel: "Roadi Privacy Policy",
    sections: [
      { id: "data", number: "01", title: "Maklumat yang Kami Kumpulkan", intro: "Roadi Lite tidak memerlukan anda membuat akaun atau memberikan maklumat peribadi seperti nama, alamat e-mel, nombor telefon atau kata laluan. Maklumat kenderaan, rekod pengisian bahan api, rekod penyelenggaraan, perbelanjaan dan maklumat lain yang anda masukkan ke dalam Roadi Lite disimpan secara setempat pada peranti anda. Fungsi utama Roadi Lite tidak memerlukan penyegerakan data ke awan." },
      { id: "vehicle", number: "02", title: "Data Kenderaan dan Penggunaan", intro: "Anda boleh memasukkan maklumat seperti:", items: ["Nama kenderaan", "Nombor pendaftaran kenderaan", "Bacaan odometer", "Jumlah bahan api dan kos bahan api", "Rekod pengisian bahan api dan penggunaan bahan api yang dikira", "Rekod penyelenggaraan", "Item penyelenggaraan tersuai", "Perbelanjaan kenderaan lain dan kategori perbelanjaan tersuai", "Nota dan maklumat lain yang anda pilih untuk masukkan"], body: ["Maklumat ini digunakan untuk menyediakan fungsi rekod kenderaan, pengiraan penggunaan bahan api, statistik dan fungsi berkaitan. Roadi Lite tidak menggunakan maklumat ini untuk mengenal pasti anda secara peribadi secara langsung."] },
      { id: "local", number: "03", title: "Penyimpanan Data Setempat", intro: "Roadi Lite direka untuk menyimpan data pada peranti anda. Data kenderaan anda disimpan dalam storan setempat aplikasi. Oleh kerana data disimpan secara setempat, memadam aplikasi, mengosongkan data aplikasi, menukar peranti atau kehilangan akses kepada peranti boleh menyebabkan data yang disimpan secara setempat hilang. Roadi Lite tidak menyediakan sandaran awan atau penyegerakan berasaskan akaun." },
      { id: "fuel", number: "04", title: "Penggunaan Bahan Api dan Statistik", intro: "Roadi Lite mengira dan memaparkan penggunaan bahan api serta statistik berkaitan berdasarkan maklumat yang anda masukkan. Roadi Lite boleh memaparkan trend penggunaan bahan api berdasarkan sejarah pengisian bahan api anda. Roadi Lite tidak menyediakan ciri Premium seperti pengesanan penurunan penggunaan bahan api secara mendadak, analisis penurunan penggunaan bahan api secara berterusan atau cadangan penyelenggaraan berdasarkan analisis penggunaan bahan api." },
      { id: "maintenance", number: "05", title: "Rekod Penyelenggaraan", intro: "Roadi Lite membolehkan anda merekod dan mengurus maklumat penyelenggaraan kenderaan. Roadi Lite tidak menyediakan peringatan penyelenggaraan automatik atau penjadualan pemberitahuan penyelenggaraan. Rekod penyelenggaraan yang anda buat akan terus disimpan secara setempat dan tidak akan dipadam hanya kerana ciri peringatan tidak tersedia dalam versi Lite." },
      { id: "excel", number: "06", title: "Eksport Excel", intro: "Roadi Lite membolehkan anda mengeksport rekod kenderaan ke fail Excel secara sukarela. Eksport dimulakan oleh anda. Roadi Lite tidak memuat naik fail yang dieksport ke pelayan kami secara automatik. Selepas dieksport, fail Excel berada di bawah kawalan anda dan boleh disimpan atau dikongsi menggunakan aplikasi atau perkhidmatan lain pada peranti anda. Aplikasi atau perkhidmatan pihak ketiga tersebut mungkin mempunyai dasar privasi mereka sendiri." },
      { id: "json", number: "07", title: "Sandaran dan Pemulihan JSON", intro: "Roadi Lite tidak menyediakan fungsi sandaran atau pemulihan pangkalan data menggunakan JSON." },
      { id: "location", number: "08", title: "Maklumat Lokasi", intro: "Roadi Lite tidak memerlukan GPS atau maklumat lokasi tepat untuk menyediakan fungsi asas rekod kenderaan. Jika anda memasukkan lokasi atau lokasi perkhidmatan secara manual dalam rekod kenderaan, maklumat tersebut dianggap sebagai maklumat yang anda berikan secara sukarela dan disimpan secara setempat bersama rekod anda." },
      { id: "notifications", number: "09", title: "Pemberitahuan", intro: "Roadi Lite tidak menyediakan pemberitahuan peringatan penyelenggaraan automatik. Oleh itu, versi Lite tidak perlu menjadualkan pemberitahuan peringatan penyelenggaraan." },
      { id: "third-party", number: "10", title: "Perkhidmatan Pihak Ketiga", intro: "Roadi Lite direka untuk beroperasi terutamanya menggunakan storan setempat pada peranti dan fungsi rekod kenderaan asas tidak memerlukan akaun, penyegerakan awan atau pelayan backend kami sendiri. Jika aplikasi atau platform pengedaran menggunakan perkhidmatan Google Play, perkhidmatan sistem pengendalian atau komponen pihak ketiga yang lain, perkhidmatan tersebut mungkin memproses maklumat teknikal terhad mengikut dasar privasi mereka sendiri. Roadi tidak menjual rekod kenderaan atau maklumat peribadi anda." },
      { id: "sharing", number: "11", title: "Perkongsian dan Penjualan Data", intro: "Roadi Lite tidak menjual rekod kenderaan atau maklumat peribadi anda. Roadi Lite tidak sengaja berkongsi maklumat kenderaan yang anda masukkan dengan pengiklan atau pihak ketiga lain. Maklumat mungkin diproses oleh perkhidmatan pihak ketiga apabila diperlukan untuk operasi aplikasi, platform pengedaran, sistem pengendalian peranti atau perkhidmatan eksport/perkongsian data yang anda pilih untuk gunakan." },
      { id: "children", number: "12", title: "Privasi Kanak-kanak", intro: "Roadi Lite tidak direka khusus untuk kanak-kanak. Kami tidak sengaja mengumpul maklumat peribadi kanak-kanak melalui aplikasi." },
      { id: "security", number: "13", title: "Keselamatan Data", intro: "Oleh kerana rekod kenderaan anda kebanyakannya disimpan pada peranti, keselamatan peranti dan sistem pengendaliannya juga penting. Kami mengesyorkan agar anda menggunakan langkah keselamatan yang sesuai seperti kunci skrin, kemas kini sistem dan ciri keselamatan lain yang disediakan oleh pengeluar peranti anda." },
      { id: "control", number: "14", title: "Kawalan Anda Terhadap Data", intro: "Anda mengawal maklumat yang anda masukkan ke dalam Roadi Lite. Anda boleh mengedit atau memadam rekod kenderaan, bahan api, penyelenggaraan dan perbelanjaan menggunakan fungsi yang tersedia dalam aplikasi. Oleh kerana Roadi Lite tidak menyediakan penyegerakan awan atau sandaran/pemulihan JSON, jika anda ingin melindungi data yang disimpan secara setempat, anda boleh mempertimbangkan untuk menggunakan ciri sandaran yang disediakan oleh peranti anda." },
      { id: "changes", number: "15", title: "Perubahan kepada Dasar Privasi", intro: "Kami mungkin mengemas kini Dasar Privasi ini dari semasa ke semasa untuk mencerminkan perubahan kepada Roadi Lite, undang-undang yang berkenaan atau amalan privasi kami. Apabila perubahan dibuat, dasar yang dikemas kini akan diterbitkan bersama tarikh “Kemas kini terakhir” yang baharu." },
      { id: "contact", number: "16", title: "Hubungi Kami", intro: "Jika anda mempunyai soalan mengenai Dasar Privasi ini atau amalan privasi Roadi Lite, sila hubungi kami melalui maklumat hubungan yang disediakan pada halaman aplikasi Roadi Lite rasmi atau laman web Roadi." },
    ] as Section[], footer: "ROADi LITE / LOCAL-FIRST VEHICLE CARE", contactAppLabel: "Aplikasi", developerLabel: "Pembangun", developer: "Billy Song", appName: "Roadi Lite", mail: "attila700@yahoo.com.tw",
  },
  id: {
    languageLabel: "English", languageHref: "../en/", brand: "Roadi Lite", subbrand: "Perawatan kendaraan sederhana", eyebrow: "DOCUMENT / LITE PRIVACY",
    headline: <>Simpan catatan kendaraan<br /><em>di garasi Anda sendiri.</em></>, lede: "Roadi Lite dirancang dengan penyimpanan lokal sebagai prioritas, sehingga Anda dapat mengelola catatan kendaraan, bahan bakar, perawatan, dan pengeluaran dengan sederhana.", updatedLabel: "Terakhir diperbarui", updated: "29 Agustus 2026", platformLabel: "Platform", platform: "Android App",
    intro: <><strong>Roadi Lite menghormati privasi Anda.</strong> Kebijakan Privasi ini menjelaskan bagaimana Roadi Lite menangani informasi ketika Anda menggunakan aplikasi. Catatan utama Anda disimpan di perangkat, dan fitur inti tidak memerlukan akun atau sinkronisasi cloud.</>, navKicker: "ON THIS PAGE", navNote: <>Catatan Anda disimpan secara lokal<br />secara default di Lite.</>, contentLabel: "ROADi LITE / PRIVACY POLICY", backLabel: "Roadi Privacy Policy",
    sections: [
      { id: "data", number: "01", title: "Informasi yang Kami Kumpulkan", intro: "Roadi Lite tidak mengharuskan Anda membuat akun atau memberikan informasi pribadi seperti nama, alamat email, nomor telepon, atau kata sandi. Informasi kendaraan, catatan pengisian bahan bakar, catatan perawatan, pengeluaran, dan informasi lain yang Anda masukkan ke Roadi Lite terutama disimpan secara lokal di perangkat Anda. Fungsi utama Roadi Lite tidak memerlukan sinkronisasi data ke cloud." },
      { id: "vehicle", number: "02", title: "Data Kendaraan dan Penggunaan", intro: "Anda dapat memasukkan informasi seperti:", items: ["Nama kendaraan", "Nomor kendaraan", "Pembacaan odometer", "Jumlah bahan bakar dan biaya bahan bakar", "Catatan pengisian bahan bakar dan konsumsi bahan bakar yang dihitung", "Catatan perawatan", "Item perawatan khusus", "Pengeluaran kendaraan lainnya dan kategori pengeluaran khusus", "Catatan dan informasi lain yang Anda pilih untuk masukkan"], body: ["Informasi ini digunakan untuk menyediakan fitur pencatatan kendaraan, perhitungan konsumsi bahan bakar, statistik, dan fitur terkait. Roadi Lite tidak menggunakan informasi tersebut untuk mengidentifikasi Anda secara pribadi secara langsung."] },
      { id: "local", number: "03", title: "Penyimpanan Data Lokal", intro: "Roadi Lite dirancang untuk menyimpan data di perangkat Anda. Data kendaraan Anda disimpan dalam penyimpanan lokal aplikasi. Karena data disimpan secara lokal, menghapus aplikasi, menghapus data aplikasi, mengganti perangkat, atau kehilangan akses ke perangkat dapat menyebabkan data yang tersimpan secara lokal hilang. Roadi Lite tidak menyediakan pencadangan cloud atau sinkronisasi berbasis akun." },
      { id: "fuel", number: "04", title: "Konsumsi Bahan Bakar dan Statistik", intro: "Roadi Lite menghitung dan menampilkan konsumsi bahan bakar serta statistik terkait berdasarkan informasi yang Anda masukkan. Roadi Lite dapat menampilkan tren konsumsi bahan bakar berdasarkan riwayat pengisian bahan bakar Anda. Roadi Lite tidak menyediakan fitur Premium seperti deteksi penurunan konsumsi bahan bakar secara tiba-tiba, analisis penurunan konsumsi bahan bakar secara berkelanjutan, atau rekomendasi perawatan berdasarkan analisis konsumsi bahan bakar." },
      { id: "maintenance", number: "05", title: "Catatan Perawatan", intro: "Roadi Lite memungkinkan Anda mencatat dan mengelola informasi perawatan kendaraan. Roadi Lite tidak menyediakan pengingat perawatan otomatis atau penjadwalan notifikasi perawatan. Catatan perawatan yang Anda buat tetap disimpan secara lokal dan tidak akan dihapus hanya karena fitur pengingat tidak tersedia dalam versi Lite." },
      { id: "excel", number: "06", title: "Ekspor Excel", intro: "Roadi Lite memungkinkan Anda mengekspor catatan kendaraan ke file Excel secara sukarela. Ekspor dilakukan atas tindakan Anda. Roadi Lite tidak secara otomatis mengunggah file yang diekspor ke server kami. Setelah diekspor, file Excel berada di bawah kendali Anda dan dapat disimpan atau dibagikan menggunakan aplikasi atau layanan lain di perangkat Anda. Aplikasi atau layanan pihak ketiga tersebut mungkin memiliki kebijakan privasi mereka sendiri." },
      { id: "json", number: "07", title: "Pencadangan dan Pemulihan JSON", intro: "Roadi Lite tidak menyediakan fungsi pencadangan atau pemulihan database menggunakan JSON." },
      { id: "location", number: "08", title: "Informasi Lokasi", intro: "Roadi Lite tidak memerlukan GPS atau informasi lokasi yang tepat untuk menyediakan fitur pencatatan kendaraan dasar. Jika Anda memasukkan lokasi atau lokasi layanan secara manual dalam catatan kendaraan, informasi tersebut dianggap sebagai informasi yang Anda berikan secara sukarela dan disimpan secara lokal bersama catatan Anda." },
      { id: "notifications", number: "09", title: "Notifikasi", intro: "Roadi Lite tidak menyediakan notifikasi pengingat perawatan otomatis. Oleh karena itu, versi Lite tidak perlu menjadwalkan notifikasi pengingat perawatan." },
      { id: "third-party", number: "10", title: "Layanan Pihak Ketiga", intro: "Roadi Lite dirancang untuk beroperasi terutama menggunakan penyimpanan lokal pada perangkat dan fungsi pencatatan kendaraan dasar tidak memerlukan akun, sinkronisasi cloud, atau server backend milik kami. Jika aplikasi atau platform distribusi menggunakan layanan Google Play, layanan sistem operasi, atau komponen pihak ketiga lainnya, layanan tersebut dapat memproses informasi teknis terbatas sesuai dengan kebijakan privasi mereka sendiri. Roadi tidak menjual catatan kendaraan atau informasi pribadi Anda." },
      { id: "sharing", number: "11", title: "Berbagi dan Penjualan Data", intro: "Roadi Lite tidak menjual catatan kendaraan atau informasi pribadi Anda. Roadi Lite tidak dengan sengaja membagikan informasi kendaraan yang Anda masukkan kepada pengiklan atau pihak ketiga lainnya. Informasi dapat diproses oleh layanan pihak ketiga jika diperlukan untuk pengoperasian aplikasi, platform distribusi, sistem operasi perangkat, atau layanan ekspor/berbagi data yang Anda pilih untuk digunakan." },
      { id: "children", number: "12", title: "Privasi Anak", intro: "Roadi Lite tidak secara khusus ditujukan untuk anak-anak. Kami tidak dengan sengaja mengumpulkan informasi pribadi anak-anak melalui aplikasi." },
      { id: "security", number: "13", title: "Keamanan Data", intro: "Karena catatan kendaraan Anda terutama disimpan di perangkat, keamanan perangkat dan sistem operasinya juga penting. Kami menyarankan Anda menggunakan langkah-langkah keamanan yang sesuai, seperti kunci layar, pembaruan sistem, dan fitur keamanan lainnya yang disediakan oleh produsen perangkat Anda." },
      { id: "control", number: "14", title: "Kendali Anda atas Data", intro: "Anda mengendalikan informasi yang Anda masukkan ke Roadi Lite. Anda dapat mengedit atau menghapus catatan kendaraan, bahan bakar, perawatan, dan pengeluaran menggunakan fitur yang tersedia di aplikasi. Karena Roadi Lite tidak menyediakan sinkronisasi cloud atau pencadangan/pemulihan JSON, jika Anda ingin melindungi data yang tersimpan secara lokal, Anda dapat mempertimbangkan untuk menggunakan fitur pencadangan yang tersedia pada perangkat Anda." },
      { id: "changes", number: "15", title: "Perubahan pada Kebijakan Privasi", intro: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan pada Roadi Lite, hukum yang berlaku, atau praktik privasi kami. Jika terdapat perubahan, kebijakan yang diperbarui akan dipublikasikan dengan tanggal “Terakhir diperbarui” yang baru." },
      { id: "contact", number: "16", title: "Hubungi Kami", intro: "Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini atau praktik privasi Roadi Lite, silakan hubungi kami melalui informasi kontak yang tersedia pada halaman aplikasi Roadi Lite resmi atau situs web Roadi." },
    ] as Section[], footer: "ROADi LITE / LOCAL-FIRST VEHICLE CARE", contactAppLabel: "Aplikasi", developerLabel: "Pengembang", developer: "Billy Song", appName: "Roadi Lite", mail: "attila700@yahoo.com.tw",
  },
};

const localizedContent: Record<Language, PolicyCopy> = { ...content, ...additionalContent };

function BulletList({ items }: { items: string[] }) {
  return <ul className="policy-list">{items.map((item) => <li key={item}><span className="list-check"><Check size={13} strokeWidth={3} /></span><span>{item}</span></li>)}</ul>;
}

export default function LitePolicy({ language }: { language: Language }) {
  const copy = localizedContent[language];
  const sections = copy.sections;
  useEffect(() => {
    const titles: Record<Language, string> = {
      zh: "Roadi Lite｜隱私權政策",
      en: "Roadi Lite｜Vehicle Care Privacy Policy",
      vi: "Roadi Lite｜Chính sách quyền riêng tư",
      th: "Roadi Lite｜นโยบายความเป็นส่วนตัว",
      ms: "Roadi Lite｜Dasar Privasi",
      id: "Roadi Lite｜Kebijakan Privasi",
    };
    document.title = titles[language];
  }, [language]);
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
