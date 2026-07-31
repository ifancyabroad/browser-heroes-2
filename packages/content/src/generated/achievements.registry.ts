// Generated - do not edit by hand

import type { AchievementDefinition } from '../schemas';
import type { AchievementId } from './achievementIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { achievementIdSchema, achievementIds } from './achievementIds';

import ach_acquireLegendaryItem_0 from '../achievements/acquireLegendaryItem';
import ach_completeEndlessCycle_1 from '../achievements/completeEndlessCycle';
import ach_completeGame_2 from '../achievements/completeGame';
import ach_completeGameBattlemage_3 from '../achievements/completeGameBattlemage';
import ach_completeGameFighter_4 from '../achievements/completeGameFighter';
import ach_completeGameMage_5 from '../achievements/completeGameMage';
import ach_completeGamePaladin_6 from '../achievements/completeGamePaladin';
import ach_completeGamePriest_7 from '../achievements/completeGamePriest';
import ach_completeGameShadowblade_8 from '../achievements/completeGameShadowblade';
import ach_completeGameThief_9 from '../achievements/completeGameThief';
import ach_defeatBoss_10 from '../achievements/defeatBoss';
import ach_defeatFullHealthBoss_11 from '../achievements/defeatFullHealthBoss';
import ach_dieToOwnGhost_12 from '../achievements/dieToOwnGhost';
import ach_ghostEndOtherRun_13 from '../achievements/ghostEndOtherRun';
import ach_maxCharisma_14 from '../achievements/maxCharisma';
import ach_maxConstitution_15 from '../achievements/maxConstitution';
import ach_maxDexterity_16 from '../achievements/maxDexterity';
import ach_maxIntelligence_17 from '../achievements/maxIntelligence';
import ach_maxStrength_18 from '../achievements/maxStrength';
import ach_maxWisdom_19 from '../achievements/maxWisdom';

export { achievementIdSchema, achievementIds };
export type { AchievementId } from './achievementIds';

export type Achievement = WithGeneratedId<AchievementDefinition, AchievementId>;

const rawAchievements = [ach_acquireLegendaryItem_0, ach_completeEndlessCycle_1, ach_completeGame_2, ach_completeGameBattlemage_3, ach_completeGameFighter_4, ach_completeGameMage_5, ach_completeGamePaladin_6, ach_completeGamePriest_7, ach_completeGameShadowblade_8, ach_completeGameThief_9, ach_defeatBoss_10, ach_defeatFullHealthBoss_11, ach_dieToOwnGhost_12, ach_ghostEndOtherRun_13, ach_maxCharisma_14, ach_maxConstitution_15, ach_maxDexterity_16, ach_maxIntelligence_17, ach_maxStrength_18, ach_maxWisdom_19] satisfies readonly AchievementDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const achievements = rawAchievements as readonly Achievement[];

const rawAchievementsById = {
  "acquire_legendary_item": ach_acquireLegendaryItem_0,
  "complete_endless_cycle": ach_completeEndlessCycle_1,
  "complete_game": ach_completeGame_2,
  "complete_game_battlemage": ach_completeGameBattlemage_3,
  "complete_game_fighter": ach_completeGameFighter_4,
  "complete_game_mage": ach_completeGameMage_5,
  "complete_game_paladin": ach_completeGamePaladin_6,
  "complete_game_priest": ach_completeGamePriest_7,
  "complete_game_shadowblade": ach_completeGameShadowblade_8,
  "complete_game_thief": ach_completeGameThief_9,
  "defeat_boss": ach_defeatBoss_10,
  "defeat_full_health_boss": ach_defeatFullHealthBoss_11,
  "die_to_own_ghost": ach_dieToOwnGhost_12,
  "ghost_end_other_run": ach_ghostEndOtherRun_13,
  "max_charisma": ach_maxCharisma_14,
  "max_constitution": ach_maxConstitution_15,
  "max_dexterity": ach_maxDexterity_16,
  "max_intelligence": ach_maxIntelligence_17,
  "max_strength": ach_maxStrength_18,
  "max_wisdom": ach_maxWisdom_19,
} satisfies Record<AchievementId, AchievementDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ACHIEVEMENTS_BY_ID = rawAchievementsById as Record<AchievementId, Achievement>;
