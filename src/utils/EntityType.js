// enums/EntityType.js
import { TbLine } from "react-icons/tb";
import { FaRegCircle } from "react-icons/fa6";
import { TbOvalVertical } from "react-icons/tb";
import { PiPolygonBold } from "react-icons/pi";

export const EntityType = {
  LINE: "Line",
  CIRCLE: "Circle",
  POLYLINE: "Polyline",
  ELLIPSE: "Ellipse",
  UNKNOWN: "unknown",
};
export const enumOptions = [
  {
    type: EntityType.LINE,
    label: "Line",
    icon: TbLine,
  },
  {
    type: EntityType.CIRCLE,
    label: "Circle",
    icon: FaRegCircle,
  },
  {
    type: EntityType.POLYLINE,
    label: "Polyline",
    icon: PiPolygonBold,
  },
  {
    type: EntityType.ELLIPSE,
    label: "Ellipse",
    icon: TbOvalVertical,
  },
];

export const getEntity = (inEntity) => {
  switch (inEntity) {
    case EntityType.LINE:
      return EntityType.LINE;
    case EntityType.CIRCLE:
      return EntityType.CIRCLE;
    case EntityType.ELLIPSE:
      return EntityType.ELLIPSE;
    case EntityType.POLYLINE:
      return EntityType.POLYLINE;
    default:
      return EntityType.UNKNOWN;
  }
};

export default EntityType;
