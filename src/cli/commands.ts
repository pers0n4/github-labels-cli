import { Command } from "commander";

import {
  exportLabels,
  importLabels,
  listLabels,
  removeLabels,
  sampleLabels,
} from "./actions.js";
import { repositoryArgument } from "./helper.js";

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
    .argument("[filename]", "filename to import")
    .action(importLabels);

  return command;
};

export const removeLabelsCommand = () => {
  const command = new Command("remove");

  command
    .description("remove labels from a repository")
    .addArgument(repositoryArgument)
    // .argument("[labels...]", "labels to remove")
    .action(removeLabels);

  return command;
};

export const sampleLabelsCommand = () => {
  const command = new Command("sample");

  command
    .description("create a sample labels file")
    .argument("[filename]", "sample labels filename", "labels.json")
    .action(sampleLabels);

  return command;
};
