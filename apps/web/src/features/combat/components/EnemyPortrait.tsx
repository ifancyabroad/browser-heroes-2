import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./EnemyPortrait.module.css";

const HIT_FEEDBACK_MS = 180;
const DEATH_FEEDBACK_MS = 280;

type EnemyPortraitProps = {
	enemyId: string;
	currentHp: number;
	portrait: string | null;
	name: string;
	isSlain: boolean;
};

export function EnemyPortrait({ enemyId, currentHp, portrait, name, isSlain }: EnemyPortraitProps) {
	const previousEnemy = useRef({ id: enemyId, hp: currentHp });
	const feedbackTimeout = useRef<number | null>(null);
	const [isHit, setIsHit] = useState(false);
	const [isDying, setIsDying] = useState(false);
	const [loadedEnemyId, setLoadedEnemyId] = useState<string | null>(null);
	const isLoaded = loadedEnemyId === enemyId;

	useEffect(() => {
		return () => {
			if (feedbackTimeout.current !== null) {
				window.clearTimeout(feedbackTimeout.current);
			}
		};
	}, []);

	useEffect(() => {
		if (feedbackTimeout.current !== null) {
			window.clearTimeout(feedbackTimeout.current);
			feedbackTimeout.current = null;
		}

		const previous = previousEnemy.current;

		if (previous.id !== enemyId) {
			previousEnemy.current = { id: enemyId, hp: currentHp };
			setIsHit(false);
			setIsDying(false);
			return;
		}

		const tookDamage = currentHp < previous.hp;
		const wasSlain = tookDamage && currentHp <= 0;

		if (wasSlain) {
			setIsHit(false);
			setIsDying(true);
			feedbackTimeout.current = window.setTimeout(() => {
				setIsDying(false);
				feedbackTimeout.current = null;
			}, DEATH_FEEDBACK_MS);
		} else if (tookDamage) {
			setIsHit(true);
			setIsDying(false);
			feedbackTimeout.current = window.setTimeout(() => {
				setIsHit(false);
				feedbackTimeout.current = null;
			}, HIT_FEEDBACK_MS);
		} else {
			setIsHit(false);
			setIsDying(false);
		}

		previousEnemy.current = { id: enemyId, hp: currentHp };
	}, [currentHp, enemyId]);

	if (!portrait) {
		return null;
	}

	return (
		<img
			key={enemyId}
			src={portrait}
			alt={name}
			loading="eager"
			fetchPriority="high"
			decoding="async"
			onLoad={() => setLoadedEnemyId(enemyId)}
			className={clsx(
				"relative h-full w-full object-contain opacity-0 motion-safe:transition-opacity motion-safe:duration-150",
				isLoaded && "opacity-100",
				isHit && styles.hit,
				isDying && styles.death,
				isSlain && !isDying && styles.slain,
			)}
		/>
	);
}
