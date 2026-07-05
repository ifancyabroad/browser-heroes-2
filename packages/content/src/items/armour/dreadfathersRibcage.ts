import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "dreadfathers_ribcage",
	name: "Dreadfather's Ribcage",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIG0b1_0Qv-JCbVeksA?alt=media&token=9fabee45-ff66-433b-ae89-7721da41500b",
	price: 1800,
	rarity: "epic",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "lightning",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "cold",
		},
		{
			type: "modifyStat",
			stat: "wisdom",
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
	tags: [],
});
