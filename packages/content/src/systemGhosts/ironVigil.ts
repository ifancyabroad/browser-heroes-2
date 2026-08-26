import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "iron_vigil",
	encounterLevel: 2,
	name: "Garran",
	classId: "warrior",
	featIds: ["juggernaut"],
	equipment: {
		body: { baseId: "base_hide_armour", rarity: "common" },
		mainHand: { baseId: "base_longsword", rarity: "common" },
	},
});
