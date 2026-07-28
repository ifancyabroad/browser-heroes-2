import type { PropsWithChildren } from "react";

export function PageLayout({ children }: PropsWithChildren) {
	return <main className="flex min-h-screen flex-col bg-bg-base">{children}</main>;
}
