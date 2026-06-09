import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_boots",
	name: "Deathstalker Boots",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1qgQRzqiWV8YTEeLZ?alt=media&token=509cf88b-b8a7-4c9b-b1e8-8630ae48c041",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "boots",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
