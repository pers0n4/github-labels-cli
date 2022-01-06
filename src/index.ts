#!node --experimental-specifier-resolution=node
import cli from "./cli";
import { readPackageJson } from "./utils";

const { name, version } = readPackageJson();

cli
  .name(name)
  .version(version)
  .description("A command line tool for manage GitHub labels")
  .showHelpAfterError()
  .showSuggestionAfterError()
  .parseAsync(process.argv);
