import { buildEnemy } from "../builders/buildEnemy";

export default buildEnemy({
	id: "the_bone_collector",
	name: "The Bone Collector",
	description:
		"A towering amalgamation that replaces shattered bones with pieces taken from its victims. The citadel's oldest burial chambers stand empty wherever its keepers have passed.",
	portrait: "enemies/citadel/the_bone_collector.png",
	rank: "boss",
	threat: 28,
	attributes: {
		strength: 26,
		dexterity: 12,
		constitution: 24,
		intelligence: 10,
		wisdom: 18,
		charisma: 16,
	},
	combat: {
		hitDie: "1d12",
		armourClass: 22,
		damageAffinities: {
			resistances: ["acid", "cold", "fire", "lightning", "necrotic", "piercing", "slashing"],
			immunities: ["poison"],
			vulnerabilities: ["crushing"],
		},
		basicAttack: {
			attackRange: "melee",
			name: "Masterwork Scythe",
			icon: "items/weapons/spears/Spear_v2_02.png",
			attackAttribute: "strength",
			damage: {
				dice: "1d10+4",
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
							damageType: "necrotic",
							damageClass: "magical",
							dice: "1d8",
						},
					],
				},
			],
		},
		skillIds: ["double_strike", "devour_soul", "reassemble", "overpower"],
		featIds: [],
		tactic: "default",
	},
	proficiencies: {
		savingThrows: ["strength", "constitution", "wisdom"],
	},
	encounter: {
		zone: "citadel",
		weight: 1,
	},
	tags: [],
});
