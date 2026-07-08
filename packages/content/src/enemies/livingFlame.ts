import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "living_flame",
	name: "Living Flame",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-NhkcuvakLcMmPpk-jQk?alt=media&token=f3e0a550-50df-44ed-afea-cc7783541eca",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 9,
		dexterity: 14,
		constitution: 16,
		intelligence: 20,
		wisdom: 16,
		charisma: 14,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Burning Touch",
			attackAttribute: "intelligence",
			damage: {
				dice: "1d6",
				type: "fire",
				attribute: "intelligence",
			},
		},
		skillIds: ["engulf", "fireball"],
		featIds: ["arcane_penetration", "embrace_elements"],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["intelligence", "constitution"],
	},
	encounter: {
		zone: "volcano",
		weight: 1,
	},
	tags: [],
});
