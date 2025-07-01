import { COMMIT_TYPES } from "../constant/commitType";
import { CommitMessage } from "../models/commitMessage";
import { Issue } from "../models/issue";
import { Preferences } from "../models/preferences";
import { TypeMode } from "../models/typeMode";

type CommitMessageProps = {
  preferences: Preferences;
  issue: Issue;
};

type CommitMessageState = {
  commitMessages: CommitMessage[];
};

export default function useCommitMessages({ preferences, issue }: CommitMessageProps): CommitMessageState {
  return {
    commitMessages: COMMIT_TYPES.map((type) => ({
      ...type,
      commitMessage:
        preferences.typeMode === TypeMode.DEFAULT
          ? `${type.label}(${issue.id ?? issue.url ?? issue.entry}): ${issue.description ?? ""}`
          : `${type.emoji} ${issue.id ?? issue.url ?? issue.entry} ${issue.description ?? ""}`,
      commitBody: `Issue ${issue.id ? "url" : "name"}: ${issue.url || ""}${issue.body ? `\n\n${issue.body}` : ""}`,
    })),
  };
}
