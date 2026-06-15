// Generated — do not edit by hand

import type { ClassDefinition } from '../schemas';
import type { ClassId } from './classIds';
import type { FeatId } from './featIds';
import type { ItemId } from './itemIds';
import type { SkillId } from './skillIds';
import type { WithCombatContentIds, WithEquipmentItemIds, WithGeneratedId } from './typeHelpers';
import { classIdSchema, classIds } from './classIds';

import cla_battlemage_0 from '../classes/battlemage';
import cla_fighter_1 from '../classes/fighter';
import cla_mage_2 from '../classes/mage';
import cla_paladin_3 from '../classes/paladin';
import cla_priest_4 from '../classes/priest';
import cla_shadowblade_5 from '../classes/shadowblade';
import cla_thief_6 from '../classes/thief';

export { classIdSchema, classIds };
export type { ClassId } from './classIds';

export type Class = Omit<WithGeneratedId<ClassDefinition, ClassId>, 'combat' | 'startingEquipment'> & {
  combat: WithCombatContentIds<ClassDefinition['combat'], SkillId, FeatId>;
  startingEquipment?: WithEquipmentItemIds<NonNullable<ClassDefinition['startingEquipment']>, ItemId>;
};

export const classes: readonly Class[] = [cla_battlemage_0, cla_fighter_1, cla_mage_2, cla_paladin_3, cla_priest_4, cla_shadowblade_5, cla_thief_6] as readonly Class[];

export const CLASSES_BY_ID = {
  "battlemage": cla_battlemage_0,
  "fighter": cla_fighter_1,
  "mage": cla_mage_2,
  "paladin": cla_paladin_3,
  "priest": cla_priest_4,
  "shadowblade": cla_shadowblade_5,
  "thief": cla_thief_6,
} as Record<ClassId, Class>;