import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import {
	Activity,
	ArrowUpRight,
	Award,
	BarChart3,
	CheckCircle2,
	ChefHat,
	ChevronRight,
	History,
	Info,
	LayoutDashboard,
	PieChart,
	Sparkles,
	Target,
	TrendingUp,
	Zap,
} from "lucide-react";
import { useMemo } from "react";
import { PageLayout } from "@/components/sahani/PageLayout";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/nutrition" as any)({
	component: NutritionPage,
});

function NutritionPage() {
	const { data: session, isPending: sessionPending } = authClient.useSession();
	const navigate = useNavigate();

	const today = new Date();
	const dates = useMemo(() => {
		return Array.from({ length: 7 }, (_, i) => {
			const d = new Date();
			d.setDate(today.getDate() - (6 - i));
			return d.toISOString().split("T")[0];
		});
	}, []);

	const weeklyStats = useQuery(api.nutritionAnalytics.getWeeklyStats, { dates });
	const nutritionTargets = useQuery(api.nutritionTargets.get);

	if (sessionPending) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-secondary">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
			</div>
		);
	}

	if (!session?.user) {
		navigate({ to: "/login" });
		return null;
	}

	const targetCals = nutritionTargets?.dailyCalories ?? 2000;
	const targetProtein = nutritionTargets?.proteinGrams ?? 150;
	const targetCarbs = nutritionTargets?.carbsGrams ?? 250;
	const targetFat = nutritionTargets?.fatGrams ?? 65;

	const avgCals = weeklyStats 
		? Math.round(weeklyStats.reduce((acc, curr) => acc + curr.calories, 0) / weeklyStats.length)
		: 0;
	
	const consistencyScore = weeklyStats 
		? Math.min(100, Math.round((weeklyStats.filter(s => s.calories > 0 && Math.abs(s.calories - targetCals) < 300).length / 7) * 100))
		: 0;

	return (
		<PageLayout userName={session.user.name}>

			
				<header className="mb-10 flex items-end justify-between">
					<div>
						<h1 className="text-3xl font-black text-foreground tracking-tight">Nutrition Analytics</h1>
						<p className="text-muted-foreground font-medium mt-1">Deep dive into your eating habits and performance trends.</p>
					</div>
					<div className="flex bg-card rounded-2xl p-1 border border-border shadow-sm">
						{["7 Days", "30 Days", "90 Days"].map((t, i) => (
							<button key={t} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${i === 0 ? 'bg-secondary text-foreground' : 'text-sahani-tertiary hover:text-muted-foreground'}`}>
								{t}
							</button>
						))}
					</div>
				</header>

				<div className="grid grid-cols-12 gap-8 mb-8">
					{/* Summary Cards */}
					<div className="col-span-4 bg-card rounded-[32px] p-8 border border-border shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
						<div className="flex items-center justify-between mb-6">
							<div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
								<Activity className="w-6 h-6" />
							</div>
							<span className="text-[10px] font-black text-sahani-green-hover bg-sahani-green-hover/10 px-2 py-1 rounded-lg flex items-center gap-1">
								<ArrowUpRight className="w-3 h-3" /> 12%
							</span>
						</div>
						<div>
							<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">Average Daily Intake</p>
							<h2 className="text-4xl font-black text-foreground mb-2">{avgCals} <span className="text-lg text-sahani-tertiary">kcal</span></h2>
							<div className="flex items-center gap-2">
								<div className="h-1.5 flex-1 bg-secondary rounded-full overflow-hidden">
									<div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, (avgCals/targetCals)*100)}%` }} />
								</div>
								<span className="text-[10px] font-bold text-muted-foreground">{Math.round((avgCals/targetCals)*100)}% of Goal</span>
							</div>
						</div>
					</div>

					<div className="col-span-4 bg-card rounded-[32px] p-8 border border-border shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
						<div className="flex items-center justify-between mb-6">
							<div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500">
								<Award className="w-6 h-6" />
							</div>
						</div>
						<div>
							<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">Consistency Score</p>
							<h2 className="text-4xl font-black text-foreground mb-2">{consistencyScore}%</h2>
							<p className="text-xs font-medium text-muted-foreground">You're hitting your calorie targets 4 out of 7 days.</p>
						</div>
					</div>

					<div className="col-span-4 bg-foreground rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
						<Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 text-primary opacity-10 rotate-12" />
						<div className="relative z-10">
							<div className="w-12 h-12 rounded-2xl bg-card/10 flex items-center justify-center text-primary mb-6">
								<Zap className="w-6 h-6" />
							</div>
							<p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Weekly Streak</p>
							<h2 className="text-4xl font-black text-white mb-2">5 Days</h2>
							<p className="text-xs font-medium text-white/60 leading-relaxed">You've logged every meal for 5 days straight. Keep it up!</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-8 mb-8">
					{/* Weekly Chart Card */}
					<div className="col-span-8 bg-card rounded-[40px] p-10 border border-border shadow-sm">
						<div className="flex items-center justify-between mb-10">
							<h3 className="text-xl font-black text-foreground flex items-center gap-2">
								<BarChart3 className="w-5 h-5 text-primary" />
								Weekly Calorie Trend
							</h3>
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full bg-primary" />
									<span className="text-[10px] font-black text-muted-foreground uppercase">Actual</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-3 h-3 rounded-full border-2 border-dashed border-sahani-tertiary" />
									<span className="text-[10px] font-black text-muted-foreground uppercase">Target</span>
								</div>
							</div>
						</div>

						<div className="h-64 flex items-end justify-between gap-4 relative">
							{/* Target Line */}
							<div className="absolute left-0 right-0 border-t-2 border-dashed border-border z-0" style={{ bottom: '70%' }} />
							
							{dates.map((date, idx) => {
								const stats = weeklyStats?.find(s => s.date === date);
								const val = stats ? stats.calories : 0;
								const height = Math.min(100, (val / (targetCals * 1.5)) * 100);
								const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
								
								return (
									<div key={date} className="flex-1 flex flex-col items-center gap-4 group relative z-10">
										<div className="w-full relative">
											<div 
												className={`w-full rounded-t-xl transition-all duration-700 ${val > targetCals + 200 ? 'bg-orange-400' : 'bg-primary'}`}
												style={{ height: `${height}%`, minHeight: '4px' }}
											>
												<div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] font-black px-2 py-1 rounded shadow-lg transition-all">
													{Math.round(val)} kcal
												</div>
											</div>
										</div>
										<span className="text-[10px] font-black text-sahani-tertiary">{dayName}</span>
									</div>
								);
							})}
						</div>
					</div>

					{/* Macro Split Card */}
					<div className="col-span-4 bg-card rounded-[40px] p-10 border border-border shadow-sm">
						<h3 className="text-xl font-black text-foreground mb-8 flex items-center gap-2">
							<PieChart className="w-5 h-5 text-primary" />
							Macro Split
						</h3>

						<div className="space-y-8">
							<div className="space-y-4">
								<div className="flex justify-between items-end">
									<div>
										<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">Protein</p>
										<p className="text-lg font-black text-foreground">{weeklyStats ? Math.round(weeklyStats.reduce((a,b)=>a+b.protein,0)/7) : 0}g <span className="text-xs text-sahani-tertiary">avg</span></p>
									</div>
									<span className="text-xs font-bold text-primary">Target: {targetProtein}g</span>
								</div>
								<div className="h-3 bg-secondary rounded-full overflow-hidden">
									<div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: weeklyStats ? `${Math.min(100, (weeklyStats.reduce((a,b)=>a+b.protein,0)/7/targetProtein)*100)}%` : '0%' }} />
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-end">
									<div>
										<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">Carbs</p>
										<p className="text-lg font-black text-foreground">{weeklyStats ? Math.round(weeklyStats.reduce((a,b)=>a+b.carbs,0)/7) : 0}g <span className="text-xs text-sahani-tertiary">avg</span></p>
									</div>
									<span className="text-xs font-bold text-primary">Target: {targetCarbs}g</span>
								</div>
								<div className="h-3 bg-secondary rounded-full overflow-hidden">
									<div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: weeklyStats ? `${Math.min(100, (weeklyStats.reduce((a,b)=>a+b.carbs,0)/7/targetCarbs)*100)}%` : '0%' }} />
								</div>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-end">
									<div>
										<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">Fat</p>
										<p className="text-lg font-black text-foreground">{weeklyStats ? Math.round(weeklyStats.reduce((a,b)=>a+b.fat,0)/7) : 0}g <span className="text-xs text-sahani-tertiary">avg</span></p>
									</div>
									<span className="text-xs font-bold text-primary">Target: {targetFat}g</span>
								</div>
								<div className="h-3 bg-secondary rounded-full overflow-hidden">
									<div className="h-full bg-red-500 transition-all duration-1000" style={{ width: weeklyStats ? `${Math.min(100, (weeklyStats.reduce((a,b)=>a+b.fat,0)/7/targetFat)*100)}%` : '0%' }} />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-12 gap-8">
					{/* Superfood Spotlight */}
					<div className="col-span-7 bg-primary/5 border border-primary/20 rounded-[40px] p-10 relative overflow-hidden group">
						<div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-10 -mr-32 -mt-32" />
						<div className="relative z-10 flex gap-10 items-start">
							<div className="flex-1">
								<span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-card px-3 py-1.5 rounded-full mb-6 inline-block border border-primary/20 shadow-sm">
									Kenyan Superfood Spotlight
								</span>
								<h3 className="text-2xl font-black text-foreground mb-4">African Nightshade (Managu)</h3>
								<p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6">
									Based on your recent meals, you've consumed a healthy dose of traditional greens! Managu is exceptionally high in <span className="text-primary font-black">Iron</span> and <span className="text-primary font-black">Vitamin C</span>, which are essential for energy levels and immunity.
								</p>
								<div className="grid grid-cols-2 gap-4">
									<div className="bg-card/60 rounded-2xl p-4 border border-primary/10">
										<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">Iron (per 100g)</p>
										<p className="text-xl font-black text-foreground">11.5mg</p>
									</div>
									<div className="bg-card/60 rounded-2xl p-4 border border-primary/10">
										<p className="text-[10px] font-black text-sahani-tertiary uppercase tracking-widest mb-1">Fiber</p>
										<p className="text-xl font-black text-foreground">3.1g</p>
									</div>
								</div>
							</div>
							<div className="w-48 h-48 rounded-3xl bg-card p-2 shadow-xl group-hover:scale-105 transition-transform duration-500">
								<div className="w-full h-full rounded-2xl bg-secondary overflow-hidden flex items-center justify-center border border-border">
									<ChefHat className="w-16 h-16 text-sahani-tertiary opacity-30" />
								</div>
							</div>
						</div>
					</div>

					{/* Insight Column */}
					<div className="col-span-5 space-y-6">
						<div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
							<h4 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
								<TrendingUp className="w-5 h-5 text-primary" />
								Optimization Insight
							</h4>
							<div className="flex gap-4 items-start">
								<div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
									<Info className="w-5 h-5" />
								</div>
								<p className="text-sm font-medium text-muted-foreground leading-relaxed">
									Your <span className="font-black text-foreground">Carbohydrate</span> intake is peaking in the late evening. For better metabolic health, try shifting your carb-heavy meals (like Pilau or Ugali) to lunchtime when you're more active.
								</p>
							</div>
						</div>

						<div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
							<h4 className="text-lg font-black text-foreground mb-6 flex items-center gap-2">
								<Award className="w-5 h-5 text-primary" />
								New Milestone
							</h4>
							<div className="flex gap-4 items-center">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-sahani-green-hover flex items-center justify-center text-white shadow-lg">
									<Zap className="w-6 h-6" />
								</div>
								<div>
									<p className="text-sm font-black text-foreground">Protein Champion</p>
									<p className="text-xs text-sahani-tertiary font-bold">7 Days hitting Protein Goal</p>
								</div>
							</div>
						</div>
					</div>
				</div>
		</PageLayout>
	);
}
