import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "oathbound",
	encounterLevel: 6,
	heroLevel: 7,
	name: "Caelan",
	classId: "paladin",
	additionalSkillIds: ["divine_strength", "divine_protection", "double_strike"],
	featIds: ["duelist", "dawn_blessed"],
	equipment: {
		head: { baseId: "base_helmet", rarity: "uncommon" },
		neck: { baseId: "base_amulet", rarity: "uncommon" },
		body: { baseId: "base_breastplate", rarity: "rare" },
		hands: { baseId: "base_gauntlets", rarity: "uncommon" },
		waist: { baseId: "base_belt", rarity: "uncommon" },
		feet: { baseId: "base_greaves", rarity: "uncommon" },
		mainHand: { baseId: "base_hammer", rarity: "rare" },
		offHand: { baseId: "base_shield", rarity: "rare" },
	},
});
