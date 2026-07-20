import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "forceful",
	name: "Forceful",
	position: "prefix",
	rarity: "uncommon",
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 1,
		},
	],
});
