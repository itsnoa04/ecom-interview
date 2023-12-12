"use client";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/logo.png";
import Heart from "@/assets/heart.svg";
import Cart from "@/assets/cart.svg";
import GoTo from "@/assets/goto.svg";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { use, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavigationMenuLinks } from "./navLinks";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import medusa from "@/lib/medusa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Nav() {
  const [user, setUser] = React.useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("customer");
    const user = session && JSON.parse(session);
    setUser(user);
  }, [localStorage.getItem("customer") !== null]);

  console.log(user);

  return (
    <nav className="fixed top-0 left-0 flex w-full flex-col">
      <div className="flex w-full justify-between bg-slate-50 p-3 px-[5vw] drop-shadow-sm">
        <div className="left">
          <Link href="/">
            <Image alt="Logo" src={Logo} height={56} width={45} />
          </Link>
        </div>
        <div className="right flex items-center gap-5">
          <div className="search"></div>
          <div className="divider h-[90%] w-[2px] bg-slate-100"></div>
          <Image alt="heart" src={Heart} width={24} height={24} />
          <Tooltip>
            <TooltipTrigger>
              <Image alt="heart" src={Cart} width={24} height={24} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Cart</p>
            </TooltipContent>
          </Tooltip>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>
                    {user!.first_name[0].toUpperCase() +
                      user!.last_name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem className="p-0 mt-3">
                  <Button
                    className="w-full hover:bg-red-500 "
                    onClick={() => {
                      medusa.auth.deleteSession();
                      localStorage.removeItem("customer");
                    }}
                  >
                    <span>Log Out</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button className="bg-gradient-to-l from-[#65C2ED] to-[#F1ADFF]">
                <span>Get Start</span>
                <Image alt="get start" src={GoTo} width={16} height={16} />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="p-1 px-[5vw]">
        <NavigationMenuLinks />
      </div>
    </nav>
  );
}
