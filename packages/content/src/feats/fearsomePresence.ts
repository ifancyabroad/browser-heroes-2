import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "fearsome_presence",
	name: "Intimidating Presence",
	description: "Your reputation and bearing make physical attacks hit harder.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-ODDidCmcQZoicnvq99Q?alt=media&token=3cc7e953-5373-4cb2-9f48-9d71cba0c175",
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
