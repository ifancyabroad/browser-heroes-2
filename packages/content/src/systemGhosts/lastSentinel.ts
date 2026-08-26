import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "last_sentinel",
	encounterLevel: 10,
	heroLevel: 10,
	name: "Brannoc",
	classId: "warrior",
	additionalSkillIds: ["double_strike", "dancing_defense", "heavy_strike", "last_stand"],
	featIds: ["deep_wounds", "juggernaut", "spellbreaker"],
	equipment: {
		body: { baseId: "base_plate_armour", rarity: "epic" },
		hands: { baseId: "base_gauntlets", rarity: "epic" },
		feet: { baseId: "base_greaves", rarity: "epic" },
		mainHand: { baseId: "base_longsword", rarity: "epic" },
		offHand: { baseId: "base_tower_shield", rarity: "epic" },
	},
});
