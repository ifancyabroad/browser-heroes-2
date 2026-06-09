import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "squires_breastplate",
	name: "Squire's Breastplate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I4m42K8Jd2iOdVxQS?alt=media&token=f2284381-1d33-41ab-9aeb-373418c6e990",
	price: 380,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "heavy",
	armourClass: 16,
	modifiers: [
		{
			type: "modifyStat",
			stat: "charisma",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
