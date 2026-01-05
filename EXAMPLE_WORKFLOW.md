# Using Translation Action in GitHub Actions Workflow

## Option 1: Use Your Fork/Repo (Recommended for Testing)

If you've pushed your changes to your own repository (fork or new repo), you can reference it directly:

### Using a Branch
```yaml
name: Translate README

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      
      - name: Translate README to Korean
        id: translate
        uses: YOUR_USERNAME/translation-action@main  # or @your-branch-name
        with:
          provider: upstage
          lang: en-ko
          source: README.md
          api_key: ${{ secrets.UPSTAGE_API_KEY }}
          api_additional_parameter: solar-pro2
      
      - name: Save translated README
        run: |
          echo "${{ steps.translate.outputs.text }}" > README.ko.md
      
      - name: Commit and push
        if: github.ref == 'refs/heads/main'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add README.ko.md
          git commit -m "Update Korean translation" || exit 0
          git push
```

### Using a Specific Commit SHA
```yaml
- name: Translate README
  uses: YOUR_USERNAME/translation-action@abc123def456  # specific commit SHA
  with:
    provider: upstage
    lang: en-ko
    source: README.md
    api_key: ${{ secrets.UPSTAGE_API_KEY }}
```

### Using a Release Tag
If you create a release in your repo:
```yaml
- name: Translate README
  uses: YOUR_USERNAME/translation-action@v1.0.0  # release tag
  with:
    provider: upstage
    lang: en-ko
    source: README.md
    api_key: ${{ secrets.UPSTAGE_API_KEY }}
```

## Option 2: Use as Local Action (Same Repository)

If the translation-action is in the same repository, you can reference it as a local action:

```yaml
name: Translate README

on:
  push:
    branches: [ main ]

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      
      - name: Translate README
        id: translate
        uses: ./translation-action  # path to action directory
        with:
          provider: upstage
          lang: en-ko
          source: README.md
          api_key: ${{ secrets.UPSTAGE_API_KEY }}
          api_additional_parameter: solar-pro2
      
      - name: Save translated README
        run: |
          echo "${{ steps.translate.outputs.text }}" > README.ko.md
```

## Option 3: Wait for PR to be Merged

If you submit a PR to the original repo and it gets merged, you can use:

```yaml
- name: Translate README
  uses: fabasoad/translation-action@v4  # or @v5 if new version released
  with:
    provider: upstage
    lang: en-ko
    source: README.md
    api_key: ${{ secrets.UPSTAGE_API_KEY }}
```

## Complete Example Workflow

Here's a complete workflow that translates README and creates/updates a Korean version:

```yaml
name: Translate Documentation

on:
  push:
    branches: [ main ]
    paths:
      - 'README.md'
  workflow_dispatch:

jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Translate README to Korean (Upstage)
        id: translate-upstage
        uses: YOUR_USERNAME/translation-action@main
        with:
          provider: upstage
          lang: en-ko
          source: README.md
          api_key: ${{ secrets.UPSTAGE_API_KEY }}
          api_additional_parameter: solar-pro2
      
      - name: Translate README to Korean (OpenRouter)
        id: translate-openrouter
        uses: YOUR_USERNAME/translation-action@main
        with:
          provider: openrouter
          lang: en-ko
          source: README.md
          api_key: ${{ secrets.OPENROUTER_API_KEY }}
          api_additional_parameter: tngtech/deepseek-r1t2-chimera:free
      
      - name: Save Upstage translation
        run: |
          echo "${{ steps.translate-upstage.outputs.text }}" > README.ko.solar.md
      
      - name: Save OpenRouter translation
        run: |
          echo "${{ steps.translate-openrouter.outputs.text }}" > README.ko.deepseek.md
      
      - name: Commit and push translations
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add README.ko.*.md
          git diff --staged --quiet || git commit -m "Update Korean translations [skip ci]"
          git push
```

## Setting Up Secrets

Before using the workflow, add your API keys as GitHub Secrets:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add:
   - `UPSTAGE_API_KEY` - Your Upstage AI API key
   - `OPENROUTER_API_KEY` - Your OpenRouter API key (if using)

## Important Notes

1. **Build the action first**: Make sure to run `yarn build` or `npm run build` before pushing, as the action uses `dist/index.js`
2. **Private repos**: If your fork/repo is private, the workflow in other repos can still use it (they just need access)
3. **Branch protection**: If you're auto-committing, make sure your branch allows actions to push
4. **Rate limits**: Be aware of API rate limits when running in CI/CD

## Quick Start Steps

1. **Build the action:**
   ```bash
   cd translation-action
   yarn install
   yarn build
   ```

2. **Commit and push to your repo:**
   ```bash
   git add .
   git commit -m "Add OpenRouter and Upstage providers"
   git push origin main
   ```

3. **Use in workflow:**
   ```yaml
   uses: YOUR_USERNAME/translation-action@main
   ```

That's it! No need to wait for a PR to be merged.

