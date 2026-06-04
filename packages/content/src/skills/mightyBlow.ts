import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "warrior",
	description: "A devastating strike that delivers heavy damage with overwhelming force.",
	effects: [
		{
			multiplier: 3,
			target: "enemy",
			type: "weaponDamage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-NhgyQeYWKGMfv97Ojh0?alt=media&token=07293fa5-d503-491b-85a6-f683d04279bf",
	level: 4,
	maxUses: 2,
	name: "Mighty Blow",
	price: 0,
	id: "mighty_blow",
});
