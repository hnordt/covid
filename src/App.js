import React, { useState, useEffect } from "react"
import * as L from "lodash/fp"
import { COUNTRIES } from "Constants/COUNTRIES"
import { Navbar } from "Components/Navbar"
import { Content } from "Components/Content"
import { PandemicStatus } from "Widgets/PandemicStatus"
import { TotalCasesProgression } from "Widgets/TotalCasesProgression"
import { fetchData } from "Requests/fetchData"

export function App() {
  let [data, setData] = useState([])
  let [error, setError] = useState(null)

  let totalCasesByCountry = COUNTRIES.reduce((acc, country) => {
    return {
      ...acc,
      [country.name]: L.pipe(
        L.filter(L.propEq("location", country.name)),
        L.orderBy("date", "asc"),
        L.map(L.prop("totalCases"))
      )(data)
    }
  }, {})

  let totalsInBrazil =
    L.pipe(
      L.filter(L.propEq("location", "Brazil")),
      L.orderBy("date", "asc"),
      L.last
    )(data) ?? {}

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
  }, [])

  if (error) {
    // TODO: allow the user to retry
  }

  return (
    <>
      <Navbar />
      <Content>
        <div className="grid gap-8">
          <PandemicStatus totalsInBrazil={totalsInBrazil} />
          <TotalCasesProgression totalCasesByCountry={totalCasesByCountry} />
        </div>
      </Content>
    </>
  )
}
