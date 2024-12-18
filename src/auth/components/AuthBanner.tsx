import {ReactElement} from "react";

export const AuthBanner = (): ReactElement => {
  return (
    <div
      style={{backgroundImage: 'url(/mushrooms.webp)', backgroundPosition: "75% 50%"}}
      className="relative flex flex-col items-center justify-center bg-cover bg-no-repeat"
    >
      <div className="top-0 left-0 bg-black h-full w-full bg-opacity-40"/>
      <svg className="absolute -translate-y-2 text-background h-1/2 w-auto" width="654" height="567" viewBox="0 0 654 567"
           fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M226 528.5H109V200.5L327.5 39L545.5 199.5V524.5C545.5 524.5 402 524.5 364.5 524.5C327 524.5 327 510.5 327 451.5"
          stroke="currentColor" strokeWidth="13" strokeLinecap="square"/>
        <path
          d="M346.869 369.668C322.569 393.969 335.369 443.668 335.369 443.668C335.369 443.668 386.069 455.969 410.369 431.668C434.67 407.368 423.369 355.668 423.369 355.668C423.369 355.668 371.17 345.368 346.869 369.668Z"
          fill="currentColor"/>
        <path
          d="M346.869 268.668C322.569 292.969 335.369 342.668 335.369 342.668C335.369 342.668 386.069 354.969 410.369 330.668C434.67 306.368 423.369 254.668 423.369 254.668C423.369 254.668 371.17 244.368 346.869 268.668Z"
          fill="currentColor"/>
        <path
          d="M284.947 213.882C284.947 248.248 329.141 274.34 329.141 274.34C329.141 274.34 373.689 247.187 373.689 212.821C373.689 178.455 329.141 149.889 329.141 149.889C329.141 149.889 284.947 179.516 284.947 213.882Z"
          fill="currentColor"/>
        <path
          d="M307.124 369.668C331.425 393.969 318.624 443.668 318.624 443.668C318.624 443.668 267.925 455.969 243.624 431.668C219.324 407.368 230.624 355.668 230.624 355.668C230.624 355.668 282.824 345.368 307.124 369.668Z"
          fill="currentColor"/>
        <path
          d="M307.124 268.668C331.425 292.969 318.624 342.668 318.624 342.668C318.624 342.668 267.925 354.969 243.624 330.668C219.324 306.368 230.624 254.668 230.624 254.668C230.624 254.668 282.824 244.368 307.124 268.668Z"
          fill="currentColor"/>
      </svg>
      <div className="absolute bottom-0 h-8 w-full rounded-t-[32px] lg:right-0 lg:h-full lg:w-8 lg:rounded-tr-none lg:rounded-l-[32px] bg-background"/>
    </div>
  );
};