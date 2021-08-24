"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearLabels = exports.importLabels = exports.exportLabels = exports.printLabels = exports.validateRepositoryArgument = void 0;
const commander_1 = require("commander");
const promises_1 = require("fs/promises");
const lodash_1 = require("lodash");
const github_1 = require("./github");
exports.validateRepositoryArgument = github_1.validateRepository(new commander_1.InvalidOptionArgumentError("Invalid repository name"));
const printLabels = async ([owner, repo], _, command) => {
    const client = github_1.GithubRestApiClient(command.parent?.opts()["token"]);
    const labels = await github_1.api.listLabels(client, owner, repo);
    console.log(labels);
};
exports.printLabels = printLabels;
const exportLabels = async ([owner, repo], options, command) => {
    const client = github_1.GithubRestApiClient(command.parent?.opts()["token"]);
    const labels = await github_1.api.listLabels(client, owner, repo);
    await promises_1.writeFile(options["file"], JSON.stringify(labels, null, 2));
};
exports.exportLabels = exportLabels;
const importLabels = async ([owner, repo], options, command) => {
    const client = github_1.GithubRestApiClient(command.parent?.opts()["token"]);
    const labels = await github_1.api.listLabels(client, owner, repo);
    const differentLabels = lodash_1.differenceWith(JSON.parse(await promises_1.readFile(options["file"], "utf8")), labels, lodash_1.isEqual);
    for (const diffLabel of differentLabels) {
        if (labels.find((label) => label.name === diffLabel.name)) {
            console.log(`update label "${diffLabel.name}"`);
            await github_1.api.updateLabel(client, { owner, repo, ...diffLabel });
        }
        else {
            console.log(`create label "${diffLabel.name}"`);
            await github_1.api.createLabel(client, { owner, repo, ...diffLabel });
        }
    }
};
exports.importLabels = importLabels;
const clearLabels = async ([owner, repo], _, command) => {
    const client = github_1.GithubRestApiClient(command.parent?.opts()["token"]);
    const labels = await github_1.api.listLabels(client, owner, repo);
    for (const { name } of labels) {
        await github_1.api.deleteLabel(client, owner, repo, name);
    }
};
exports.clearLabels = clearLabels;
