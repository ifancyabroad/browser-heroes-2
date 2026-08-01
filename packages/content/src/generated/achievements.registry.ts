// Generated - do not edit by hand

import type { AchievementDefinition } from '../schemas';
import type { AchievementId } from './achievementIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { achievementIdSchema, achievementIds } from './achievementIds';

import ach_acquireLegendaryItem_0 from '../achievements/acquireLegendaryItem';
import ach_completeEndlessCycle_1 from '../achievements/completeEndlessCycle';
import ach_completeGame_2 from '../achievements/completeGame';
import ach_completeGameBattlemage_3 from '../achievements/completeGameBattlemage';
import ach_completeGameByDayFive_4 from '../achievements/completeGameByDayFive';
import ach_completeGameFighter_5 from '../achievements/completeGameFighter';
import ach_completeGameMage_6 from '../achievements/completeGameMage';
import ach_completeGamePaladin_7 from '../achievements/completeGamePaladin';
import ach_completeGamePriest_8 from '../achievements/completeGamePriest';
import ach_completeGameShadowblade_9 from '../achievements/completeGameShadowblade';
import ach_completeGameThief_10 from '../achievements/completeGameThief';
import ach_completeGameWithoutResting_11 from '../achievements/completeGameWithoutResting';
import ach_defeatBoss_12 from '../achievements/defeatBoss';
import ach_defeatFullHealthBoss_13 from '../achievements/defeatFullHealthBoss';
import ach_defeatGhost_14 from '../achievements/defeatGhost';
import ach_dieToOwnGhost_15 from '../achievements/dieToOwnGhost';
import ach_ghostEndOtherRun_16 from '../achievements/ghostEndOtherRun';
import ach_holdTenThousandGold_17 from '../achievements/holdTenThousandGold';
import ach_maxCharisma_18 from '../achievements/maxCharisma';
import ach_maxConstitution_19 from '../achievements/maxConstitution';
import ach_maxDexterity_20 from '../achievements/maxDexterity';
import ach_maxIntelligence_21 from '../achievements/maxIntelligence';
import ach_maxStrength_22 from '../achievements/maxStrength';
import ach_maxWisdom_23 from '../achievements/maxWisdom';
import ach_reachMaximumHp_26 from '../achievements/reachMaximumHp';
import ach_reachArmourClass_24 from '../achievements/reachArmourClass';
import ach_reachLevelTen_25 from '../achievements/reachLevelTen';
import ach_reachStreakTen_28 from '../achievements/reachStreakTen';
import ach_reachStreakTwentyFive_29 from '../achievements/reachStreakTwentyFive';
import ach_reachStreakFifty_27 from '../achievements/reachStreakFifty';

export { achievementIdSchema, achievementIds };
export type { AchievementId } from './achievementIds';

export type Achievement = WithGeneratedId<AchievementDefinition, AchievementId>;

const rawAchievements = [ach_acquireLegendaryItem_0, ach_completeEndlessCycle_1, ach_completeGame_2, ach_completeGameBattlemage_3, ach_completeGameByDayFive_4, ach_completeGameFighter_5, ach_completeGameMage_6, ach_completeGamePaladin_7, ach_completeGamePriest_8, ach_completeGameShadowblade_9, ach_completeGameThief_10, ach_completeGameWithoutResting_11, ach_defeatBoss_12, ach_defeatFullHealthBoss_13, ach_defeatGhost_14, ach_dieToOwnGhost_15, ach_ghostEndOtherRun_16, ach_holdTenThousandGold_17, ach_maxCharisma_18, ach_maxConstitution_19, ach_maxDexterity_20, ach_maxIntelligence_21, ach_maxStrength_22, ach_maxWisdom_23, ach_reachMaximumHp_26, ach_reachArmourClass_24, ach_reachLevelTen_25, ach_reachStreakTen_28, ach_reachStreakTwentyFive_29, ach_reachStreakFifty_27] satisfies readonly AchievementDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const achievements = rawAchievements as readonly Achievement[];

const rawAchievementsById = {
  "acquire_legendary_item": ach_acquireLegendaryItem_0,
  "complete_endless_cycle": ach_completeEndlessCycle_1,
  "complete_game": ach_completeGame_2,
  "complete_game_battlemage": ach_completeGameBattlemage_3,
  "complete_game_by_day_5": ach_completeGameByDayFive_4,
  "complete_game_fighter": ach_completeGameFighter_5,
  "complete_game_mage": ach_completeGameMage_6,
  "complete_game_paladin": ach_completeGamePaladin_7,
  "complete_game_priest": ach_completeGamePriest_8,
  "complete_game_shadowblade": ach_completeGameShadowblade_9,
  "complete_game_thief": ach_completeGameThief_10,
  "complete_game_without_resting": ach_completeGameWithoutResting_11,
  "defeat_boss": ach_defeatBoss_12,
  "defeat_full_health_boss": ach_defeatFullHealthBoss_13,
  "defeat_ghost": ach_defeatGhost_14,
  "die_to_own_ghost": ach_dieToOwnGhost_15,
  "ghost_end_other_run": ach_ghostEndOtherRun_16,
  "hold_10000_gold": ach_holdTenThousandGold_17,
  "max_charisma": ach_maxCharisma_18,
  "max_constitution": ach_maxConstitution_19,
  "max_dexterity": ach_maxDexterity_20,
  "max_intelligence": ach_maxIntelligence_21,
  "max_strength": ach_maxStrength_22,
  "max_wisdom": ach_maxWisdom_23,
  "reach_100_max_hp": ach_reachMaximumHp_26,
  "reach_25_armour_class": ach_reachArmourClass_24,
  "reach_level_10": ach_reachLevelTen_25,
  "reach_streak_10": ach_reachStreakTen_28,
  "reach_streak_25": ach_reachStreakTwentyFive_29,
  "reach_streak_50": ach_reachStreakFifty_27,
} satisfies Record<AchievementId, AchievementDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ACHIEVEMENTS_BY_ID = rawAchievementsById as Record<AchievementId, Achievement>;
