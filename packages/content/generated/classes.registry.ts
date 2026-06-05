// Generated — do not edit by hand

import type { ClassDefinition } from '../src/types/class';

import cla_battlemage_0 from '../src/classes/battlemage';
import cla_fighter_1 from '../src/classes/fighter';
import cla_mage_2 from '../src/classes/mage';
import cla_paladin_3 from '../src/classes/paladin';
import cla_priest_4 from '../src/classes/priest';
import cla_shadowblade_5 from '../src/classes/shadowblade';
import cla_thief_6 from '../src/classes/thief';

export const classIds = ["battlemage","fighter","mage","paladin","priest","shadowblade","thief"] as const;
export type ClassId = (typeof classIds)[number];

export const classes: readonly ClassDefinition[] = [cla_battlemage_0, cla_fighter_1, cla_mage_2, cla_paladin_3, cla_priest_4, cla_shadowblade_5, cla_thief_6];

export const CLASSES_BY_ID: Record<ClassId, ClassDefinition> = {
  "battlemage": cla_battlemage_0,
  "fighter": cla_fighter_1,
  "mage": cla_mage_2,
  "paladin": cla_paladin_3,
  "priest": cla_priest_4,
  "shadowblade": cla_shadowblade_5,
  "thief": cla_thief_6,
};