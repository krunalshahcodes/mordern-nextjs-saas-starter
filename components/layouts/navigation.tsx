"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { SiNextdotjs } from "react-icons/si";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const items = [
  { href: "/pricing", title: "Pricing" },
  { href: "/faq", title: "FAQ" },
];

const Logo = () => (
  <Link className="flex items-center gap-2" href="/">
    <SiNextdotjs className="h-8 w-8 text-primary" />
    <span className="text-2xl font-bold text-black">SaaS Starter</span>
  </Link>
);

const UserMenu = ({ user }: { user: Session["user"] }) => {
  const handleLogout = async () => await signOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage alt={user?.name || "avatar"} src={user?.image || ""} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
          <LuLogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navigation = () => {
  const { data } = useSession();
  const user = data?.user;

  return (
    <div className="bg-white">
      <div className="container flex items-center gap-4">
        <div className="flex items-center gap-4 py-4">
          <Sheet>
            <SheetTrigger className="lg:hidden">
              <LuMenu className="h-5 w-5 text-gray-500" />
            </SheetTrigger>
            <SheetContent side="left">
              <Logo />
              <div className="flex flex-col gap-2 py-6">
                {items.map((item) => (
                  <Link
                    key={item.title}
                    className="py-2 font-medium text-black hover:text-primary"
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <Logo />
          <div className="hidden items-center gap-6 px-6 lg:flex">
            {items.map((item) => (
              <Link
                key={item.title}
                className="py-2 font-medium text-black hover:text-primary"
                href={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="ml-auto">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link className={cn(buttonVariants())} href="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
