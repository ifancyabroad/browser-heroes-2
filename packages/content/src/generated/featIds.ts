// Generated - do not edit by hand

import { z } from "zod";

export const featIds = ["berserker","blood_drinker","bonebreaker","commanding_presence","corrosive_blood","dawn_blessed","deadly_precision","death_touched","deep_wounds","duelist","flameborn","gifted_healer","glass_cannon","jack_of_all_trades","juggernaut","plaguebearer","potent_casting","spellbreaker","storm_conduit","winters_heart"] as const;
export const featIdSchema = z.enum(featIds);
export type FeatId = z.infer<typeof featIdSchema>;
