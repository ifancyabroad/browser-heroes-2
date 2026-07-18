import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sharp",
	name: "Sharp",
	position: "prefix",
	rarity: "common",
	minLevel: 1,
	weight: 1,
	appliesTo: {
		weaponTypes: ["sword", "dagger", "axe", "spear"],
	},
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
