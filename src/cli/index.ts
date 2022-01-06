import { Command } from "commander";

import { GitHub } from "../github";

import {
  exportLabelsCommand,
  importLabelsCommand,
  listLabelsCommand,
  removeLabelsCommand,
  sampleLabelsCommand,
} from "./commands";
import { githubTokenOption } from "./helper";
import { githubTokenQuestion } from "./questions";

const program = new Command();

program
  .addOption(githubTokenOption)
  .hook("preAction", async (self, subCommand) => {
    const ignoredActions = ["sample"];
    if (ignoredActions.includes(subCommand.name())) {
      return;
    }
    const token = self.opts()["token"] ?? (await githubTokenQuestion());
    const github = new GitHub({ auth: token });
    subCommand.setOptionValue("github", github);

    try {
      await github.rest.users.getAuthenticated();
    } catch (error) {
      if ((error as any).status === 401) {
        console.error("Invalid token");
      }
      process.exit(1);
    }
  })
  .addCommand(listLabelsCommand())
  .addCommand(exportLabelsCommand())
  .addCommand(importLabelsCommand())
  .addCommand(removeLabelsCommand())
  .addCommand(sampleLabelsCommand());

export default program;
