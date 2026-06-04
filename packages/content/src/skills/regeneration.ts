import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "common",
	description: "",
	effects: [
		{
			max: 10,
			min: 4,
			target: "self",
			type: "heal",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkbeREMKyQCVSlZOQf?alt=media&token=25e7cb8e-1605-4ad5-8a17-23bc534c950e",
	level: 2,
	maxUses: 2,
	name: "Regeneration",
	price: 0,
	id: "regeneration",
});
