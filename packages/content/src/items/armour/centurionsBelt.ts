import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_belt",
	name: "Centurion's Belt",
	icon: "items/armour/sets/mail/Mail17_belt.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
	],
	tags: [],
});
