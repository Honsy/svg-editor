import React from "react";
import Designer from "../adapter/designer";

export const designer = new Designer();
export const DesignerContext = React.createContext(designer);