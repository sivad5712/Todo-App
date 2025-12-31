#!/bin/bash

# ECHO Todo Assessment - GitHub Push Automation Script
# This script automates the process of pushing your code to GitHub

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions for colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_step() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

# Banner
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║   🚀 ECHO Todo Assessment GitHub Push Script 🚀     ║"
echo "║                                                       ║"
echo "║   This script will help you push your code to        ║"
echo "║   GitHub in just a few simple steps!                 ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}\n"

# Step 1: Verify we're in the right directory
print_step "Step 1: Verifying project location"

if [[ ! -f "package.json" ]] || [[ ! -d "backend" ]] || [[ ! -d "frontend" ]]; then
    print_error "This doesn't look like the todo_assessment directory!"
    print_info "Please run this script from: /home/ubuntu/todo_assessment"
    print_info "Use: cd /home/ubuntu/todo_assessment && bash push_to_github.sh"
    exit 1
fi

print_success "Found todo_assessment project!"
print_info "Current directory: $(pwd)"

# Step 2: Check if Git is installed
print_step "Step 2: Checking Git installation"

if ! command -v git &> /dev/null; then
    print_error "Git is not installed!"
    print_info "Please install Git first:"
    print_info "  - Mac: brew install git"
    print_info "  - Linux: sudo apt-get install git"
    print_info "  - Windows: Download from https://git-scm.com/download/win"
    exit 1
fi

GIT_VERSION=$(git --version)
print_success "Git is installed: $GIT_VERSION"

# Step 3: Check Git configuration
print_step "Step 3: Checking Git configuration"

GIT_USER=$(git config --global user.name 2>/dev/null || echo "")
GIT_EMAIL=$(git config --global user.email 2>/dev/null || echo "")

if [[ -z "$GIT_USER" ]] || [[ -z "$GIT_EMAIL" ]]; then
    print_warning "Git is not configured with your name and email."
    print_info "Let's set that up now!\n"
    
    read -p "Enter your name (e.g., John Smith): " USER_NAME
    read -p "Enter your email (same as GitHub): " USER_EMAIL
    
    git config --global user.name "$USER_NAME"
    git config --global user.email "$USER_EMAIL"
    
    print_success "Git configured with:"
    print_info "  Name: $USER_NAME"
    print_info "  Email: $USER_EMAIL"
else
    print_success "Git is already configured:"
    print_info "  Name: $GIT_USER"
    print_info "  Email: $GIT_EMAIL"
fi

# Step 4: Get GitHub repository URL
print_step "Step 4: GitHub repository setup"

print_info "You need to create a repository on GitHub first if you haven't already."
print_info "Go to: https://github.com/new"
print_info ""
print_info "Repository settings:"
print_info "  - Name: echo-todo-assessment"
print_info "  - Visibility: Public (IMPORTANT!)"
print_info "  - DO NOT initialize with README, .gitignore, or license"
print_info ""

read -p "Enter your GitHub repository URL (e.g., https://github.com/username/echo-todo-assessment.git): " REPO_URL

# Validate URL format
if [[ ! "$REPO_URL" =~ ^https://github\.com/.+/.+(\.git)?$ ]]; then
    print_error "Invalid GitHub URL format!"
    print_info "URL should look like: https://github.com/username/echo-todo-assessment.git"
    exit 1
fi

# Add .git if not present
if [[ ! "$REPO_URL" =~ \.git$ ]]; then
    REPO_URL="${REPO_URL}.git"
fi

print_success "Repository URL: $REPO_URL"

# Step 5: Initialize Git repository
print_step "Step 5: Initializing Git repository"

if [[ -d ".git" ]]; then
    print_info "Git repository already initialized."
    
    # Check if there are uncommitted changes
    if [[ -n $(git status -s) ]]; then
        print_warning "You have uncommitted changes."
    fi
else
    print_info "Initializing new Git repository..."
    git init
    print_success "Git repository initialized!"
fi

# Step 6: Add all files
print_step "Step 6: Staging files for commit"

print_info "Adding all project files to Git..."
print_info "(Files in .gitignore will be automatically skipped)"

git add .

FILES_COUNT=$(git diff --cached --numstat | wc -l | tr -d ' ')
print_success "Staged $FILES_COUNT files for commit"

# Show what's being committed
print_info "\nFiles to be committed:"
git status --short | head -n 20
if [[ $(git status --short | wc -l) -gt 20 ]]; then
    print_info "... and $(( $(git status --short | wc -l) - 20 )) more files"
fi

# Step 7: Create commit
print_step "Step 7: Creating commit"

COMMIT_MESSAGE="Initial commit: ECHO todo assessment submission

Full-stack todo application with:
- Backend: Node.js + Express.js + TypeScript
- Frontend: React + Redux Toolkit + TypeScript
- Features: CRUD operations, categories, filtering, sorting
- Complete documentation and setup instructions"

print_info "Creating commit with message:"
print_info "'Initial commit: ECHO todo assessment submission'"

git commit -m "$COMMIT_MESSAGE" || {
    print_warning "Nothing to commit (files may already be committed)"
}

print_success "Commit created!"

# Step 8: Rename branch to main
print_step "Step 8: Setting up main branch"

CURRENT_BRANCH=$(git branch --show-current)

if [[ "$CURRENT_BRANCH" != "main" ]]; then
    print_info "Renaming branch from '$CURRENT_BRANCH' to 'main'..."
    git branch -M main
    print_success "Branch renamed to 'main'"
else
    print_success "Already on 'main' branch"
fi

# Step 9: Add remote
print_step "Step 9: Connecting to GitHub"

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    print_warning "Remote 'origin' already exists. Updating URL..."
    git remote set-url origin "$REPO_URL"
    print_success "Remote URL updated!"
else
    print_info "Adding GitHub remote..."
    git remote add origin "$REPO_URL"
    print_success "Connected to GitHub!"
fi

print_info "Remote URL: $(git remote get-url origin)"

# Step 10: Push to GitHub
print_step "Step 10: Pushing to GitHub"

print_info "Uploading your code to GitHub..."
print_info "This may take a moment depending on your internet speed."
print_info ""
print_warning "If prompted for credentials:"
print_info "  - Username: Your GitHub username"
print_info "  - Password: Use a Personal Access Token (NOT your GitHub password)"
print_info "  - Token creation: GitHub → Settings → Developer settings → Personal access tokens"
print_info ""

echo -e "${YELLOW}Press Enter when ready to push...${NC}"
read

# Try to push
if git push -u origin main 2>&1; then
    print_success "Code successfully pushed to GitHub! 🎉🎉🎉"
else
    print_error "Push failed. Trying alternative method..."
    
    print_info "Attempting force push (use carefully!)..."
    
    read -p "Do you want to force push? This will overwrite remote. (yes/no): " FORCE_CONFIRM
    
    if [[ "$FORCE_CONFIRM" == "yes" ]]; then
        git push -u origin main --force
        print_success "Force push successful!"
    else
        print_error "Push cancelled. Please resolve conflicts manually."
        print_info "Try: git pull origin main --allow-unrelated-histories"
        print_info "Then: git push -u origin main"
        exit 1
    fi
fi

# Step 11: Verification
print_step "Step 11: Verification"

REPO_WEB_URL="${REPO_URL%.git}"
REPO_WEB_URL="${REPO_WEB_URL/git@github.com:/https://github.com/}"

print_success "✅ Your code is now on GitHub!"
print_info ""
print_info "📦 Repository URL:"
print_info "   $REPO_WEB_URL"
print_info ""
print_info "🔍 Verification steps:"
print_info "   1. Open the URL above in your browser"
print_info "   2. Check that you see:"
print_info "      - backend/ folder"
print_info "      - frontend/ folder"
print_info "      - README.md (displayed below the files)"
print_info "      - package.json"
print_info ""
print_info "📧 Send to ECHO recruiters:"
print_info "   Subject: ECHO Todo Assessment Submission - [Your Name]"
print_info "   Body: Include the repository URL above"
print_info ""
print_info "   Template email is in SUBMISSION_GUIDE.md (Part 8)"
print_info ""

# Final banner
echo -e "${GREEN}"
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                                                       ║"
echo "║            🎉 SUBMISSION COMPLETE! 🎉                ║"
echo "║                                                       ║"
echo "║   Your ECHO todo assessment is ready for review!     ║"
echo "║                                                       ║"
echo "║   Good luck with your application! 🍀               ║"
echo "║                                                       ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo -e "${NC}\n"

print_info "For detailed instructions, see: SUBMISSION_GUIDE.md"
print_info "Repository: $REPO_WEB_URL"

exit 0
