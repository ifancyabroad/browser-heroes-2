import { buildItemBase } from "../../builders/buildItemBase";

export default buildItemBase({
	id: "base_dagger",
	name: "Dagger",
	type: "weapon",
	weaponType: "dagger",
	handedness: "oneHanded",
	range: "melee",
	damage: {
		dice: "1d4",
		type: "piercing",
		attribute: "dexterity",
	},
	iconPool: ["dagger_01", "dagger_02", "dagger_03"],
	tags: [],
});
