import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_lightning",
	name: "Call Lightning",
	description:
		"Summon a bolt of lightning from the heavens to strike your target with electrifying force.",
	icon: "skills/occultist/call_lightning.png",
	pool: "occultist",
	category: "spell",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d12+8",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
