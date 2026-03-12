import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { PlayCircle } from "lucide-react";
import { useId, useState } from "react";

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionid = useId();

  return (
    <div className="min-h-screen bg-card">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-lg">
                  restaurant_menu
                </span>
              </div>
              <span className="font-bold text-lg text-foreground">sahani</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {[
                { label: "Features", href: "#features" },
                { label: "How it Works", href: "#how-it-works" },
                { label: "Recipes", href: "#recipes" },
                { label: "Pricing", href: "#pricing" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-sahani-green-hover text-white font-semibold rounded-lg px-5 py-2 text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden p-2 rounded-lg hover:bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-icons text-muted-foreground">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "How it Works", href: "#how-it-works" },
                { label: "Recipes", href: "#recipes" },
                { label: "Pricing", href: "#pricing" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-primary py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-border space-y-3">
                <Link
                  to="/login"
                  className="block text-sm font-medium text-muted-foreground hover:text-primary py-2"
                >
                  Login
                </Link>
                <Link to="/signup" className="block">
                  <Button className="w-full bg-primary hover:bg-sahani-green-hover text-white font-semibold rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-24 pb-16 lg:pt-28 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-medium text-primary uppercase tracking-wider mb-4">
                Welcome to the future of eating
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Eat Better,
                <br />
                <span className="text-primary">Stress Less.</span>
              </h1>
              <p className="text-base text-muted-foreground mb-8 max-w-md">
                Custom meal plans tailored to your lifestyle. Save 5+ hours on
                grocery shopping and cooking every single week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-sahani-green-hover text-white font-semibold rounded-lg px-6 py-3 text-sm">
                    Start Planning Free
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-border text-foreground hover:bg-secondary rounded-lg px-6 py-3 text-sm"
                >
                  <PlayCircle className="w-4 h-4 mr-2" />
                  See how it works
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center"
                    />
                  ))}
                </div>
                <p className="text-sm text-sahani-tertiary">
                  Joined by{" "}
                  <span className="text-foreground font-medium">10,000+</span>{" "}
                  healthy eaters
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=500&fit=crop"
                  alt="Healthy meal prep bowls with various fresh ingredients"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 bg-card rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <span className="material-icons text-primary text-lg">
                    timer
                  </span>
                </div>
                <div>
                  <p className="text-xs text-sahani-tertiary">AVG COOK TIME</p>
                  <p className="text-sm font-semibold text-foreground">
                    15-20 Mins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id={sectionid}
        className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-card"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              The smarter way to eat
            </h2>
            <p className="text-base text-muted-foreground">
              We handle the planning, so you can enjoy the cooking. Three simple
              steps to a healthier you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "calendar_month",
                number: "1",
                title: "Plan",
                description:
                  "Choose your diet and personal health goals with our AI-powered smart meal planner.",
              },
              {
                icon: "shopping_cart",
                number: "2",
                title: "Shop",
                description:
                  "Get an automated, sorted grocery list sent to your phone or delivered to your door.",
              },
              {
                icon: "restaurant",
                number: "3",
                title: "Cook",
                description:
                  "Follow simple, chef-tested recipes with step-by-step instructions and video guides.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="bg-secondary rounded-xl p-6 text-left"
              >
                <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <span className="material-icons text-primary text-xl">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.number}. {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-icons text-white text-lg">
                    restaurant_menu
                  </span>
                </div>
                <span className="font-bold text-lg text-foreground">sahani</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Making healthy eating accessible, sustainable, and enjoyable for
                everyone. Join our community and change your life today.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                Product
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/meal-planner"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Meal Planner
                  </Link>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Grocery List
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Recipe Index
                  </span>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Pro Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    About Us
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Careers
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-sahani-tertiary">
              © 2026 sahani Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
