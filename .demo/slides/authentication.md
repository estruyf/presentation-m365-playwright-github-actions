---
theme: monomi
layout: section
---

# AUTH

<style>
  h1 {
    font-size: 250px !important;
    text-align: center;
  }
</style>

---
layout: section
---

# MFA

<style>
  h1 {
    font-size: 250px !important;
    text-align: center;
  }
</style>

---
layout: section
---

# In part 1

## I said to use an account without MFA


---
layout: section
---

# 🤪🔫

<style>
  .slide__layout,
  .slide__content__inner {
    background: #fff !important;
  }

  h1 {
    font-size: 250px !important;
    background: #fff !important;
    text-align: center;
  }
</style>

---
layout: section
---

# Let us fix that


---

![](.demo/images/mfa-prompt.webp)

<style>
  img {
    height: 450px;
    margin: 0 auto;
  }
</style>


---

# The options

```mermaid
flowchart LR
  a[Playwright authentication]
  c[MFA]
  d[Using Time-based One-Time Password]
  e[Using an auth state]
  f[Start testing]

  a --> c
  c --> d
  d --> f
  c --> e
  e --> f
```

<br />

> Reference: [Using an authenticated session](https://www.eliostruyf.com/e2e-testing-mfa-environment-playwright-auth-session/)

---
layout: section
---

# Using TOTP

## Time-based One-Time Password

---
layout: section
---

# Creation of TOTP

## Secret key + Current time
