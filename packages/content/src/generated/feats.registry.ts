// Generated - do not edit by hand

import type { FeatDefinition } from '../schemas';
import type { FeatId } from './featIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { featIdSchema, featIds } from './featIds';

import fea_berserker_0 from '../feats/berserker';
import fea_bloodDrinker_1 from '../feats/bloodDrinker';
import fea_commandingPresence_2 from '../feats/commandingPresence';
import fea_corrosiveBlood_3 from '../feats/corrosiveBlood';
import fea_dawnBlessed_4 from '../feats/dawnBlessed';
import fea_deathTouched_5 from '../feats/deathTouched';
import fea_duelist_6 from '../feats/duelist';
import fea_flameborn_7 from '../feats/flameborn';
import fea_giftedHealer_8 from '../feats/giftedHealer';
import fea_juggernaut_9 from '../feats/juggernaut';
import fea_plaguebearer_10 from '../feats/plaguebearer';
import fea_potentCasting_11 from '../feats/potentCasting';
import fea_pressurePoints_12 from '../feats/pressurePoints';
import fea_spellbreaker_13 from '../feats/spellbreaker';
import fea_stormConduit_14 from '../feats/stormConduit';
import fea_wintersHeart_15 from '../feats/wintersHeart';

export { featIdSchema, featIds };
export type { FeatId } from './featIds';

export type Feat = WithGeneratedId<FeatDefinition, FeatId>;

const rawFeats = [fea_berserker_0, fea_bloodDrinker_1, fea_commandingPresence_2, fea_corrosiveBlood_3, fea_dawnBlessed_4, fea_deathTouched_5, fea_duelist_6, fea_flameborn_7, fea_giftedHealer_8, fea_juggernaut_9, fea_plaguebearer_10, fea_potentCasting_11, fea_pressurePoints_12, fea_spellbreaker_13, fea_stormConduit_14, fea_wintersHeart_15] satisfies readonly FeatDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const feats = rawFeats as readonly Feat[];

const rawFeatsById = {
  "berserker": fea_berserker_0,
  "blood_drinker": fea_bloodDrinker_1,
  "commanding_presence": fea_commandingPresence_2,
  "corrosive_blood": fea_corrosiveBlood_3,
  "dawn_blessed": fea_dawnBlessed_4,
  "death_touched": fea_deathTouched_5,
  "duelist": fea_duelist_6,
  "flameborn": fea_flameborn_7,
  "gifted_healer": fea_giftedHealer_8,
  "juggernaut": fea_juggernaut_9,
  "plaguebearer": fea_plaguebearer_10,
  "potent_casting": fea_potentCasting_11,
  "pressure_points": fea_pressurePoints_12,
  "spellbreaker": fea_spellbreaker_13,
  "storm_conduit": fea_stormConduit_14,
  "winters_heart": fea_wintersHeart_15,
} satisfies Record<FeatId, FeatDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const FEATS_BY_ID = rawFeatsById as Record<FeatId, Feat>;
