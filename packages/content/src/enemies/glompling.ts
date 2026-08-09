import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "glompling",
	name: "Glompling",
	portrait: "enemies/forest/glompling.png",
	rank: "normal",
	threat: 6,
	attributes: {
		strength: 7,
		dexterity: 14,
		constitution: 9,
		intelligence: 8,
		wisdom: 7,
		charisma: 8,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 11,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Bite",
			attackAttribute: "dexterity",
			damage: {
				dice: "1d6",
				type: "piercing",
				attribute: "dexterity",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "acid",
							dice: "1d4",
						},
					],
				},
			],
		},
		skillIds: [],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: [],
	},
	encounter: {
		zone: "forest",
		weight: 1,
	},
	tags: [],
});
