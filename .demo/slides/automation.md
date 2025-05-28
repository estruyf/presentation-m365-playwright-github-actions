---
theme: monomi
layout: section
---

# Automation

---
layout: section
---

# GitHub Actions

## Automate your end-to-end tests

---

# What are GitHub Actions?

- **CI/CD** service
- Automate builds, **tests**, deployments, issues, etc.
- Workflows are defined in **YAML** files
- Triggered by **events**
- Actions are **reusable** tasks
- Runners are **virtual machines** to run your workflows
- **Free** for public repositories
- Private repositories get **free minutes** per month

---
layout: quote
---

# Mind the minute multipliers!

---

# Minute what?

## **macOS** and **Windows** runners are more expensive

<br />

| **Runner** | **Multiplier** |
| --- | --- |
| Linux | 1x |
| Windows | 2x |
| macOS | 10x |

<br />

## **Large runners** are more expensive (only for orgs and enterprises)

---
layout: section
---

# Step 1

## The repository

---
layout: default
---

# The repository

## Contents

- The SPFx solution &nbsp; `./packages/app`
- The tests &nbsp; `./e2e`
- The GitHub Actions Workflows &nbsp; `./github/workflows`

## Configuration

- Action variable(s)
  - e.g. URL
- Action secret(s)
  - e.g. username, password, TOPT secret key

---
layout: default
---

# Variables

- Non-sensitive information
- `${{ vars.<name> }}`

# Secrets

- Sensitive information
- Values are masked in build outputs
- `${{ secrets.<name> }}`

---
layout: default
---

# Location to define variables and secrets

- Organization level
- Repository level
- Environment level
- Workflow level (variables only)
