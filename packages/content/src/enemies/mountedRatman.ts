import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "mounted_ratman",
	name: "Mounted Ratman",
	portrait: "enemies/desert/mounted_ratman.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 14,
		dexterity: 14,
		constitution: 18,
		intelligence: 8,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 12,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Claw",
			attackAttribute: "strength",
			damage: {
				dice: "1d4",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["charge", "armour_break"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["constitution", "strength"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
