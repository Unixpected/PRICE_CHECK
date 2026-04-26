# 📦 PriceCheck — Store Price Checker

A free, mobile-friendly price checker web app hosted on GitHub Pages.  
Scan barcodes with your phone camera or search products manually.

---

## 🚀 Setup Guide (Step by Step)

### 1. Create a GitHub Account
Go to [github.com](https://github.com) and sign up for free.

### 2. Create a New Repository
- Click the **+** icon → **New repository**
- Name it: `price-checker` (or any name you want)
- Set it to **Public**
- Click **Create repository**

### 3. Upload the Files
Upload ALL these files to your repo:
```
price-checker/
├── index.html         ← main app
├── manifest.json      ← PWA support
├── README.md          ← this file
└── products.csv       ← your product data
```

> **Tip:** You can drag and drop files directly into GitHub in your browser.

### 4. Enable GitHub Pages
- Go to your repo → **Settings** tab
- Scroll to **Pages** (left sidebar)
- Under **Source**, select `Deploy from a branch`
- Choose branch: `main`, folder: `/ (root)`
- Click **Save**
- Wait ~1 minute, then your site is live at:
  `https://YOUR-USERNAME.github.io/price-checker/`

### 5. Configure the App
- Open your site on your phone
- Tap **⚙️ Settings**
- Fill in your **GitHub Username** and **Repository Name**
- Tap **Save & Reload Data**

---

## 📄 Updating Your Product CSV

1. Go to your GitHub repo
2. Click `products.csv` → click the ✏️ pencil (edit) icon
3. Paste your updated CSV content
4. Click **Commit changes**
5. Refresh the app — it will pull the new data automatically

### CSV Format (tab-separated):
```
cupc	citem	mprice	sku	cuom	istdpk	pos18
4800310117155	PRODUCT NAME	49	673484	PC	1	SHORT NAME
```

| Column | Description |
|--------|-------------|
| `cupc` | Barcode (0 = no barcode, weighed item) |
| `citem` | Product name |
| `mprice` | Selling price |
| `sku` | Internal SKU |
| `cuom` | Unit of measure (PC, KG, etc.) |
| `istdpk` | Standard pack |
| `pos18` | POS short name |

---

## 📱 Features

- 📷 **Barcode scanning** via phone camera (no app install needed)
- 🔍 **Manual search** by barcode number or product name
- 📋 **Browse all products** with live search filter
- ⚙️ **Configurable data source** — point to any CSV on GitHub
- 💾 **Settings saved** in your browser (no login needed)
- 📲 **Installable** as a home screen app (PWA)
- 🌙 **Dark UI** optimized for Android

---

## 💡 Tips

- **Camera not working?** Make sure you're on HTTPS (GitHub Pages is always HTTPS ✅)
- **Data not loading?** Repo must be **Public** for raw CSV access
- **Add to Home Screen** on Android: tap Chrome menu → "Add to Home screen"
- **Multiple stores?** Fork the repo and change the CSV path per store

---

## 📁 Recommended Folder Structure

```
your-repo/
├── index.html
├── manifest.json
└── products.csv       ← update this file to refresh prices
```

The CSV is read directly from the repo root. Set the path in Settings to `products.csv`.
