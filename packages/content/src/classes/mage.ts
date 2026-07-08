import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "mage",
	name: "Mage",
	description: "Master of the arcane arts and proficient with all forms of magic.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_P0pcakZhKbNDftKoc%2Fportrait?alt=media&token=1d85af91-3177-4f6f-99eb-c2a96c88810e",
	enemyPortrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_P0pcakZhKbNDftKoc%2FfallenImage?alt=media&token=98d7f254-0e73-44af-9005-456b035ff8bc",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_P0pcakZhKbNDftKoc%2Ficon?alt=media&token=0db78c8a-5bc9-473c-90e8-0c93954bff81",
	attributes: {
		charisma: 12,
		constitution: 14,
		dexterity: 14,
		intelligence: 18,
		strength: 10,
		wisdom: 12,
	},
	combat: {
		hitDie: "1d6",
		skillIds: ["sparks"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		armourTypes: ["cloth"],
		weaponTypes: ["staff", "wand"],
		savingThrows: ["intelligence", "wisdom"],
	},
	skillPoolIds: ["mage", "warlock"],
	startingEquipment: {
		body: "knaves_robe",
		mainHand: "quarterstaff",
	},
	tags: [],
});
