import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "venom_shade",
	encounterLevel: 5,
	heroLevel: 6,
	name: "Veyra",
	classId: "rogue",
	additionalSkillIds: ["quick_fingers", "enhance_poison"],
	featIds: ["deadly_precision"],
	equipment: {
		head: { baseId: "base_hood", rarity: "uncommon" },
		body: { baseId: "base_studded_leather", rarity: "uncommon" },
		hands: { baseId: "base_gloves", rarity: "uncommon" },
		waist: { baseId: "base_belt", rarity: "uncommon" },
		feet: { baseId: "base_boots", rarity: "uncommon" },
		mainHand: { baseId: "base_dagger", rarity: "uncommon" },
		offHand: { baseId: "base_dagger", rarity: "rare" },
	},
});
