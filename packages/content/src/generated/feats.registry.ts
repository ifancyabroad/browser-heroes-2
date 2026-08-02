// Generated - do not edit by hand

import type { FeatDefinition } from '../schemas';
import type { FeatId } from './featIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { featIdSchema, featIds } from './featIds';

import fea_acidMastery_0 from '../feats/acidMastery';
import fea_armourTraining_1 from '../feats/armourTraining';
import fea_bloodDrinker_2 from '../feats/bloodDrinker';
import fea_catlikeGrace_3 from '../feats/catlikeGrace';
import fea_coldMastery_4 from '../feats/coldMastery';
import fea_combatDiscipline_5 from '../feats/combatDiscipline';
import fea_commandingPresence_6 from '../feats/commandingPresence';
import fea_dawnBlessed_7 from '../feats/dawnBlessed';
import fea_deadlyPrecision_8 from '../feats/deadlyPrecision';
import fea_deathTouched_9 from '../feats/deathTouched';
import fea_fireMastery_10 from '../feats/fireMastery';
import fea_flameborn_11 from '../feats/flameborn';
import fea_giftedHealer_12 from '../feats/giftedHealer';
import fea_guardedAssault_13 from '../feats/guardedAssault';
import fea_herculeanStrength_14 from '../feats/herculeanStrength';
import fea_ironConstitution_15 from '../feats/ironConstitution';
import fea_keenIntellect_16 from '../feats/keenIntellect';
import fea_lightningMastery_17 from '../feats/lightningMastery';
import fea_necroticMastery_18 from '../feats/necroticMastery';
import fea_plagueborn_19 from '../feats/plagueborn';
import fea_poisonMastery_20 from '../feats/poisonMastery';
import fea_potentCasting_21 from '../feats/potentCasting';
import fea_pressurePoints_22 from '../feats/pressurePoints';
import fea_radiantMastery_23 from '../feats/radiantMastery';
import fea_sagesWisdom_24 from '../feats/sagesWisdom';
import fea_savageCritical_25 from '../feats/savageCritical';
import fea_spellbreaker_26 from '../feats/spellbreaker';
import fea_toughness_27 from '../feats/toughness';
import fea_unbreakableWill_28 from '../feats/unbreakableWill';
import fea_wintersHeart_29 from '../feats/wintersHeart';

export { featIdSchema, featIds };
export type { FeatId } from './featIds';

export type Feat = WithGeneratedId<FeatDefinition, FeatId>;

const rawFeats = [fea_acidMastery_0, fea_armourTraining_1, fea_bloodDrinker_2, fea_catlikeGrace_3, fea_coldMastery_4, fea_combatDiscipline_5, fea_commandingPresence_6, fea_dawnBlessed_7, fea_deadlyPrecision_8, fea_deathTouched_9, fea_fireMastery_10, fea_flameborn_11, fea_giftedHealer_12, fea_guardedAssault_13, fea_herculeanStrength_14, fea_ironConstitution_15, fea_keenIntellect_16, fea_lightningMastery_17, fea_necroticMastery_18, fea_plagueborn_19, fea_poisonMastery_20, fea_potentCasting_21, fea_pressurePoints_22, fea_radiantMastery_23, fea_sagesWisdom_24, fea_savageCritical_25, fea_spellbreaker_26, fea_toughness_27, fea_unbreakableWill_28, fea_wintersHeart_29] satisfies readonly FeatDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const feats = rawFeats as readonly Feat[];

const rawFeatsById = {
  "acid_mastery": fea_acidMastery_0,
  "armour_training": fea_armourTraining_1,
  "blood_drinker": fea_bloodDrinker_2,
  "catlike_grace": fea_catlikeGrace_3,
  "cold_mastery": fea_coldMastery_4,
  "combat_discipline": fea_combatDiscipline_5,
  "commanding_presence": fea_commandingPresence_6,
  "dawn_blessed": fea_dawnBlessed_7,
  "deadly_precision": fea_deadlyPrecision_8,
  "death_touched": fea_deathTouched_9,
  "fire_mastery": fea_fireMastery_10,
  "flameborn": fea_flameborn_11,
  "gifted_healer": fea_giftedHealer_12,
  "guarded_assault": fea_guardedAssault_13,
  "herculean_strength": fea_herculeanStrength_14,
  "iron_constitution": fea_ironConstitution_15,
  "keen_intellect": fea_keenIntellect_16,
  "lightning_mastery": fea_lightningMastery_17,
  "necrotic_mastery": fea_necroticMastery_18,
  "plagueborn": fea_plagueborn_19,
  "poison_mastery": fea_poisonMastery_20,
  "potent_casting": fea_potentCasting_21,
  "pressure_points": fea_pressurePoints_22,
  "radiant_mastery": fea_radiantMastery_23,
  "sages_wisdom": fea_sagesWisdom_24,
  "savage_critical": fea_savageCritical_25,
  "spellbreaker": fea_spellbreaker_26,
  "toughness": fea_toughness_27,
  "unbreakable_will": fea_unbreakableWill_28,
  "winters_heart": fea_wintersHeart_29,
} satisfies Record<FeatId, FeatDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const FEATS_BY_ID = rawFeatsById as Record<FeatId, Feat>;
