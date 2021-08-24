import { Octokit } from "@octokit/core";
import { Api } from "@octokit/plugin-rest-endpoint-methods/dist-types/types";
import { CreateLabelParamers, Label, UpdateLabelParamers } from "./types";
export declare const GithubRestApi: typeof Octokit & import("@octokit/core/dist-types/types").Constructor<Api>;
export declare const GithubRestApiClient: (token: string) => Octokit & Api;
export declare const validateRepository: (error?: Error) => (repository: string) => [string, string];
export declare const api: {
    listLabels: (octokit: Octokit & Api, owner: string, repo: string) => Promise<Label[]>;
    createLabel: (octokit: Octokit & Api, { owner, repo, name, color, description }: CreateLabelParamers) => Promise<void>;
    updateLabel: (octokit: Octokit & Api, { owner, repo, name, color, description }: UpdateLabelParamers) => Promise<void>;
    deleteLabel: (octokit: Octokit & Api, owner: string, repo: string, name: string) => Promise<void>;
};
