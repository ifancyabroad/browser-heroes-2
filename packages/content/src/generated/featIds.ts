// Generated - do not edit by hand

import { z } from "zod";

export const featIds = ["acid_mastery","catlike_grace","cold_mastery","commanding_presence","crushing_mastery","fire_mastery","herculean_strength","iron_constitution","keen_intellect","lightning_mastery","necrotic_mastery","piercing_mastery","poison_mastery","radiant_mastery","sages_wisdom","slashing_mastery"] as const;
export const featIdSchema = z.enum(featIds);
export type FeatId = z.infer<typeof featIdSchema>;
