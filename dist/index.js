#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const dotenv_1 = require("dotenv");
const actions_1 = require("./actions");
dotenv_1.config();
const { name, version } = {
    name: "github-labels-cli",
    version: "0.1.2",
};
commander_1.program
    .name(name)
    .version(version)
    .description("A command line tool to manage GitHub labels")
    .showHelpAfterError()
    .option("-t, --token <token>", "access token", process.env["GITHUB_TOKEN"]);
commander_1.program
    .command("list")
    .argument("<repository>", "target owner/repo", actions_1.validateRepositoryArgument)
    .description("print all labels")
    .action(actions_1.printLabels);
commander_1.program
    .command("export")
    .argument("<repository>", "target owner/repo", actions_1.validateRepositoryArgument)
    .description("export all labels")
    .option("-f, --file <filename>", "export filename", "labels.json")
    .action(actions_1.exportLabels)
    .addHelpText("after", `
Examples:
  ${name} export "owner/repo"
  ${name} export "owner/repo" -f labels.json`);
commander_1.program
    .command("import")
    .argument("<repository>", "target owner/repo", actions_1.validateRepositoryArgument)
    .description("import all labels")
    .option("-f, --file <filename>", "import filename", "labels.json")
    .action(actions_1.importLabels)
    .addHelpText("after", `
Examples:
  ${name} import "owner/repo"
  ${name} import "owner/repo" -f labels.json`);
commander_1.program
    .command("clear")
    .argument("<repository>", "target owner/repo", actions_1.validateRepositoryArgument)
    .description("remove all labels")
    .action(actions_1.clearLabels);
commander_1.program.parse(process.argv);
