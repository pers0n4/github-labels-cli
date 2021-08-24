"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.validateRepository = exports.GithubRestApiClient = exports.GithubRestApi = void 0;
const core_1 = require("@octokit/core");
const plugin_rest_endpoint_methods_1 = require("@octokit/plugin-rest-endpoint-methods");
const color_1 = require("./color");
exports.GithubRestApi = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods);
const GithubRestApiClient = (token) => new exports.GithubRestApi({ auth: token });
exports.GithubRestApiClient = GithubRestApiClient;
const validateRepository = (error = new Error("Invalid repository name")) => (repository) => {
    const repositoryRegexp = /^([\w-.]+)\/([\w-.]+)$/;
    if (!repositoryRegexp.test(repository)) {
        throw error;
    }
    return repository.split("/");
};
exports.validateRepository = validateRepository;
const listLabels = async (octokit, owner, repo) => {
    const { data } = await octokit.rest.issues.listLabelsForRepo({
        owner,
        repo,
    });
    return data
        .map(({ name, color, description }) => ({
        name,
        color: color_1.normalizeColorHex(color, true),
        description: description || undefined,
    }))
        .sort(({ name: a }, { name: b }) => a.localeCompare(b));
};
const createLabel = async (octokit, { owner, repo, name, color, description }) => {
    await octokit.rest.issues.createLabel({
        owner,
        repo,
        name,
        color: color && color_1.normalizeColorHex(color, false),
        description,
    });
};
const updateLabel = async (octokit, { owner, repo, name, color, description }) => {
    await octokit.rest.issues.updateLabel({
        owner,
        repo,
        name,
        color: color && color_1.normalizeColorHex(color, false),
        description,
    });
};
const deleteLabel = async (octokit, owner, repo, name) => {
    await octokit.rest.issues.deleteLabel({
        owner,
        repo,
        name,
    });
};
exports.api = {
    listLabels,
    createLabel,
    updateLabel,
    deleteLabel,
};
