import React, { useState, useEffect } from "react"
import * as L from "lodash/fp"
import { COUNTRIES } from "Constants/COUNTRIES"
import { Navbar } from "Components/Navbar"
import { Content } from "Components/Content"
import { PandemicStatus } from "Widgets/PandemicStatus"
import { TotalCasesProgression } from "Widgets/TotalCasesProgression"
import { fetchData } from "Requests/fetchData"
import { Card } from "Components/Card"
import { CardContent } from "Components/CardContent"

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
        <div className="grid grid-cols-12 gap-8">
          <Card
            className="col-span-7"
            title="Situação entre usuários desta app"
            description="Informações providas pelos próprios usuários em relação ao COVID-19"
            dataSource="Usuários da app"
          >
            <CardContent className="flex justify-center items-center">
              <div className="flex flex-wrap -mt-6 -mx-6">
                <div className="text-center pt-6 px-6">
                  <span className="text-4xl leading-8" role="img" aria-hidden>
                    🙂
                  </span>
                  <p className="text-gray-500 font-medium text-base leading-6 mt-1">
                    <strong className="text-indigo-600">13</strong> sentindo-se
                    bem
                  </p>
                </div>
                <div className="text-center pt-6 px-6">
                  <span className="text-4xl leading-8" role="img" aria-hidden>
                    🤧
                  </span>
                  <p className="text-gray-500 font-medium text-base leading-6 mt-1">
                    <strong className="text-indigo-600">2</strong> apresentando
                    sintomas
                  </p>
                </div>
                <div className="text-center pt-6 px-6">
                  <span className="text-4xl leading-8" role="img" aria-hidden>
                    🤢
                  </span>
                  <p className="text-gray-500 font-medium text-base leading-6 mt-1">
                    <strong className="text-indigo-600">1</strong>{" "}
                    autodiagnosticado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <PandemicStatus
            className="col-span-5"
            totalsInBrazil={totalsInBrazil}
          />
          <TotalCasesProgression
            className="col-span-12"
            totalCasesByCountry={totalCasesByCountry}
          />
        </div>
      </Content>
    </>
  )
}
