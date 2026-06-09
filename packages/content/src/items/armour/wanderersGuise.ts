import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "wanderers_guise",
	name: "Wanderer's Guise",
	description: "Wanderer's Guise offering both protection and anonymity.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzENaEY9B6T05UFmdx3?alt=media&token=2d52238c-0bbd-46a7-8348-841c9b01bc12",
	price: 750,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
