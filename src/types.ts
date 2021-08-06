import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export type CreateLabelParamers =
  RestEndpointMethodTypes["issues"]["createLabel"]["parameters"];

export type UpdateLabelParamers =
  RestEndpointMethodTypes["issues"]["updateLabel"]["parameters"];

export type LabelReponse =
  RestEndpointMethodTypes["issues"]["getLabel"]["response"]["data"];

export type Label = Pick<LabelReponse, "name" | "color"> & {
  description?: string;
};
