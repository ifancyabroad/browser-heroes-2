import Card from "../components/Card";
import logo from "../assets/images/logos/browser_heroes.png";
import { ClassSelection } from "../features/createCharacter";
import type { ClassId } from "packages/content/dist/generated/classes.registry";
import { useState } from "react";

export default function CreateCharacter() {
	const [selectedClassId, setSelectedClassId] = useState<ClassId | null>(null);

	return (
		<div className="min-h-screen flex flex-col overflow-hidden">
			{/* TODO: Add header */}

			<div className="flex-1 flex items-center justify-center">
				<div className="max-w-sm w-full">
					<Card className="text-center flex flex-col items-center gap-4">
						<img src={logo} alt="Browser Heroes" width="260" />
						<p>Select a class to begin</p>
						<ClassSelection
							selectedClassId={selectedClassId}
							onSelect={setSelectedClassId}
						/>
					</Card>
				</div>
			</div>
		</div>
	);
}
