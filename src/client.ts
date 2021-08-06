import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";

import { normalizeColorHex } from "./color";
import { CreateLabelParamers, Label, UpdateLabelParamers } from "./types";

export const GithubRestApi = Octokit.plugin(restEndpointMethods);
export const GithubRestApiClient = (token: string): Octokit & Api =>
  new GithubRestApi({ auth: token });

const listLabels = async (
  octokit: Octokit & Api,
  owner: string,
  repo: string,
): Promise<Label[]> => {
  const { data } = await octokit.rest.issues.listLabelsForRepo({
    owner,
    repo,
  });
  return data
    .map(({ name, color, description }) => ({
      name,
      color: normalizeColorHex(color, true),
      description: description || undefined,
    }))
    .sort(({ name: a }, { name: b }) => a.localeCompare(b));
};

const createLabel = async (
  octokit: Octokit & Api,
  { owner, repo, name, color, description }: CreateLabelParamers,
): Promise<void> => {
  await octokit.rest.issues.createLabel({
    owner,
    repo,
    name,
    color: color && normalizeColorHex(color, false),
    description,
  });
};

const updateLabel = async (
  octokit: Octokit & Api,
  { owner, repo, name, color, description }: UpdateLabelParamers,
): Promise<void> => {
  await octokit.rest.issues.updateLabel({
    owner,
    repo,
    name,
    color: color && normalizeColorHex(color, false),
    description,
  });
};

const deleteLabel = async (
  octokit: Octokit & Api,
  owner: string,
  repo: string,
  name: string,
): Promise<void> => {
  await octokit.rest.issues.deleteLabel({
    owner,
    repo,
    name,
  });
};

export const api = {
  listLabels,
  createLabel,
  updateLabel,
  deleteLabel,
};
