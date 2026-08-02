// Generated - do not edit by hand

import { z } from "zod";

export const featIds = ["acid_mastery","armour_training","blood_drinker","catlike_grace","cold_mastery","combat_discipline","commanding_presence","dawn_blessed","deadly_precision","death_touched","fire_mastery","flameborn","gifted_healer","guarded_assault","herculean_strength","iron_constitution","keen_intellect","lightning_mastery","necrotic_mastery","plagueborn","poison_mastery","potent_casting","pressure_points","radiant_mastery","sages_wisdom","savage_critical","spellbreaker","toughness","unbreakable_will","winters_heart"] as const;
export const featIdSchema = z.enum(featIds);
export type FeatId = z.infer<typeof featIdSchema>;
