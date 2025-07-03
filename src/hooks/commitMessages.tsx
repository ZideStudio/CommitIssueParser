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
  const formatMessage = (type: (typeof COMMIT_TYPES)[number]) => {
    const scope = issue.id ?? issue.url ?? issue.entry;
    const description = issue.description ?? "";
    if (!(issue.id || issue.url)) {
      return `${type.label}: ${description}`;
    }
    return preferences.typeMode === TypeMode.DEFAULT
      ? `${type.label}(${scope}): ${description}`
      : `${type.emoji} ${scope} ${description}`;
  };

  const formatBody = () => {
    const issueType = issue.id ? "url" : "name";
    const issueDetails = issue.url || "";
    const bodyContent = issue.body ? `\n\n${issue.body}` : "";
    return `Issue ${issueType}: ${issueDetails}${bodyContent}`;
  };

  return {
    commitMessages: COMMIT_TYPES.map((type) => ({
      ...type,
      message: formatMessage(type),
      body: formatBody(),
    })),
  };
}
