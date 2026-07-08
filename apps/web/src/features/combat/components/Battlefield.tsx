import type { Zone } from "@app/content";

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
	enemyPortrait: string | null;
	enemyName: string;
	zone: Zone;
};

export function Battlefield({ enemyPortrait, enemyName, zone }: BattlefieldProps) {
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
					className="relative h-full w-full object-contain"
				/>
			)}
		</section>
	);
}
