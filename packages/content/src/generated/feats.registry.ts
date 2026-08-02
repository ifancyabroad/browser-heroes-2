// Generated - do not edit by hand

import type { FeatDefinition } from '../schemas';
import type { FeatId } from './featIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { featIdSchema, featIds } from './featIds';

import fea_acidMastery_0 from '../feats/acidMastery';
import fea_armourTraining_1 from '../feats/armourTraining';
import fea_brawler_2 from '../feats/brawler';
import fea_catlikeGrace_3 from '../feats/catlikeGrace';
import fea_coldMastery_4 from '../feats/coldMastery';
import fea_combatDiscipline_5 from '../feats/combatDiscipline';
import fea_commandingPresence_6 from '../feats/commandingPresence';
import fea_crushingMastery_7 from '../feats/crushingMastery';
import fea_dawnBlessed_8 from '../feats/dawnBlessed';
import fea_deadlyPrecision_9 from '../feats/deadlyPrecision';
import fea_deathTouched_10 from '../feats/deathTouched';
import fea_fireMastery_11 from '../feats/fireMastery';
import fea_flameborn_12 from '../feats/flameborn';
import fea_giftedHealer_13 from '../feats/giftedHealer';
import fea_herculeanStrength_14 from '../feats/herculeanStrength';
import fea_ironConstitution_15 from '../feats/ironConstitution';
import fea_keenIntellect_16 from '../feats/keenIntellect';
import fea_lightningMastery_17 from '../feats/lightningMastery';
import fea_necroticMastery_18 from '../feats/necroticMastery';
import fea_piercingMastery_19 from '../feats/piercingMastery';
import fea_poisonMastery_20 from '../feats/poisonMastery';
import fea_potentCasting_21 from '../feats/potentCasting';
import fea_radiantMastery_22 from '../feats/radiantMastery';
import fea_sagesWisdom_23 from '../feats/sagesWisdom';
import fea_savageCritical_24 from '../feats/savageCritical';
import fea_slashingMastery_25 from '../feats/slashingMastery';
import fea_toughness_26 from '../feats/toughness';
import fea_unbreakableWill_27 from '../feats/unbreakableWill';
import fea_wintersHeart_28 from '../feats/wintersHeart';

export { featIdSchema, featIds };
export type { FeatId } from './featIds';

export type Feat = WithGeneratedId<FeatDefinition, FeatId>;

const rawFeats = [fea_acidMastery_0, fea_armourTraining_1, fea_brawler_2, fea_catlikeGrace_3, fea_coldMastery_4, fea_combatDiscipline_5, fea_commandingPresence_6, fea_crushingMastery_7, fea_dawnBlessed_8, fea_deadlyPrecision_9, fea_deathTouched_10, fea_fireMastery_11, fea_flameborn_12, fea_giftedHealer_13, fea_herculeanStrength_14, fea_ironConstitution_15, fea_keenIntellect_16, fea_lightningMastery_17, fea_necroticMastery_18, fea_piercingMastery_19, fea_poisonMastery_20, fea_potentCasting_21, fea_radiantMastery_22, fea_sagesWisdom_23, fea_savageCritical_24, fea_slashingMastery_25, fea_toughness_26, fea_unbreakableWill_27, fea_wintersHeart_28] satisfies readonly FeatDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const feats = rawFeats as readonly Feat[];

const rawFeatsById = {
  "acid_mastery": fea_acidMastery_0,
  "armour_training": fea_armourTraining_1,
  "brawler": fea_brawler_2,
  "catlike_grace": fea_catlikeGrace_3,
  "cold_mastery": fea_coldMastery_4,
  "combat_discipline": fea_combatDiscipline_5,
  "commanding_presence": fea_commandingPresence_6,
  "crushing_mastery": fea_crushingMastery_7,
  "dawn_blessed": fea_dawnBlessed_8,
  "deadly_precision": fea_deadlyPrecision_9,
  "death_touched": fea_deathTouched_10,
  "fire_mastery": fea_fireMastery_11,
  "flameborn": fea_flameborn_12,
  "gifted_healer": fea_giftedHealer_13,
  "herculean_strength": fea_herculeanStrength_14,
  "iron_constitution": fea_ironConstitution_15,
  "keen_intellect": fea_keenIntellect_16,
  "lightning_mastery": fea_lightningMastery_17,
  "necrotic_mastery": fea_necroticMastery_18,
  "piercing_mastery": fea_piercingMastery_19,
  "poison_mastery": fea_poisonMastery_20,
  "potent_casting": fea_potentCasting_21,
  "radiant_mastery": fea_radiantMastery_22,
  "sages_wisdom": fea_sagesWisdom_23,
  "savage_critical": fea_savageCritical_24,
  "slashing_mastery": fea_slashingMastery_25,
  "toughness": fea_toughness_26,
  "unbreakable_will": fea_unbreakableWill_27,
  "winters_heart": fea_wintersHeart_28,
} satisfies Record<FeatId, FeatDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const FEATS_BY_ID = rawFeatsById as Record<FeatId, Feat>;
