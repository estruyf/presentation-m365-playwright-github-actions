# Presentation material for M365 E2E testing automation with Playwright on GitHub Actions

## Configuration

In the `e2e` directory, create a `.env` file with the following content:

```bash
M365_PAGE_URL=
M365_WEBHOOK_URL=

M365_USERNAME=
M365_PASSWORD=
```

For the TOPT token, create a `.env.token` file with the following content:

```bash
M365_OTP_SECRET=
```

### Variables

- `M365_PAGE_URL`
- `M365_WEBHOOK_URL`

### Secrets

- `M365_USERNAME`
- `M365_PASSWORD`
- `M365_OTP_SECRET`

## Links

- <https://slides.elio.dev>
- <https://mysignins.microsoft.com/security-info>
- <https://make.powerautomate.com/>

## Starting a new talk

- Create a new `dev` branch

## Clean up after the session

- Remove the `dev` branch
- Remove all workflow runs:

```bash
repo=$(gh repo view --json nameWithOwner | jq -r .nameWithOwner)
gh api repos/$repo/actions/runs --paginate | jq -r -c '.workflow_runs[] | "\(.id)"' | \
xargs -n1 -I % gh api repos/$repo/actions/runs/% -X DELETE | jq -r .status
```
