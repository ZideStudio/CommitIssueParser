/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Primary Action - Set the default behavior when you select a commit name */
  "primaryAction": "paste" | "copy-and-paste" | "copy",
  /** Content Format - Applied format when you select a commit name */
  "contentFormat": "text" | "lazygit" | "git",
  /** Type Mode - Configure the mode of your commit types */
  "typeMode": "text" | "gitmoji",
  /** Commit Format - Customizes the format of the commit. The available parameters are {type}, {scope}, and {message}. Use \ to remove the following character when no scope is present. Leave blank to revert to the default format. */
  "commitFormat": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `parse-issue-url` command */
  export type ParseIssueUrl = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `parse-issue-url` command */
  export type ParseIssueUrl = {}
}

