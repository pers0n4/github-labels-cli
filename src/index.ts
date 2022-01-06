#!/usr/bin/env node
import cli from "./cli/index.js";
import { readPackageJson } from "./utils.js";

const { name, version } = readPackageJson();

cli
  .name(name)
  .version(version)
  .description("A command line tool for manage GitHub labels")
  .showHelpAfterError()
  .showSuggestionAfterError()
  .parseAsync(process.argv);
