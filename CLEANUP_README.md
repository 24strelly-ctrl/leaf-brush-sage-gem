# Directory Cleanup Tool

This project includes a Python-based directory cleanup script (`scripts/cleanup.py`) for maintaining a clean workspace by removing build artifacts, temporary files, and other unnecessary files.

## Quick Start

```bash
# Preview what would be cleaned (safe, dry run)
npm run cleanup:report

# Archive files to cleanup_archive/ directory
npm run cleanup:archive

# Permanently delete files (use with caution)
npm run cleanup:delete

# Clean up build artifacts including .vercel/output
npm run cleanup:vercel
```

## Configuration

The cleanup behavior is controlled by `cleanup-config.json`. Key settings:

- **`build_artifacts`**: Patterns for build output directories and files
- **`temp_files`**: Patterns for temporary and system files
- **`log_files`**: Patterns for log files (archived by default)
- **`protected_patterns`**: Files/directories that are never deleted
- **`archive_dir`**: Directory where archived files are moved (default: `cleanup_archive`)
- **`dry_run`**: When `true`, no files are actually deleted (always review first!)
- **`project_specific.excludes`**: Directories to skip during scanning

## What Gets Cleaned

### Build Artifacts (Safe to Delete)
- `.vercel/output` — Vercel build output
- `.next`, `dist`, `build`, `target` — Framework build directories
- `__pycache__`, `.pytest_cache`, `.mypy_cache`, `.ruff_cache` — Python caches
- `*.pyc`, `*.pyo`, `.eggs`, `*.egg-info` — Python artifacts
- `.idea`, `.vscode` — IDE configuration
- `tsconfig.tsbuildinfo` — TypeScript build info

### Temporary Files (Safe to Delete)
- `*.tmp`, `*.temp`, `*.swp`, `*.swo`, `*~` — Editor/system temp files
- `.DS_Store`, `Thumbs.db`, `._*` — OS metadata files
- `.Spotlight-V100`, `.Trashes`, `.fseventsd` — macOS system folders

### Log Files (Archived by Default)
- `*.log`, `*.log.*`, `logs/`, `*.out`, `*.err` — Log files
- `hs_err_pid*.log`, `system.log`, `crush.log` — Java/system logs

## What's Protected (Never Deleted)

- **Version control**: `.git`
- **Environment**: `.env`, `*.env`, credentials, secrets, keys, certificates
- **Source code**: `src/`, `server/`, `scripts/`, `public/`
- **Configuration**: `package.json`, `tsconfig.json`, `vite.config.ts`, `vercel.json`
- **Documentation**: `AGENTS.md`, `GO_LIVE_GUIDE.md`, `DATABASE_SETUP.md`
- **Dependencies**: `node_modules`
- **Project data**: `archives/`, `migrations/`

## Advanced Usage

### Direct Python Script Usage

```bash
# Report mode (dry run)
python3 scripts/cleanup.py . --config cleanup-config.json --action report

# Archive mode
python3 scripts/cleanup.py . --config cleanup-config.json --action archive --no-dry-run

# Delete mode
python3 scripts/cleanup.py . --config cleanup-config.json --action delete --no-dry-run

# With Claude AI for intelligent cleanup decisions
python3 scripts/cleanup.py . --config cleanup-config.json --action report --intelligent --claude-api-key YOUR_KEY
```

### Intelligent Cleanup (Optional)

The script can optionally use Claude AI to analyze files and provide intelligent cleanup recommendations. This requires:

1. Install the Anthropic Python package: `pip install anthropic`
2. Set `ANTHROPIC_API_KEY` environment variable or pass `--claude-api-key`
3. Use the `--intelligent` flag

Claude will categorize files as:
- **SAFE_TO_DELETE** — Clearly safe to remove
- **REVIEW_NEEDED** — Needs human review
- **KEEP** — Should be preserved

## Best Practices

1. **Always run `cleanup:report` first** to see what will be affected
2. **Use `cleanup:archive` before `cleanup:delete`** if you're unsure
3. **Review the archive directory** before deleting it
4. **Customize `cleanup-config.json`** for your project's specific needs
5. **Add sensitive patterns to `protected_patterns`** to prevent accidental deletion

## Troubleshooting

### Script not found
Ensure Python 3 is installed: `python3 --version`

### Permission errors
Some files may require elevated permissions. Check file ownership and permissions.

### Accidental deletion
If you used `cleanup:archive`, files are in `cleanup_archive/`. If you used `cleanup:delete`, check your git history for recovery.

## Integration with CI/CD

You can add cleanup to your CI/CD pipeline:

```yaml
# Example for GitHub Actions
- name: Clean up build artifacts
  run: npm run cleanup:vercel
```

## License

This cleanup script is part of the App Builder Workspace project.
