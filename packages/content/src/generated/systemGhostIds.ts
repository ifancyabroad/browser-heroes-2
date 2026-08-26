// Generated - do not edit by hand

import { z } from "zod";

export const systemGhostIds = ["clockwork_seer","dawn_keeper","ember_scholar","iron_vigil","last_sentinel","night_reaver","oathbound","venom_shade","warped_aegis"] as const;
export const systemGhostIdSchema = z.enum(systemGhostIds);
export type SystemGhostId = z.infer<typeof systemGhostIdSchema>;
