import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect } from "react";
import useScope from "./hooks/scope";
import useUrlParser from "./hooks/url_parser";

export default function Command() {
  const { issue, setEntry } = useUrlParser();
  const { scopes, filterScope } = useScope();

  useEffect(() => {
    filterScope(issue.scope);
  }, [issue.scope]);

  return (
    <List
      searchBarPlaceholder="Paste the url of your issue | Add scope, description and body with ',' separator"
      searchText={issue.entry}
      onSearchTextChange={setEntry}
    >
      {scopes.map((scope) => {
        const commitMessage = `${scope}(${issue.id ?? issue.url ?? issue.entry}): ${issue.description ?? ""}`;
        const bodyMessage = `Issue url: ${issue.url || ""}${issue.body ? `\n\n${issue.body}` : ""}`;

        return (
          <List.Item
            key={scope}
            title={commitMessage}
            actions={
              <ActionPanel>
                <Action.Paste content={commitMessage} />

                <ActionPanel.Section>
                  <Action.Paste
                    content={bodyMessage}
                    title="Paste Description"
                    shortcut={{ modifiers: ["shift"], key: "enter" }}
                  />
                </ActionPanel.Section>
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
