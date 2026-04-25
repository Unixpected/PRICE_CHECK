# GitHub Deployment Guide

## Option 1: Deploy to GitHub Pages (Recommended - Free)

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository named `username.github.io` (replace `username` with your GitHub username)
3. Make sure it's **Public**
4. Click "Create repository"

### Step 2: Upload Files

**Method A: Using GitHub Web Interface (Easiest)**

1. Go to your new repository
2. Click "Add file" → "Upload files"
3. Drag and drop all files from the `price-verifier-github` folder (or select them)
4. Include:
   - `index.html`
   - `README.md`
   - `.gitignore`
   - `assets/` folder (with CSS and JS files)
5. Add commit message: "Initial Price Verifier deployment"
6. Click "Commit changes"

**Method B: Using Git Command Line**

```bash
# Clone your repository
git clone https://github.com/username/username.github.io.git
cd username.github.io

# Copy all files from price-verifier-github folder here
cp -r /path/to/price-verifier-github/* .

# Add and commit
git add .
git commit -m "Initial Price Verifier deployment"

# Push to GitHub
git push origin main
```

### Step 3: Access Your Website

Your website will be live at: **`https://username.github.io`**

It may take a few minutes to appear. If you see a 404, wait a bit and refresh.

---

## Option 2: Deploy to a Different Repository

If you want to use a different repository name:

1. Create a new repository (any name, e.g., `price-verifier`)
2. Upload all files
3. Go to **Settings** → **Pages**
4. Under "Source", select **"Deploy from a branch"**
5. Select **`main`** branch and **`/ (root)`** folder
6. Click "Save"
7. Your site will be at: `https://username.github.io/price-verifier`

---

## Option 3: Use a Custom Domain

If you have your own domain:

1. Deploy files to GitHub (any repository)
2. Go to **Settings** → **Pages**
3. Under "Custom domain", enter your domain (e.g., `prices.example.com`)
4. Click "Save"
5. Update your domain's DNS settings to point to GitHub Pages:
   - Add an `A` record pointing to: `185.199.108.153`
   - Or add a `CNAME` record pointing to: `username.github.io`

---

## Step 4: Configure Your CSV

1. Open your deployed website (e.g., `https://username.github.io`)
2. Click the **Settings icon** (⚙️) in the bottom-right
3. Paste your GitHub CSV raw URL:
   - Example: `https://raw.githubusercontent.com/username/prices-repo/main/prices.csv`
4. Click "Load CSV"
5. You should see "Products Loaded: X" in the Database Status

---

## Updating Your CSV Data

To update prices:

1. Edit your CSV file on GitHub
2. The Price Verifier will automatically fetch the latest version
3. Users may need to refresh the page or clear browser cache

---

## Troubleshooting

### Site shows 404

- Wait 5-10 minutes for GitHub Pages to build
- Check that repository name is `username.github.io`
- Verify files are in the root directory
- Check GitHub Pages settings in repository Settings

### CSV not loading

- Verify the URL is the **raw GitHub content URL** (click "Raw" button)
- Check that the CSV file is **publicly accessible**
- Ensure the CSV format is correct (tab-separated)
- Test the URL directly in your browser

### Camera not working

- Ensure you're using **HTTPS** (GitHub Pages uses HTTPS by default ✓)
- Check browser camera permissions
- Try a different browser
- Restart your browser

### Changes not showing

- Hard refresh your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Wait a few minutes for GitHub Pages to rebuild

---

## File Structure in Repository

```
username.github.io/
├── index.html              # Main application
├── README.md               # Documentation
├── .gitignore              # Git configuration
├── GITHUB_DEPLOYMENT.md    # This file
└── assets/
    ├── index-*.css         # Styles
    └── index-*.js          # Application code
```

---

## Next Steps

1. ✅ Deploy files to GitHub
2. ✅ Configure CSV URL in settings
3. ✅ Test barcode scanning
4. ✅ Share the link with your team

Your Price Verifier is now live and ready to use!

---

## Need Help?

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **GitHub Issues**: Create an issue in your repository
- **Browser Console**: Press F12 to see error messages
