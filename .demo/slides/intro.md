---
theme: monomi
layout: image
image: .demo/images/title.png
---

<!-- # Test Automation with GitHub Actions and Playwright for Microsoft 365 solutions -->

---
layout: image
image: .demo/images/sponsors.png
---

<!-- # Sponsors -->

---
customLayout: .demo/layouts/about-me.hbs
position: left
helloMsg: Hello!
name: Elio Struyf
imageSrc: https://elio.dev/eliostruyf_2024_bw_cutout.png
imageStyle: "background-position: center bottom; background-size: cover;"
job: "Struyf Consulting"
line1: "#Stickerpreneur @ pyod.shop"
line2: "Demo Time / Front Matter CMS"
social1: "eliostruyf.com 🦋 & 🌐"
social2: elio@struyfconsulting.be
transition: slide-up
---

<div class="recognitions">
  <img src=".demo/assets/profile/github.svg" height="30px" width="30px" />
  <img src=".demo/assets/profile/mvp.svg" height="30px" width="30px" />
  <img src=".demo/assets/profile/gde.svg" height="30px" width="30px" />
</div>

<style>
  .recognitions {
    display: flex;
    gap: 1rem;
    background: #F8F8F8;
    padding: 0.5rem;
    border-radius: 0;
    position: absolute;
    z-index: 999;
    bottom: 0;
    right: 0;
    height: 40px;
  }
</style>

---
layout: section
image: .demo/images/history.avif
---

# Part 1<hr />Recap

---
layout: image
image: .demo/images/money.avif
---

---
layout: image
image: .demo/images/happy.avif
---

---
layout: image
image: .demo/images/trust.avif
---

---

# What is end-to-end testing?

Testing the application: 

- from start to finish
- as a user would use it
- in a real environment
- in a real browser

It aims to ensure that the application behaves as expected.

---
layout: section
---

# Playwright

---

# Why Playwright?

- Ready for production (not just a preview)
- Uses popular programming languages (JavaScript/TypeScript/...)
- Widely adopted for web testing and automation
- Works on all major browsers and operating systems
- Gives you full control and easy debugging
- Simple to add to your CI/CD pipelines
- No vendor lock-in—use it anywhere
- Large, active community for support

---
layout: section
---

# Writing your tests

---
layout: image-right
image: .demo/images/website.png
---

# Using Playwright

<br />
<br />

### Navigation

```ts
await page.goto('https://eliostruyf.com');
```

<br />

### Get an element

```ts
const title = page.locator('header h2');
```

<br />

### Test assertion

```ts
await expect(title).toHaveText('Elio Struyf');
```

<dt-show clicks="1">

<dt-arrow
  x1="365"
  y1="390"
  x2="470"
  y2="25"
  line-color="#ff69b4"
  line-width="2"
  arrow-head="both">
</dt-arrow>

</dt-show>

---
layout: image-right
image: .demo/images/homepage-diff.png
---

# Pixel matching with snapshots

```ts
test("Check layout shift", async ({ page, browserName }) => {
  await page.goto("http://eliostruyf.com");

  await expect(page).toHaveScreenshot(`homepage.png`);
});
```

<style>
  pre {
    font-size: 12px;
  }
</style>


---

# API mocking

```ts
await page.route(url => url.href.includes("/_api/web/lists/getbytitle('Inventory')/items"),
  (route) => {
    return route.fulfill({
      status: 200,
      body: JSON.stringify({
        value: [{ Id: 1, Title: "Sticker 1" } ]
      }),
    });
  }
);

await page.route("**/_api/web/lists", async (route) => {
  await route.fulfill({
    status: 500,
  });
});
```

---
layout: section
---

# The app to test
