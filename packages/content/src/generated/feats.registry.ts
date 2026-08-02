// Generated - do not edit by hand

import type { FeatDefinition } from '../schemas';
import type { FeatId } from './featIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { featIdSchema, featIds } from './featIds';

import fea_acidMastery_0 from '../feats/acidMastery';
import fea_catlikeGrace_1 from '../feats/catlikeGrace';
import fea_coldMastery_2 from '../feats/coldMastery';
import fea_commandingPresence_3 from '../feats/commandingPresence';
import fea_crushingMastery_4 from '../feats/crushingMastery';
import fea_fireMastery_5 from '../feats/fireMastery';
import fea_herculeanStrength_6 from '../feats/herculeanStrength';
import fea_ironConstitution_7 from '../feats/ironConstitution';
import fea_keenIntellect_8 from '../feats/keenIntellect';
import fea_lightningMastery_9 from '../feats/lightningMastery';
import fea_necroticMastery_10 from '../feats/necroticMastery';
import fea_piercingMastery_11 from '../feats/piercingMastery';
import fea_poisonMastery_12 from '../feats/poisonMastery';
import fea_radiantMastery_13 from '../feats/radiantMastery';
import fea_sagesWisdom_14 from '../feats/sagesWisdom';
import fea_slashingMastery_15 from '../feats/slashingMastery';

export { featIdSchema, featIds };
export type { FeatId } from './featIds';

export type Feat = WithGeneratedId<FeatDefinition, FeatId>;

const rawFeats = [fea_acidMastery_0, fea_catlikeGrace_1, fea_coldMastery_2, fea_commandingPresence_3, fea_crushingMastery_4, fea_fireMastery_5, fea_herculeanStrength_6, fea_ironConstitution_7, fea_keenIntellect_8, fea_lightningMastery_9, fea_necroticMastery_10, fea_piercingMastery_11, fea_poisonMastery_12, fea_radiantMastery_13, fea_sagesWisdom_14, fea_slashingMastery_15] satisfies readonly FeatDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const feats = rawFeats as readonly Feat[];

const rawFeatsById = {
  "acid_mastery": fea_acidMastery_0,
  "catlike_grace": fea_catlikeGrace_1,
  "cold_mastery": fea_coldMastery_2,
  "commanding_presence": fea_commandingPresence_3,
  "crushing_mastery": fea_crushingMastery_4,
  "fire_mastery": fea_fireMastery_5,
  "herculean_strength": fea_herculeanStrength_6,
  "iron_constitution": fea_ironConstitution_7,
  "keen_intellect": fea_keenIntellect_8,
  "lightning_mastery": fea_lightningMastery_9,
  "necrotic_mastery": fea_necroticMastery_10,
  "piercing_mastery": fea_piercingMastery_11,
  "poison_mastery": fea_poisonMastery_12,
  "radiant_mastery": fea_radiantMastery_13,
  "sages_wisdom": fea_sagesWisdom_14,
  "slashing_mastery": fea_slashingMastery_15,
} satisfies Record<FeatId, FeatDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const FEATS_BY_ID = rawFeatsById as Record<FeatId, Feat>;
