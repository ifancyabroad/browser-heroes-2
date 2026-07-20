import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "priest",
	name: "Priest",
	description: "Dedicated to the Gods, wielding both shadow and holy energy.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OHcffU4_J4vJV5nPD1l%2Fportrait?alt=media&token=5706e514-d9c2-4b14-b6cc-7c4ba2098b66",
	enemyPortrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OHcffU4_J4vJV5nPD1l%2FfallenImage?alt=media&token=e9a18220-283a-4c0f-837f-20607ecd2e17",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OHcffU4_J4vJV5nPD1l%2Ficon?alt=media&token=5a190297-3ee0-4e43-afb7-f59c86c339c8",
	attributes: {
		charisma: 10,
		constitution: 14,
		dexterity: 14,
		intelligence: 12,
		strength: 12,
		wisdom: 18,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["holy_bolt"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["cloth", "shield"],
		weaponTypes: ["mace", "hammer", "club", "staff"],
		savingThrows: ["wisdom", "charisma"],
	},
	skillPoolIds: ["cleric", "occultist"],
	startingEquipment: {
		body: "base_robe",
		mainHand: "base_mace",
	},
	tags: [],
});
