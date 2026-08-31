import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_warlock",
	name: "Ratman Warlock",
	portrait: "enemies/desert/ratman_warlock.png",
	rank: "normal",
	threat: 14,
	attributes: {
		strength: 10,
		dexterity: 16,
		constitution: 14,
		intelligence: 18,
		wisdom: 16,
		charisma: 12,
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
			attackRange: "melee",
			name: "Necrotic Staff",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d8+1",
				type: "necrotic",
				damageClass: "magical",
				attribute: "intelligence",
			},
		},
		skillIds: ["embrace_shadows", "shadow_bolt", "blind"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "charisma"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
