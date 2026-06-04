import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "fighter",
	name: "Fighter",
	description: "Proud and honorable, specialising in brute strength. ",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_Ot99GWjYjrv9Gs-fP%2Fportrait?alt=media&token=9d4a4f8d-bc47-4fd0-9a62-764155472341",
	fallenImage:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_Ot99GWjYjrv9Gs-fP%2FfallenImage?alt=media&token=6cb8b2c3-1472-4e0a-afaa-f8117f518617",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_Ot99GWjYjrv9Gs-fP%2Ficon?alt=media&token=7bca006c-9465-45e4-a6dd-235d2344577e",
	skillClasses: ["warrior", "barbarian"],
	armourTypes: ["heavy", "medium", "misc"],
	weaponTypes: ["sword", "axe", "club", "hammer", "mace", "spear"],
	skills: ["attack", "armour_break"],
	stats: {
		charisma: 12,
		constitution: 16,
		dexterity: 14,
		intelligence: 10,
		strength: 18,
		wisdom: 10,
	},
	tactics: "default",
	equipment: {
		body: "-NgJzhkhaQDrg55F1iM1",
		hand1: "-NMmvhpTgBUrely_XRJ7",
	},
});
