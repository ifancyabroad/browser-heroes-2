import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "last_sentinel",
	encounterLevel: 10,
	heroLevel: 10,
	name: "Brannoc",
	classId: "warrior",
	additionalSkillIds: ["heavy_strike", "double_strike", "dancing_defense", "last_stand"],
	featIds: ["deep_wounds", "juggernaut", "spellbreaker"],
	equipment: {
		head: { baseId: "base_helmet", rarity: "epic" },
		neck: { baseId: "base_chain", rarity: "rare" },
		body: { baseId: "base_plate_armour", rarity: "epic" },
		hands: { baseId: "base_gauntlets", rarity: "epic" },
		finger1: { baseId: "base_ring", rarity: "rare" },
		finger2: { baseId: "base_band", rarity: "rare" },
		waist: { baseId: "base_girdle", rarity: "epic" },
		feet: { baseId: "base_greaves", rarity: "epic" },
		mainHand: { baseId: "base_longsword", rarity: "epic" },
		offHand: { baseId: "base_tower_shield", rarity: "epic" },
	},
});
