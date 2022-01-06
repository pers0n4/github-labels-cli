# GitHub Labels CLI

[![npm version](https://img.shields.io/npm/v/github-labels-cli?style=flat-square&color=cb3837&logo=npm)](https://www.npmjs.com/package/github-labels-cli)
[![npm downloads](https://img.shields.io/npm/dt/github-labels-cli?style=flat-square&color=339933)](https://www.npmjs.com/package/github-labels-cli)
[![license](https://img.shields.io/npm/l/github-labels-cli?style=flat-square&color=5f4b8b)](https://github.com/pers0n4/github-labels-cli/blob/main/LICENSE)

## Features

- List all labels on a repository
- Export labels as a JSON file
- Import labels from a JSON file
- Remove labels from a repository interactively
- Create a sample labels file

## Installation

```shell
npm install -g github-labels-cli

pnpm add -g github-labels-cli
```

## Usage

```shell
# provides GitHub token for authentication
export GITHUB_TOKEN=...
github-labels-cli
# or
github-labels-cli --token=...

github-labels-cli --help

github-labels-cli list <owner/repo>
github-labels-cli export <owner/repo> [filenmae]
github-labels-cli import <owner/repo> [filenmae]
github-labels-cli remove <owner/repo> 
github-labels-cli sample [filename]
```

## LICENSE

[MIT License](./LICENSE)
