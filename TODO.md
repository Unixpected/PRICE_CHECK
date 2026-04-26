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


