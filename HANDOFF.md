# Roadi Privacy Policy Website — GitHub 交接文件

最後更新：2026-10-11

## 1. 專案用途

這是一個提供 Android App **Roadi** 隱私權政策的多語系靜態網站。

- GitHub 儲存庫：`billysung/roadi-privacy-policy`
- GitHub Pages 網址：`https://billysung.github.io/roadi-privacy-policy/`
- 開發者：Billy Song
- 聯絡信箱：`attila700@yahoo.com.tw`
- 技術：React 19、TypeScript、Vite、Tailwind CSS 4、Wouter、Lucide React
- 目前品牌名稱：**Roadi**
- 目前不是分開的 Premium／Lite 隱私權政策架構：Roadi 使用者安裝的 App 名稱為 Roadi，免費版透過廣告及功能限制提供，使用者可付費解鎖完整功能。

## 2. 公開網址

Roadi 目前使用同一個隱私權政策網址，建議 Google Play Console 使用根網址：

```text
https://billysung.github.io/roadi-privacy-policy/
```

六個 Roadi 語系路徑：

| 語言 | 路徑 |
|---|---|
| 繁體中文 | `/` |
| English | `/en/` |
| Tiếng Việt | `/vi/` |
| ภาษาไทย | `/th/` |
| Bahasa Melayu | `/ms/` |
| Bahasa Indonesia | `/id/` |
| Español | `/es/` |

舊有 Roadi Lite 路徑仍存在於程式與 GitHub Pages 部署流程中：

```text
/lite/
/lite/en/
/lite/vi/
/lite/th/
/lite/ms/
/lite/id/
```

若產品策略已完全改為單一 Roadi，移除 Lite 頁面前應先確認 Google Play 或其他地方沒有仍在使用這些舊網址。

## 3. 目前政策內容

目前 Roadi 六語系政策已包含：

- 本機優先（Local-First）儲存
- 不要求使用者建立帳號
- 車輛、加油、保養、費用與備註等資料主要儲存在裝置本機
- 匯出、匯入、備份、分享及第三方儲存服務說明
- 免費版本可能顯示第三方廣告
- 第三方廣告服務可能處理廣告識別碼、裝置資訊、粗略位置或其他廣告技術資訊
- Roadi 不會將本機車輛紀錄提供給廣告商作為個人化廣告資料
- Roadi 可提供付費功能或一次性購買以解鎖完整功能
- Google Play 或其他應用程式商店處理購買及付款
- Roadi 與開發者不儲存完整信用卡、金融卡或付款帳戶資料
- 通知、兒童隱私、資料安全、資料刪除與政策變更

政策資料檔案：

```text
client/src/data/roadi-premium-policies.ts
```

> 注意：檔案名稱仍保留 `roadi-premium-policies.ts` 的歷史名稱，但使用者可見內容已統一為 Roadi。除非要做重構，否則不要只為了改檔名而改動匯入路徑。

## 4. 主要檔案

```text
client/src/App.tsx
```

- 定義 Roadi 六語系與 Lite 六語系路由。
- 根路徑與 `/en/`、`/vi/`、`/th/`、`/ms/`、`/id/` 對應 Roadi 政策頁面。

```text
client/src/pages/RoadiPremiumPolicy.tsx
```

- Roadi 六語系政策頁面元件。
- 雖然元件名稱仍為 `RoadiPremiumPolicy`，但目前顯示的品牌是 Roadi。
- 若進行重構，需同步更新 `App.tsx` 的 import 與 component 名稱。

```text
client/src/pages/LitePolicy.tsx
```

- 歷史 Roadi Lite 六語系頁面。
- 如仍需保留舊網址，請勿刪除。

```text
client/src/index.css
```

- 全站 Neo-garage editorial 視覺樣式。
- 2026-10-08 已將首頁主標題字級縮小為原本約 50%：
  - 桌面：`clamp(27px,3.5vw,50.5px)`
  - 手機：`clamp(27px,8.5vw,44px)`

```text
.github/workflows/deploy-pages.yml
```

- GitHub Pages 自動部署工作流程。
- 觸發條件：推送到 `main`，或在 GitHub Actions 手動執行。
- 會執行 `pnpm build`，建立語系實體入口與 `404.html`，再使用 GitHub Pages artifact 部署。
- 這個 workflow 會為各語系頁面寫入 HTML `<title>`，目前已統一為 Roadi。

```text
vite.config.ts
```

- GitHub Pages 子路徑設定：`/roadi-privacy-policy/`
- 修改 base path 時，必須同時檢查路由、資產路徑與 Actions 產物。

## 5. 本機開發與檢查

在專案根目錄執行：

```bash
pnpm install
pnpm run check
pnpm run build
pnpm run dev
```

建置成功條件：

- `pnpm run check` 不應有 TypeScript 錯誤
- `pnpm run build` 應成功建立 `dist/public`

## 6. GitHub Pages 部署

一般流程：

```bash
git status
git add <修改檔案>
git commit -m "描述修改"
git push origin main
```

推送後到 GitHub Actions 查看 `Deploy Roadi privacy policy` workflow。

成功的 workflow 應包含：

1. Checkout
2. Setup pnpm
3. Setup Node
4. Install dependencies
5. Build site
6. Configure Pages
7. Upload Pages artifact
8. Deploy to GitHub Pages

部署完成後可使用以下方式檢查：

```bash
curl -I https://billysung.github.io/roadi-privacy-policy/
curl -I https://billysung.github.io/roadi-privacy-policy/en/
```

建議六個路徑都檢查 HTTP 200：

```text
/
/en/
/vi/
/th/
/ms/
/id/
```

## 7. 重要部署注意事項

- GitHub Pages 網站是子路徑，不是網域根目錄：`/roadi-privacy-policy/`。
- 不要把資產路徑寫成只適用 `https://billysung.github.io/` 根目錄的形式。
- 修改 `vite.config.ts`、路由或 Actions 時，需特別注意白畫面與 404。
- GitHub Pages CDN 可能短時間快取舊版 HTML；若部署成功但畫面仍舊，先確認 Actions、HTML 內的 CSS/JS asset hash，再等待 CDN 更新。
- GitHub Actions 目前可能顯示 Node.js 20 deprecated 警告；只要 workflow conclusion 是 success，這是警告而非本次失敗原因。
- 不要把 GitHub token、密碼或任何秘密寫進文件或 commit。

## 8. 最近版本狀態

最近一次主標題縮小修改已完成：

- 修改：`client/src/index.css`
- 桌面與手機主標題縮小約 50%
- 已通過 `pnpm run check`
- 已通過 `pnpm run build`
- 已推送至 GitHub main
- GitHub Actions 已成功完成部署
- 六個 Roadi 公開路徑均已驗證 HTTP 200

## 9. 接手時建議先做的事

1. 先讀取本文件及 `README.md`（若存在）。
2. 先確認 GitHub Actions 最近一次執行成功，不要直接重建整個專案。
3. 修改政策內容前，先確認是要修改六個語系，還是只修改單一語系。
4. 修改 App 資料處理方式、廣告 SDK、登入、雲端同步、付款方案或權限後，必須同步檢查隱私權政策與 Google Play Data safety 表單。
5. 若未來 Roadi Lite 完全不再使用，先搜尋所有 `/lite/` 連結與使用位置，再決定是否移除舊頁面。
6. 新增語言時，需同步修改政策資料、`RoadiPremiumPolicy.tsx` 的語言切換與介面文字、`App.tsx` 路由，以及 `.github/workflows/deploy-pages.yml` 的實體入口與 `<title>`。

## 10. 不包含的事項

本文件不包含任何 GitHub 登入憑證、API token、付款資料或私密金鑰。下一個工具應使用使用者自己的 GitHub 授權流程接管儲存庫。
