import * as Plot from "@observablehq/plot";
import {csv} from "d3-fetch";
import {autoType} from "d3-dsv";

export default async function() {
  const data = await csv("data/bls-metro-unemployment.csv", autoType);
  return Plot.plot({
    marks: [
      Plot.line(data, {x: "date", y: "unemployment", z: "division"}),
      Plot.ruleY([0])
    ]
  });
}