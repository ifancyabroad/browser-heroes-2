import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "paladin",
	name: "Paladin",
	description: "A noble warrior bound by divine oath, wielding both sword and faith.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI71oq4C31il2XnXrif%2Fportrait?alt=media&token=2f757f8a-34b2-4be3-b9f6-dcc695c1ba64",
	enemyPortrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI71oq4C31il2XnXrif%2FfallenImage?alt=media&token=2d3ad26c-8564-4cef-b624-dbd846dd096c",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI71oq4C31il2XnXrif%2Ficon?alt=media&token=e85e8965-f963-4c09-bff5-5185c0982692",
	attributes: {
		charisma: 12,
		constitution: 14,
		dexterity: 12,
		intelligence: 10,
		strength: 16,
		wisdom: 16,
	},
	combat: {
		hitDie: "1d10",
		skillIds: ["holy_strike"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["heavy", "medium"],
		weaponTypes: ["sword", "axe", "club", "mace", "hammer", "spear"],
	},
	skillPoolIds: ["warrior", "cleric"],
	startingEquipment: {
		body: "breastplate",
		hand1: "mace",
		hand2: "shield",
	},
	tags: [],
});
