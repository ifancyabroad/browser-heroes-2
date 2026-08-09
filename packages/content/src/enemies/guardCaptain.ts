import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "guard_captain",
	name: "Guard Captain",
	portrait: "enemies/castle/guard_captain.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 10,
		dexterity: 16,
		constitution: 14,
		intelligence: 10,
		wisdom: 10,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Crossbow",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "dexterity",
			},
		},
		skillIds: ["take_aim", "multi_shot"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["dexterity", "constitution"],
	},
	encounter: {
		zone: "castle",
		weight: 1,
	},
	tags: [],
});
