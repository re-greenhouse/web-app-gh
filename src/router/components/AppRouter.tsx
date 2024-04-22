import {ReactElement} from "react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "@/public/pages/HomePage.tsx";

export const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};