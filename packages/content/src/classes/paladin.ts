import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "paladin",
	name: "Paladin",
	description: "A noble warrior bound by divine oath, wielding both sword and faith.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI71oq4C31il2XnXrif%2Fportrait?alt=media&token=2f757f8a-34b2-4be3-b9f6-dcc695c1ba64",
	fallenImage:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI71oq4C31il2XnXrif%2FfallenImage?alt=media&token=2d3ad26c-8564-4cef-b624-dbd846dd096c",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI71oq4C31il2XnXrif%2Ficon?alt=media&token=e85e8965-f963-4c09-bff5-5185c0982692",
	skillClasses: ["warrior", "cleric"],
	armourTypes: ["heavy", "medium", "misc"],
	weaponTypes: ["sword", "axe", "club", "mace", "hammer", "spear"],
	skills: ["attack", "holy_strike"],
	stats: {
		charisma: 12,
		constitution: 14,
		dexterity: 12,
		intelligence: 10,
		strength: 16,
		wisdom: 16,
	},
	tactics: "default",
	equipment: {
		body: "-Nm2Cd-d46R6iuL4782x",
		hand1: "-NgO--jUsGrVSzpmk0lB",
		hand2: "-NZMqz87pcH6a1OgycJ9",
	},
});
