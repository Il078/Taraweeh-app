# GitHub Deployment Setup

This guide will help you set up your Taraweeh App for deployment on GitHub Pages.

## 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name the repository `taraweeh-app`
4. Set the repository to Public
5. Do not initialize with README, .gitignore, or license (we'll push our existing content)
6. Click "Create repository"

## 2. Initialize Git and Push to GitHub

Run these commands in your project directory, replacing `YOUR_USERNAME` with your GitHub username:

```bash
# Initialize Git repository
git init

# Add all files to staging
git add .

# Commit the files
git commit -m "Initial commit"

# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/taraweeh-app.git

# Push to GitHub
git push -u origin main
```

If your default branch is named "master" instead of "main", use:

```bash
git push -u origin master
```

## 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Click on "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The workflow we included in the project will automatically build and deploy your site

## 4. Wait for Deployment

1. Go to the "Actions" tab in your repository
2. You should see a workflow running (or completed)
3. Once the workflow completes, your site will be available at:
   `https://YOUR_USERNAME.github.io/taraweeh-app/`

## 5. Custom Domain (Optional)

If you want to use a custom domain:

1. In the GitHub Pages settings, enter your custom domain
2. Update DNS records with your domain provider
3. Remove the `basePath` from `next.config.mjs`

## Troubleshooting

- If the build fails, check the Actions tab for error details
- Make sure your repository is public
- If you're having issues with the base path, check that paths in manifest.json and service worker are correct 