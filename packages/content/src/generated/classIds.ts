// Generated - do not edit by hand

import { z } from "zod";

export const classIds = ["artificer","battlemage","mage","paladin","priest","rogue","shadowblade","warrior"] as const;
export const classIdSchema = z.enum(classIds);
export type ClassId = z.infer<typeof classIdSchema>;
