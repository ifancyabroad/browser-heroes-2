import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "skeleton_warrior",
	name: "Skeleton Warrior",
	description:
		"A fallen soldier raised with the weapons buried beside it. Its battle drills have survived longer than the kingdom it served.",
	portrait: "enemies/hills/skeleton_warrior.png",
	rank: "normal",
	threat: 12,
	attributes: {
		strength: 12,
		dexterity: 14,
		constitution: 15,
		intelligence: 7,
		wisdom: 8,
		charisma: 5,
	},
	combat: {
		hitDie: "1d8",
		armourClass: 15,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Handaxe",
			icon: "items/weapons/axes/Axe_20.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d6+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["rend", "cleave"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["dexterity"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
