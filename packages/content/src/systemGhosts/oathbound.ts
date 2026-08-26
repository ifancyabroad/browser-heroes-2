import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "oathbound",
	encounterLevel: 6,
	heroLevel: 7,
	name: "Caelan",
	classId: "paladin",
	additionalSkillIds: ["divine_protection", "divine_strength", "double_strike"],
	featIds: ["duelist", "dawn_blessed"],
	equipment: {
		body: { baseId: "base_breastplate", rarity: "rare" },
		mainHand: { baseId: "base_hammer", rarity: "rare" },
		offHand: { baseId: "base_shield", rarity: "rare" },
	},
});
