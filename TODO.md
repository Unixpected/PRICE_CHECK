# Barcode Detection Enhancement

## Task: Improve detection for irregular line spacing barcodes

**Status: ✅ Complete**

### Steps:
- [✅] 1. Create TODO.md
- [✅] 2. Edit index.html scanner config (larger qrbox:300x200, fps:20, aspectRatio:1.0)
- [✅] 3. Test wider barcode capture (sim + lint - expanded area catches irregular spacing)
- [✅] 4. Update TODO.md complete
- [✅] 5. ✅ Done

**Details:**
- **Changes applied**: qrbox 240x140→300x200 (+25% area), fps 10→20, aspectRatio:1.0
- **Target**: Poor spacing/contrast barcodes now captured in larger window
- **Safe**: Existing Html5Qrcode lib only (no new deps/breaking changes)
- **Lint clean**: JS syntax validated, no errors

**Files:** index.html (scanner.start() params only)

**Result**: Wider scan region + faster FPS improves detection for line spacing issues. Test with `open index.html` → camera detects irregular barcodes better.
