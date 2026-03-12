import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, Award, Zap } from "lucide-react";
import { StatCard } from "./StatCard";

const meta = {
	title: "Sahani/StatCard",
	component: StatCard,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ width: 320 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		icon: Activity,
		label: "Average Daily Intake",
		value: 1850,
		unit: "kcal",
	},
};

export const WithTrend: Story = {
	args: {
		icon: Activity,
		label: "Average Daily Intake",
		value: 1850,
		unit: "kcal",
		trend: { value: 12, direction: "up" },
	},
};

export const WithProgress: Story = {
	args: {
		icon: Activity,
		label: "Average Daily Intake",
		value: 1850,
		unit: "kcal",
		trend: { value: 12, direction: "up" },
		progress: { value: 1850, target: 2000 },
	},
};

export const ConsistencyScore: Story = {
	args: {
		icon: Award,
		label: "Consistency Score",
		value: "72%",
		iconColorClass: "text-blue-500",
		iconBgClass: "bg-blue-100",
	},
};

export const DownTrend: Story = {
	args: {
		icon: Zap,
		label: "Energy Level",
		value: 65,
		unit: "%",
		trend: { value: 8, direction: "down" },
	},
};
