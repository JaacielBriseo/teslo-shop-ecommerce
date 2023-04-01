import { useContext } from "react";
import { AuthContext } from "../contexts";

export const useAuthContext = ()=> useContext(AuthContext)