import inquirer from "inquirer";

import type { ListLabelsForRepoReponse } from "../github.js";

export const ownerRepoQuestion = async () => {
  const { path } = await inquirer.prompt<{ path: string }>({
    type: "input",
    name: "path",
    message: "Enter the owner/repo",
    default: "owner/repo",
    validate(input: string) {
      const ownerRepoRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}\/[-\w]+$/i;
      if (ownerRepoRegex.test(input)) {
        return true;
      }
      return "Invalid format";
    },
  });

  const [owner, repo] = path.split("/");
  return [owner, repo];
};

export const githubTokenQuestion = async () => {
  const { token } = await inquirer.prompt<{ token: string }>({
    type: "password",
    name: "token",
    message: "GitHub Token:",
    mask: "*",
    validate(input: string) {
      if (input.trim()) {
        return true;
      }
      return "Please enter a token";
    },
  });

  return token;
};

export const removeLabelsQuestion = async (
  labels: ListLabelsForRepoReponse["data"],
) => {
  const { selectedLabels } = await inquirer.prompt<{
    selectedLabels: string[];
  }>({
    type: "checkbox",
    name: "selectedLabels",
    message: "Select labels to remove",
    choices: labels.map(({ name }) => ({
      name,
      value: name,
    })),
  });

  return selectedLabels;
};
