import { ReactElement, useState } from "react";
import { PrimaryButton } from "@/shared/components/Buttons";
import { ReferableTextField } from "@/shared/components/ReferableTextField.tsx";
import { Spinner } from "@/shared/components/Spinner.tsx";

export const EditCompanyComponent = ({
    hideDialog,
  }: {
    hideDialog: () => void;
  }): ReactElement => {
  
    return (
      <div>
        <div className="absolute backdrop-blur-xs bg-black bg-opacity-25 inset-0 flex w-full justify-center h-full z-20 content-center items-center">
          <div className="bg-background lg:w-1/3 lg:h-2/3 content-start justify-center text-center rounded-2xl">
            aaaaaaaaaaaaaaaaaaaaaaaa
            <button onClick={hideDialog}>Cerrar</button>
          </div>
        </div>
      </div>
    );
  };