import * as L from "lodash/fp"
import { COUNTRIES } from "Constants/COUNTRIES"

export function findCountryByName(name) {
  return COUNTRIES.find(L.propEq("name", name))
}
