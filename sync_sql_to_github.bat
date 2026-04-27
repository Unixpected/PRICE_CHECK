@echo off
setlocal EnableExtensions

REM ==========================================================
REM SQL Server -> products.csv -> GitHub (main) uploader
REM ==========================================================

REM --- SQL CONFIG ---
set "SQL_SERVER=192.115.1.100"
set "SQL_USER=sa"
set "SQL_PASS=sa"
set "SQL_DB=ExclusivesDB"

REM --- CSV OUTPUT ---
set "CSV_FILE=products.csv"
set "WORK_SQL=_export_products.sql"

REM --- GITHUB CONFIG ---
set "GITHUB_USER=Unixpected"
set "GITHUB_REPO=PRICE_CHECK"
set "GITHUB_BRANCH=main"
set "GITHUB_PATH=products.csv"
set "TIMESTAMP_FILE=products_timestamp.txt"
set "GITHUB_TOKEN=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"

echo.
echo [1/6] Checking required tools...
where sqlcmd >nul 2>nul
if errorlevel 1 (
  echo ERROR: sqlcmd not found. Install SQL Server Command Line Utilities.
  goto :fail
)

where powershell >nul 2>nul
if errorlevel 1 (
  echo ERROR: powershell not found.
  goto :fail
)

echo [2/6] Building SQL export query...
> "%WORK_SQL%" echo SET NOCOUNT ON;
>> "%WORK_SQL%" echo SELECT 'cupc,citem,mprice,sku,cuom,istdpk,pos18';
>> "%WORK_SQL%" echo SELECT
>> "%WORK_SQL%" echo   '"' + REPLACE(ISNULL(CAST(cupc AS varchar(255)),''),'"','""') + '","'
>> "%WORK_SQL%" echo + REPLACE(ISNULL(CAST(citem AS varchar(max)),''),'"','""') + '","'
>> "%WORK_SQL%" echo + REPLACE(ISNULL(CAST(mprice AS varchar(255)),''),'"','""') + '","'
>> "%WORK_SQL%" echo + REPLACE(ISNULL(CAST(sku AS varchar(255)),''),'"','""') + '","'
>> "%WORK_SQL%" echo + REPLACE(ISNULL(CAST(cuom AS varchar(255)),''),'"','""') + '","'
>> "%WORK_SQL%" echo + REPLACE(ISNULL(CAST(istdpk AS varchar(255)),''),'"','""') + '","'
>> "%WORK_SQL%" echo + REPLACE(ISNULL(CAST(pos18 AS varchar(255)),''),'"','""') + '"'
>> "%WORK_SQL%" echo FROM dbo.TBLpricechk;

echo [3/6] Exporting SQL table to %CSV_FILE% (with retry copy)...
:: No aggressive taskkill; use copy/del to handle locks

:: Temp CSV + copy/del with retry to handle locks/access denied
set "TEMP_CSV=_temp_products.csv"
sqlcmd -S "%SQL_SERVER%" -U "%SQL_USER%" -P "%SQL_PASS%" -d "%SQL_DB%" -i "%WORK_SQL%" -h -1 -W -s "," -o "%TEMP_CSV%"
if errorlevel 1 (
  echo ERROR: SQL export failed.
  goto :fail
)

:: Retry copy 3 times
set /a retries=0
:retry_copy
if exist "%CSV_FILE%" del /f /q "%CSV_FILE%" 2>nul
copy /Y "%TEMP_CSV%" "%CSV_FILE%" >nul
if errorlevel 1 (
  set /a retries+=1
  if !retries! lss 3 (
    timeout /t 2 /nobreak >nul
    goto retry_copy
  )
  echo ERROR: Failed to copy temp CSV after 3 retries.
  goto :fail
)
del /f /q "%TEMP_CSV%" 2>nul

echo [4/6] Building GitHub payload (Base64 + JSON)...
powershell -NoProfile -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$csvPath = Join-Path (Get-Location) '%CSV_FILE%';" ^
  "if (!(Test-Path $csvPath)) { throw 'CSV file not found: ' + $csvPath };" ^
  "$bytes = [System.IO.File]::ReadAllBytes($csvPath);" ^
  "$b64 = [Convert]::ToBase64String($bytes);" ^
  "$headers = @{ Authorization = 'Bearer %GITHUB_TOKEN%'; 'User-Agent' = 'sql-sync-bat'; Accept = 'application/vnd.github+json' };" ^
  "$apiUrl = 'https://api.github.com/repos/%GITHUB_USER%/%GITHUB_REPO%/contents/%GITHUB_PATH%';" ^
  "$sha = $null;" ^
  "try { $resp = Invoke-RestMethod -Method Get -Uri $apiUrl -Headers $headers; if ($resp.sha) { $sha = $resp.sha } } catch {}" ^
  "$payload = @{ message = 'Auto update products.csv from SQL Server'; content = $b64; branch = '%GITHUB_BRANCH%' };" ^
  "if ($sha) { $payload.sha = $sha };" ^
  "$json = $payload | ConvertTo-Json -Compress;" ^
  "[System.IO.File]::WriteAllText((Join-Path (Get-Location) '_github_upload.json'), $json, [System.Text.Encoding]::UTF8);"
if errorlevel 1 (
  echo ERROR: Failed to build JSON payload.
  goto :fail
)

echo [5/7] Uploading CSV to GitHub via API...
powershell -NoProfile -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$apiUrl = 'https://api.github.com/repos/%GITHUB_USER%/%GITHUB_REPO%/contents/%GITHUB_PATH%';" ^
  "$headers = @{ Authorization = 'Bearer %GITHUB_TOKEN%'; 'User-Agent' = 'sql-sync-bat'; Accept = 'application/vnd.github+json' };" ^
  "$body = Get-Content -Raw -Path '_github_upload.json';" ^
  "$resp = Invoke-WebRequest -UseBasicParsing -Method Put -Uri $apiUrl -Headers $headers -ContentType 'application/json' -Body $body;" ^
  "$code = [int]$resp.StatusCode;" ^
  "if ($code -eq 200 -or $code -eq 201) { Write-Output ('SUCCESS:' + $code) } else { Write-Output ('FAIL:' + $code); exit 1 }"
if errorlevel 1 (
  echo ERROR: GitHub CSV upload failed.
  goto :fail
)

echo [6/7] Uploading timestamp file (only after CSV success)...
powershell -NoProfile -Command ^
  "$ErrorActionPreference='Stop';" ^
  "$tsPath = Join-Path (Get-Location) '%TIMESTAMP_FILE%';" ^
  "$now = (Get-Date).ToString('o');" ^
  "[System.IO.File]::WriteAllText($tsPath, $now, [System.Text.Encoding]::UTF8);" ^
  "$bytes = [System.IO.File]::ReadAllBytes($tsPath);" ^
  "$b64 = [Convert]::ToBase64String($bytes);" ^
  "$headers = @{ Authorization = 'Bearer %GITHUB_TOKEN%'; 'User-Agent' = 'sql-sync-bat'; Accept = 'application/vnd.github+json' };" ^
  "$apiUrl = 'https://api.github.com/repos/%GITHUB_USER%/%GITHUB_REPO%/contents/%TIMESTAMP_FILE%';" ^
  "$sha = $null;" ^
  "try { $resp = Invoke-RestMethod -Method Get -Uri $apiUrl -Headers $headers; if ($resp.sha) { $sha = $resp.sha } } catch {}" ^
  "$payload = @{ message = 'Auto update products_timestamp.txt after CSV upload success'; content = $b64; branch = '%GITHUB_BRANCH%' };" ^
  "if ($sha) { $payload.sha = $sha };" ^
  "$json = $payload | ConvertTo-Json -Compress;" ^
  "$resp = Invoke-WebRequest -UseBasicParsing -Method Put -Uri $apiUrl -Headers $headers -ContentType 'application/json' -Body $json;" ^
  "$code = [int]$resp.StatusCode;" ^
  "if ($code -eq 200 -or $code -eq 201) { Write-Output ('SUCCESS:' + $code) } else { Write-Output ('FAIL:' + $code); exit 1 }"
if errorlevel 1 (
  echo ERROR: GitHub timestamp upload failed.
  goto :fail
)

echo [7/7] Completed successfully.
echo SUCCESS: products.csv exported and uploaded to GitHub.
echo SUCCESS: products_timestamp.txt uploaded after CSV success.

del /q "%WORK_SQL%" 2>nul
del /q "_github_upload.json" 2>nul
pause
exit /b 0

:fail
echo Script failed.
pause
exit /b 1

