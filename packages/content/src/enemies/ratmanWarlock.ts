import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ratman_warlock",
	name: "Ratman Warlock",
	portrait: "enemies/desert/ratman_warlock.png",
	rank: "normal",
	threat: 13,
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
		armourClass: 12,
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
		skillIds: ["flame_arrow", "blind"],
		featIds: ["embrace_shadows", "shadow_focus"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "dexterity"],
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
