import type { TownView } from "@app/engine";
import { IconArrowRight, IconSwords } from "@tabler/icons-react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";
import { formatTitle } from "../../../presentation/effects";
import { ZONE_BACKGROUNDS } from "../../../presentation/zones";
import shopIcon from "../../../assets/images/town/shop.png";
import tavernIcon from "../../../assets/images/town/tavern.png";
import alchemistIcon from "../../../assets/images/town/alchemist.png";

const mobileTileButtonClassName =
	"relative min-w-0 max-md:h-full max-md:w-full max-md:flex-col max-md:p-0 md:ml-auto";

const mobileTileLabelClassName =
	"flex h-10 w-full shrink-0 items-center justify-center bg-black px-2 text-text-bright md:hidden";

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
	const potionCount = `${town.healingPotions}/${town.maxHealingPotions}`;
	const services = [
		{
			id: "shop",
			name: "Shop",
			icon: shopIcon,
			description: "Buy items",
			price: null,
			canAfford: true,
			status: (
				<Badge
					label={hasViewedShop ? "Viewed" : "New"}
					variant={hasViewedShop ? "success" : "warning"}
					textTone="bright"
					className="inline-flex items-center whitespace-nowrap tabular-nums leading-5"
				/>
			),
			onVisit: onVisitShop,
		},
		{
			id: "tavern",
			name: "Tavern",
			icon: tavernIcon,
			description: "Rest",
			price: town.restCost,
			canAfford: town.canAffordRest,
			status: (
				<Badge
					label={town.isFullyRested ? "Rested" : "Weary"}
					variant={town.isFullyRested ? "success" : "warning"}
					textTone="bright"
					className="inline-flex items-center whitespace-nowrap tabular-nums leading-5"
				/>
			),
			onVisit: onVisitTavern,
		},
		{
			id: "alchemist",
			name: "Alchemist",
			icon: alchemistIcon,
			description: "Buy potions",
			price: town.healingPotionCost,
			canAfford: town.canAffordHealingPotion,
			status: (
				<Badge
					label={potionCount}
					variant={
						potionsFull ? "success" : town.healingPotions === 0 ? "error" : "warning"
					}
					textTone="bright"
					className="inline-flex items-center whitespace-nowrap tabular-nums leading-5"
				/>
			),
			onVisit: onVisitAlchemist,
		},
	];
	return (
		<div className="grid grid-cols-2 gap-3 max-md:auto-rows-[clamp(9rem,25dvh,12.5rem)] md:flex-1 md:grid-cols-[minmax(15rem,.9fr)_minmax(0,1.4fr)]">
			<div
				className="contents md:grid md:grid-cols-1 md:content-start md:gap-3"
				aria-label="Town services"
			>
				{services.map((service) => (
					<article
						key={service.id}
						aria-labelledby={`town-${service.id}`}
						className="min-w-0 md:flex md:flex-col md:gap-3 md:border-2 md:border-border-secondary md:bg-bg-panel md:p-3"
					>
						<div className="hidden min-w-0 gap-3 md:flex md:flex-1">
							<img
								src={service.icon}
								alt=""
								className="h-12 w-12 shrink-0 object-contain"
							/>
							<div className="min-w-0 flex-1">
								<h2
									id={`town-${service.id}`}
									title={service.name}
									className="text-text-bright"
								>
									{service.name}
								</h2>
								<p className="mt-1 leading-6">{service.description}</p>
							</div>
							{service.price !== null && (
								<span
									className={clsx(
										"ml-1 shrink-0 whitespace-nowrap text-right tabular-nums",
										service.canAfford ? "text-text-bright" : "text-error",
									)}
									aria-label={`${service.price} gold${service.id === "alchemist" ? " each" : ""}`}
								>
									{service.price}g
								</span>
							)}
						</div>
						<div className="flex h-full md:mt-auto md:h-auto md:items-center md:justify-between md:gap-3">
							<span className="hidden md:block">{service.status}</span>
							<Button
								variant="primary"
								className={mobileTileButtonClassName}
								aria-label={`Visit ${service.name}`}
								title={`Visit ${service.name}`}
								disabled={isPending}
								onClick={service.onVisit}
							>
								<img
									src={service.icon}
									alt=""
									className="min-h-0 w-full flex-1 object-contain p-3 md:hidden"
								/>
								<span className={mobileTileLabelClassName}>{service.name}</span>
								<span className="absolute right-2 top-2 bg-bg-panel md:hidden">
									{service.status}
								</span>
								<span className="hidden md:inline">Visit</span>
							</Button>
						</div>
					</article>
				))}
			</div>
			<section
				aria-label="Next battle"
				className="min-w-0 md:relative md:isolate md:overflow-hidden md:border-2 md:border-border-secondary md:bg-bg-base"
			>
				<img
					src={ZONE_BACKGROUNDS[town.zone]}
					alt=""
					className="absolute inset-0 -z-10 hidden h-full w-full object-cover md:block"
				/>
				<div className="flex h-full md:absolute md:inset-x-0 md:bottom-0 md:h-auto md:flex-wrap md:items-center md:justify-between md:gap-3 md:border-t md:border-border-secondary md:bg-black/85 md:p-3">
					<div className="hidden gap-1 md:grid">
						<h2 className="text-text-bright">{zoneName}</h2>
						<p>
							Battle {town.zoneBattleNumber}/{town.battlesPerZone}
						</p>
					</div>
					<Button
						variant="primary"
						disabled={isPending || !canEnterCombat}
						onClick={onContinue}
						aria-label={`Battle in ${zoneName}`}
						title={`Battle in ${zoneName}`}
						className={mobileTileButtonClassName}
					>
						<span className="relative flex min-h-0 w-full flex-1 items-center justify-center md:hidden">
							<img
								src={ZONE_BACKGROUNDS[town.zone]}
								alt=""
								className="absolute inset-0 h-full w-full object-cover"
							/>
							<span className="relative size-12" aria-hidden="true">
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
						<span className={mobileTileLabelClassName}>{zoneName}</span>
						<span className="hidden md:inline">Battle</span>
						<IconArrowRight
							aria-hidden="true"
							className="ml-1 hidden h-4 w-4 shrink-0 md:block"
						/>
					</Button>
				</div>
			</section>
		</div>
	);
}
