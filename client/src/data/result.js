import resultJson from "./result.json";
import { earthData, jupiterData } from "./macroPlanetData";

resultJson.unshift(jupiterData);
resultJson.unshift(earthData);

export default resultJson;
