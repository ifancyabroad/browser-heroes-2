import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_champion",
	name: "Ratman Champion",
	portrait: "enemies/desert/ratman_champion.png",
	rank: "normal",
	threat: 16,
	attributes: {
		strength: 16,
		dexterity: 16,
		constitution: 14,
		intelligence: 10,
		wisdom: 12,
		charisma: 6,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 18,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Fine Longsword",
			attackAttribute: "strength",
			damage: {
				dice: "1d8+1",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["shield_wall", "rend"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
