# PRICE_CHECK Fix Todo (BLACKBOXAI Progress)

Status: **In Progress** (Plan approved ✅)

## Breakdown from Approved Plan

### Step 1: Secure Local (Delete dangerous bat file)
- [x] Delete sync_sql_to_github.bat (gitignore protects) ✅

### Step 2: Install Tools
- [ ] Install Git (winget install --id Git.Git -e)
- [ ] Install GitHub CLI (winget install --id GitHub.cli)

### Step 3: Setup Repo
- [ ] git init
- [ ] git remote add origin https://github.com/Unixpected/PRICE_CHECK.git
- [ ] gh auth login --with-token <token> (save token securely)
- [ ] git fetch origin

### Step 4: Update TODO.md
- [ ] Edit original TODO.md: Mark steps 1-8 complete, note new token used
- [ ] git add && commit

### Step 5: Test App
- [ ] execute `start index.html`
- [ ] Verify scanner loads ~5k products, badge OK

### Step 6: PWA Icons
- [ ] Create icon-192.png, icon-512.png (simple pricecheck logos)
- [ ] Update manifest.json paths if needed

### Step 7: Commit/PR
- [ ] git checkout -b blackboxai/fixes
- [ ] git add . && git commit -m "Security fixes: delete bat, update TODO, add icons"
- [ ] gh pr create --title "blackboxai/fixes: Complete TODO, secure repo" --body "Revoked old token, deleted sync bat, marked TODO complete, added PWA icons"

**Next Action**: Confirm Step 1 done, then proceed to 2 (tools install). Ping after each step.

