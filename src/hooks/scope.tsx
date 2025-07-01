import { useState } from "react";
import { SCOPES } from "../constant/scope";

type ScopeState = {
  scopes: string[];
  filterScope: (filter?: string) => string[];
};

export default function useScope(): ScopeState {
  const defaultScopes = SCOPES.map((scope) => scope.label);
  const [scopes, setScopes] = useState<string[]>(defaultScopes);

  const filterScope = (filter?: string): string[] => {
    if (!filter) {
      setScopes(defaultScopes);
      return defaultScopes;
    }

    const filtered = defaultScopes.filter((scope) => scope.toLowerCase().includes(filter.toLowerCase()));
    setScopes(filtered);
    return filtered;
  };

  return {
    scopes,
    filterScope,
  };
}
