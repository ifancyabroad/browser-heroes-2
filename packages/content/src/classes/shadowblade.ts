import { buildClass } from "../builders/buildClass";

export default buildClass({
	id: "shadowblade",
	name: "Shadowblade",
	description: "Assassin forged in darkness, blending magic and steel to silence foes.",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI76C9UljPe-6hnDUcP%2Fportrait?alt=media&token=983dc552-318e-4a5c-802b-29681430c044",
	enemyPortrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI76C9UljPe-6hnDUcP%2FfallenImage?alt=media&token=0a719a0f-5acf-40f3-a0ae-6d778b45ac80",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fclasses%2F-OI76C9UljPe-6hnDUcP%2Ficon?alt=media&token=79b84c2f-6204-49ef-87e4-99eb50cc736b",
	attributes: {
		charisma: 10,
		constitution: 14,
		dexterity: 16,
		intelligence: 10,
		strength: 14,
		wisdom: 16,
	},
	combat: {
		hitDie: "1d8",
		skillIds: ["inflict_wounds"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		armourTypes: ["light"],
		weaponTypes: ["dagger", "sword", "axe", "bow", "crossbow"],
	},
	skillPoolIds: ["assassin", "occultist"],
	startingEquipment: {
		body: "padded_armour",
		hand1: "dagger",
		hand2: "dagger",
	},
	tags: [],
});
