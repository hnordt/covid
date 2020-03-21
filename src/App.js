import React, { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import csv2json from "csvtojson/v2"
import { Logo } from "Core/Components/Logo"
import axios from "axios"
import * as L from "lodash/fp"
import numeral from "numeral"
import "numeral/locales/pt-br"
import * as D from "date-fns/fp"

numeral.locale("pt-br")

function getCountryNameByDataKey(dataKey) {
  return {
    "cases.Brazil": "Brasil",
    "cases.China": "China",
    "cases.Italy": "Itália",
    "cases.United States": "EUA"
  }[dataKey]
}

export function App() {
  let [data, setData] = useState([])

  useEffect(() => {
    axios
      .get("https://covid.ourworldindata.org/data/ecdc/full_data.csv")
      .then(response => {
        return csv2json().fromString(response.data)
      })
      .then(
        L.pipe(
          L.reduce((acc, item) => {
            return {
              ...acc,
              [item.date]: {
                ...acc[item.date],
                [item.location]: item.total_cases
              }
            }
          }, {}),
          Object.entries,
          L.map(([date, cases]) => {
            return {
              date,
              cases: L.mapValues(Number, cases)
            }
          }),
          L.orderBy("date", "asc")
        )
      )
      .then(setData)
  }, [])

  return (
    <>
      <Navbar />
      <Content>
        <Card
          title="Progressão de casos"
          description="Evolução do acumulado de casos em países de maior relevância para fins de comparação"
        >
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              className="text-gray-900 text-sm"
              data={data}
              margin={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              }}
            >
              <XAxis dataKey="date" hide />
              <Legend
                iconType="plainline"
                // layout="vertical"
                // align="left"
                // verticalAlign="top"
                formatter={getCountryNameByDataKey}
                wrapperStyle={{
                  paddingTop: 20
                }}
              />
              <Tooltip
                labelFormatter={date => {
                  return D.format("dd/MM/yyyy", new Date(date))
                }}
                separator=": "
                formatter={(value, name) => {
                  return [
                    numeral(value).format("0,0"),
                    getCountryNameByDataKey(name)
                  ]
                }}
                labelStyle={{
                  fontWeight: 500
                }}
                itemStyle={{
                  marginBottom: -5
                }}
              />
              <Line
                type="monotone"
                dataKey="cases.Brazil"
                stroke="#38a169"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cases.United States"
                stroke="#3182ce"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cases.Italy"
                stroke="#d53f8c"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="cases.China"
                stroke="#e53e3e"
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Content>
    </>
  )
}

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center h-16">
          <Logo className="w-7 h-7" />
        </div>
      </div>
    </nav>
  )
}

function Content(props) {
  return <main className="max-w-7xl mx-auto p-8">{props.children}</main>
}

function Card(props) {
  return (
    <div className="shadow-sm border-b border-gray-200 rounded-md bg-white">
      <div className="border-b border-gray-200 p-6">
        <h1 className="font-medium text-gray-900 text-lg leading-6">
          {props.title}
        </h1>
        <p className="text-gray-500 text-sm leading-5 mt-1">
          {props.description}
        </p>
      </div>
      <div className="p-6">{props.children}</div>
    </div>
  )
}
