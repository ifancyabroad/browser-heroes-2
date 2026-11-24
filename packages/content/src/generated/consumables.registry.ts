// Generated - do not edit by hand

import type { ConsumableDefinition } from '../schemas';
import type { ConsumableId } from './consumableIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { consumableIdSchema, consumableIds } from './consumableIds';

import con_healingPotion_0 from '../consumables/healingPotion';

export { consumableIdSchema, consumableIds };
export type { ConsumableId } from './consumableIds';

export type Consumable = WithGeneratedId<ConsumableDefinition, ConsumableId>;

const rawConsumables = [con_healingPotion_0] satisfies readonly ConsumableDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const consumables = rawConsumables as readonly Consumable[];

const rawConsumablesById = {
  "healingPotion": con_healingPotion_0,
} satisfies Record<ConsumableId, ConsumableDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const CONSUMABLES_BY_ID = rawConsumablesById as Record<ConsumableId, Consumable>;
