import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "beast_hands",
	name: "Beast Hands",
	description: "Gloves imbued with the untamed fury of beasts, enhancing combat prowess.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDVvTxuDLvTj0HU7Fq?alt=media&token=7a842ba9-5ecc-4a43-8965-c6a0890a8643",
	price: 1550,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "dexterity",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
