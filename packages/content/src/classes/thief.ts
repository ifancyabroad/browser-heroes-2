import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "thief",
	name: "Thief",
	description: "Unscrupulous and underhanded, strikes from the shadows.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_OzueqvUwAUNXnlWpb%2Fportrait?alt=media&token=de94ca09-ad4c-475c-90e1-4a366208dcfd",
	enemyPortrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_OzueqvUwAUNXnlWpb%2FfallenImage?alt=media&token=7cfc636a-f564-426c-9349-cb2882dff972",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-N_OzueqvUwAUNXnlWpb%2Ficon?alt=media&token=17a65949-4a70-4c8a-9c6a-398da73a2806",
	attributes: {
		charisma: 14,
		constitution: 14,
		dexterity: 18,
		intelligence: 12,
		strength: 12,
		wisdom: 10,
	},
	combat: {
		hitDie: "d8",
		skillIds: ["poison_bomb"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["light"],
		weaponTypes: ["dagger", "crossbow", "bow"],
	},
	skillPoolIds: ["rogue", "assassin"],
	startingEquipment: {
		body: "padded_armour",
		hand1: "dagger",
	},
	tags: [],
});
