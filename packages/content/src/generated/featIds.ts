// Generated - do not edit by hand

import { z } from "zod";

export const featIds = ["berserker","blood_drinker","commanding_presence","corrosive_blood","dawn_blessed","death_touched","duelist","flameborn","gifted_healer","juggernaut","plaguebearer","potent_casting","pressure_points","spellbreaker","storm_conduit","winters_heart"] as const;
export const featIdSchema = z.enum(featIds);
export type FeatId = z.infer<typeof featIdSchema>;
