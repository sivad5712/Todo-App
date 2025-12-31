@echo off
REM ===================================================================
REM ECHO Todo Assessment - GitHub Push Script (Windows Version)
REM ===================================================================
REM This script helps you push your project to GitHub
REM Run this from the project folder in Command Prompt or PowerShell
REM ===================================================================

echo.
echo ================================================================
echo        ECHO Todo Assessment - GitHub Push Script
echo ================================================================
echo.
echo This script will help you upload your project to GitHub.
echo Make sure you have Git installed before continuing!
echo.
pause

REM Step 1: Configure Git
echo.
echo ================================================================
echo Step 1: Setting up your Git identity
echo ================================================================
echo.

set /p GIT_NAME="Enter your full name (e.g., John Smith): "
set /p GIT_EMAIL="Enter your email (use the same email as your GitHub account): "

git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo.
echo ✓ Git configured with name: %GIT_NAME%
echo ✓ Git configured with email: %GIT_EMAIL%
echo.

REM Step 2: Get GitHub repository URL
echo.
echo ================================================================
echo Step 2: Enter your GitHub repository URL
echo ================================================================
echo.
echo Your repository URL should look like:
echo   https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
echo.
echo You can find this on your GitHub repository page by clicking
echo the green "Code" button and copying the HTTPS URL.
echo.

set /p REPO_URL="Paste your GitHub repository URL here: "

REM Remove .git if already present
set REPO_URL=%REPO_URL:.git=%

echo.
echo ✓ Repository URL set to: %REPO_URL%.git
echo.

REM Step 3: Initialize Git repository
echo.
echo ================================================================
echo Step 3: Preparing your project
echo ================================================================
echo.

REM Check if .git exists
if exist ".git" (
    echo A Git repository already exists in this folder.
    echo This is OK - we'll continue with the existing repository.
) else (
    echo Initializing a new Git repository...
    git init
    echo ✓ Git repository initialized
)

echo.

REM Step 4: Add all files
echo.
echo ================================================================
echo Step 4: Adding all project files
echo ================================================================
echo.

git add .

echo ✓ All files added to Git
echo.

REM Step 5: Create commit
echo.
echo ================================================================
echo Step 5: Creating a commit
echo ================================================================
echo.

git commit -m "Initial commit: ECHO Todo Assessment submission"

echo.
echo ✓ Commit created successfully
echo.

REM Step 6: Rename branch to main
echo.
echo ================================================================
echo Step 6: Setting up main branch
echo ================================================================
echo.

git branch -M main

echo ✓ Branch renamed to 'main'
echo.

REM Step 7: Add remote
echo.
echo ================================================================
echo Step 7: Connecting to GitHub
echo ================================================================
echo.

REM Remove existing remote if it exists
git remote remove origin 2>nul

git remote add origin %REPO_URL%.git

echo ✓ Connected to your GitHub repository
echo.

REM Step 8: Push to GitHub
echo.
echo ================================================================
echo Step 8: Uploading to GitHub
echo ================================================================
echo.
echo You may be prompted to enter your GitHub credentials:
echo   - Username: Your GitHub username
echo   - Password: Your Personal Access Token (NOT your GitHub password!)
echo.
echo If you don't have a Personal Access Token, see the guide for how to create one.
echo.

git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠ Push failed. This might happen if the repository already has content.
    echo.
    set /p FORCE_PUSH="Do you want to force push? This will overwrite the remote repository. (yes/no): "
    
    if /i "%FORCE_PUSH%"=="yes" (
        echo.
        echo Force pushing to GitHub...
        git push -u origin main --force
        
        if %ERRORLEVEL% EQU 0 (
            echo.
            echo ✓ Successfully force pushed to GitHub!
        ) else (
            echo.
            echo ✗ Force push failed. Please check your credentials and try again.
            echo See the COMPLETE_BEGINNER_GUIDE.txt for help.
            pause
            exit /b 1
        )
    ) else (
        echo.
        echo Push cancelled. Please resolve conflicts manually or force push later.
        pause
        exit /b 1
    )
) else (
    echo.
    echo ✓ Successfully pushed to GitHub!
)

echo.
echo ================================================================
echo                      SUCCESS!
echo ================================================================
echo.
echo Your project has been uploaded to GitHub!
echo.
echo Next steps:
echo   1. Go to your repository: %REPO_URL%
echo   2. Verify all files are there
echo   3. Copy the repository URL
echo   4. Submit it to ECHO recruiters
echo.
echo ================================================================
echo.
pause
