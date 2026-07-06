import type { CombatState } from "../../../schemas";

export type PlayerActionValidationResult =
	| {
			ok: true;
	  }
	| {
			ok: false;
			error: "COMBAT_NOT_ACTIVE" | "PLAYER_CANNOT_ACT";
	  };

export function validatePlayerAction(combat: CombatState | null): PlayerActionValidationResult {
	if (!combat || combat.status !== "active") {
		return {
			ok: false,
			error: "COMBAT_NOT_ACTIVE",
		};
	}

	if (combat.activeActor !== "player") {
		return {
			ok: false,
			error: "PLAYER_CANNOT_ACT",
		};
	}

	return {
		ok: true,
	};
}
