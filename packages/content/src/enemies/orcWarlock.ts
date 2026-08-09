import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "orc_warlock",
	name: "Orc Warlock",
	portrait: "enemies/plains/orc_warlock.png",
	rank: "normal",
	threat: 15,
	attributes: {
		strength: 14,
		dexterity: 12,
		constitution: 16,
		intelligence: 18,
		wisdom: 14,
		charisma: 10,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 13,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			name: "Necrotic Staff",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+1",
				type: "necrotic",
				attribute: "intelligence",
			},
		},
		skillIds: ["fireball", "iron_skin", "embrace_shadows"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "charisma"],
	},
	encounter: {
		zone: "plains",
		weight: 1,
	},
	tags: [],
});
