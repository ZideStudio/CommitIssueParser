import { COMMIT_TYPES } from "../constant/commitType";
import { CommitMessage } from "../models/commitMessage";
import { ContentFormat } from "../models/contentFormat";
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
  const formatMessage = (type: (typeof COMMIT_TYPES)[number]): string => {
    const scope = issue.id ?? issue.url ?? issue.entry;
    const description = issue.description ?? "";
    if (!(issue.id || issue.url)) {
      return `${type.label}: ${description}`;
    }
    return preferences.typeMode === TypeMode.TEXT
      ? `${type.label}(${scope}): ${description}`
      : `${type.emoji} ${scope} ${description}`;
  };

  const formatBody = (): string => {
    const issueType = issue.id ? "url" : "name";
    const issueDetails = issue.url || "";
    const bodyContent = issue.body ? `\n\n${issue.body}` : "";
    return `Issue ${issueType}: ${issueDetails}${bodyContent}`;
  };

  const commitMessages = COMMIT_TYPES.map((type) => {
    const message = formatMessage(type);
    const body = formatBody();

    const contentFormat = preferences.contentFormat;
    const contentAction =
      contentFormat === ContentFormat.LAZYGIT
        ? `${message}\n${body}`
        : contentFormat === ContentFormat.GIT
          ? `git commit -m "${message}" -m "${body}"`
          : message;

    return {
      ...type,
      message,
      body,
      contentAction,
    };
  });

  return { commitMessages };
}
