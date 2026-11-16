import type { TownView } from "@app/engine";
import { IconSwords } from "@tabler/icons-react";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";
import { formatTitle } from "../../../presentation/effects";
import { ZONE_BACKGROUNDS } from "../../../presentation/zones";
import shopIcon from "../../../assets/images/town/shop.png";
import tavernIcon from "../../../assets/images/town/tavern.png";
import alchemistIcon from "../../../assets/images/town/alchemist.png";

type TownHubProps = {
	town: TownView;
	isPending: boolean;
	canEnterCombat: boolean;
	hasViewedShop: boolean;
	onVisitShop: () => void;
	onVisitTavern: () => void;
	onVisitAlchemist: () => void;
	onContinue: () => void;
};

const tileClassName = "relative h-full w-full min-w-0 flex-col overflow-hidden p-0!";
const artClassName = "relative flex min-h-0 w-full flex-1 items-center justify-center";
const captionClassName = "flex min-h-10 w-full shrink-0 items-center justify-center bg-bg-base p-2";

export function TownHub({
	town,
	isPending,
	canEnterCombat,
	hasViewedShop,
	onVisitShop,
	onVisitTavern,
	onVisitAlchemist,
	onContinue,
}: TownHubProps) {
	const zoneName = formatTitle(town.zone);
	const potionsFull = town.healingPotions >= town.maxHealingPotions;
	const services = [
		{
			id: "shop",
			name: "Shop",
			icon: shopIcon,
			status: hasViewedShop ? "Viewed" : "New",
			variant: hasViewedShop ? "success" : "warning",
			onVisit: onVisitShop,
		},
		{
			id: "tavern",
			name: "Tavern",
			icon: tavernIcon,
			status: town.isFullyRested ? "Rested" : "Weary",
			variant: town.isFullyRested ? "success" : "warning",
			onVisit: onVisitTavern,
		},
		{
			id: "alchemist",
			name: "Alchemist",
			icon: alchemistIcon,
			status: `${town.healingPotions}/${town.maxHealingPotions}`,
			variant: potionsFull ? "success" : town.healingPotions === 0 ? "error" : "warning",
			onVisit: onVisitAlchemist,
		},
	] as const;
	return (
		<div
			className="m-auto grid w-full grid-cols-2 auto-rows-[12rem] gap-3 md:grid-cols-[min(12rem,33%)_minmax(0,1fr)] md:grid-rows-[clamp(26.25rem,calc(100dvh-20rem),34rem)]"
			aria-label="Town destinations"
		>
			<div
				className="contents md:grid md:min-h-0 md:grid-rows-3 md:gap-3"
				aria-label="Town services"
			>
				{services.map((service) => (
					<article
						key={service.id}
						aria-labelledby={`town-${service.id}`}
						className="min-h-0 min-w-0"
					>
						<Button
							className={tileClassName}
							aria-label={`Visit ${service.name}`}
							disabled={isPending}
							onClick={service.onVisit}
						>
							<span className={artClassName}>
								<img
									src={service.icon}
									alt=""
									className="h-full w-full object-contain p-3"
								/>
							</span>
							<Badge
								label={service.status}
								variant={service.variant}
								textTone="bright"
								className="absolute right-2 top-2 bg-bg-panel"
							/>
							<span id={`town-${service.id}`} className={captionClassName}>
								{service.name}
							</span>
						</Button>
					</article>
				))}
			</div>
			<section aria-label="Next battle" className="min-h-0 min-w-0">
				<Button
					className={tileClassName}
					aria-label={`Battle in ${zoneName}`}
					disabled={isPending || !canEnterCombat}
					onClick={onContinue}
				>
					<span className={artClassName}>
						<img
							src={ZONE_BACKGROUNDS[town.zone]}
							alt=""
							className="absolute inset-0 h-full w-full object-cover"
						/>
						<span className="relative size-12 md:size-24" aria-hidden="true">
							<IconSwords
								strokeWidth={4}
								className="absolute inset-0 h-full w-full text-black"
							/>
							<IconSwords
								strokeWidth={2}
								className="absolute inset-0 h-full w-full text-text-bright"
							/>
						</span>
					</span>
					<span className={captionClassName}>{zoneName}</span>
				</Button>
			</section>
		</div>
	);
}
