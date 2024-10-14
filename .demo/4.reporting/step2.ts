    ]);
    
    let runUrl = "";
    if (process.env.GITHUB_RUN_ID) {
      const runId = process.env.GITHUB_RUN_ID;
      const repo = process.env.GITHUB_REPOSITORY;
      runUrl = `${process.env.GITHUB_SERVER_URL}/${repo}/actions/runs/${runId}`;
    }

    config.reporter.push([
      "playwright-msteams-reporter",
      <MsTeamsReporterOptions>{
        webhookUrl: process.env.M365_WEBHOOK_URL,
        webhookType: "powerautomate",
        linkToResultsUrl: runUrl,
        mentionOnFailure: process.env.M365_USERNAME,
      },
    ]);
