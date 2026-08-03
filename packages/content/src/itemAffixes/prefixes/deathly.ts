import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "deathly",
	name: "Deathly",
	position: "prefix",
	rarity: "uncommon",
	weight: 0.5,
	appliesTo: {
		itemTypes: ["weapon", "armour"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "necrotic",
			operation: "add",
			value: 1,
		},
	],
});
