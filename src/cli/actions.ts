import { readFile, writeFile } from "fs/promises";
import { EOL } from "os";

import { GitHub, Label } from "../github";
import { normalizeColorHex } from "../utils";

import { validOwnerRepo } from "./helper";

type Options = {
  github: GitHub;
};

export const listLabels = async (repository: string, { github }: Options) => {
  const [owner, repo] = validOwnerRepo(repository, true);
  const { data } = await github.rest.issues.listLabelsForRepo({
    owner,
    repo,
  });

  console.log(data);
};

export const exportLabels = async (
  repository: string,
  filename: string,
  { github }: Options,
) => {
  const [owner, repo] = validOwnerRepo(repository, true);
  const { data } = await github.rest.issues.listLabelsForRepo({
    owner,
    repo,
  });

  const labels = data.map(({ name, color, description }) => ({
    name,
    color: normalizeColorHex(color, true),
    description,
  }));

  await writeFile(filename, JSON.stringify(labels, null, 2) + EOL);
};

export const importLabels = async (
  repository: string,
  filename: string,
  { github }: Options,
) => {
  const [owner, repo] = validOwnerRepo(repository, true);
  const { data: remoteLabels } = await github.rest.issues.listLabelsForRepo({
    owner,
    repo,
  });
  const localLabels: Label[] = JSON.parse(
    await readFile(filename, { encoding: "utf8" }),
  );

  const labels = localLabels.reduce<
    { label: Label; method: "createLabel" | "updateLabel" }[]
  >((accumulator, label) => {
    const remoteLabel = remoteLabels.find(
      ({ name, color, description }) =>
        name === label.name &&
        (color !== label.color || description !== label.description),
    );

    return [
      ...accumulator,
      {
        label,
        method: remoteLabel ? "updateLabel" : "createLabel",
      },
    ];
  }, []);

  for (const {
    label: { name, color, description },
    method,
  } of labels) {
    console.log({
      name,
      color: normalizeColorHex(color, false),
      description,
    });
    await github.rest.issues[method]({
      owner,
      repo,
      name,
      color: normalizeColorHex(color, false),
      description,
    });
  }
};
