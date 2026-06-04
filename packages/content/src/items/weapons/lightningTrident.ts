import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "piercing",
	description:
		"The Lightning Trident is a formidable weapon with three sharp prongs that shimmer with electric energy. Designed for both melee combat and throwing, it can unleash arcs of lightning upon impact. Favored by storm warriors, this trident embodies the raw power of thunderstorms in battle.",
	effects: [
		{
			damageType: "lightning",
			max: 10,
			min: 4,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O86ft0iHPkB35cl2T2l?alt=media&token=3bcaa4f0-b2fd-4b69-8fae-236448374d9d",
	level: 4,
	max: 12,
	min: 5,
	name: "Lightning Trident",
	price: 1260,
	properties: [
		{
			name: "lightning",
			type: "damage",
			value: 50,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "spear",
	id: "lightning_trident",
});
