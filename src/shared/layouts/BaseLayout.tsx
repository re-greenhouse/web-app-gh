import {ReactNode} from "react";
import {Toolbar} from "@/shared/components/Toolbar.tsx";

type BaseLayoutProps = {
  children: ReactNode;
}

export const BaseLayout = ({children}: BaseLayoutProps) => {
  return (
    <div className="grid grid-rows-[auto_1fr] bg-background min-h-dvh">
      <Toolbar />
      <main className="">
        {children}
      </main>
    </div>
);
};