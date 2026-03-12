import * as React from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
	icon: LucideIcon;
	label: string;
	value: number | string;
	unit?: string;
	trend?: {
		value: number;
		direction: "up" | "down";
	};
	progress?: {
		value: number;
		target: number;
	};
	iconColorClass?: string;
	iconBgClass?: string;
}

function StatCard({
	icon: Icon,
	label,
	value,
	unit,
	trend,
	progress,
	iconColorClass = "text-primary",
	iconBgClass = "bg-primary/10",
	className,
	...props
}: StatCardProps) {
	return (
		<div
			className={cn(
				"bg-card rounded-[32px] p-8 border border-border shadow-sm flex flex-col justify-between group hover:shadow-md transition-all",
				className,
			)}
			{...props}
		>
			<div className="flex items-center justify-between mb-6">
				<div
					className={cn(
						"w-12 h-12 rounded-2xl flex items-center justify-center",
						iconBgClass,
					)}
				>
					<Icon className={cn("w-6 h-6", iconColorClass)} />
				</div>
				{trend && (
					<span
						className={cn(
							"text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1",
							trend.direction === "up"
								? "text-sahani-green-hover bg-sahani-green-hover/10"
								: "text-destructive bg-destructive/10",
						)}
					>
						<ArrowUpRight
							className={cn(
								"w-3 h-3",
								trend.direction === "down" && "rotate-90",
							)}
						/>
						{trend.value}%
					</span>
				)}
			</div>
			<div>
				<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">
					{label}
				</p>
				<h2 className="text-4xl font-black text-foreground mb-2">
					{typeof value === "number" ? value.toLocaleString() : value}{" "}
					{unit && (
						<span className="text-lg text-sahani-tertiary">{unit}</span>
					)}
				</h2>
				{progress && (
					<div className="flex items-center gap-2">
						<div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
							<div
								className="h-full bg-primary rounded-full"
								style={{
									width: `${Math.min(100, (progress.value / progress.target) * 100)}%`,
								}}
							/>
						</div>
						<span className="text-[10px] font-bold text-muted-foreground">
							{Math.round((progress.value / progress.target) * 100)}% of
							Goal
						</span>
					</div>
				)}
			</div>
		</div>
	);
}

export { StatCard };
export type { StatCardProps };
