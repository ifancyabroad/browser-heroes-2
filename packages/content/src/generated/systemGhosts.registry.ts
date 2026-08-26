// Generated - do not edit by hand

import type { SystemGhostDefinition } from '../schemas';
import type { SystemGhostId } from './systemGhostIds';
import type { ClassId } from './classIds';
import type { FeatId } from './featIds';
import type { ItemBaseId } from './itemBaseIds';
import type { SkillId } from './skillIds';
import type { WithSystemGhostContentIds, WithGeneratedId } from '../types/contentTypes';
import { systemGhostIdSchema, systemGhostIds } from './systemGhostIds';

import sgh_clockworkSeer_0 from '../systemGhosts/clockworkSeer';
import sgh_dawnKeeper_1 from '../systemGhosts/dawnKeeper';
import sgh_emberScholar_2 from '../systemGhosts/emberScholar';
import sgh_ironVigil_3 from '../systemGhosts/ironVigil';
import sgh_lastSentinel_4 from '../systemGhosts/lastSentinel';
import sgh_nightReaver_5 from '../systemGhosts/nightReaver';
import sgh_oathbound_6 from '../systemGhosts/oathbound';
import sgh_venomShade_7 from '../systemGhosts/venomShade';
import sgh_warpedAegis_8 from '../systemGhosts/warpedAegis';

export { systemGhostIdSchema, systemGhostIds };
export type { SystemGhostId } from './systemGhostIds';

export type SystemGhost = WithSystemGhostContentIds<WithGeneratedId<SystemGhostDefinition, SystemGhostId>, ClassId, SkillId, FeatId, ItemBaseId>;

const rawSystemGhosts = [sgh_clockworkSeer_0, sgh_dawnKeeper_1, sgh_emberScholar_2, sgh_ironVigil_3, sgh_lastSentinel_4, sgh_nightReaver_5, sgh_oathbound_6, sgh_venomShade_7, sgh_warpedAegis_8] satisfies readonly SystemGhostDefinition[];

// Reference IDs are validated by generateContent.ts before this registry is written.
export const systemGhosts = rawSystemGhosts as readonly SystemGhost[];

const rawSystemGhostsById = {
  "clockwork_seer": sgh_clockworkSeer_0,
  "dawn_keeper": sgh_dawnKeeper_1,
  "ember_scholar": sgh_emberScholar_2,
  "iron_vigil": sgh_ironVigil_3,
  "last_sentinel": sgh_lastSentinel_4,
  "night_reaver": sgh_nightReaver_5,
  "oathbound": sgh_oathbound_6,
  "venom_shade": sgh_venomShade_7,
  "warped_aegis": sgh_warpedAegis_8,
} satisfies Record<SystemGhostId, SystemGhostDefinition>;

// Reference IDs are validated by generateContent.ts before this registry is written.
export const SYSTEM_GHOSTS_BY_ID = rawSystemGhostsById as Record<SystemGhostId, SystemGhost>;
