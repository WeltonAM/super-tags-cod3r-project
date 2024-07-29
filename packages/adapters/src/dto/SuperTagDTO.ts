import { SuperTagProps } from "core";
import PropriedadeDTO from "./PropriedadeDTO";

export default interface SuperTagDTO extends SuperTagProps {
  propriedades?: PropriedadeDTO[];
}
