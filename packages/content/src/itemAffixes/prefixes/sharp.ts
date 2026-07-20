import { buildItemAffix } from "../../builders/buildItemAffix";

export default buildItemAffix({
	id: "sharp",
	name: "Sharp",
	position: "prefix",
	rarity: "common",
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
