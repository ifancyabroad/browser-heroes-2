import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "frost_breath",
	name: "Frost Breath",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-O9ePSaBG2zG4hDp5rdf?alt=media&token=3863bc82-210a-4655-99ba-1a74fb919075",
	pool: "common",
	category: "spell",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			dice: "3d12+16",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
