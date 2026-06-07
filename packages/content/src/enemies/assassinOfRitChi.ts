import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "assassin_of_rit_chi",
	name: "Assassin of Rit Chi",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_R3NOnT3i1DLiEKnd?alt=media&token=f15f0ecf-a296-4c06-a5db-5035e7701b32",
	rank: "normal",
	level: 15,
	threat: 15,
	attributes: {
		strength: 12,
		dexterity: 18,
		constitution: 14,
		intelligence: 10,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDice: "15d8+47",
		armourClass: 12,
		proficiencyBonus: 5,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "dexterity",
			},
		},
		skillIds: ["acrobatic_strike", "evasion", "backstab"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
