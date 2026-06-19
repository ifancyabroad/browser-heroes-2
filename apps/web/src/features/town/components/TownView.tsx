import type { RunView } from "@app/shared";
import { useState } from "react";
import { Button } from "../../../components/Button";
import { Layout } from "../../../components/Layout";
import { HeroSidebar } from "./HeroSidebar";

type TownViewProps = {
	run: RunView;
};

export function TownView({ run }: TownViewProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	function handleOpenSidebar() {
		setSidebarOpen(true);
	}

	function handleCloseSidebar() {
		setSidebarOpen(false);
	}

	return (
		<Layout>
			<div className="flex flex-1 bg-bg-base text-base">
				<HeroSidebar run={run} open={sidebarOpen} onClose={handleCloseSidebar} />

				<section className="flex min-w-0 flex-1 flex-col">
					<header className="px-4 py-3 md:hidden">
						<Button className="text-primary" type="button" onClick={handleOpenSidebar}>
							Hero
						</Button>
					</header>

					<div className="flex flex-1 items-center justify-center px-4">
						<div className="grid justify-items-center gap-4">
							<h1 className="text-base text-text-bright">Town</h1>
							<Button className="text-primary" type="button">
								Enter Combat
							</Button>
						</div>
					</div>
				</section>
			</div>
		</Layout>
	);
}
