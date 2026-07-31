// Generated - do not edit by hand

import { z } from "zod";

export const achievementIds = ["acquire_legendary_item","complete_endless_cycle","complete_game","complete_game_battlemage","complete_game_fighter","complete_game_mage","complete_game_paladin","complete_game_priest","complete_game_shadowblade","complete_game_thief","defeat_boss","defeat_full_health_boss","die_to_own_ghost","ghost_end_other_run","max_charisma","max_constitution","max_dexterity","max_intelligence","max_strength","max_wisdom"] as const;
export const achievementIdSchema = z.enum(achievementIds);
export type AchievementId = z.infer<typeof achievementIdSchema>;
