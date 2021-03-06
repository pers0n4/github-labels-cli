import { Argument, InvalidArgumentError, Option } from "commander";

export const validOwnerRepo = (repository: string, shouldSplit = false) => {
  const ownerRegex = /(?<owner>[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})/i;
  const repoRegex = /(?<repo>[a-z\d_.-]+)/i;
  const regex = new RegExp(`^${ownerRegex.source}/${repoRegex.source}$`);
  if (!regex.test(repository)) {
    throw new InvalidArgumentError("Invalid owner/repo");
  }
  return shouldSplit ? (repository.split("/") as [string, string]) : repository;
};

export const repositoryArgument = new Argument(
  "<owner/repo>",
  "github repository path to operate",
).argParser((repository) => validOwnerRepo(repository));

export const githubTokenOption = new Option(
  "-t, --token <token>",
  "github access token",
).env("GITHUB_TOKEN");
