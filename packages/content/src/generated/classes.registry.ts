// Generated - do not edit by hand

import type { ClassDefinition } from '../schemas';
import type { ClassId } from './classIds';
import type { FeatId } from './featIds';
import type { ItemBaseId } from './itemBaseIds';
import type { SkillId } from './skillIds';
import type { WithCombatContentIds, WithEquipmentIds, WithGeneratedId } from '../types/contentTypes';
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
  startingEquipment?: WithEquipmentIds<NonNullable<ClassDefinition['startingEquipment']>, ItemBaseId>;
};

const rawClasses = [cla_battlemage_0, cla_fighter_1, cla_mage_2, cla_paladin_3, cla_priest_4, cla_shadowblade_5, cla_thief_6] satisfies readonly ClassDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const classes = rawClasses as readonly Class[];

const rawClassesById = {
  "battlemage": cla_battlemage_0,
  "fighter": cla_fighter_1,
  "mage": cla_mage_2,
  "paladin": cla_paladin_3,
  "priest": cla_priest_4,
  "shadowblade": cla_shadowblade_5,
  "thief": cla_thief_6,
} satisfies Record<ClassId, ClassDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const CLASSES_BY_ID = rawClassesById as Record<ClassId, Class>;
