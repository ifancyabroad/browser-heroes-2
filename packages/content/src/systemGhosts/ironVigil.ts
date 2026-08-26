import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "iron_vigil",
	encounterLevel: 2,
	heroLevel: 3,
	name: "Garran",
	classId: "warrior",
	additionalSkillIds: ["double_strike"],
	featIds: ["juggernaut"],
	equipment: {
		body: { baseId: "base_hide_armour", rarity: "common" },
		mainHand: { baseId: "base_longsword", rarity: "common" },
	},
});
