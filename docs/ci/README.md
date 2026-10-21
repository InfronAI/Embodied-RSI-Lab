# Optional GitHub Actions workflows

The full workflow source is preserved here because the publishing credentials do not have permission to create `.github/workflows` files. **These templates do not run automatically.**

- `ci.yml`: Python tests, frontend build, publication policy, and Gitleaks history scan.
- `pages.yml`: manually triggered build and deployment of the optional historical experiment gallery.

To enable them, use a GitHub credential authorized to write workflow files (for a classic personal access token, the `workflow` scope is required), then copy and commit:

```bash
mkdir -p .github/workflows
cp docs/ci/ci.yml .github/workflows/ci.yml
# Optional: also enable the gallery after configuring GitHub Pages.
# cp docs/ci/pages.yml .github/workflows/pages.yml
git add .github/workflows
git commit -m "Enable repository validation workflow"
git push
```

No repository or deployment secrets are needed for the base validation job. The Gitleaks template uses GitHub's built-in token and disables automated comments. If the repository is moved to an organization, review the action's organization license requirements before enabling it.
