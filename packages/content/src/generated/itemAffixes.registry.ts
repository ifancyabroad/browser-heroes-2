// Generated - do not edit by hand

import type { ItemAffixDefinition } from '../schemas';
import type { ItemAffixId } from './itemAffixIds';
import type { WithGeneratedId } from '../types/contentTypes';
import { itemAffixIdSchema, itemAffixIds } from './itemAffixIds';

import iaf_accurate_0 from '../itemAffixes/prefixes/accurate';
import iaf_flaming_1 from '../itemAffixes/prefixes/flaming';
import iaf_of_blocking_3 from '../itemAffixes/suffixes/of_blocking';
import iaf_of_fortitude_4 from '../itemAffixes/suffixes/of_fortitude';
import iaf_sharp_2 from '../itemAffixes/prefixes/sharp';

export { itemAffixIdSchema, itemAffixIds };
export type { ItemAffixId } from './itemAffixIds';

export type ItemAffix = WithGeneratedId<ItemAffixDefinition, ItemAffixId>;

const rawItemAffixes = [iaf_accurate_0, iaf_flaming_1, iaf_of_blocking_3, iaf_of_fortitude_4, iaf_sharp_2] satisfies readonly ItemAffixDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const itemAffixes = rawItemAffixes as readonly ItemAffix[];

const rawItemAffixesById = {
  "accurate": iaf_accurate_0,
  "flaming": iaf_flaming_1,
  "of_blocking": iaf_of_blocking_3,
  "of_fortitude": iaf_of_fortitude_4,
  "sharp": iaf_sharp_2,
} satisfies Record<ItemAffixId, ItemAffixDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const ITEMAFFIXES_BY_ID = rawItemAffixesById as Record<ItemAffixId, ItemAffix>;
