import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "iron_vigil",
	encounterLevel: 2,
	heroLevel: 3,
	name: "Garran",
	classId: "warrior",
	additionalSkillIds: ["heavy_strike"],
	featIds: ["juggernaut"],
	equipment: {
		body: { baseId: "base_hide_armour", rarity: "common" },
		hands: { baseId: "base_gauntlets", rarity: "uncommon" },
		feet: { baseId: "base_greaves", rarity: "uncommon" },
		mainHand: { baseId: "base_longsword", rarity: "common" },
	},
});
