// Generated - do not edit by hand

import type { ItemBaseDefinition } from '../schemas';
import type { ItemBaseId } from './itemBaseIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { itemBaseIdSchema, itemBaseIds } from './itemBaseIds';

import iba_dagger_0 from '../itemBases/weapons/dagger';
import iba_longsword_1 from '../itemBases/weapons/longsword';

export { itemBaseIdSchema, itemBaseIds };
export type { ItemBaseId } from './itemBaseIds';

export type ItemBase = WithGeneratedId<ItemBaseDefinition, ItemBaseId>;

const rawItemBases = [iba_dagger_0, iba_longsword_1] satisfies readonly ItemBaseDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const itemBases = rawItemBases as readonly ItemBase[];

const rawItemBasesById = {
  "base_dagger": iba_dagger_0,
  "base_longsword": iba_longsword_1,
} satisfies Record<ItemBaseId, ItemBaseDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ITEMBASES_BY_ID = rawItemBasesById as Record<ItemBaseId, ItemBase>;
