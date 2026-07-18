// Generated - do not edit by hand

import { z } from "zod";

export const itemBaseIds = ["base_dagger","base_longsword"] as const;
export const itemBaseIdSchema = z.enum(itemBaseIds);
export type ItemBaseId = z.infer<typeof itemBaseIdSchema>;
