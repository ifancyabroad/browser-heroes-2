import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_shaman",
	name: "Ratman Shaman",
	portrait: "enemies/desert/ratman_shaman.png",
	rank: "normal",
	threat: 11,
	attributes: {
		strength: 10,
		dexterity: 16,
		constitution: 14,
		intelligence: 14,
		wisdom: 14,
		charisma: 10,
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
			name: "Spear",
			attackAttribute: "strength",
			damage: {
				dice: "1d8",
				type: "piercing",
				attribute: "strength",
			},
		},
		skillIds: ["renew", "bless", "lightning_bolt"],
		featIds: [],
		tactic: "defensive",
	},
	proficiencies: {
		savingThrows: ["wisdom", "charisma"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
