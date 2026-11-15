import type { TownView } from "@app/engine";
import { IconArrowRight, IconBeer, IconBuildingStore, IconFlask2 } from "@tabler/icons-react";
import clsx from "clsx";
import { Button } from "../../../components/Button";
import { Badge } from "../../../components/Badge";
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
	const potionsFull = town.healingPotions >= town.maxHealingPotions;
	const potionCount = `${town.healingPotions}/${town.maxHealingPotions}`;
	const services = [
		{
			id: "shop",
			name: "Shop",
			icon: shopIcon,
			visitIcon: IconBuildingStore,
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
			visitIcon: IconBeer,
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
			visitIcon: IconFlask2,
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
		<div className="flex flex-1 flex-col gap-3 md:grid md:grid-cols-[minmax(15rem,.9fr)_minmax(0,1.4fr)]">
			<div
				className="grid shrink-0 grid-cols-[minmax(0,1fr)_max-content_max-content] content-start gap-x-2 gap-y-3 md:grid-cols-1 md:gap-3"
				aria-label="Town services"
			>
				{services.map((service) => (
					<article
						key={service.id}
						aria-labelledby={`town-${service.id}`}
						className="col-span-full grid min-w-0 grid-cols-subgrid items-center border-2 border-border-secondary bg-bg-panel p-3 md:flex md:flex-col md:items-stretch md:gap-3"
					>
						<div className="flex min-w-0 items-center gap-3 md:flex-1 md:items-start">
							<img
								src={service.icon}
								alt=""
								className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"
							/>
							<div className="min-w-0 md:flex-1">
								<h2
									id={`town-${service.id}`}
									title={service.name}
									className="truncate text-text-bright md:overflow-visible md:whitespace-normal"
								>
									{service.name}
								</h2>
								<p className="mt-1 leading-6">{service.description}</p>
							</div>
							{service.price !== null && (
								<span
									className={clsx(
										"ml-1 hidden shrink-0 whitespace-nowrap text-right tabular-nums md:block",
										service.canAfford ? "text-text-bright" : "text-error",
									)}
									aria-label={`${service.price} gold${service.id === "alchemist" ? " each" : ""}`}
								>
									{service.price}g
								</span>
							)}
						</div>
						<div className="contents md:mt-auto md:flex md:items-center md:justify-between md:gap-3">
							<span className="flex justify-center md:justify-start">
								{service.status}
							</span>
							<Button
								variant="primary"
								className="ml-1 shrink-0 max-md:h-9 max-md:w-9 max-md:p-0 md:ml-auto"
								aria-label={`Visit ${service.name}`}
								title={`Visit ${service.name}`}
								disabled={isPending}
								onClick={service.onVisit}
							>
								<service.visitIcon
									aria-hidden="true"
									className="h-6 w-6 md:hidden"
								/>
								<span className="hidden md:inline">Visit</span>
							</Button>
						</div>
					</article>
				))}
			</div>
			<section
				aria-label="Next battle"
				className="relative isolate min-h-40 flex-1 overflow-hidden border-2 border-border-secondary bg-bg-base md:min-h-0"
			>
				<img
					src={ZONE_BACKGROUNDS[town.zone]}
					alt=""
					className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_48%]"
				/>
				<div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-border-secondary bg-black/85 p-3">
					<div className="grid gap-1">
						<h2 className="text-text-bright">{formatTitle(town.zone)}</h2>
						<p>
							Battle {town.zoneBattleNumber}/{town.battlesPerZone}
						</p>
					</div>
					<Button
						variant="primary"
						disabled={isPending || !canEnterCombat}
						onClick={onContinue}
						className="ml-auto"
					>
						{town.battleNumber === 1 ? "Start" : "Continue"}
						<IconArrowRight aria-hidden="true" className="ml-1 h-4 w-4 shrink-0" />
					</Button>
				</div>
			</section>
		</div>
	);
}
