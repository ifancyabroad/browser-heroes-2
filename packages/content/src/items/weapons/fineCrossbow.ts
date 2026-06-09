import { buildWeapon } from "../../builders/buildWeapon";

export default buildWeapon({
	id: "fine_crossbow",
	name: "Fine Crossbow",
	description:
		"The Fine Crossbow is a meticulously crafted ranged weapon made of polished wood and adorned with intricate carvings. Its powerful draw and precise mechanism ensure accurate shots, making it a favorite among skilled marksmen seeking both beauty and reliability in combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fweapons%2F-O838oF5XDaNy0Fs4Flp?alt=media&token=b3a95965-ec39-4b46-a8bb-a39315f0107c",
	price: 150,
	rarity: "common",
	type: "weapon",
	weaponType: "crossbow",
	handedness: "twoHanded",
	range: "ranged",
	damage: {
		dice: "1d8+1",
		type: "piercing",
		attribute: "dexterity",
	},
	modifiers: [],
	attackRiders: [],
	tags: [],
});
