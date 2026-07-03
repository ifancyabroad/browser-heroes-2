import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_gauntlets",
	name: "Centurion's Gauntlets",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGGrPdsWdsGO48_7m6?alt=media&token=64aeb067-5f6e-462c-80fb-522f077cc3fa",
	price: 1600,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
	],
	tags: [],
});
