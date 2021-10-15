---
title: Github action to automate release notes
description: Setting up GitHub action to automatically build version release draft notes.
createdAt: 2021-10-15
updatedAt: 2021-10-15
slug: github_action_to_automate_release_notes
---

Maintaining an open source or client project can be a lot of work itself. One important item for your customers, users, and yourself are proper documentation on what's been released. When using GitHub you can the Releases feature to easily track any updates and/or fixes to bugs. Typically, developers use semantic versioning for each release that symbolizes the Major, Minor, and Patch version of the software. However, keeping these `Release Notes` for each software version can become a lot to remember to do and in some cases is often a specific person job and responsibility at larger companies.

In this post I will show you how to quick and easily setup an GitHub action that can automatically build these release notes for you!

Starting off we are going to use the existing GitHub action workflow [release-drafter](https://github.com/release-drafter/release-drafter).

To add this to your project you are going to need to create the following file within the `.github/workflow/` directory

```bash
$ touch .github/workflows/release-drafter.yml
```

Now you can add the following to set some defaults for the GitHub action.

```yml [.github/workflows/release-drafter.yml]
name: Release Notes Builder

on:
  push:
    # optional set which branches to consider in the event
    branches:
      - main

jobs:
  update_release_draft:
    runs-on: ubuntu-latest
    steps:
      # Use the action
      - uses: release-drafter/release-drafter@v5
        with:
        # Use our config file we'll create later on
          config-name: release-drafter.yml
        # This is something GitHub requires, there is not secret you need to add to repo
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

Now after we setup the workflow action file we need to complete the config file
`release-drafter.yml` we told it to use.

So lets now create another new file:

```bash
$ touch .github/release-drafter.yml
```

We can customize this file to build our release notes automatically when the action is triggered.

```yml [.github/release-drafter.yml]
name-template: 'v$RESOLVED_VERSION'
tag-template: 'v$RESOLVED_VERSION'
categories:
  - title: '🚀 Features'
    label: 'feature'
      - 'enhancement'
      - 'improvement'
  - title: '🐛 Bug Fixes'
    label: 'bugfix'
change-template: '- $TITLE @$AUTHOR (#$NUMBER)'
change-title-escapes: '\<*_&'
version-resolver:
  major:
    labels:
      - 'major'
  minor:
    labels:
      - 'minor'
  patch:
    labels:
      - 'patch'
  default: patch
template: |
  ## What To Expect in Release:

  $CHANGES

```

Now you can focus more on code rather than writing documentation!
