//Set components to 'use client'
'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { menu } from "@/public/PropTypes/types";

export function CCSmallMenu({data}:{data:menu[]}) {
    //Add boolean state to control menu
    const [mobileMenu, changeMenu] = useState(false);

    //Define function for hamburger data icon, 'onClick' handling
    function clickMenuBtn() {
        changeMenu(!mobileMenu);
    }
    
    //Define a function to close data upon clicking link
    function clickLink() {
        changeMenu(false);
    }

    return (
        <div className="w-full h-fit block md:hidden top-0">
            <Image alt="A black hamburger data image." className="float-right mb-[85px]" role="button" src="/Images/hamburger.png" id="icon" width={36} height={36} onClick={clickMenuBtn}/>            
            <nav id="Small-data" className={clsx(
                "w-[50%] float-right z-10 absolute top-10 right-[1%] clear-right transition-opacity bg-cyan-500 mb-[18px] text-center m-auto pt-[8px]",

                {'block opacity-100':mobileMenu, 'opacity-0 hidden':!mobileMenu})}>
                
                {data.map((entry) => {return <Link key={entry.id} href={entry.link} className="w-[100%] border-b-2 pb-4 relative border-white hover:bg-slate-300 active:bg-slate-200 block" onClick={clickLink}>{entry.title}</Link>
})}
            </nav>
        </div>
    );
}

export function CCLgMenu({data}:{data:menu[]}) {
    return (
    <div className="w-full h-[35px] hidden text-base md:block md:mb-[25px] md:text-red-600 md:bg-white md:rounded-md md:border-2 overflow-auto md:border-black md:clear-left lg:bg-transparent lg:border-none lg:text-black lg:h-fit">
        <nav id="Large-data" className="w-full md:clear-left lg:block lg:border-t-2 lg:border-t-black lg:p-0">
            {data.map((entry) => {return <Link key ={entry.id} href={entry.link} className="w-full md:border-x-2 md:px-[35px] md:mr-[100px] lg:border-b-2 lg:text-center lg:border-x-0 hover:bg-cyan-400 active:bg-green-300 lg:border-b-black lg:pb-[8px] inline lg:block"><button>{entry.title}</button></Link>})}
        </nav>
    </div>
    );
}