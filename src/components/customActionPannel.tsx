import { ActionPanel } from "@raycast/api";
import { ReactElement } from "react";
import { ActionType } from "../models/actionType";
import { CommitMessage } from "../models/commitMessage";
import { OnSelection } from "../models/onSelection";
import { Preferences } from "../models/preferences";
import { ShortcutType } from "../models/shortcutType";
import getShortcut from "../services/shortcut";
import CustomAction from "./customAction";

type BodyActionsWrapperProps = {
  children: ReactElement | ReactElement[];
  commitBody: string;
};

function BodyActionsWrapper({ children, commitBody }: BodyActionsWrapperProps) {
  return (
    <>
      <CustomAction
        type={ActionType.PASTE}
        content={commitBody}
        title="Paste Body"
        shortcut={getShortcut(ShortcutType.PASTE_BODY)}
      />
      <CustomAction
        type={ActionType.COPY}
        content={commitBody}
        title="Copy Body"
        shortcut={getShortcut(ShortcutType.COPY_BODY)}
      />
      {children}
    </>
  );
}

type CustomActionProps = {
  type: CommitMessage;
  preferences: Preferences;
};

export default function CustomActionPannel({ type, preferences }: CustomActionProps) {
  const mainActionType =
    preferences.onSelection === OnSelection.COPY
      ? ActionType.COPY
      : preferences.onSelection === OnSelection.PASTE
        ? ActionType.PASTE
        : ActionType.ALL;

  const mainActionTitle =
    preferences.onSelection === OnSelection.COPY
      ? "Copy to Clipboard"
      : preferences.onSelection === OnSelection.PASTE
        ? "Paste in Active App"
        : "Paste and Copy to Clipboard";

  return (
    <ActionPanel>
      <CustomAction type={mainActionType} title={mainActionTitle} content={type.commitMessage} />

      <ActionPanel.Section>
        {preferences.onSelection === OnSelection.COPY ? (
          <BodyActionsWrapper commitBody={type.commitBody}>
            <CustomAction
              type={ActionType.PASTE}
              content={type.commitMessage}
              title="Paste Message"
              shortcut={getShortcut(ShortcutType.PASTE_MESSAGE)}
            />
          </BodyActionsWrapper>
        ) : preferences.onSelection === OnSelection.PASTE ? (
          <BodyActionsWrapper commitBody={type.commitBody}>
            <CustomAction
              type={ActionType.COPY}
              content={type.commitMessage}
              title="Copy Message"
              shortcut={getShortcut(ShortcutType.COPY_MESSAGE)}
            />
          </BodyActionsWrapper>
        ) : (
          <BodyActionsWrapper commitBody={type.commitBody}>
            <CustomAction
              type={ActionType.PASTE}
              content={type.commitMessage}
              title="Paste Message"
              shortcut={getShortcut(ShortcutType.PASTE_MESSAGE)}
            />
            <CustomAction
              type={ActionType.COPY}
              content={type.commitMessage}
              title="Copy Message"
              shortcut={getShortcut(ShortcutType.COPY_MESSAGE)}
            />
          </BodyActionsWrapper>
        )}
      </ActionPanel.Section>
    </ActionPanel>
  );
}
