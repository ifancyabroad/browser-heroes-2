import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "venomous",
	name: "Venomous",
	position: "prefix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 1,
		},
	],
});
