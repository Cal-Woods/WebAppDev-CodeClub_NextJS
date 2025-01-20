'use client'

import { blueMessageProps } from "@/public/PropTypes/types";

export function BlueMessage({title, message }:blueMessageProps) {
    return (
        <div className="block w-[100%] h-24  font-thin overflow-auto m-auto mb-[25px] bg-teal-400 text-center rounded-2xl">
            <h1 className="text-black font-bold text-base ml-4">{title}</h1>
            <p className="font-serif text-sm md:text-base ml-5">{message}</p>
        </div>
    );
}
