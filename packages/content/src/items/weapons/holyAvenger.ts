import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "crushing",
	description:
		"The Holy Avenger is an ornate mace featuring a radiant head and intricate engravings of celestial symbols. Infused with divine energy, it delivers powerful strikes that smite evil and bolster allies. Favored by paladins, this mace embodies righteousness and the relentless fight against darkness.",
	effects: [
		{
			damageType: "radiant",
			max: 8,
			min: 1,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86LPbrpdPf46hvIISe?alt=media&token=3a9f2df0-5a06-4ee6-bb33-2b058db69425",
	level: 4,
	max: 10,
	min: 5,
	name: "Holy Avenger",
	price: 1280,
	properties: [
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
		{
			name: "radiant",
			type: "damage",
			value: 40,
		},
	],
	size: "oneHanded",
	type: "weapon",
	weaponType: "mace",
	id: "holy_avenger",
});
