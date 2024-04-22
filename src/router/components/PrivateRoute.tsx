import {Outlet, Navigate} from "react-router-dom";
import {ReactElement} from "react";

type PrivateRoutesProps = {
  canActivate: boolean,
  defaultDestination: string
}

export const PrivateRoute = ({ canActivate, defaultDestination }: PrivateRoutesProps): ReactElement => {
  return canActivate ? <Outlet /> : <Navigate to={ defaultDestination } />
}