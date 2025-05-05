import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NavMenu from "@/components/shared/navmenu";
import { Navlinks } from "@/@types";

type Props = Readonly<{ nav: Navlinks }>;

const NavMenuMobile: React.FC<Props> = ({ nav }) => {
  return (
    <div className="block md:hidden mr-2.5">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button
            role="button"
            id="al"
            aria-label="Menu"
            className="bg-inherit text-current [&_svg]:size-8 p-0 shadow-none rounded-none hover:bg-inherit active:bg-inherit"
          >
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full max-w-[280px] h-full rounded-none">
          <DrawerTitle className="sr-only">Mobile Navmenu</DrawerTitle>
          <DrawerDescription className="sr-only">
            Sidebar for header menu links in mobile view
          </DrawerDescription>
          <NavMenu
            listClassName="w-full px-5 py-10 grid gap-6"
            navlinks={nav.navlinks}
            label={nav.label}
          />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavMenuMobile;
