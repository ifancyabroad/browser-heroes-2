// Generated - do not edit by hand

import type { FeatDefinition } from '../schemas';
import type { FeatId } from './featIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { featIdSchema, featIds } from './featIds';

import fea_berserker_0 from '../feats/berserker';
import fea_bloodDrinker_1 from '../feats/bloodDrinker';
import fea_bonebreaker_2 from '../feats/bonebreaker';
import fea_commandingPresence_3 from '../feats/commandingPresence';
import fea_corrosiveBlood_4 from '../feats/corrosiveBlood';
import fea_dawnBlessed_5 from '../feats/dawnBlessed';
import fea_deadlyPrecision_6 from '../feats/deadlyPrecision';
import fea_deathTouched_7 from '../feats/deathTouched';
import fea_deepWounds_8 from '../feats/deepWounds';
import fea_duelist_9 from '../feats/duelist';
import fea_flameborn_10 from '../feats/flameborn';
import fea_giftedHealer_11 from '../feats/giftedHealer';
import fea_glassCannon_12 from '../feats/glassCannon';
import fea_jackOfAllTrades_13 from '../feats/jackOfAllTrades';
import fea_juggernaut_14 from '../feats/juggernaut';
import fea_plaguebearer_15 from '../feats/plaguebearer';
import fea_potentCasting_16 from '../feats/potentCasting';
import fea_spellbreaker_17 from '../feats/spellbreaker';
import fea_stormConduit_18 from '../feats/stormConduit';
import fea_wintersHeart_19 from '../feats/wintersHeart';

export { featIdSchema, featIds };
export type { FeatId } from './featIds';

export type Feat = WithGeneratedId<FeatDefinition, FeatId>;

const rawFeats = [fea_berserker_0, fea_bloodDrinker_1, fea_bonebreaker_2, fea_commandingPresence_3, fea_corrosiveBlood_4, fea_dawnBlessed_5, fea_deadlyPrecision_6, fea_deathTouched_7, fea_deepWounds_8, fea_duelist_9, fea_flameborn_10, fea_giftedHealer_11, fea_glassCannon_12, fea_jackOfAllTrades_13, fea_juggernaut_14, fea_plaguebearer_15, fea_potentCasting_16, fea_spellbreaker_17, fea_stormConduit_18, fea_wintersHeart_19] satisfies readonly FeatDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const feats = rawFeats as readonly Feat[];

const rawFeatsById = {
  "berserker": fea_berserker_0,
  "blood_drinker": fea_bloodDrinker_1,
  "bonebreaker": fea_bonebreaker_2,
  "commanding_presence": fea_commandingPresence_3,
  "corrosive_blood": fea_corrosiveBlood_4,
  "dawn_blessed": fea_dawnBlessed_5,
  "deadly_precision": fea_deadlyPrecision_6,
  "death_touched": fea_deathTouched_7,
  "deep_wounds": fea_deepWounds_8,
  "duelist": fea_duelist_9,
  "flameborn": fea_flameborn_10,
  "gifted_healer": fea_giftedHealer_11,
  "glass_cannon": fea_glassCannon_12,
  "jack_of_all_trades": fea_jackOfAllTrades_13,
  "juggernaut": fea_juggernaut_14,
  "plaguebearer": fea_plaguebearer_15,
  "potent_casting": fea_potentCasting_16,
  "spellbreaker": fea_spellbreaker_17,
  "storm_conduit": fea_stormConduit_18,
  "winters_heart": fea_wintersHeart_19,
} satisfies Record<FeatId, FeatDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const FEATS_BY_ID = rawFeatsById as Record<FeatId, Feat>;
