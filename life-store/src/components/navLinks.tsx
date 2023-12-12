"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import medusa from "@/lib/medusa";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const outlets: { title: string; href: string; description: string }[] = [
  {
    title: "Life Dubai",
    href: "",
    description:
      "Experience the vibrant energy of Dubai at Life Dubai. From luxury shopping to iconic landmarks, immerse yourself in a city that blends tradition with modernity.",
  },
  {
    title: "Life London",
    href: "",
    description:
      "Discover the rich history and cultural tapestry of London at Life London. Explore historic sites, indulge in world-class cuisine, and embrace the dynamic spirit of this cosmopolitan metropolis.",
  },
  {
    title: "Life New York",
    href: "",
    description:
      "Dive into the hustle and bustle of the Big Apple at Life New York. With its iconic skyline, diverse neighborhoods, and endless entertainment options, New York City is a playground for the adventurous soul.",
  },
  {
    title: "Life Tokyo",
    href: "",
    description:
      "Immerse yourself in the unique blend of tradition and innovation at Life Tokyo. From ancient temples to cutting-edge technology, Tokyo offers a fascinating journey through the past and into the future.",
  },
  {
    title: "Life Paris",
    href: "",
    description:
      "Experience the romance and elegance of Paris at Life Paris. With its iconic landmarks, world-class art, and culinary delights, the City of Light beckons you to indulge in its timeless allure.",
  },
  {
    title: "Life Sydney",
    href: "",
    description:
      "Embrace the laid-back lifestyle and natural beauty of Sydney at Life Sydney. From stunning beaches to vibrant cultural scenes, Sydney invites you to relax and enjoy its unique blend of urban sophistication and coastal charm.",
  },
];

const brands: { title: string; href: string; description: string }[] = [
  {
    title: "Nike",
    href: "",
    description:
      "Just Do It. Nike inspires and motivates individuals to push their limits and achieve greatness.",
  },
  {
    title: "Adidas",
    href: "",
    description:
      "Impossible is Nothing. Adidas encourages people to overcome obstacles, embrace challenges, and strive for success.",
  },
  {
    title: "Apple",
    href: "",
    description:
      "Think Different. Apple champions innovation and creativity, urging individuals to break free from the norm and envision a new world.",
  },
  {
    title: "Coca-Cola",
    href: "",
    description:
      "Open Happiness. Coca-Cola spreads joy and positivity, bringing people together with the simple pleasure of a refreshing beverage.",
  },
  {
    title: "Google",
    href: "",
    description:
      "Don't be evil. Google emphasizes ethical behavior and integrity in all aspects, fostering trust and reliability in its products and services.",
  },
  {
    title: "Microsoft",
    href: "",
    description:
      "Be what's next. Microsoft empowers individuals to shape the future, providing tools and technology for continuous innovation and progress.",
  },
];

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuLinks() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    medusa.products
      .list()
      .then((res) => {
        const formattedProducts = res.products.map((product) => {
          return {
            title: product.title,
            href: `/products/${product.handle}`,
            description: product.description,
            image: product.thumbnail,
          };
        });

        console.log(formattedProducts);

        setProducts(formattedProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Best Sellers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink className="relative" asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {products[0]?.image && (
                      <Image
                        src={products[0]?.image}
                        alt={products[0]?.title}
                        placeholder="empty"
                        quality={100}
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: "cover",
                        }}
                        className="opacity-20"
                      />
                    )}
                    <div className="z-10">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {products[0]?.title ?? "Loading"}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {products[0]?.description ?? "Loading"}
                      </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              {products.slice(1, 4).map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Brand</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {brands.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Outlet</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {outlets.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Offers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Our Story
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
