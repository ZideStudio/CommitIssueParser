import { CommitType } from "./commitType";

export type CommitMessage = CommitType & {
  commitMessage: string;
  commitBody: string;
};
