import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "battlemage",
	name: "Battlemage",
	description: "Proficient in both the arcane arts and melee combat.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI74eayTZduv3tnmUwr%2Fportrait?alt=media&token=ee81b607-5af5-4126-9c1e-2ab9d8eb56ea",
	enemyPortrait: "classes/enemy_portrait/battlemage.png",
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
		savingThrows: ["constitution", "intelligence"],
	},
	skillPoolIds: ["barbarian", "warlock"],
	startingEquipment: {
		body: "base_hide_armour",
		mainHand: "base_quarterstaff",
	},
	tags: [],
});
