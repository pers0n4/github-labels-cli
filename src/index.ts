import "dotenv/config";

import { Command } from "commander";

import { name, version } from "../package.json";

import { clearLabels, exportLabels, importLabels, printLabels } from "./cli";

const program = new Command();

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
  .addCommand(printLabels())
  .addCommand(exportLabels())
  .addCommand(importLabels())
  .addCommand(clearLabels())
  .parse(process.argv);
