    config.reporter.push(["html"]);
    config.reporter.push([
      "@estruyf/github-actions-reporter",
      {
        showError: true,
        showArtifactsLink: true,
        azureStorageSAS: process.env.AZURE_STORAGE_SAS,
        azureStorageUrl: process.env.AZURE_STORAGE_URL,
      },
    ]);
