import { Octokit } from "@octokit/core";
import {
  RestEndpointMethodTypes,
  restEndpointMethods,
} from "@octokit/plugin-rest-endpoint-methods";

export const GitHub = Octokit.plugin(restEndpointMethods);
export type GitHub = InstanceType<typeof GitHub>;

export type ListLabelsForRepoReponse =
  RestEndpointMethodTypes["issues"]["listLabelsForRepo"]["response"];

export type CreateLabelParamers =
  RestEndpointMethodTypes["issues"]["createLabel"]["parameters"];

export type UpdateLabelParamers =
  RestEndpointMethodTypes["issues"]["updateLabel"]["parameters"];
