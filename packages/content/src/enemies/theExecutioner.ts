import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_executioner",
	name: "The Executioner",
	description:
		"A giant skeletal headsman bound to the hills’ abandoned execution grounds. The court that commanded it is gone, but it still regards every arrival as condemned.",
	portrait: "enemies/hills/the_executioner.png",
	rank: "boss",
	threat: 21,
	attributes: {
		strength: 22,
		dexterity: 10,
		constitution: 18,
		intelligence: 6,
		wisdom: 10,
		charisma: 8,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 14,
		damageAffinities: {
			resistances: [],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Superior Battleaxe",
			icon: "items/weapons/axes/Axe_11.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+2",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
		},
		skillIds: ["knock_down", "execute", "powerful_blow"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "hills",
		weight: 1,
	},
	tags: [],
});
