import { Command, OptionValues } from "commander";
export declare const validateRepositoryArgument: (repository: string) => [string, string];
export declare const printLabels: ([owner, repo]: [string, string], _: OptionValues, command: Command) => Promise<void>;
export declare const exportLabels: ([owner, repo]: [string, string], options: OptionValues, command: Command) => Promise<void>;
export declare const importLabels: ([owner, repo]: [string, string], options: OptionValues, command: Command) => Promise<void>;
export declare const clearLabels: ([owner, repo]: [string, string], _: OptionValues, command: Command) => Promise<void>;
