import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "magma_elemental",
	name: "Magma Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9T0NsJFrfYHqxt1nI?alt=media&token=4218dd9a-94df-4def-a67c-fc3378c273f9",
	rank: "normal",
	level: 19,
	threat: 19,
	attributes: {
		strength: 24,
		dexterity: 8,
		constitution: 19,
		intelligence: 8,
		wisdom: 11,
		charisma: 11,
	},
	combat: {
		maxHp: 181,
		armourClass: 19,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["acid", "crushing", "lightning", "piercing", "slashing"],
			immunities: ["fire", "poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 13,
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "molten_overdrive", "flame_slam"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
