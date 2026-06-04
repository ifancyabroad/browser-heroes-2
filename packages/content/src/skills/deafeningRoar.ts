import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "Unleash a crippling roar that weakens and disorients nearby enemies.",
	effects: [
		{
			difficulty: 20,
			duration: 4,
			modifier: "wisdom",
			properties: [
				{
					name: "strength",
					type: "stat",
					value: -6,
				},
				{
					name: "dexterity",
					type: "stat",
					value: -6,
				},
				{
					name: "intelligence",
					type: "stat",
					value: -6,
				},
			],
			target: "enemy",
			type: "status",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhgy1Vmh0FTTPCWBory?alt=media&token=9f2b03e8-b95d-403d-86e0-acd4e362468e",
	level: 4,
	maxUses: 6,
	name: "Deafening Roar",
	price: 0,
	id: "deafening_roar",
});
