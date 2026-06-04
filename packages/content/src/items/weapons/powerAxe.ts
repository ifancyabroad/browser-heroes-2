import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	damageType: "slashing",
	description:
		"The Power Axe is a formidable weapon with a broad, heavy head for devastating strikes. Its sturdy handle ensures a strong grip, allowing for powerful swings. Favored by warriors, this axe embodies strength and effectiveness, making it a force to be reckoned with in battle.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O4a8SUEJmMBAf_be87T?alt=media&token=42941e5a-b068-4c8f-9f03-f4c39c7be052",
	level: 3,
	max: 12,
	min: 3,
	name: "Power Axe",
	price: 720,
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	size: "twoHanded",
	type: "weapon",
	weaponType: "axe",
	id: "power_axe",
});
