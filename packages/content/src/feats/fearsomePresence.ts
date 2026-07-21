import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "fearsome_presence",
	name: "Intimidating Presence",
	description: "Your reputation and bearing make physical attacks hit harder.",
	icon: "skills/feats/fearsome_presence.png",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 10,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 10,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 10,
		},
	],
	attackRiders: [],
	tags: ["barbarian"],
});
