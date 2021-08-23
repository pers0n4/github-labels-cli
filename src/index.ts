#!/usr/bin/env node
import "dotenv/config";

import { program } from "commander";

import { name, version } from "../package.json";

import {
  clearLabels,
  exportLabels,
  importLabels,
  printLabels,
  validateRepositoryArgument,
} from "./actions";

program
  .name(name)
  .version(version)
  .description("A command line tool to manage GitHub labels")
  .showHelpAfterError()
  .option(
    "-t, --token <token>",
    "access token",
    process.env["GITHUB_TOKEN"] as string,
  );

program
  .command("list")
  .argument("<repository>", "target owner/repo", validateRepositoryArgument)
  .description("print all labels")
  .action(printLabels);

program
  .command("export")
  .argument("<repository>", "target owner/repo", validateRepositoryArgument)
  .description("export all labels")
  .option("-f, --file <filename>", "export filename", "labels.json")
  .action(exportLabels)
  .addHelpText(
    "after",
    `
Examples:
  ${name} export "owner/repo"
  ${name} export "owner/repo" -f labels.json`,
  );

program
  .command("import")
  .argument("<repository>", "target owner/repo", validateRepositoryArgument)
  .description("import all labels")
  .option("-f, --file <filename>", "import filename", "labels.json")
  .action(importLabels)
  .addHelpText(
    "after",
    `
Examples:
  ${name} import "owner/repo"
  ${name} import "owner/repo" -f labels.json`,
  );

program
  .command("clear")
  .argument("<repository>", "target owner/repo", validateRepositoryArgument)
  .description("remove all labels")
  .action(clearLabels);

program.parse(process.argv);
