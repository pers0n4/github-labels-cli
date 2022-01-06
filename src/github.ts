import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";

import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export const GitHub = Octokit.plugin(restEndpointMethods);
export type GitHub = InstanceType<typeof GitHub>;

export type Label = Pick<
  RestEndpointMethodTypes["issues"]["getLabel"]["response"]["data"],
  "name" | "color"
> & { description?: string };

export type ListLabelsForRepoReponse =
  RestEndpointMethodTypes["issues"]["listLabelsForRepo"]["response"];

export type CreateLabelParamers =
  RestEndpointMethodTypes["issues"]["createLabel"]["parameters"];

export type UpdateLabelParamers =
  RestEndpointMethodTypes["issues"]["updateLabel"]["parameters"];
