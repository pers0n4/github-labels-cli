import { Command, InvalidArgumentError, OptionValues } from "commander";
import { readFile, writeFile } from "fs/promises";
import { differenceWith, isEqual } from "lodash/fp";

import { name } from "../package.json";

import { GithubRestApiClient, api } from "./client";
import { Label } from "./types";

const validateRepository = (repository: string): [string, string] => {
  const repositoryRegexp = /^([\w-.]+)\/([\w-.]+)$/;
  if (!repositoryRegexp.test(repository)) {
    throw new InvalidArgumentError("Invalid repository name");
  }
  return repository.split("/") as [string, string];
};

export const printLabels = (): Command => {
  const cli = new Command("list")
    .argument("<repository>", "target owner/repo", validateRepository)
    .description("print all labels")
    .action(
      async (
        [owner, repo]: [string, string],
        _: OptionValues,
        command: Command,
      ): Promise<void> => {
        const client = GithubRestApiClient(command.parent?.opts()["token"]);
        const labels = await api.listLabels(client, owner, repo);
        console.log(labels);
      },
    );
  return cli;
};

export const exportLabels = (): Command => {
  const cli = new Command("export")
    .argument("<repository>", "target owner/repo", validateRepository)
    .description("export all labels")
    .option("-f, --file <filename>", "export filename", "labels.json")
    .action(
      async (
        [owner, repo]: [string, string],
        options: OptionValues,
        command: Command,
      ): Promise<void> => {
        const client = GithubRestApiClient(command.parent?.opts()["token"]);
        const labels = await api.listLabels(client, owner, repo);
        await writeFile(options["file"], JSON.stringify(labels, null, 2));
      },
    )
    .addHelpText(
      "after",
      `
Examples:
  ${name} export "owner/repo"
  ${name} export "owner/repo" -f labels.json`,
    );
  return cli;
};

export const importLabels = (): Command => {
  const cli = new Command("import")
    .argument("<repository>", "target owner/repo", validateRepository)
    .description("import all labels")
    .option("-f, --file <filename>", "import filename", "labels.json")
    .action(
      async (
        [owner, repo]: [string, string],
        options: OptionValues,
        command: Command,
      ): Promise<void> => {
        const client = GithubRestApiClient(command.parent?.opts()["token"]);
        const labels = await api.listLabels(client, owner, repo);
        const labelsForImport: Label[] = JSON.parse(
          await readFile(options["file"], "utf8"),
        );
        const difference: Label[] =
          differenceWith(isEqual)(labelsForImport)(labels);

        for (const label of difference) {
          if (labels.find((l) => l.name === label.name)) {
            console.log(`update label "${label.name}"`);
            await api.updateLabel(client, { owner, repo, ...label });
          } else {
            console.log(`create label "${label.name}"`);
            await api.createLabel(client, { owner, repo, ...label });
          }
        }
      },
    )
    .addHelpText(
      "after",
      `
Examples:
  ${name} import "owner/repo"
  ${name} import "owner/repo" -f labels.json`,
    );
  return cli;
};

export const clearLabels = (): Command => {
  const cli = new Command("clear")
    .argument("<repository>", "target owner/repo")
    .description("remove all labels")
    .action(
      async (
        [owner, repo]: [string, string],
        _: OptionValues,
        command: Command,
      ): Promise<void> => {
        const client = GithubRestApiClient(command.parent?.opts()["token"]);
        const labels = await api.listLabels(client, owner, repo);
        for (const { name } of labels) {
          await api.deleteLabel(client, owner, repo, name);
        }
      },
    );
  return cli;
};
