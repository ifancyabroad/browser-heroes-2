// Generated - do not edit by hand

import { z } from "zod";

export const classIds = ["battlemage","fighter","mage","paladin","priest","shadowblade","thief"] as const;
export const classIdSchema = z.enum(classIds);
export type ClassId = z.infer<typeof classIdSchema>;
