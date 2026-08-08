import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_belt",
	name: "Centurion's Belt",
	icon: "items/armour/sets/mail/Mail17_belt.png",
	price: 2700,
	rarity: "legendary",
	type: "armour",
	slot: "belt",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			value: 4,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 5,
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
