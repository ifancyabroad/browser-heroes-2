import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "battlemage",
	name: "Battlemage",
	description: "Proficient in both the arcane arts and melee combat.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI74eayTZduv3tnmUwr%2Fportrait?alt=media&token=ee81b607-5af5-4126-9c1e-2ab9d8eb56ea",
	enemyPortrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI74eayTZduv3tnmUwr%2FfallenImage?alt=media&token=2514440c-0b14-4e9d-9e10-6efaed9b208d",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI74eayTZduv3tnmUwr%2Ficon?alt=media&token=3447cdc1-06c8-4157-80e4-29eee998492c",
	attributes: {
		charisma: 10,
		constitution: 14,
		dexterity: 14,
		intelligence: 16,
		strength: 16,
		wisdom: 10,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["flame_arrow"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["light", "medium"],
		weaponTypes: ["sword", "axe", "spear", "mace", "hammer", "club", "staff"],
	},
	skillPoolIds: ["barbarian", "warlock"],
	startingEquipment: {
		body: "hide_armour",
		hand1: "quarterstaff",
	},
	tags: [],
});
