import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "dunzarak_the_deceived",
	name: "Dunzarak the Deceived",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC4s3cRf4Z7obD_VqTQ?alt=media&token=f96721a3-ca4e-40a7-b67c-7039a7f1cee9",
	rank: "boss",
	level: 24,
	threat: 24,
	attributes: {
		strength: 27,
		dexterity: 14,
		constitution: 25,
		intelligence: 16,
		wisdom: 15,
		charisma: 24,
	},
	combat: {
		hitDice: "24d12+310",
		armourClass: 22,
		proficiencyBonus: 7,
		damageAffinities: {
			resistances: [
				"acid",
				"cold",
				"crushing",
				"fire",
				"lightning",
				"piercing",
				"poison",
				"slashing",
			],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "strength",
			damage: {
				dice: "2d4+8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["fire_breath", "tail_swipe", "double_strike", "summon_storm", "dragon_focus"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "abyss",
		weight: 1,
	},
	tags: [],
});
