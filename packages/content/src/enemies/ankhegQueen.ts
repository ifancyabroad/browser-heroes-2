import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "ankheg_queen",
	name: "Ankheg Queen",
	description:
		"A swollen ankheg matriarch whose burrowing colony undermines the marsh banks. Abandoned nests leave hollow ground that can swallow livestock long after the colony moves.",
	portrait: "enemies/swamp/04.PNG",
	rank: "boss",
	threat: 19,
	attributes: {
		strength: 19,
		dexterity: 12,
		constitution: 18,
		intelligence: 1,
		wisdom: 13,
		charisma: 6,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 16,
		damageAffinities: {
			resistances: [],
			immunities: [],
			vulnerabilities: [],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Mandibles",
			icon: "skills/common/bite.png",
			attackAttribute: "strength",
			damage: {
				dice: "2d6",
				type: "slashing",
				damageClass: "physical",
				attribute: "strength",
			},
			attackRiders: [
				{
					timing: "onHit",
					effects: [
						{
							type: "damage",
							target: "enemy",
							damageType: "acid",
							damageClass: "other",
							dice: "1d6",
						},
					],
				},
			],
		},
		skillIds: ["acid_spray", "knock_down"],
		featIds: [],
		tactic: "aggressive",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution"],
	},
	encounter: {
		zone: "swamp",
		weight: 1,
	},
	tags: [],
});
