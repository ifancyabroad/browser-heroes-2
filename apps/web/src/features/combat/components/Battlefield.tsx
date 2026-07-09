import { useEffect, useRef, useState } from "react";
import type { Zone } from "@app/content";
import clsx from "clsx";
import styles from "./Battlefield.module.css";

import abyssBackground from "../../../assets/images/backgrounds/bg_41.png";
import castleBackground from "../../../assets/images/backgrounds/bg_27.png";
import desertBackground from "../../../assets/images/backgrounds/bg_09.png";
import dungeonBackground from "../../../assets/images/backgrounds/bg_50.png";
import forestBackground from "../../../assets/images/backgrounds/bg_12.png";
import hillsBackground from "../../../assets/images/backgrounds/bg_22.png";
import oceanBackground from "../../../assets/images/backgrounds/bg_25.png";
import plainsBackground from "../../../assets/images/backgrounds/bg_46.png";
import towerBackground from "../../../assets/images/backgrounds/bg_38.png";
import volcanoBackground from "../../../assets/images/backgrounds/bg_16.png";

const ZONE_BACKGROUNDS = {
	abyss: abyssBackground,
	castle: castleBackground,
	desert: desertBackground,
	dungeon: dungeonBackground,
	forest: forestBackground,
	hills: hillsBackground,
	ocean: oceanBackground,
	plains: plainsBackground,
	tower: towerBackground,
	volcano: volcanoBackground,
} satisfies Record<Zone, string>;

type BattlefieldProps = {
	enemyId: string;
	enemyCurrentHp: number;
	enemyPortrait: string | null;
	enemyName: string;
	isEnemySlain: boolean;
	zone: Zone;
};

export function Battlefield({
	enemyId,
	enemyCurrentHp,
	enemyPortrait,
	enemyName,
	isEnemySlain,
	zone,
}: BattlefieldProps) {
	const previousEnemy = useRef({ id: enemyId, hp: enemyCurrentHp });
	const hitTimeout = useRef<number | null>(null);
	const [isHit, setIsHit] = useState(false);

	useEffect(() => {
		return () => {
			if (hitTimeout.current !== null) {
				window.clearTimeout(hitTimeout.current);
			}
		};
	}, []);

	useEffect(() => {
		if (hitTimeout.current !== null) {
			window.clearTimeout(hitTimeout.current);
			hitTimeout.current = null;
		}

		const previous = previousEnemy.current;

		if (previous.id !== enemyId) {
			previousEnemy.current = { id: enemyId, hp: enemyCurrentHp };
			setIsHit(false);
			return;
		}

		if (enemyCurrentHp < previous.hp && enemyCurrentHp > 0) {
			setIsHit(true);
			hitTimeout.current = window.setTimeout(() => {
				setIsHit(false);
				hitTimeout.current = null;
			}, 180);
		} else {
			setIsHit(false);
		}

		previousEnemy.current = { id: enemyId, hp: enemyCurrentHp };
	}, [enemyCurrentHp, enemyId]);

	return (
		<section
			className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-cover bg-bottom bg-no-repeat"
			aria-label="Battlefield"
			style={{ backgroundImage: `url(${ZONE_BACKGROUNDS[zone]})` }}
		>
			{enemyPortrait && (
				<img
					src={enemyPortrait}
					alt={enemyName}
					loading="lazy"
					className={clsx(
						"relative h-full w-full object-contain",
						isHit && styles.portraitHit,
						isEnemySlain && styles.portraitSlain,
					)}
				/>
			)}
		</section>
	);
}
