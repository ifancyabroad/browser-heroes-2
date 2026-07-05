import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "power_axe",
	name: "Power Axe",
	description:
		"The Power Axe is a formidable weapon with a broad, heavy head for devastating strikes. Its sturdy handle ensures a strong grip, allowing for powerful swings. Favored by warriors, this axe embodies strength and effectiveness, making it a force to be reckoned with in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a8SUEJmMBAf_be87T?alt=media&token=42941e5a-b068-4c8f-9f03-f4c39c7be052",
	price: 720,
	rarity: "rare",
	type: "weapon",
	weaponType: "axe",
	handedness: "twoHanded",
	range: "melee",
	damage: {
		dice: "1d10+2",
		type: "slashing",
		attribute: "strength",
	},
	modifiers: [
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 2,
		},
	],
	attackRiders: [],
	tags: [],
});
