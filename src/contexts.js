
import { createContext } from "react";
import { themes } from "./Themes";
export const TitleContext = createContext("Дела");
export const SetDoneContext = createContext(undefined);
export const DeleteContext = createContext(undefined);
export const ThemeContext = createContext(themes.white);
