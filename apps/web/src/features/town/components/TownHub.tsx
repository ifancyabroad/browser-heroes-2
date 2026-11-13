import type { TownView } from "@app/engine";
import clsx from "clsx";
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
	onVisitShop: () => void;
	onVisitTavern: () => void;
	onVisitAlchemist: () => void;
	onContinue: () => void;
};

export function TownHub({
	town,
	isPending,
	canEnterCombat,
	onVisitShop,
	onVisitTavern,
	onVisitAlchemist,
	onContinue,
}: TownHubProps) {
	const services = [
		{
			id: "shop",
			name: "Shop",
			icon: shopIcon,
			description: "Browse weapons, armour and accessories.",
			price: null,
			canAfford: true,
			status: "",
			statusClassName: "text-text",
			onVisit: onVisitShop,
		},
		{
			id: "tavern",
			name: "Tavern",
			icon: tavernIcon,
			description: "Recover your health and replenish skill uses.",
			price: town.restCost,
			canAfford: town.canAffordRest,
			status: town.isFullyRested ? "Fully rested" : "",
			statusClassName: "text-success",
			onVisit: onVisitTavern,
		},
		{
			id: "alchemist",
			name: "Alchemist",
			icon: alchemistIcon,
			description: "Stock up on healing potions for battle.",
			price: town.healingPotionCost,
			canAfford: town.canAffordHealingPotion,
			status:
				town.healingPotions >= town.maxHealingPotions
					? `${town.healingPotions}/${town.maxHealingPotions} MAX`
					: `${town.healingPotions}/${town.maxHealingPotions}`,
			statusClassName:
				town.healingPotions >= town.maxHealingPotions
					? "text-success"
					: town.healingPotions === 0
						? "text-error"
						: "text-text",
			onVisit: onVisitAlchemist,
		},
	];
	return (
		<div className="grid gap-3 md:grid-cols-[minmax(15rem,.9fr)_minmax(0,1.4fr)]">
			<div className="grid auto-rows-fr gap-3" aria-label="Town services">
				{services.map((service) => (
					<article
						key={service.id}
						aria-labelledby={`town-${service.id}`}
						className="flex min-w-0 items-center gap-2 border-2 border-border-secondary bg-bg-panel p-3 md:flex-col md:items-stretch md:gap-3 md:p-3.5"
					>
						<div className="flex min-w-0 flex-1 items-center gap-2 md:items-start md:gap-3">
							<img
								src={service.icon}
								alt=""
								className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"
							/>
							<div className="min-w-0 flex-1">
								<div className="flex items-baseline justify-between gap-3">
									<h2
										id={`town-${service.id}`}
										className="min-w-0 text-text-bright"
									>
										{service.name}
									</h2>
									{service.price !== null && (
										<span
											className={clsx(
												"ml-auto hidden shrink-0 whitespace-nowrap text-right tabular-nums md:block",
												service.canAfford
													? "text-text-bright"
													: "text-error",
											)}
											aria-label={`${service.price} gold${service.id === "alchemist" ? " each" : ""}`}
										>
											{service.price}g
										</span>
									)}
								</div>
								<p className="mt-1.5 hidden leading-6 md:block">
									{service.description}
								</p>
								{service.status && (
									<span
										className={clsx(
											"block whitespace-nowrap tabular-nums md:hidden",
											service.statusClassName,
										)}
									>
										{service.status}
									</span>
								)}
							</div>
						</div>
						<div className="contents md:mt-auto md:flex md:items-center md:justify-between md:gap-3">
							{service.status && (
								<span
									className={clsx(
										"hidden whitespace-nowrap tabular-nums md:inline",
										service.statusClassName,
									)}
								>
									{service.status}
								</span>
							)}
							<Button
								variant="primary"
								className="ml-auto shrink-0"
								aria-label={`Visit ${service.name}`}
								disabled={isPending}
								onClick={service.onVisit}
							>
								Visit
							</Button>
						</div>
					</article>
				))}
			</div>
			<section
				aria-label="Next battle"
				className="relative isolate min-h-60 overflow-hidden border-2 border-border-secondary bg-bg-base md:min-h-0"
			>
				<img
					src={ZONE_BACKGROUNDS[town.zone]}
					alt=""
					className="absolute inset-0 -z-10 h-full w-full object-cover object-[50%_48%]"
				/>
				<div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-border-secondary bg-black/85 p-4">
					<div className="grid gap-1">
						<h2 className="text-text-bright">{formatTitle(town.zone)}</h2>
						<p>Battle {town.battleNumber}</p>
					</div>
					<Button
						variant="primary"
						disabled={isPending || !canEnterCombat}
						onClick={onContinue}
						className="ml-auto min-h-10"
					>
						Continue{" "}
						<span aria-hidden="true" className="ml-3">
							→
						</span>
					</Button>
				</div>
			</section>
		</div>
	);
}
