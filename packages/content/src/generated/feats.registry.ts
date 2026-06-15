// Generated — do not edit by hand

import type { FeatDefinition } from '../schemas';
import type { FeatId } from './featIds';
import { featIdSchema, featIds } from './featIds';

import fea_acidTempering_0 from '../feats/acidTempering';
import fea_acrobaticTraining_1 from '../feats/acrobaticTraining';
import fea_arcanePenetration_2 from '../feats/arcanePenetration';
import fea_arcaneWarding_3 from '../feats/arcaneWarding';
import fea_armour_4 from '../feats/armour';
import fea_bruteStrength_5 from '../feats/bruteStrength';
import fea_chitinWard_6 from '../feats/chitinWard';
import fea_cloakOfShadows_7 from '../feats/cloakOfShadows';
import fea_corrosiveCraft_8 from '../feats/corrosiveCraft';
import fea_corruption_9 from '../feats/corruption';
import fea_dancersGrace_10 from '../feats/dancersGrace';
import fea_devotedSpirit_11 from '../feats/devotedSpirit';
import fea_divineInspiration_12 from '../feats/divineInspiration';
import fea_divineProtection_13 from '../feats/divineProtection';
import fea_divineStrength_14 from '../feats/divineStrength';
import fea_duelistTraining_15 from '../feats/duelistTraining';
import fea_elementalShield_16 from '../feats/elementalShield';
import fea_embraceElements_17 from '../feats/embraceElements';
import fea_embraceShadows_18 from '../feats/embraceShadows';
import fea_enhancePoison_19 from '../feats/enhancePoison';
import fea_evasion_20 from '../feats/evasion';
import fea_fearsomePresence_21 from '../feats/fearsomePresence';
import fea_focusEnergy_22 from '../feats/focusEnergy';
import fea_ironSkin_23 from '../feats/ironSkin';
import fea_pestilentAffinity_24 from '../feats/pestilentAffinity';
import fea_primalFury_25 from '../feats/primalFury';
import fea_quickFingers_26 from '../feats/quickFingers';
import fea_runicWard_27 from '../feats/runicWard';
import fea_shadowFocus_28 from '../feats/shadowFocus';
import fea_shadowmeld_29 from '../feats/shadowmeld';
import fea_siphonedVigor_30 from '../feats/siphonedVigor';
import fea_unyieldingGuard_31 from '../feats/unyieldingGuard';

export { featIdSchema, featIds };
export type { FeatId } from './featIds';

type WithGeneratedId<TDefinition extends { id: string }, TId extends string> = TDefinition extends unknown ? Omit<TDefinition, 'id'> & { id: TId } : never;
export type Feat = WithGeneratedId<FeatDefinition, FeatId>;

export const feats: readonly Feat[] = [fea_acidTempering_0, fea_acrobaticTraining_1, fea_arcanePenetration_2, fea_arcaneWarding_3, fea_armour_4, fea_bruteStrength_5, fea_chitinWard_6, fea_cloakOfShadows_7, fea_corrosiveCraft_8, fea_corruption_9, fea_dancersGrace_10, fea_devotedSpirit_11, fea_divineInspiration_12, fea_divineProtection_13, fea_divineStrength_14, fea_duelistTraining_15, fea_elementalShield_16, fea_embraceElements_17, fea_embraceShadows_18, fea_enhancePoison_19, fea_evasion_20, fea_fearsomePresence_21, fea_focusEnergy_22, fea_ironSkin_23, fea_pestilentAffinity_24, fea_primalFury_25, fea_quickFingers_26, fea_runicWard_27, fea_shadowFocus_28, fea_shadowmeld_29, fea_siphonedVigor_30, fea_unyieldingGuard_31] as readonly Feat[];

export const FEATS_BY_ID = {
  "acid_tempering": fea_acidTempering_0,
  "acrobatic_training": fea_acrobaticTraining_1,
  "arcane_penetration": fea_arcanePenetration_2,
  "arcane_warding": fea_arcaneWarding_3,
  "armour": fea_armour_4,
  "brute_strength": fea_bruteStrength_5,
  "chitin_ward": fea_chitinWard_6,
  "cloak_of_shadows": fea_cloakOfShadows_7,
  "corrosive_craft": fea_corrosiveCraft_8,
  "corruption": fea_corruption_9,
  "dancers_grace": fea_dancersGrace_10,
  "devoted_spirit": fea_devotedSpirit_11,
  "divine_inspiration": fea_divineInspiration_12,
  "divine_protection": fea_divineProtection_13,
  "divine_strength": fea_divineStrength_14,
  "duelist_training": fea_duelistTraining_15,
  "elemental_shield": fea_elementalShield_16,
  "embrace_elements": fea_embraceElements_17,
  "embrace_shadows": fea_embraceShadows_18,
  "enhance_poison": fea_enhancePoison_19,
  "evasion": fea_evasion_20,
  "fearsome_presence": fea_fearsomePresence_21,
  "focus_energy": fea_focusEnergy_22,
  "iron_skin": fea_ironSkin_23,
  "pestilent_affinity": fea_pestilentAffinity_24,
  "primal_fury": fea_primalFury_25,
  "quick_fingers": fea_quickFingers_26,
  "runic_ward": fea_runicWard_27,
  "shadow_focus": fea_shadowFocus_28,
  "shadowmeld": fea_shadowmeld_29,
  "siphoned_vigor": fea_siphonedVigor_30,
  "unyielding_guard": fea_unyieldingGuard_31,
} as Record<FeatId, Feat>;