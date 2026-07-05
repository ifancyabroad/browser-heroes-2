import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "pope_hat",
	name: "Pope Hat",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHsFJLKzc9OamfD8D8v?alt=media&token=c7e3e234-30d8-4083-adea-8b965844b0ad",
	price: 720,
	rarity: "rare",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "radiant",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "wisdom",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
