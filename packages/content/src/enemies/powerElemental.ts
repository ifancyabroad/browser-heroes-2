import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "power_elemental",
	name: "Power Elemental",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-OC9SlQ66CiMGqEk6_Mn?alt=media&token=47fb381e-08d2-45fa-8068-a25dda97b2ca",
	rank: "normal",
	level: 19,
	threat: 19,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 20,
		intelligence: 8,
		wisdom: 12,
		charisma: 10,
	},
	combat: {
		maxHp: 200,
		armourClass: 18,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: ["acid", "crushing", "fire", "lightning", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["cold"],
		},
		basicAttack: {
			name: "Slam",
			attackBonus: 12,
			damage: {
				dice: "1d8+6",
				type: "crushing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "overcharge", "obliterate"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "tower",
		weight: 1,
	},
	tags: [],
});
