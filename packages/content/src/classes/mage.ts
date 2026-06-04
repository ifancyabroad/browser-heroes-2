import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "mage",
	name: "Mage",
	description: "Master of the arcane arts and proficient with all forms of magic.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_P0pcakZhKbNDftKoc%2Fportrait?alt=media&token=1d85af91-3177-4f6f-99eb-c2a96c88810e",
	fallenImage:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_P0pcakZhKbNDftKoc%2FfallenImage?alt=media&token=98d7f254-0e73-44af-9005-456b035ff8bc",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_P0pcakZhKbNDftKoc%2Ficon?alt=media&token=0db78c8a-5bc9-473c-90e8-0c93954bff81",
	skillClasses: ["mage", "warlock"],
	armourTypes: ["misc", "cloth"],
	weaponTypes: ["staff", "wand"],
	skills: ["attack", "sparks"],
	stats: {
		charisma: 12,
		constitution: 14,
		dexterity: 14,
		intelligence: 18,
		strength: 10,
		wisdom: 12,
	},
	tactics: "caster",
	equipment: {
		body: "-Nm2HibRx3V8P1isPlRf",
		hand1: "-Nc46CPWJz2atC_uII9i",
	},
});
