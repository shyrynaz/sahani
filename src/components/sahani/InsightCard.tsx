import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps extends React.HTMLAttributes<HTMLDivElement> {
	icon: LucideIcon;
	title: string;
	children: React.ReactNode;
	variant?: "default" | "warning";
}

function InsightCard({
	icon: Icon,
	title,
	children,
	variant = "default",
	className,
	...props
}: InsightCardProps) {
	const iconConfig = {
		default: {
			bg: "bg-primary/10",
			color: "text-primary",
		},
		warning: {
			bg: "bg-amber-100",
			color: "text-amber-600",
		},
	};

	const cfg = iconConfig[variant];

	return (
		<div
			className={cn(
				"bg-card rounded-3xl p-8 border border-border shadow-sm",
				className,
			)}
			{...props}
		>
			<h4 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
				<Icon className={cn("w-5 h-5", cfg.color)} />
				{title}
			</h4>
			<div className="flex gap-4 items-start">
				<div
					className={cn(
						"w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
						cfg.bg,
					)}
				>
					<Icon className={cn("w-5 h-5", cfg.color)} />
				</div>
				<div className="text-sm font-medium text-muted-foreground leading-relaxed">
					{children}
				</div>
			</div>
		</div>
	);
}

export { InsightCard };
export type { InsightCardProps };
