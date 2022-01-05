import { Command } from "commander";

import { GitHub } from "../github";

import {
  exportLabelsCommand,
  importLabelsCommand,
  listLabelsCommand,
} from "./commands";
import { githubTokenQuestion } from "./questions";

const program = new Command();

program
  .option("-t, --token <token>", "github access token")
  .hook("preAction", async (self, subCommand) => {
    const token = self.opts()["token"] ?? (await githubTokenQuestion());
    const github = new GitHub({ auth: token });
    subCommand.setOptionValue("github", github);
  })
  .addCommand(listLabelsCommand())
  .addCommand(exportLabelsCommand())
  .addCommand(importLabelsCommand());

export default program;
