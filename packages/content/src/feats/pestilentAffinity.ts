import { buildFeat } from "../builders/buildFeat";

export default buildFeat({
	id: "pestilent_affinity",
	name: "Pestilent Affinity",
	description: "Occult rites leave your poison magic more virulent.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OI6DWEvSdPHN3sCBzuV?alt=media&token=29173920-9308-4195-a763-56e611914d4b",
	category: "offensive",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "poison",
			operation: "add",
			value: 15,
		},
	],
	attackRiders: [],
	tags: ["occultist"],
});
