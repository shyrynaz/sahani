import * as React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sahani/AppSidebar";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
	userName?: string | null;
	children: React.ReactNode;
	className?: string;
}

function PageLayout({ userName, children, className }: PageLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar userName={userName} />
			<SidebarInset>
				<main className={cn("flex-1 p-8 bg-secondary min-h-screen", className)}>
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}

export { PageLayout };
export type { PageLayoutProps };
