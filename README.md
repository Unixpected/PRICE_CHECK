# Price Verifier

A modern, professional barcode scanning price verification tool that loads product data from a GitHub-hosted CSV file. Perfect for retail environments, warehouses, and inventory management.

## Features

- **Real-time Barcode Scanning**: Uses your device camera to scan barcodes instantly with ZXing library
- **GitHub CSV Integration**: Load price data directly from a GitHub repository (no backend needed)
- **Manual Search**: Look up prices by SKU or barcode code
- **Offline Support**: Data is cached locally after first load
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Industrial Minimalism Design**: Clean, professional interface with high contrast for retail environments
- **No Backend Required**: Fully static HTML/JavaScript - host anywhere

## Quick Start

### 1. Prepare Your CSV File

Your CSV file should be **tab-separated** with these columns:

```
cupc	citem	mprice	sku	cuom	istdpk	pos18
0	PGP PINEAPPLE LARGE	90	19050	KG	1	PGP PINEAPPLE LRGE
0	PGP PINEAPPLE MEDIUM	55	19049	KG	1	PGP PINEAPPLE MED
0	PGP PINEAPPLE RTE	60	20743	KG	1	PGP PINEAPPLE RTE
```

**Column Descriptions:**
| Column | Description |
|--------|-------------|
| `cupc` | Barcode/UPC code |
| `citem` | Product name/description |
| `mprice` | Price (in your currency) |
| `sku` | Stock Keeping Unit (product identifier) |
| `cuom` | Unit of Measure (KG, PCS, etc.) |
| `istdpk` | Standard pack quantity |
| `pos18` | POS system description |

### 2. Upload CSV to GitHub

1. **Create a GitHub repository** (or use an existing one)
2. **Upload your CSV file** to the repository
3. **Get the raw URL**:
   - Go to your CSV file on GitHub
   - Click the "Raw" button
   - Copy the URL from the address bar
   - Example: `https://raw.githubusercontent.com/username/repo/main/prices.csv`

### 3. Deploy This Website

#### Option A: GitHub Pages (Free)

1. Create a new repository named `username.github.io`
2. Upload all files from this folder to that repository
3. Your site will be live at `https://username.github.io`

#### Option B: Any Web Host

1. Upload all files to your web hosting provider
2. Access via your domain

#### Option C: Netlify (Free)

1. Connect your GitHub repository to Netlify
2. Deploy automatically

### 4. Configure & Use

1. Open the website
2. Click the **Settings icon** (⚙️) in the bottom-right
3. Paste your GitHub CSV raw URL
4. Click "Load CSV"
5. Click **"Open Camera"** to start scanning barcodes

## File Structure

```
.
├── index.html              # Main application (all-in-one file)
├── assets/
│   ├── index-*.css        # Compiled styles
│   └── index-*.js         # Compiled application
├── __manus__/             # Analytics (optional, can be removed)
├── README.md              # This file
└── .gitignore             # Git configuration
```

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | Recommended |
| Firefox | ✅ Full | Recommended |
| Safari | ✅ Full | iOS 14.5+ required for camera |
| Mobile Browsers | ✅ Full | Camera access required |

## Camera Permissions

- When you first click "Open Camera", your browser will request camera permission
- You must allow it for barcode scanning to work
- Camera access requires **HTTPS** (or localhost for development)
- Camera feed is processed locally - never recorded or transmitted

## CSV URL Tips

- Always use the **raw content URL** from GitHub (click "Raw" button)
- Ensure the CSV file is **publicly accessible**
- File should be **tab-separated** (TSV format)
- Headers must match exactly: `cupc`, `citem`, `mprice`, `sku`, `cuom`, `istdpk`, `pos18`
- Test with the sample data first to verify format

## Troubleshooting

### Camera Issues

**"No camera device found"**
- Check browser camera permissions
- Ensure you're using HTTPS (not HTTP)
- Try a different browser
- Restart your browser

**Barcode not scanning**
- Ensure good lighting
- Hold camera steady
- Try different barcode angles
- Check that barcode is not damaged or faded

### CSV Loading Issues

**"CSV failed to load"**
- Verify the URL is the **raw GitHub content URL** (not the regular GitHub page URL)
- Check that the file is **publicly accessible**
- Ensure the CSV format matches the expected structure (tab-separated)
- Test the URL in your browser to confirm it's accessible

**"Product not found"**
- The barcode/SKU may not be in your CSV file
- Try manual search with the exact SKU
- Check that SKU values in CSV match your barcodes
- Verify the CSV was loaded successfully (check Database Status)

### Performance

**Slow scanning**
- Ensure good lighting conditions
- Try holding camera at different angles
- Close other browser tabs
- Clear browser cache

## Privacy & Security

- ✅ All data is processed **locally in your browser**
- ✅ CSV data is cached in **browser storage** (localStorage)
- ✅ No data sent to external servers (except GitHub for CSV fetch)
- ✅ Camera feed is **not recorded or transmitted**
- ✅ Fully static site - no backend to compromise

## Technologies Used

- **React 19**: Modern UI framework
- **Tailwind CSS 4**: Utility-first styling
- **ZXing**: Barcode detection library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Lightning-fast build tool

## Customization

### Change Colors

Edit the `index.html` file and look for the CSS variables section. The main colors are:

```css
--primary: #10b981;           /* Emerald green for accents */
--background: oklch(0.98 0 0); /* White background */
--foreground: oklch(0.1 0.01 0); /* Dark charcoal text */
```

### Change Fonts

The application uses IBM Plex Mono for data (monospace) and system fonts for body text. To change, edit the font import in `index.html`.

### Modify Layout

The layout is responsive and uses Tailwind CSS classes. The main sections are in `index.html` - you can reorganize them as needed.

## Deployment Checklist

- [ ] CSV file prepared and uploaded to GitHub
- [ ] CSV file is publicly accessible
- [ ] Raw GitHub URL obtained
- [ ] Website files uploaded to hosting
- [ ] Website is accessible via HTTPS
- [ ] Camera permissions working
- [ ] Settings configured with CSV URL
- [ ] Test scan with sample barcode
- [ ] Manual search tested

## Support & Issues

1. **Check the Troubleshooting section** above
2. **Verify CSV format** matches the expected structure
3. **Test with sample data** first
4. **Check browser console** for error messages (F12 → Console)
5. **Ensure HTTPS** is enabled (required for camera access)

## License

This project is open source and available under the MIT License.

## Credits

Built with:
- React & TypeScript
- Tailwind CSS
- ZXing barcode detection
- shadcn/ui components

---

**Ready to deploy?** Upload all files to your GitHub repository and configure your CSV URL in the settings!
