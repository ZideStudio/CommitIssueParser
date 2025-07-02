import { Clipboard, Keyboard, Action as RCAction } from "@raycast/api";
import { ActionType } from "../models/actionType";

type CustomActionProps = {
  content: string;
  type: ActionType;
  title?: string;
  shortcut?: Keyboard.Shortcut;
  autoCopyBodyContent?: string;
};

export default function CustomAction({ type, content, autoCopyBodyContent, title, shortcut }: CustomActionProps) {
  const props = { content, title, shortcut };

  const autoCopyBody = () => {
    if (!autoCopyBodyContent) return;

    setTimeout(() => {
      Clipboard.copy(autoCopyBodyContent);
    }, 100);
  };

  if (type === ActionType.PASTE) {
    return <RCAction.Paste onPaste={autoCopyBody} {...props} />;
  } else if (type === ActionType.COPY) {
    return <RCAction.CopyToClipboard {...props} />;
  }

  return <RCAction.Paste onPaste={Clipboard.copy} {...props} />;
}
