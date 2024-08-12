import { Float } from "../components/renderComponent/Float";
import { Matted } from "../components/renderComponent/Matted";
import { Regular } from "../components/renderComponent/Regular";

export const renderComponent: Record<string, React.ComponentType<any>> = {
  "Regular Frame": Regular,
  "Matted Frame": Matted,
  "Floating Frame": Float,
};
