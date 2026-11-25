// Generated - do not edit by hand

import type { ConsumableDefinition } from '../schemas';
import type { ConsumableId } from './consumableIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { consumableIdSchema, consumableIds } from './consumableIds';

import con_explosivePotion_0 from '../consumables/explosivePotion';
import con_healingPotion_1 from '../consumables/healingPotion';
import con_invisibilityPotion_2 from '../consumables/invisibilityPotion';
import con_speedPotion_3 from '../consumables/speedPotion';

export { consumableIdSchema, consumableIds };
export type { ConsumableId } from './consumableIds';

export type Consumable = WithGeneratedId<ConsumableDefinition, ConsumableId>;

const rawConsumables = [con_explosivePotion_0, con_healingPotion_1, con_invisibilityPotion_2, con_speedPotion_3] satisfies readonly ConsumableDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const consumables = rawConsumables as readonly Consumable[];

const rawConsumablesById = {
  "explosivePotion": con_explosivePotion_0,
  "healingPotion": con_healingPotion_1,
  "invisibilityPotion": con_invisibilityPotion_2,
  "speedPotion": con_speedPotion_3,
} satisfies Record<ConsumableId, ConsumableDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const CONSUMABLES_BY_ID = rawConsumablesById as Record<ConsumableId, Consumable>;
