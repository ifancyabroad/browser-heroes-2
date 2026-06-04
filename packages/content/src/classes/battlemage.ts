import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "battlemage",
	name: "Battlemage",
	description: "Proficient in both the arcane arts and melee combat.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI74eayTZduv3tnmUwr%2Fportrait?alt=media&token=ee81b607-5af5-4126-9c1e-2ab9d8eb56ea",
	fallenImage:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI74eayTZduv3tnmUwr%2FfallenImage?alt=media&token=2514440c-0b14-4e9d-9e10-6efaed9b208d",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI74eayTZduv3tnmUwr%2Ficon?alt=media&token=3447cdc1-06c8-4157-80e4-29eee998492c",
	skillClasses: ["barbarian", "warlock"],
	armourTypes: ["light", "medium", "misc"],
	weaponTypes: ["sword", "axe", "spear", "mace", "hammer", "club", "staff"],
	skills: ["attack", "flame_arrow"],
	stats: {
		charisma: 10,
		constitution: 14,
		dexterity: 14,
		intelligence: 16,
		strength: 16,
		wisdom: 10,
	},
	tactics: "default",
	equipment: {
		body: "-NgJzhkhaQDrg55F1iM1",
		hand1: "-NgK-mAaFXHeapzVbWAb",
	},
});
