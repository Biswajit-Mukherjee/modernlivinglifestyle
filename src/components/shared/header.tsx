import * as React from "react";
import Link from "next/link";
import Logo from "@/components/shared/logo";
import NavMenu from "@/components/shared/navmenu";
import ModeToggle from "@/components/shared/mode-toggle";
import NavMenuMobile from "@/components/shared/navmenu-mobile";
import { getHomepageNavlinks } from "@/lib/utils";
import { Navlinks } from "@/@types";

const Header: React.FC = async () => {
  const hdr: Navlinks = await getHomepageNavlinks();

  return (
    <header className="w-full h-20 px-2.5 sm:px-5 fixed top-0 left-0 z-50 flex items-center shadow-lg bg-background">
      <NavMenuMobile nav={hdr} />
      <Link href="/" className="align-middle" sr-only="Home Page">
        <Logo className="cursor-pointer" hidden />
      </Link>
      <NavMenu
        className="hidden md:flex items-center px-20"
        listClassName="w-full flex flex-row items-center gap-10"
        navlinks={hdr.navlinks}
        label={hdr.label}
      />
      <ModeToggle />
    </header>
  );
};

export default Header;
