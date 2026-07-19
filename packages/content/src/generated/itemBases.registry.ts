// Generated - do not edit by hand

import type { ItemBaseDefinition } from '../schemas';
import type { ItemBaseId } from './itemBaseIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { itemBaseIdSchema, itemBaseIds } from './itemBaseIds';

import iba_amulet_0 from '../itemBases/armour/amulet';
import iba_battleaxe_19 from '../itemBases/weapons/battleaxe';
import iba_belt_1 from '../itemBases/armour/belt';
import iba_boneclub_20 from '../itemBases/weapons/boneclub';
import iba_boots_2 from '../itemBases/armour/boots';
import iba_breastplate_3 from '../itemBases/armour/breastplate';
import iba_buckler_4 from '../itemBases/armour/buckler';
import iba_chainMail_5 from '../itemBases/armour/chainMail';
import iba_club_21 from '../itemBases/weapons/club';
import iba_coldWand_22 from '../itemBases/weapons/coldWand';
import iba_crossbow_23 from '../itemBases/weapons/crossbow';
import iba_dagger_24 from '../itemBases/weapons/dagger';
import iba_fireWand_25 from '../itemBases/weapons/fireWand';
import iba_flail_26 from '../itemBases/weapons/flail';
import iba_gloves_6 from '../itemBases/armour/gloves';
import iba_greatclub_27 from '../itemBases/weapons/greatclub';
import iba_halfPlate_7 from '../itemBases/armour/halfPlate';
import iba_hammer_28 from '../itemBases/weapons/hammer';
import iba_handaxe_29 from '../itemBases/weapons/handaxe';
import iba_helmet_8 from '../itemBases/armour/helmet';
import iba_hideArmour_9 from '../itemBases/armour/hideArmour';
import iba_leatherArmour_10 from '../itemBases/armour/leatherArmour';
import iba_lightningWand_30 from '../itemBases/weapons/lightningWand';
import iba_longbow_31 from '../itemBases/weapons/longbow';
import iba_longsword_32 from '../itemBases/weapons/longsword';
import iba_mace_33 from '../itemBases/weapons/mace';
import iba_morningstar_34 from '../itemBases/weapons/morningstar';
import iba_paddedArmour_11 from '../itemBases/armour/paddedArmour';
import iba_plateArmour_12 from '../itemBases/armour/plateArmour';
import iba_quarterstaff_35 from '../itemBases/weapons/quarterstaff';
import iba_ring_13 from '../itemBases/armour/ring';
import iba_robe_14 from '../itemBases/armour/robe';
import iba_shield_15 from '../itemBases/armour/shield';
import iba_spear_36 from '../itemBases/weapons/spear';
import iba_splintMail_16 from '../itemBases/armour/splintMail';
import iba_studdedLeather_17 from '../itemBases/armour/studdedLeather';
import iba_towerShield_18 from '../itemBases/armour/towerShield';
import iba_warhammer_37 from '../itemBases/weapons/warhammer';

export { itemBaseIdSchema, itemBaseIds };
export type { ItemBaseId } from './itemBaseIds';

export type ItemBase = WithGeneratedId<ItemBaseDefinition, ItemBaseId>;

const rawItemBases = [iba_amulet_0, iba_battleaxe_19, iba_belt_1, iba_boneclub_20, iba_boots_2, iba_breastplate_3, iba_buckler_4, iba_chainMail_5, iba_club_21, iba_coldWand_22, iba_crossbow_23, iba_dagger_24, iba_fireWand_25, iba_flail_26, iba_gloves_6, iba_greatclub_27, iba_halfPlate_7, iba_hammer_28, iba_handaxe_29, iba_helmet_8, iba_hideArmour_9, iba_leatherArmour_10, iba_lightningWand_30, iba_longbow_31, iba_longsword_32, iba_mace_33, iba_morningstar_34, iba_paddedArmour_11, iba_plateArmour_12, iba_quarterstaff_35, iba_ring_13, iba_robe_14, iba_shield_15, iba_spear_36, iba_splintMail_16, iba_studdedLeather_17, iba_towerShield_18, iba_warhammer_37] satisfies readonly ItemBaseDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const itemBases = rawItemBases as readonly ItemBase[];

const rawItemBasesById = {
  "base_amulet": iba_amulet_0,
  "base_battleaxe": iba_battleaxe_19,
  "base_belt": iba_belt_1,
  "base_boneclub": iba_boneclub_20,
  "base_boots": iba_boots_2,
  "base_breastplate": iba_breastplate_3,
  "base_buckler": iba_buckler_4,
  "base_chain_mail": iba_chainMail_5,
  "base_club": iba_club_21,
  "base_cold_wand": iba_coldWand_22,
  "base_crossbow": iba_crossbow_23,
  "base_dagger": iba_dagger_24,
  "base_fire_wand": iba_fireWand_25,
  "base_flail": iba_flail_26,
  "base_gloves": iba_gloves_6,
  "base_greatclub": iba_greatclub_27,
  "base_half_plate": iba_halfPlate_7,
  "base_hammer": iba_hammer_28,
  "base_handaxe": iba_handaxe_29,
  "base_helmet": iba_helmet_8,
  "base_hide_armour": iba_hideArmour_9,
  "base_leather_armour": iba_leatherArmour_10,
  "base_lightning_wand": iba_lightningWand_30,
  "base_longbow": iba_longbow_31,
  "base_longsword": iba_longsword_32,
  "base_mace": iba_mace_33,
  "base_morningstar": iba_morningstar_34,
  "base_padded_armour": iba_paddedArmour_11,
  "base_plate_armour": iba_plateArmour_12,
  "base_quarterstaff": iba_quarterstaff_35,
  "base_ring": iba_ring_13,
  "base_robe": iba_robe_14,
  "base_shield": iba_shield_15,
  "base_spear": iba_spear_36,
  "base_splint_mail": iba_splintMail_16,
  "base_studded_leather": iba_studdedLeather_17,
  "base_tower_shield": iba_towerShield_18,
  "base_warhammer": iba_warhammer_37,
} satisfies Record<ItemBaseId, ItemBaseDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ITEMBASES_BY_ID = rawItemBasesById as Record<ItemBaseId, ItemBase>;
