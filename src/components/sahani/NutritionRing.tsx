import * as React from "react";
import { cn } from "@/lib/utils";

interface NutritionRingProps extends React.HTMLAttributes<HTMLDivElement> {
	value: number;
	target: number;
	label: string;
	size?: "sm" | "default" | "lg";
}

function NutritionRing({
	value,
	target,
	label,
	size = "default",
	className,
	...props
}: NutritionRingProps) {
	const percent = Math.min(100, Math.round((value / target) * 100));

	const sizeConfig = {
		sm: { wh: "w-32 h-32", stroke: 12, radius: 54, text: "text-2xl", sub: "text-[10px]" },
		default: { wh: "w-48 h-48", stroke: 16, radius: 80, text: "text-4xl", sub: "text-xs" },
		lg: { wh: "w-56 h-56", stroke: 18, radius: 95, text: "text-5xl", sub: "text-sm" },
	};

	const cfg = sizeConfig[size];
	const circumference = 2 * Math.PI * cfg.radius;
	const strokeDashoffset = circumference - (percent / 100) * circumference;

	return (
		<div
			className={cn("flex flex-col items-center relative", className)}
			{...props}
		>
			<div className={cn(cfg.wh, "relative")}>
				<svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
					{/* Track */}
					<circle
						cx="100"
						cy="100"
						r={cfg.radius}
						fill="none"
						stroke="var(--muted)"
						strokeWidth={cfg.stroke}
					/>
					{/* Progress */}
					<circle
						cx="100"
						cy="100"
						r={cfg.radius}
						fill="none"
						stroke="var(--primary)"
						strokeWidth={cfg.stroke}
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						className="transition-all duration-1000"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-[0.2em] mb-1">
						{label}
					</p>
					<p className={cn(cfg.text, "font-black text-foreground")}>
						{value.toLocaleString()}
					</p>
					<p className={cn(cfg.sub, "font-bold text-sahani-tertiary")}>
						of {target.toLocaleString()}
					</p>
				</div>
			</div>
		</div>
	);
}

export { NutritionRing };
export type { NutritionRingProps };
