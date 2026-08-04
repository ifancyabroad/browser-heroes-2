// Generated - do not edit by hand

import { z } from "zod";

export const achievementIds = ["acquire_legendary_item","complete_endless_cycle","complete_game","complete_game_all_original_classes","complete_game_artificer","complete_game_battlemage","complete_game_by_day_5","complete_game_fighter","complete_game_mage","complete_game_paladin","complete_game_priest","complete_game_shadowblade","complete_game_thief","complete_game_without_resting","defeat_boss","defeat_full_health_boss","defeat_ghost","die_to_own_ghost","ghost_end_other_run","hold_10000_gold","lifetime_bosses_25","lifetime_game_wins_5","lifetime_ghosts_10","lifetime_gold_100000","lifetime_kills_100","lifetime_kills_1000","lifetime_kills_500","lifetime_legendary_items_10","lifetime_potions_100","max_charisma","max_constitution","max_dexterity","max_intelligence","max_strength","max_wisdom","reach_100_max_hp","reach_25_armour_class","reach_level_10","reach_streak_10","reach_streak_25","reach_streak_50"] as const;
export const achievementIdSchema = z.enum(achievementIds);
export type AchievementId = z.infer<typeof achievementIdSchema>;
