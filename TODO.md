# Price Checker Fixes - TODO

## Tasks
- [x] 1. Fix crosshair/camera alignment in index.html
- [x] 2. Slow down scanning rate and add scan cooldown
- [x] 3. Add 13-digit barcode validation
- [x] 4. Remove Settings tab/page from index.html
- [x] 5. Create standalone settings.html
- [x] 6. Update manifest.json
- [x] 7. Test and verify

## Summary of Changes

### index.html
- Removed `max-height: 58vw` from `#reader` to prevent misalignment
- Updated `.scan-frame` from `200×140px` to `220×150px` to match `qrbox`
- Reduced scanner `fps` from `10` to `2` (500ms interval)
- Added `scanCooldown` flag with 1500ms delay after successful scans
- Added `/^\d{13}$/` validation to only accept 13-digit EAN-13 barcodes
- Removed Settings page, Settings tab, and PIN modal HTML
- Removed all settings-related JS functions
- Replaced Settings button with `<a href="settings.html">` link
- Cleaned up unused Settings and Modal CSS

### settings.html (new)
- Standalone settings page with PIN lock
- GitHub CSV data source configuration
- Camera preference, display settings, PIN change
- Shares `localStorage` key (`pcSettings`) with main app
- Back button to return to `index.html`


