import { OnSelection } from "./onSelection";
import { TypeMode } from "./typeMode";

export type Preferences = {
  typeMode: TypeMode;
  onSelection: OnSelection;
  autoCopyBody: boolean;
};
