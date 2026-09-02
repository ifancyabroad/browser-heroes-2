import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "ember_scholar",
	encounterLevel: 3,
	heroLevel: 4,
	name: "Orin",
	classId: "mage",
	additionalSkillIds: ["flame_arrow"],
	featIds: [],
	equipment: {
		head: { baseId: "base_circlet", rarity: "uncommon" },
		body: { baseId: "base_robe", rarity: "common" },
		hands: { baseId: "base_wraps", rarity: "uncommon" },
		waist: { baseId: "base_sash", rarity: "uncommon" },
		mainHand: { baseId: "base_fire_staff", rarity: "common" },
	},
});
