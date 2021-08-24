import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
export declare type CreateLabelParamers = RestEndpointMethodTypes["issues"]["createLabel"]["parameters"];
export declare type UpdateLabelParamers = RestEndpointMethodTypes["issues"]["updateLabel"]["parameters"];
export declare type LabelReponse = RestEndpointMethodTypes["issues"]["getLabel"]["response"]["data"];
export declare type Label = Pick<LabelReponse, "name" | "color"> & {
    description?: string;
};
