import { Argument, Command } from "commander";

import { exportLabels, importLabels, listLabels } from "./actions";
import { validOwnerRepo } from "./helper";

const repositoryArgument = new Argument(
  "<owner/repo>",
  "github repository path to operate",
).argParser((repository) => validOwnerRepo(repository));

export const listLabelsCommand = () => {
  const command = new Command("list");

  command
    .description("show repository labels")
    .addArgument(repositoryArgument)
    .action(listLabels);

  return command;
};

export const exportLabelsCommand = () => {
  const command = new Command("export");

  command
    .description("export labels to file")
    .addArgument(repositoryArgument)
    .argument("[filename]", "filename to export", "labels.json")
    .action(exportLabels);

  return command;
};

export const importLabelsCommand = () => {
  const command = new Command("import");

  command
    .description("import labels from a file")
    .addArgument(repositoryArgument)
    .argument("[filename]", "filename to import", "labels.json")
    .action(importLabels);

  return command;
};
