// Generated - do not edit by hand

import { z } from "zod";

export const consumableIds = ["explosivePotion","healingPotion","speedPotion"] as const;
export const consumableIdSchema = z.enum(consumableIds);
export type ConsumableId = z.infer<typeof consumableIdSchema>;
