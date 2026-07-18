// Generated - do not edit by hand

import { z } from "zod";

export const itemAffixIds = ["accurate","flaming","of_blocking","of_fortitude","sharp"] as const;
export const itemAffixIdSchema = z.enum(itemAffixIds);
export type ItemAffixId = z.infer<typeof itemAffixIdSchema>;
