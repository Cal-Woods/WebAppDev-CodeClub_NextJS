import { Suspense } from "react";

export function ChristmasWindow() {     
    return (
        <div id="xmas" className="w-[full] h-[500px] mt-[12px]">
            <Suspense fallback={<p>A bunch of christmas carols...</p>}>
                <iframe className="w-[355px] h-[470px] m-auto sm:w-[600px] md:w-[700px] lg:w-[750px]" src="https://www.youtube.com/embed/hPz7h_XK9EQ?si=ynMzu6WAuupHq_JY" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </Suspense>
        </div>
        );
    }

