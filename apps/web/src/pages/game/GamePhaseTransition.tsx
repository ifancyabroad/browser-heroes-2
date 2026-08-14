import {
	type AnimationEvent,
	type PropsWithChildren,
	type ReactNode,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import type { RunPhase } from "@app/engine";
import type { RunView } from "@app/shared";
import { CombatView } from "../../features/combat";
import styles from "./GamePhaseTransition.module.css";

type GamePhaseTransitionProps = PropsWithChildren<{
	run: RunView;
}>;

type TransitionDefinition = {
	from: RunPhase;
	to: RunPhase;
	renderFrame: (run: RunView) => ReactNode;
};

type PreviousRunView = {
	id: string;
	phase: RunPhase;
};

type ActiveTransition = {
	definition: TransitionDefinition;
	runId: string;
};

type EntranceView = {
	runId: string;
	phase: RunPhase;
};

const TRANSITIONS: readonly TransitionDefinition[] = [
	{
		from: "combat",
		to: "dead",
		renderFrame: (run) => <CombatView run={run} />,
	},
];

export function GamePhaseTransition({ children, run }: GamePhaseTransitionProps) {
	const previousRunRef = useRef<PreviousRunView | null>(null);
	const [activeTransition, setActiveTransition] = useState<ActiveTransition | null>(null);
	const [entranceView, setEntranceView] = useState<EntranceView | null>(null);

	useLayoutEffect(() => {
		const previousRun = previousRunRef.current;
		const transition = TRANSITIONS.find(
			(definition) =>
				previousRun?.id === run.id &&
				previousRun.phase === definition.from &&
				run.state.phase === definition.to,
		);
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (transition && !prefersReducedMotion) {
			setActiveTransition({ definition: transition, runId: run.id });
			setEntranceView(null);
		} else {
			setActiveTransition((current) =>
				current?.runId === run.id && current.definition.to === run.state.phase
					? current
					: null,
			);
			setEntranceView((current) =>
				current?.runId === run.id && current.phase === run.state.phase ? current : null,
			);
		}

		previousRunRef.current = { id: run.id, phase: run.state.phase };
	}, [run]);

	function handleTransitionEnd(event: AnimationEvent<HTMLDivElement>) {
		if (event.target !== event.currentTarget) {
			return;
		}

		setActiveTransition(null);
		setEntranceView({ runId: run.id, phase: run.state.phase });
	}

	if (activeTransition) {
		return (
			<div
				className={styles.transitionFrame}
				inert
				aria-hidden="true"
				onAnimationEnd={handleTransitionEnd}
			>
				{activeTransition.definition.renderFrame(run)}
			</div>
		);
	}

	return entranceView ? <div className={styles.entrance}>{children}</div> : children;
}
