# Price Checker Fixes - TODO

## Tasks
- [x] 1. Remove products.xlsx (keep CSV only)
- [x] 2. Fix index.html: offline-first init (no auto-fetch on load)
- [x] 3. Fix index.html: remove "Checking…" / "Loading…" on page load
- [x] 4. Fix index.html: update buildCsvUrl fallback path
- [x] 5. Fix settings.html: update default path and fallback URL
- [x] 6. Fix settings.html: update folder structure diagram
- [x] 7. Update README.md folder structure
- [x] 8. Test and verify

## New Tasks (Progress + Timestamp UX)
- [x] 1. Add CSV download progress tracking (percentage/bytes) in `index.html`
- [x] 2. Update loading badge text to show live progress
- [x] 3. Preserve fallback behavior when progress info is unavailable
- [x] 4. Update top timestamp copy to clearer “Last CSV update” wording
- [x] 5. Fix loading badge color/state when progress reaches 100%
- [x] 6. Improve timestamp visibility/fallback text at the top bar
- [ ] 7. Add `products_timestamp.txt` upload in `sync_sql_to_github.bat` only after CSV upload success
- [ ] 8. Update `index.html` to read/display timestamp from `products_timestamp.txt` (with fallback)
- [ ] 9. Full test: run script twice and verify CSV+TXT uploads and UI timestamp display

## Summary of Changes

### index.html
- `DOMContentLoaded`: Only call `loadCachedCSV()` — do NOT call `updateLastUpdated(null)` or `loadCSV()`
- `updateLastUpdated(null)`: Show empty instead of "Checking…"
- `loadCachedCSV()`: Explicitly handle no-cache state (show "No Data")
- `buildCsvUrl`: Fix fallback from `./data/products.csv` → `./products.csv`

### settings.html
- `buildCsvUrl`: Fix fallback from `./data/products.csv` → `./products.csv`
- Default path inputs: `data/products.csv` → `products.csv`
- Folder diagram: remove `data/` subfolder

### README.md
- Update folder structure to root-level `products.csv`

### Delete
- `products.xlsx`


