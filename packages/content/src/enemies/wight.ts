import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "wight",
	name: "Wight",
	description: "Wanders the hills after sundown. Grass blackens where it stops to rest.",
	portrait: "enemies/hills/wight.png",
	rank: "normal",
	threat: 18,
	attributes: {
		strength: 15,
		dexterity: 14,
		constitution: 16,
		intelligence: 10,
		wisdom: 13,
		charisma: 15,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: ["crushing", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["radiant"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Withering Touch",
			icon: "skills/common/corrupting_touch.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6",
				type: "necrotic",
				damageClass: "magical",
				attribute: "strength",
			},
		},
		skillIds: ["corrupting_touch", "evasion"],
		featIds: [],
		tactic: "caster",
	},
	proficiencies: {
		savingThrows: ["constitution", "wisdom"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
