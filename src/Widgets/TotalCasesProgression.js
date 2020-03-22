import React from "react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip
} from "recharts"
import * as L from "lodash/fp"
import { COUNTRIES } from "Constants/COUNTRIES"
import { RECHARTS_OVERRIDES } from "Constants/RECHARTS_OVERRIDES"
import { Card } from "Components/Card"
import { findCountryByName } from "Utils/findCountryByName"
import { formatNumber } from "Utils/formatNumber"

// Number of days to show in the chart
let NUMBER_OF_DAYS = 10

export function TotalCasesProgression(props) {
  return (
    <Card
      title="Progressão de casos"
      description="Evolução do acumulado de casos no Brasil comparando com o ritmo de crescimento de outros países a partir do registro do 100º caso"
      dataSource={{
        name: "World in Data",
        url: "https://ourworldindata.org/coronavirus-source-data"
      }}
    >
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={L.range(0, NUMBER_OF_DAYS).map(i => {
            return {
              day: i + 1,
              ...COUNTRIES.reduce((acc, country) => {
                return {
                  ...acc,
                  [country.name]: props.totalCasesByCountry[
                    country.name
                  ].filter(totalCases => {
                    return totalCases >= 100
                  })[i]
                }
              }, {})
            }
          })}
          {...RECHARTS_OVERRIDES.lineChart}
        >
          {COUNTRIES.map(country => {
            return (
              <Line
                key={country.name}
                type="monotone"
                dataKey={country.name}
                stroke={country.color}
                strokeWidth={country.primary ? 3 : 1.5}
                {...RECHARTS_OVERRIDES.line}
              />
            )
          })}
          <XAxis dataKey="day" hide {...RECHARTS_OVERRIDES.xAxis} />
          <YAxis tickFormatter={formatNumber} {...RECHARTS_OVERRIDES.yAxis} />
          <Legend
            iconType="plainline"
            formatter={countryName => {
              return findCountryByName(countryName).nameInPortuguese
            }}
            {...RECHARTS_OVERRIDES.legend}
          />
          <Tooltip
            labelFormatter={countryName => {
              return `Casos no ${countryName}º dia`
            }}
            formatter={(totalCases, countryName) => {
              return [
                formatNumber(totalCases),
                findCountryByName(countryName).nameInPortuguese
              ]
            }}
            {...RECHARTS_OVERRIDES.tooltip}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
