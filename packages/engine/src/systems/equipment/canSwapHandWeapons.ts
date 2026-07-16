import type { RunState } from "../../schemas";
import { getEquippedWeapon } from "../combat/equipment/getEquippedWeapon";

export function canSwapHandWeapons(state: RunState): boolean {
	if (state.phase !== "town") {
		return false;
	}

	const mainHandWeapon = getEquippedWeapon(state.hero.equipment.mainHand?.itemId);
	const offHandWeapon = getEquippedWeapon(state.hero.equipment.offHand?.itemId);

	return mainHandWeapon?.handedness === "oneHanded" && offHandWeapon?.handedness === "oneHanded";
}
