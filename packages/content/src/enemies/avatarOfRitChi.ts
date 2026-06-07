import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "avatar_of_rit_chi",
	name: "Avatar of Rit Chi",
	portrait:
		"https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fmonsters%2F-O9_Zt9uUjy8pye9AGEZ?alt=media&token=a14ca262-c02b-4ed2-8e47-ba9591710189",
	rank: "boss",
	level: 18,
	threat: 18,
	attributes: {
		strength: 19,
		dexterity: 16,
		constitution: 20,
		intelligence: 4,
		wisdom: 10,
		charisma: 6,
	},
	combat: {
		maxHp: 316,
		armourClass: 15,
		attackBonus: 0,
		damageBonus: 0,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			name: "Claw",
			attackBonus: 10,
			damage: {
				dice: "2d4+4",
				type: "slashing",
				attribute: "strength",
			},
		},
		skillIds: ["double_strike", "drain_energy", "call_upon_rit_chi"],
		featIds: [],
		tactic: "default",
	},
	encounter: {
		zone: "desert",
		weight: 1,
	},
	tags: [],
});
