import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Flail is a unique weapon consisting of a spiked ball attached to a sturdy chain, allowing for unpredictable strikes. Its design enables powerful, swinging attacks that can bypass shields and armor. Favored by agile fighters, this weapon combines versatility with a distinct flair in combat.",
	effects: [
		{
			damageType: "piercing",
			max: 4,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86LrSuGHIRtQuAJJAq?alt=media&token=910719f5-7fc8-4fbd-aa17-761da5c9ed1b",
	level: 1,
	max: 8,
	min: 1,
	name: "Flail",
	price: 280,
	size: "oneHanded",
	type: "weapon",
	weaponType: "mace",
	id: "flail",
});
