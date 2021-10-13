---
title: GitHub action for automatic dependency updates
description: Setting up automatic dependency updates with GitHub dependabot action.
createdAt: 2021-10-14
updatedAt: 2021-10-14
slug: github_action_automatic_dependency_updates
---

When working on a project that utilizes several open source dependencies it can often feel like a part-time job keeping up-to-date with dependencies updates. This can accumulate over time and cause your `composer.json` and/or `package.json` file to quickly become out of date. Which makes for updating the latest and greatest in the future much more difficult. With GitHub actions is very easy to automate this process!

Inside your project you can create a file under the `.github` folder called `dependabot.yml` which you can configure to automatically search known package providers for updates, that will generate create pull requests that you can help keep your project updated.

Here is an example that can be setup to keep your Composer and Yarn json files in sync with the latest releases of your open source dependencies.

```yml [.github/dependabot.yml]
# Set GitHub dependabot action version
version: 2
updates:
  # List package source
  - package-ecosystem: "composer"
    directory: "/"
    # Configure how often
    schedule:
      interval: daily
      time: "15:30"
    # Automatically assign PR reviewer
    assignees:
      - "octocat"
    # Attach any labels
    labels:
      - "composer"
      - "dependencies"
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: daily
      time: "15:30"
    assignees:
      - "octocat"
    labels:
      - "yarn"
      - "dependencies"
```

> Note: Its important to have your composer.lock & yarn.lock file committed since GitHub's dependabot can properly update these files.
