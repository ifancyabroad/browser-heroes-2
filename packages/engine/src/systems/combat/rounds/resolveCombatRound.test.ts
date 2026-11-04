import type { RiderEffect } from "@app/content";
import { describe, expect, it } from "vitest";
import { applyAction } from "../../../actions";
import type { CombatantSide, EngineAction, RunState } from "../../../schemas";
import { createTestCombat } from "../../../test/createTestCombat";
import { createTestRunState } from "../../../test/createTestRunState";
import { resolveSkillEffects } from "../skills/resolveSkillEffects";

function createRoundState(enemyInitiative = 11) {
	const state = createTestRunState();
	const sourceId = state.combat!.enemy.sourceId;
	state.combat = createTestCombat();
	state.combat.enemy.sourceId = sourceId;
	state.combat.enemy.combatStats.initiative = enemyInitiative;
	state.combat.player.skills = [{ skillId: "armour", chargesRemaining: 2 }];
	for (const side of ["player", "enemy"] as const) {
		const actor = state.combat[side];
		actor.basicAttack.damage = { dice: "1d4", type: "crushing", damageClass: "physical" };
		actor.activeEffects = [
			{
				id: `${side}-hit`,
				type: "modifyRoll",
				sourceCombatantId: actor.id,
				sourceSide: side,
				source: {
					type: "skill",
					skillId: "focus_energy",
					sourceName: "Test",
					sourceEffectKey: "hit",
				},
				duration: { unit: "battles", remaining: 1 },
				roll: "attack",
				mode: "automaticSuccess",
			},
		];
	}
	return state;
}

function addRider(state: RunState, side: CombatantSide, ...effects: RiderEffect[]) {
	state.combat![side].basicAttack.attackRiders.push({ timing: "onHit", effects });
}

function attackOrder(state: RunState, turnNumber = 1) {
	return state
		.combat!.log.filter(
			(entry) => entry.turnNumber === turnNumber && entry.eventType === "basic_attack",
		)
		.map((entry) => entry.actor);
}

const attack = { type: "PLAYER_BASIC_ATTACK" } as const;
const skill = { type: "PLAYER_USE_SKILL", skillId: "armour" } as const;
const potion = { type: "PLAYER_USE_CONSUMABLE", consumableType: "healingPotion" } as const;

describe("resolveCombatRound", () => {
	it.each([
		[9, ["player", "enemy"]],
		[10, ["player", "enemy"]],
		[11, ["enemy", "player"]],
	])("orders Initiative 10 against %i", (initiative, expected) => {
		const result = applyAction(createRoundState(initiative), attack);

		expect(result.ok).toBe(true);
		expect(attackOrder(result.state)).toEqual(expected);
		expect(result.state.combat).toMatchObject({ activeActor: "player", turnNumber: 2 });
		expect(result.events.filter((event) => event.type === "COMBAT_TURN_RESOLVED")).toHaveLength(
			1,
		);
	});

	it.each([5, -5])("uses temporary Initiative changes (%i) starting next round", (value) => {
		const state = createRoundState(value > 0 ? 11 : 9);
		const side = value > 0 ? "enemy" : "player";
		addRider(state, side, {
			type: "modifyStat",
			target: value > 0 ? "enemy" : "self",
			stat: "initiative",
			value,
			duration: { unit: "turns", value: 2 },
		});

		const first = applyAction(state, attack);

		const second = applyAction(first.state, attack);

		expect(attackOrder(first.state)).toEqual(
			value > 0 ? ["enemy", "player"] : ["player", "enemy"],
		);
		expect(attackOrder(second.state, 2)).toEqual(
			value > 0 ? ["player", "enemy"] : ["enemy", "player"],
		);
	});

	it("supports Initiative skill effects and keeps the current order when the buff expires", () => {
		const state = createRoundState();

		const buff = resolveSkillEffects({
			combat: state.combat!,
			actorSide: "player",
			skillId: "armour",
			skillName: "Test Initiative",
			effects: [
				{
					type: "modifyStat",
					target: "self",
					stat: "initiative",
					value: 5,
					duration: { unit: "turns", value: 1 },
				},
			],
			rngState: state.rngState,
		});
		state.combat = buff.value;
		state.rngState = buff.rngState;

		const first = applyAction(state, attack);

		expect(attackOrder(first.state)).toEqual(["player", "enemy"]);
		expect(
			first.state.combat!.player.activeEffects.some((effect) => effect.type === "modifyStat"),
		).toBe(false);

		const second = applyAction(first.state, attack);

		expect(attackOrder(second.state, 2)).toEqual(["enemy", "player"]);
	});

	it.each([attack, skill, potion])(
		"cancels $type when the faster enemy stuns the hero",
		(action) => {
			const state = createRoundState();
			addRider(state, "enemy", {
				type: "applyStatus",
				target: "enemy",
				statusId: "stunned",
				duration: { unit: "turns", value: 1 },
			});

			const result = applyAction(state, action);

			expect(result.ok).toBe(true);
			expect(attackOrder(result.state)).toEqual(["enemy"]);
			expect(result.state.hero.healingPotions).toBe(state.hero.healingPotions);
			expect(result.state.combat!.player.skills).toEqual(state.combat!.player.skills);
			expect(result.events.map((event) => event.type)).toEqual(["COMBAT_TURN_RESOLVED"]);
			expect(result.state.combat!.log).toContainEqual(
				expect.objectContaining({
					actor: "player",
					eventType: "turn_skipped",
					message: "Test player is stunned and cannot act.",
				}),
			);
			expect(
				result.state.combat!.player.activeEffects.some(
					(effect) => effect.type === "status",
				),
			).toBe(false);
		},
	);

	it("falls back to a basic attack when the faster enemy silences a selected skill", () => {
		const state = createRoundState();
		state.combat!.enemy.currentHp = 1;
		addRider(state, "enemy", {
			type: "applyStatus",
			target: "enemy",
			statusId: "silenced",
			duration: { unit: "turns", value: 1 },
		});

		const result = applyAction(state, skill);

		expect(attackOrder(result.state)).toEqual(["enemy", "player"]);
		expect(result.state.combat!.player.skills).toEqual(state.combat!.player.skills);
		expect(result.events.some((event) => event.type === "SKILL_USED")).toBe(false);
		expect(result.events).toContainEqual(
			expect.objectContaining({
				finishingPlayerAction: { type: "basic_attack", targetStartedAtFullHp: false },
			}),
		);
	});

	it("records target health immediately before the hero's finishing action", () => {
		const state = createRoundState();
		state.combat!.player.basicAttack.damage.dice = "1d4+100";
		addRider(state, "enemy", {
			type: "damage",
			target: "self",
			dice: "1d4",
			damageType: "necrotic",
			damageClass: "magical",
			requiresAttackRoll: false,
		});

		const result = applyAction(state, attack);

		expect(result.events).toContainEqual(
			expect.objectContaining({
				finishingPlayerAction: { type: "basic_attack", targetStartedAtFullHp: false },
			}),
		);
	});

	it("still skips a slower enemy stunned by the hero", () => {
		const state = createRoundState(9);
		addRider(state, "player", {
			type: "applyStatus",
			target: "enemy",
			statusId: "stunned",
			duration: { unit: "turns", value: 1 },
		});

		const result = applyAction(state, attack);

		expect(attackOrder(result.state)).toEqual(["player"]);
		expect(result.state.combat!.log).toContainEqual(
			expect.objectContaining({ actor: "enemy", eventType: "turn_skipped" }),
		);
		expect(
			result.state.combat!.enemy.activeEffects.some((effect) => effect.type === "status"),
		).toBe(false);
	});

	it("leaves an explicit skip unchanged when the enemy acts first", () => {
		const result = applyAction(createRoundState(), { type: "PLAYER_SKIP_TURN" });

		expect(attackOrder(result.state)).toEqual(["enemy"]);
		expect(result.state.combat!.log).toContainEqual(
			expect.objectContaining({
				actor: "player",
				eventType: "turn_skipped",
				message: "Test player skips their turn.",
			}),
		);
	});

	it("consumes a skill charge and emits one usage event only when the skill resolves", () => {
		const result = applyAction(createRoundState(), skill);

		expect(result.ok).toBe(true);
		expect(result.state.combat!.player.skills[0].chargesRemaining).toBe(1);
		expect(result.events.filter((event) => event.type === "SKILL_USED")).toHaveLength(1);

		const buff = result.state.combat!.player.activeEffects.find(
			(effect) => effect.type === "modifyStat",
		);

		expect(buff?.duration).toEqual({ unit: "battles", remaining: 5 });
	});

	it("heals from the post-enemy state and consumes one potion", () => {
		const result = applyAction(createRoundState(), potion);
		const player = result.state.combat!.player;
		const damageTaken = result.state.combat!.log.reduce((total, entry) => {
			const outcome = entry.outcome;
			return outcome?.type === "damage" && outcome.targetId === player.id
				? total + outcome.hpDamage
				: total;
		}, 0);

		expect(result.ok).toBe(true);
		expect(damageTaken).toBeGreaterThan(0);
		expect(player.currentHp).toBe(player.maxHp);
		expect(result.events).toContainEqual({
			type: "HEALING_POTION_USED",
			amount: damageTaken,
			remainingPotions: 2,
		});
	});

	it.each([attack, skill, potion])(
		"ends in defeat without executing $type after lethal enemy damage",
		(action) => {
			const state = createRoundState();
			state.combat!.player.currentHp = 1;

			const result = applyAction(state, action);

			expect(result.state.phase).toBe("dead");
			expect(attackOrder(result.state)).toEqual(["enemy"]);
			expect(result.state.hero.healingPotions).toBe(state.hero.healingPotions);
			expect(result.state.combat!.player.skills).toEqual(state.combat!.player.skills);
			expect(result.events).toEqual([
				expect.objectContaining({ type: "COMBAT_ENDED", outcome: "defeat" }),
			]);
		},
	);

	it.each([9, 11])("awards victory once with enemy Initiative %i", (initiative) => {
		const state = createRoundState(initiative);
		state.combat!.enemy.currentHp = 1;

		const result = applyAction(state, attack);

		expect(result.ok).toBe(true);
		expect(result.state.kills).toBe(state.kills + 1);
		expect(result.events.filter((event) => event.type === "COMBAT_ENDED")).toEqual([
			expect.objectContaining({
				outcome: "victory",
				finishingPlayerAction: { type: "basic_attack", targetStartedAtFullHp: false },
			}),
		]);
		expect(attackOrder(result.state)).toEqual(
			initiative > 10 ? ["enemy", "player"] : ["player"],
		);
	});

	it.each(["player", "enemy"] as const)(
		"checks lethal recurring damage after the faster %s acts",
		(side) => {
			const state = createRoundState(side === "player" ? 9 : 11);
			const actor = state.combat![side];
			actor.currentHp = 1;
			actor.activeEffects.push({
				id: "dot",
				type: "damageOverTime",
				damageType: "necrotic",
				damageClass: "magical",
				dice: "1d4",
				duration: { unit: "turns", remaining: 1 },
				sourceCombatantId: actor.id,
				sourceSide: side,
				source: {
					type: "skill",
					skillId: "armour",
					sourceName: "Test",
					sourceEffectKey: "dot",
				},
			});

			const result = applyAction(state, attack);

			expect(attackOrder(result.state)).toEqual([side]);
			expect(result.state.combat!.status).toBe(
				side === "player" ? "enemy_won" : "player_won",
			);
			expect(result.events.filter((event) => event.type === "COMBAT_ENDED")).toHaveLength(1);

			if (side === "enemy") {
				expect(result.events).toContainEqual(
					expect.objectContaining({ finishingPlayerAction: null }),
				);
			}
		},
	);

	it("does not advance a newly applied self effect on the action that applies it", () => {
		const state = createRoundState();
		state.combat!.enemy.currentHp = 50;
		addRider(state, "enemy", {
			type: "healOverTime",
			target: "self",
			dice: "1d4",
			duration: { unit: "turns", value: 2 },
		});

		const result = applyAction(state, attack);

		const effect = result.state.combat!.enemy.activeEffects.find(
			(effect) => effect.type === "healOverTime",
		);

		expect(effect?.duration).toEqual({ unit: "turns", remaining: 2 });
		expect(
			result.state.combat!.log.some(
				(entry) =>
					entry.eventType === "effect_triggered" &&
					entry.outcome?.type === "healing" &&
					entry.outcome.targetId === result.state.combat!.enemy.id,
			),
		).toBe(false);
	});

	it("rejects invalid submissions before the enemy acts and preserves deterministic inputs", () => {
		const state = createRoundState();
		const original = structuredClone(state);
		const invalid: EngineAction = { type: "PLAYER_USE_SKILL", skillId: "heavy_strike" };

		const result = applyAction(state, invalid);

		expect(result.ok).toBe(false);
		expect(result.state).toEqual(original);

		const first = applyAction(state, attack);
		const second = applyAction(state, attack);

		expect(first.ok).toBe(true);
		expect(second.ok).toBe(true);
		expect(first).toEqual(second);
		expect(state).toEqual(original);
	});
});
