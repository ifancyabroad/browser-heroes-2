import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "night_reaver",
	encounterLevel: 7,
	heroLevel: 8,
	name: "Nyx",
	classId: "shadowblade",
	additionalSkillIds: ["backstab", "cloak_of_shadows", "enhance_poison"],
	featIds: ["deadly_precision", "death_touched"],
	equipment: {
		body: { baseId: "base_studded_leather", rarity: "rare" },
		mainHand: { baseId: "base_shortsword", rarity: "rare" },
	},
});
