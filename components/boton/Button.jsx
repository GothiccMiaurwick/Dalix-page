"use client";

import { Button } from "../ui/boton";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function ButtonCard({ text, href }) {
  const buttonElement = (
    <Button
      className="uppercase tracking-[.2rem] sm:tracking-[.3rem] md:tracking-[.4rem] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl px-8 py-3 xs:px-10 xs:py-4 sm:px-12 sm:py-5 md:px-16 md:py-6 hover:bg-white hover:text-black hover:outline-1 hover:outline-black hover:outline-solid cursor-pointer transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
      effect="expandIcon"
      icon={ArrowRightIcon}
      iconPlacement="right"
    >
      {text}
    </Button>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}
