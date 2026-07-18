import type { Item } from "@app/content";

import type { GeneratedItemDefinition } from "./itemInstance.schema";

export type RuntimeItem = Item | GeneratedItemDefinition;
