import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_mold",
	name: "Living Mold",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkbQX-i_HQ7Gt2qHgm?alt=media&token=a269a32a-249f-494f-9674-f0eddcdaa190",
	rank: "normal",
	threat: 8,
	attributes: {
		strength: 12,
		dexterity: 8,
		constitution: 14,
		intelligence: 5,
		wisdom: 10,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 8,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: ["fire"],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["regeneration", "poison_bite"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
