"use client"

import { Button } from "../ui/boton"
import { ArrowRightIcon } from "lucide-react"

export default function ButtonCard({text}) {
  return  (
    <Button className="uppercase tracking-[.4rem] text-xl px-16 py-6 hover:bg-white hover:text-black hover:outline-1 hover:outline-black hover:outline-solid cursor-pointer xs:text-sm xs:px-10 xs:py-4 xs:tracking-[.2rem]" effect="expandIcon" icon={ArrowRightIcon} iconPlacement="right">
     {text}
    </Button>
  )
}