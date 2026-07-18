import type { RunState } from "../../schemas";
import { getEquippedWeapon } from "./getEquippedWeapon";

export function canSwapHandWeapons(state: RunState): boolean {
	if (state.phase !== "town") {
		return false;
	}

	const mainHandWeapon = getEquippedWeapon(state.hero.equipment.mainHand);
	const offHandWeapon = getEquippedWeapon(state.hero.equipment.offHand);

	return mainHandWeapon?.handedness === "oneHanded" && offHandWeapon?.handedness === "oneHanded";
}
