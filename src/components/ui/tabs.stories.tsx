import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
	title: "UI/Tabs",
	component: Tabs,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="weekly" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="weekly">Weekly</TabsTrigger>
				<TabsTrigger value="daily">Daily</TabsTrigger>
			</TabsList>
			<TabsContent value="weekly">Weekly meal planner view.</TabsContent>
			<TabsContent value="daily">Daily meal planner view.</TabsContent>
		</Tabs>
	),
};

export const WithContentPanels: Story = {
	render: () => (
		<Tabs defaultValue="7d" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="7d">7 Days</TabsTrigger>
				<TabsTrigger value="30d">30 Days</TabsTrigger>
				<TabsTrigger value="90d">90 Days</TabsTrigger>
			</TabsList>
			<TabsContent value="7d" className="p-4">Last 7 days analytics</TabsContent>
			<TabsContent value="30d" className="p-4">Last 30 days analytics</TabsContent>
			<TabsContent value="90d" className="p-4">Last 90 days analytics</TabsContent>
		</Tabs>
	),
};
