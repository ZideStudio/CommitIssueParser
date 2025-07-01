import { Color, getPreferenceValues, List } from "@raycast/api";
import CustomActionPannel from "./components/customActionPannel";
import useCommitMessages from "./hooks/commitMessages";
import useUrlParser from "./hooks/urlParser";
import { Preferences } from "./models/preferences";
import { TypeMode } from "./models/typeMode";

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();

  const { issue, setEntry } = useUrlParser();
  const { commitMessages } = useCommitMessages({ preferences, issue });

  return (
    <List
      searchBarPlaceholder="Paste the url of your issue, then add description and body with ',' separator"
      searchText={issue.entry}
      onSearchTextChange={setEntry}
    >
      {commitMessages.map((type) => (
        <List.Item
          id={type.label}
          key={type.label}
          title={type.commitMessage}
          accessories={
            preferences.typeMode === TypeMode.GITMOJI
              ? [{ tag: { value: type.label, color: Color.SecondaryText } }]
              : undefined
          }
          actions={<CustomActionPannel type={type} preferences={preferences} />}
        />
      ))}
    </List>
  );
}
