import { Command, InvalidOptionArgumentError, OptionValues } from "commander";
import { readFile, writeFile } from "fs/promises";
import { differenceWith, isEqual } from "lodash";

import { GithubRestApiClient, api, validateRepository } from "./github";
import { Label } from "./types";

export const validateRepositoryArgument = validateRepository(
  new InvalidOptionArgumentError("Invalid repository name"),
);

export const printLabels = async (
  [owner, repo]: [string, string],
  _: OptionValues,
  command: Command,
): Promise<void> => {
  const client = GithubRestApiClient(command.parent?.opts()["token"]);
  const labels = await api.listLabels(client, owner, repo);

  console.log(labels);
};

export const exportLabels = async (
  [owner, repo]: [string, string],
  options: OptionValues,
  command: Command,
): Promise<void> => {
  const client = GithubRestApiClient(command.parent?.opts()["token"]);
  const labels = await api.listLabels(client, owner, repo);

  await writeFile(options["file"], JSON.stringify(labels, null, 2));
};

export const importLabels = async (
  [owner, repo]: [string, string],
  options: OptionValues,
  command: Command,
): Promise<void> => {
  const client = GithubRestApiClient(command.parent?.opts()["token"]);
  const labels = await api.listLabels(client, owner, repo);

  const differentLabels: Label[] = differenceWith(
    JSON.parse(await readFile(options["file"], "utf8")),
    labels,
    isEqual,
  );

  for (const diffLabel of differentLabels) {
    if (labels.find((label) => label.name === diffLabel.name)) {
      console.log(`update label "${diffLabel.name}"`);
      await api.updateLabel(client, { owner, repo, ...diffLabel });
    } else {
      console.log(`create label "${diffLabel.name}"`);
      await api.createLabel(client, { owner, repo, ...diffLabel });
    }
  }
};

export const clearLabels = async (
  [owner, repo]: [string, string],
  _: OptionValues,
  command: Command,
): Promise<void> => {
  const client = GithubRestApiClient(command.parent?.opts()["token"]);
  const labels = await api.listLabels(client, owner, repo);

  for (const { name } of labels) {
    await api.deleteLabel(client, owner, repo, name);
  }
};
