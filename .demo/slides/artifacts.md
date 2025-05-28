---
theme: monomi
---

![](.demo/images/first-run.png)

---

![](.demo/images/errors.png)

---
layout: section
---

# Step 4

## Gathering the artifacts

---

# Types of artifacts

- Reports (e.g., HTML, traces)
- Snapshots (used for pixel matching)
- Screenshots
- Videos

---

# Upload the artifacts

```yml {all|3}
- name: Upload artifacts
  uses: actions/upload-artifact@v4
  if: ${{ !cancelled() }} # Only upload if the job was not cancelled
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30
```

<br />

- `name` Name of the artifact
- `path` Path to the artifact
- `retention-days` Number of days to keep the artifact (default: 90)

---

# Retrieving the artifacts

You can download the artifacts from the GitHub Actions UI per workflow run.

![](.demo/images/playwright-report.png)

---
layout: section
---

# Snapshots need to be generated

## Don't forget to add the snapshot generation to your tests

---

# Using wildcards

```yml
- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: ${{ inputs.snapshots }}
    path: tests/**/*-snapshots/
    retention-days: 30
```
