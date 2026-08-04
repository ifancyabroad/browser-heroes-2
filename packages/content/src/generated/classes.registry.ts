// Generated - do not edit by hand

import type { ClassDefinition } from '../schemas';
import type { ClassId } from './classIds';
import type { FeatId } from './featIds';
import type { ItemBaseId } from './itemBaseIds';
import type { SkillId } from './skillIds';
import type { WithCombatContentIds, WithEquipmentIds, WithGeneratedId } from '../types/contentTypes';
import { classIdSchema, classIds } from './classIds';

import cla_artificer_0 from '../classes/artificer';
import cla_battlemage_1 from '../classes/battlemage';
import cla_fighter_2 from '../classes/fighter';
import cla_mage_3 from '../classes/mage';
import cla_paladin_4 from '../classes/paladin';
import cla_priest_5 from '../classes/priest';
import cla_shadowblade_6 from '../classes/shadowblade';
import cla_thief_7 from '../classes/thief';

export { classIdSchema, classIds };
export type { ClassId } from './classIds';

export type Class = Omit<WithGeneratedId<ClassDefinition, ClassId>, 'combat' | 'startingEquipment'> & {
  combat: WithCombatContentIds<ClassDefinition['combat'], SkillId, FeatId>;
  startingEquipment?: WithEquipmentIds<NonNullable<ClassDefinition['startingEquipment']>, ItemBaseId>;
};

const rawClasses = [cla_artificer_0, cla_battlemage_1, cla_fighter_2, cla_mage_3, cla_paladin_4, cla_priest_5, cla_shadowblade_6, cla_thief_7] satisfies readonly ClassDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const classes = rawClasses as readonly Class[];

const rawClassesById = {
  "artificer": cla_artificer_0,
  "battlemage": cla_battlemage_1,
  "fighter": cla_fighter_2,
  "mage": cla_mage_3,
  "paladin": cla_paladin_4,
  "priest": cla_priest_5,
  "shadowblade": cla_shadowblade_6,
  "thief": cla_thief_7,
} satisfies Record<ClassId, ClassDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const CLASSES_BY_ID = rawClassesById as Record<ClassId, Class>;
