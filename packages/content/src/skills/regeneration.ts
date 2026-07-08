import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "regeneration",
	name: "Regeneration",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhkbeREMKyQCVSlZOQf?alt=media&token=25e7cb8e-1605-4ad5-8a17-23bc534c950e",
	pool: "common",
	category: "heal",
	maxUses: 2,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "1d8+3",
		},
	],
	tags: [],
});
