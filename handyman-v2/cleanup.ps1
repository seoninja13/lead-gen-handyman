# Cleanup script to remove any app directory or page.tsx files
$projectRoot = "c:\Users\IvoD\repos\lead-gen-handyman\handyman-v2"

# Check if app directory exists at the root level
if (Test-Path "$projectRoot\app") {
    Write-Host "Found app directory at root level, removing..."
    Remove-Item -Path "$projectRoot\app" -Recurse -Force
}

# Check if app/page.tsx exists
if (Test-Path "$projectRoot\app\page.tsx") {
    Write-Host "Found app/page.tsx, removing..."
    Remove-Item -Path "$projectRoot\app\page.tsx" -Force
}

# Check if .next directory exists and remove it to clean the build cache
if (Test-Path "$projectRoot\.next") {
    Write-Host "Removing .next directory to clean build cache..."
    Remove-Item -Path "$projectRoot\.next" -Recurse -Force
}

Write-Host "Cleanup complete!"
