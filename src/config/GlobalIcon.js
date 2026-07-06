import contentConfig from "./contentConfig";


// For Hadnle Globally FaFa Icon
export const GlobalIcon = ({ name }) => {
  const icon = contentConfig?.Icon?.find((item) => item.name === name);

  if (!icon) return null;
  return <i className={icon?.className}></i>;
};

// For Globally Handle Svg Icon
export const GlobalSVG = ({ name }) => {
  const svgicon = genralConfig.SVGIcon[name];

  if (!svgicon) return null;

  return <>{svgicon}</>;
};
