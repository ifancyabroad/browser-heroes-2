// Generated - do not edit by hand

import type { ItemAffixDefinition } from '../schemas';
import type { ItemAffixId } from './itemAffixIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { itemAffixIdSchema, itemAffixIds } from './itemAffixIds';

import iaf_accurate_0 from '../itemAffixes/prefixes/accurate';
import iaf_acidic_1 from '../itemAffixes/prefixes/acidic';
import iaf_barbed_2 from '../itemAffixes/prefixes/barbed';
import iaf_blessed_3 from '../itemAffixes/prefixes/blessed';
import iaf_bulwark_4 from '../itemAffixes/prefixes/bulwark';
import iaf_caustic_5 from '../itemAffixes/prefixes/caustic';
import iaf_charged_6 from '../itemAffixes/prefixes/charged';
import iaf_concussive_7 from '../itemAffixes/prefixes/concussive';
import iaf_corroding_8 from '../itemAffixes/prefixes/corroding';
import iaf_deadly_9 from '../itemAffixes/prefixes/deadly';
import iaf_deathly_10 from '../itemAffixes/prefixes/deathly';
import iaf_enfeebling_11 from '../itemAffixes/prefixes/enfeebling';
import iaf_enlightened_12 from '../itemAffixes/prefixes/enlightened';
import iaf_flaming_13 from '../itemAffixes/prefixes/flaming';
import iaf_flawless_14 from '../itemAffixes/prefixes/flawless';
import iaf_focused_15 from '../itemAffixes/prefixes/focused';
import iaf_forceful_16 from '../itemAffixes/prefixes/forceful';
import iaf_frosted_17 from '../itemAffixes/prefixes/frosted';
import iaf_glacial_18 from '../itemAffixes/prefixes/glacial';
import iaf_impervious_19 from '../itemAffixes/prefixes/impervious';
import iaf_keen_20 from '../itemAffixes/prefixes/keen';
import iaf_majestic_21 from '../itemAffixes/prefixes/majestic';
import iaf_masterful_22 from '../itemAffixes/prefixes/masterful';
import iaf_necrotic_23 from '../itemAffixes/prefixes/necrotic';
import iaf_nullifying_24 from '../itemAffixes/prefixes/nullifying';
import iaf_of_acid_warding_49 from '../itemAffixes/suffixes/of_acid_warding';
import iaf_of_agility_50 from '../itemAffixes/suffixes/of_agility';
import iaf_of_antidotes_51 from '../itemAffixes/suffixes/of_antidotes';
import iaf_of_blocking_52 from '../itemAffixes/suffixes/of_blocking';
import iaf_of_defiance_53 from '../itemAffixes/suffixes/of_defiance';
import iaf_of_deflection_54 from '../itemAffixes/suffixes/of_deflection';
import iaf_of_devastation_55 from '../itemAffixes/suffixes/of_devastation';
import iaf_of_fire_warding_56 from '../itemAffixes/suffixes/of_fire_warding';
import iaf_of_fortitude_57 from '../itemAffixes/suffixes/of_fortitude';
import iaf_of_grounding_58 from '../itemAffixes/suffixes/of_grounding';
import iaf_of_guarding_59 from '../itemAffixes/suffixes/of_guarding';
import iaf_of_impact_60 from '../itemAffixes/suffixes/of_impact';
import iaf_of_insight_61 from '../itemAffixes/suffixes/of_insight';
import iaf_of_invincibility_62 from '../itemAffixes/suffixes/of_invincibility';
import iaf_of_life_warding_63 from '../itemAffixes/suffixes/of_life_warding';
import iaf_of_mending_64 from '../itemAffixes/suffixes/of_mending';
import iaf_of_might_65 from '../itemAffixes/suffixes/of_might';
import iaf_of_presence_66 from '../itemAffixes/suffixes/of_presence';
import iaf_of_resolve_67 from '../itemAffixes/suffixes/of_resolve';
import iaf_of_restoration_68 from '../itemAffixes/suffixes/of_restoration';
import iaf_of_shadowing_69 from '../itemAffixes/suffixes/of_shadowing';
import iaf_of_stability_70 from '../itemAffixes/suffixes/of_stability';
import iaf_of_tempering_71 from '../itemAffixes/suffixes/of_tempering';
import iaf_of_the_inferno_72 from '../itemAffixes/suffixes/of_the_inferno';
import iaf_of_the_venomless_73 from '../itemAffixes/suffixes/of_the_venomless';
import iaf_of_warmth_74 from '../itemAffixes/suffixes/of_warmth';
import iaf_of_wisdom_75 from '../itemAffixes/suffixes/of_wisdom';
import iaf_overwhelming_25 from '../itemAffixes/prefixes/overwhelming';
import iaf_potent_26 from '../itemAffixes/prefixes/potent';
import iaf_precise_27 from '../itemAffixes/prefixes/precise';
import iaf_puncturing_28 from '../itemAffixes/prefixes/puncturing';
import iaf_radiant_29 from '../itemAffixes/prefixes/radiant';
import iaf_reinforced_30 from '../itemAffixes/prefixes/reinforced';
import iaf_rending_31 from '../itemAffixes/prefixes/rending';
import iaf_renewing_32 from '../itemAffixes/prefixes/renewing';
import iaf_sagacious_33 from '../itemAffixes/prefixes/sagacious';
import iaf_searing_34 from '../itemAffixes/prefixes/searing';
import iaf_sharp_35 from '../itemAffixes/prefixes/sharp';
import iaf_silencing_36 from '../itemAffixes/prefixes/silencing';
import iaf_skilled_37 from '../itemAffixes/prefixes/skilled';
import iaf_storming_38 from '../itemAffixes/prefixes/storming';
import iaf_stunning_39 from '../itemAffixes/prefixes/stunning';
import iaf_sundering_40 from '../itemAffixes/prefixes/sundering';
import iaf_titanic_41 from '../itemAffixes/prefixes/titanic';
import iaf_toxic_42 from '../itemAffixes/prefixes/toxic';
import iaf_vampiric_43 from '../itemAffixes/prefixes/vampiric';
import iaf_venomous_44 from '../itemAffixes/prefixes/venomous';
import iaf_vital_45 from '../itemAffixes/prefixes/vital';
import iaf_warded_46 from '../itemAffixes/prefixes/warded';
import iaf_weakening_47 from '../itemAffixes/prefixes/weakening';
import iaf_windborne_48 from '../itemAffixes/prefixes/windborne';

export { itemAffixIdSchema, itemAffixIds };
export type { ItemAffixId } from './itemAffixIds';

export type ItemAffix = WithGeneratedId<ItemAffixDefinition, ItemAffixId>;

const rawItemAffixes = [iaf_accurate_0, iaf_acidic_1, iaf_barbed_2, iaf_blessed_3, iaf_bulwark_4, iaf_caustic_5, iaf_charged_6, iaf_concussive_7, iaf_corroding_8, iaf_deadly_9, iaf_deathly_10, iaf_enfeebling_11, iaf_enlightened_12, iaf_flaming_13, iaf_flawless_14, iaf_focused_15, iaf_forceful_16, iaf_frosted_17, iaf_glacial_18, iaf_impervious_19, iaf_keen_20, iaf_majestic_21, iaf_masterful_22, iaf_necrotic_23, iaf_nullifying_24, iaf_of_acid_warding_49, iaf_of_agility_50, iaf_of_antidotes_51, iaf_of_blocking_52, iaf_of_defiance_53, iaf_of_deflection_54, iaf_of_devastation_55, iaf_of_fire_warding_56, iaf_of_fortitude_57, iaf_of_grounding_58, iaf_of_guarding_59, iaf_of_impact_60, iaf_of_insight_61, iaf_of_invincibility_62, iaf_of_life_warding_63, iaf_of_mending_64, iaf_of_might_65, iaf_of_presence_66, iaf_of_resolve_67, iaf_of_restoration_68, iaf_of_shadowing_69, iaf_of_stability_70, iaf_of_tempering_71, iaf_of_the_inferno_72, iaf_of_the_venomless_73, iaf_of_warmth_74, iaf_of_wisdom_75, iaf_overwhelming_25, iaf_potent_26, iaf_precise_27, iaf_puncturing_28, iaf_radiant_29, iaf_reinforced_30, iaf_rending_31, iaf_renewing_32, iaf_sagacious_33, iaf_searing_34, iaf_sharp_35, iaf_silencing_36, iaf_skilled_37, iaf_storming_38, iaf_stunning_39, iaf_sundering_40, iaf_titanic_41, iaf_toxic_42, iaf_vampiric_43, iaf_venomous_44, iaf_vital_45, iaf_warded_46, iaf_weakening_47, iaf_windborne_48] satisfies readonly ItemAffixDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const itemAffixes = rawItemAffixes as readonly ItemAffix[];

const rawItemAffixesById = {
  "accurate": iaf_accurate_0,
  "acidic": iaf_acidic_1,
  "barbed": iaf_barbed_2,
  "blessed": iaf_blessed_3,
  "bulwark": iaf_bulwark_4,
  "caustic": iaf_caustic_5,
  "charged": iaf_charged_6,
  "concussive": iaf_concussive_7,
  "corroding": iaf_corroding_8,
  "deadly": iaf_deadly_9,
  "deathly": iaf_deathly_10,
  "enfeebling": iaf_enfeebling_11,
  "enlightened": iaf_enlightened_12,
  "flaming": iaf_flaming_13,
  "flawless": iaf_flawless_14,
  "focused": iaf_focused_15,
  "forceful": iaf_forceful_16,
  "frosted": iaf_frosted_17,
  "glacial": iaf_glacial_18,
  "impervious": iaf_impervious_19,
  "keen": iaf_keen_20,
  "majestic": iaf_majestic_21,
  "masterful": iaf_masterful_22,
  "necrotic": iaf_necrotic_23,
  "nullifying": iaf_nullifying_24,
  "of_acid_warding": iaf_of_acid_warding_49,
  "of_agility": iaf_of_agility_50,
  "of_antidotes": iaf_of_antidotes_51,
  "of_blocking": iaf_of_blocking_52,
  "of_defiance": iaf_of_defiance_53,
  "of_deflection": iaf_of_deflection_54,
  "of_devastation": iaf_of_devastation_55,
  "of_fire_warding": iaf_of_fire_warding_56,
  "of_fortitude": iaf_of_fortitude_57,
  "of_grounding": iaf_of_grounding_58,
  "of_guarding": iaf_of_guarding_59,
  "of_impact": iaf_of_impact_60,
  "of_insight": iaf_of_insight_61,
  "of_invincibility": iaf_of_invincibility_62,
  "of_life_warding": iaf_of_life_warding_63,
  "of_mending": iaf_of_mending_64,
  "of_might": iaf_of_might_65,
  "of_presence": iaf_of_presence_66,
  "of_resolve": iaf_of_resolve_67,
  "of_restoration": iaf_of_restoration_68,
  "of_shadowing": iaf_of_shadowing_69,
  "of_stability": iaf_of_stability_70,
  "of_tempering": iaf_of_tempering_71,
  "of_the_inferno": iaf_of_the_inferno_72,
  "of_the_venomless": iaf_of_the_venomless_73,
  "of_warmth": iaf_of_warmth_74,
  "of_wisdom": iaf_of_wisdom_75,
  "overwhelming": iaf_overwhelming_25,
  "potent": iaf_potent_26,
  "precise": iaf_precise_27,
  "puncturing": iaf_puncturing_28,
  "radiant": iaf_radiant_29,
  "reinforced": iaf_reinforced_30,
  "rending": iaf_rending_31,
  "renewing": iaf_renewing_32,
  "sagacious": iaf_sagacious_33,
  "searing": iaf_searing_34,
  "sharp": iaf_sharp_35,
  "silencing": iaf_silencing_36,
  "skilled": iaf_skilled_37,
  "storming": iaf_storming_38,
  "stunning": iaf_stunning_39,
  "sundering": iaf_sundering_40,
  "titanic": iaf_titanic_41,
  "toxic": iaf_toxic_42,
  "vampiric": iaf_vampiric_43,
  "venomous": iaf_venomous_44,
  "vital": iaf_vital_45,
  "warded": iaf_warded_46,
  "weakening": iaf_weakening_47,
  "windborne": iaf_windborne_48,
} satisfies Record<ItemAffixId, ItemAffixDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ITEMAFFIXES_BY_ID = rawItemAffixesById as Record<ItemAffixId, ItemAffix>;
