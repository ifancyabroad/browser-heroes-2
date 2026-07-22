// Generated - do not edit by hand

import { z } from "zod";

export const itemBaseIds = ["base_amulet","base_band","base_battleaxe","base_belt","base_boneclub","base_boots","base_bracers","base_breastplate","base_buckler","base_chain","base_chain_mail","base_circlet","base_club","base_cold_wand","base_crossbow","base_crown","base_dagger","base_fire_wand","base_flail","base_gauntlets","base_girdle","base_gloves","base_greatclub","base_greaves","base_half_plate","base_hammer","base_handaxe","base_helmet","base_hide_armour","base_hood","base_leather_armour","base_lightning_wand","base_longbow","base_longsword","base_mace","base_mask","base_morningstar","base_necklace","base_padded_armour","base_plate_armour","base_quarterstaff","base_ring","base_robe","base_sash","base_shield","base_spear","base_splint_mail","base_staff","base_studded_leather","base_tower_shield","base_tunic","base_warhammer","base_wraps"] as const;
export const itemBaseIdSchema = z.enum(itemBaseIds);
export type ItemBaseId = z.infer<typeof itemBaseIdSchema>;
