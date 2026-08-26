import { buildSystemGhost } from "../builders/buildSystemGhost";

export default buildSystemGhost({
	id: "ember_scholar",
	encounterLevel: 3,
	heroLevel: 4,
	name: "Orin",
	classId: "mage",
	additionalSkillIds: ["fireball"],
	featIds: ["potent_casting"],
	equipment: {
		body: { baseId: "base_robe", rarity: "common" },
		mainHand: { baseId: "base_fire_staff", rarity: "common" },
	},
});
