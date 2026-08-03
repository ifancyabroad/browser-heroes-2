import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sharp",
	name: "Sharp",
	position: "prefix",
	rarity: "uncommon",
	weight: 1,
	appliesTo: {
		itemTypes: ["weapon"],
		weaponTypes: ["axe", "dagger", "sword"],
		damageTypes: ["slashing"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
