// Generated - do not edit by hand

import { z } from "zod";

export const featIds = ["acid_mastery","armour_training","brawler","catlike_grace","cold_mastery","combat_discipline","commanding_presence","crushing_mastery","dawn_blessed","deadly_precision","death_touched","fire_mastery","flameborn","gifted_healer","herculean_strength","iron_constitution","keen_intellect","lightning_mastery","necrotic_mastery","piercing_mastery","plagueborn","poison_mastery","potent_casting","radiant_mastery","sages_wisdom","savage_critical","slashing_mastery","toughness","unbreakable_will","winters_heart"] as const;
export const featIdSchema = z.enum(featIds);
export type FeatId = z.infer<typeof featIdSchema>;
