import axios from "axios"
import * as L from "lodash/fp"

export async function fetchData() {
  let response = await axios.get(
    "https://covid.ourworldindata.org/data/ecdc/full_data.csv"
  )

  return (
    response.data
      // Extract lines
      .split("\n")
      // Ignore the first line
      .slice(1)
      // Extract "columns" for each line
      .map(L.split(","))
      // Transform data
      .map(([date, location, newCases, newDeaths, totalCases, totalDeaths]) => {
        return {
          date,
          location,
          newCases: Number(newCases),
          newDeaths: Number(newDeaths),
          totalCases: Number(totalCases),
          totalDeaths: Number(totalDeaths)
        }
      })
  )
}
