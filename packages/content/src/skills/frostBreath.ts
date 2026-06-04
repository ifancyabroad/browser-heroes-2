import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			damageType: "cold",
			max: 50,
			min: 20,
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9ePSaBG2zG4hDp5rdf?alt=media&token=3863bc82-210a-4655-99ba-1a74fb919075",
	level: 4,
	maxUses: 2,
	name: "Frost Breath",
	price: 0,
	id: "frost_breath",
});
