# Price Verifier - Setup Guide

A modern barcode scanning price verification tool that loads product data from a GitHub-hosted CSV file.

## Features

- **Real-time Barcode Scanning**: Uses your device camera to scan barcodes instantly
- **GitHub CSV Integration**: Load price data directly from a GitHub repository
- **Manual Search**: Look up prices by SKU or barcode
- **Offline Support**: Data is cached locally after first load
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Industrial Minimalism Design**: Clean, professional interface with high contrast for retail environments

## Quick Start

### 1. Prepare Your CSV File

Your CSV file should have the following columns (tab-separated):

```
cupc	citem	mprice	sku	cuom	istdpk	pos18
0	PGP PINEAPPLE LARGE	90	19050	KG	1	PGP PINEAPPLE LRGE
0	PGP PINEAPPLE MEDIUM	55	19049	KG	1	PGP PINEAPPLE MED
```

**Column Descriptions:**
- `cupc`: Barcode/UPC code
- `citem`: Product name/description
- `mprice`: Price (in your currency)
- `sku`: Stock Keeping Unit (product identifier)
- `cuom`: Unit of Measure (KG, PCS, etc.)
- `istdpk`: Standard pack quantity
- `pos18`: POS system description

### 2. Upload CSV to GitHub

1. Create a new GitHub repository (or use existing one)
2. Upload your CSV file to the repository
3. Go to the file in GitHub and click "Raw" button
4. Copy the raw content URL (should look like: `https://raw.githubusercontent.com/username/repo/main/prices.csv`)

### 3. Configure in Price Verifier

1. Click the **Settings icon** (⚙️) in the bottom-right corner
2. Paste your GitHub CSV raw URL
3. Click "Load CSV"
4. You should see "Products Loaded: X" in the Database Status

### 4. Start Scanning

- Click **"Open Camera"** to activate barcode scanning
- Point your device camera at a barcode
- The system will automatically detect and look up the price
- Alternatively, use **"Manual Search"** to enter a SKU directly

## Deployment to GitHub Pages

### Option A: Deploy Using Manus UI

1. Click the **Publish** button in the Management UI
2. Your site will be deployed to a Manus-hosted domain
3. You can configure a custom domain in Settings

### Option B: Deploy to Your Own GitHub Pages

1. Build the project:
   ```bash
   pnpm build
   ```

2. Create a new GitHub repository named `username.github.io`

3. Push the contents of the `dist` folder to the repository:
   ```bash
   cd dist
   git init
   git add .
   git commit -m "Deploy Price Verifier"
   git branch -M main
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

4. Your site will be available at `https://username.github.io`

## CSV URL Tips

- Always use the **raw content URL** from GitHub (click "Raw" button on GitHub)
- Make sure the CSV file is publicly accessible
- The file should be tab-separated (TSV format) or comma-separated (CSV format)
- Headers must match exactly: `cupc`, `citem`, `mprice`, `sku`, `cuom`, `istdpk`, `pos18`

## Camera Permissions

When you first click "Open Camera", your browser will ask for camera permission. You must allow it for barcode scanning to work.

**Note:** Camera access only works over HTTPS (or localhost for development).

## Troubleshooting

### "No camera device found"
- Check browser camera permissions
- Ensure you're using HTTPS (not HTTP)
- Try a different browser

### "CSV failed to load"
- Verify the URL is the raw GitHub content URL
- Check that the file is publicly accessible
- Ensure the CSV format matches the expected structure

### "Product not found"
- The barcode/SKU may not be in your CSV file
- Try manual search with the SKU
- Check that SKU values in CSV match your barcodes

### Barcode not scanning
- Ensure good lighting
- Hold camera steady
- Try different barcode angles
- Check that barcode is not damaged

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14.5+)
- Mobile browsers: Full support with camera access

## Privacy & Data

- All data is processed locally in your browser
- CSV data is cached in browser storage
- No data is sent to external servers (except GitHub for CSV fetch)
- Camera feed is not recorded or transmitted

## File Structure

```
price-verifier/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Scanner.tsx          # Camera barcode scanner
│   │   │   ├── Settings.tsx         # CSV configuration dialog
│   │   │   └── PriceResult.tsx      # Price display modal
│   │   ├── contexts/
│   │   │   └── PriceDataContext.tsx # CSV data management
│   │   ├── hooks/
│   │   │   └── useBarcodeScanner.ts # Barcode scanning logic
│   │   ├── pages/
│   │   │   └── Home.tsx             # Main interface
│   │   └── index.css                # Design tokens & styling
│   └── index.html
└── package.json
```

## Development

### Local Development
```bash
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Type Checking
```bash
pnpm check
```

## Technologies Used

- **React 19**: UI framework
- **Tailwind CSS 4**: Styling
- **ZXing**: Barcode detection library
- **shadcn/ui**: UI components
- **TypeScript**: Type safety
- **Vite**: Build tool

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Verify your CSV format matches the expected structure
3. Test with the provided sample data first
4. Check browser console for error messages (F12 → Console tab)
