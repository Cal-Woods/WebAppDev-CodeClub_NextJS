'use client'

import { cardProps } from "@/public/PropTypes/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Card({buttonLink, buttonText, desc, message, imgLink, title}:cardProps) {
    const path = usePathname();

    return (
        <div className={`w-[300px] h-[350px] block bg-blue-800  mb-[12px] border-2 border-black rounded-lg text-sm m-auto sm:bg-yellow-500 sm:text-lime-500 md:m-0 md:text-base md:bg-red-600 md:mb-0 md:mr-[12px] lg:bg-transparent lg:text-black`}>
            <Image alt={desc} src={imgLink} width={300} height={64}/>
            <h2 className="font-extrabold">{title}</h2>
            <div className="h-[95px] overflow-auto border-2 border-black"><p className="font-bold">{message}</p></div>
            <Link className={clsx("w-[100%] relative -bottom-[35px] bg-slate-400 border-2 border-black hover:bg-blue-600 active:bg-white", path!="/" ? "hidden" : "block")} href={buttonLink}>{buttonText}</Link>
        </div>
    );
    }

