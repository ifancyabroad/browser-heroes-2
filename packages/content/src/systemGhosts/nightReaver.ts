import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "night_reaver",
	encounterLevel: 7,
	heroLevel: 8,
	name: "Nyx",
	classId: "shadowblade",
	additionalSkillIds: ["cloak_of_shadows", "enhance_poison", "poison_strike"],
	featIds: ["deadly_precision", "death_touched"],
	equipment: {
		head: { baseId: "base_hood", rarity: "rare" },
		body: { baseId: "base_studded_leather", rarity: "rare" },
		hands: { baseId: "base_gloves", rarity: "rare" },
		finger1: { baseId: "base_ring", rarity: "uncommon" },
		finger2: { baseId: "base_band", rarity: "uncommon" },
		waist: { baseId: "base_belt", rarity: "rare" },
		feet: { baseId: "base_boots", rarity: "rare" },
		mainHand: { baseId: "base_shortsword", rarity: "rare" },
		offHand: { baseId: "base_dagger", rarity: "rare" },
	},
});
