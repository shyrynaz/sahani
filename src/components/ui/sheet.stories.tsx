import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { Button } from "./button";

const meta = {
	title: "UI/Sheet",
	component: Sheet,
	parameters: { layout: "centered" },
	tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Left: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Left</Button>
			</SheetTrigger>
			<SheetContent side="left">
				<SheetHeader>
					<SheetTitle>Navigation</SheetTitle>
					<SheetDescription>Mobile menu</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
};

export const Right: Story = {
	render: () => (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline">Open Right</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Details</SheetTitle>
					<SheetDescription>Recipe details panel</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	),
};
