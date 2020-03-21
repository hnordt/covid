import React, { useState, useEffect } from "react"
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis
} from "recharts"
import csv2json from "csvtojson/v2"
import { Logo } from "Core/Components/Logo"
import axios from "axios"
import * as L from "lodash/fp"
import numeral from "numeral"
import "numeral/locales/pt-br"

numeral.locale("pt-br")

let COUNTRIES = [
  "Brazil",
  "Italy",
  "Spain",
  "China",
  "United States",
  "South Korea"
]

function getCountryNameByDataKey(dataKey) {
  return {
    "totalCases.Brazil": "Brasil",
    "totalCases.Italy": "Itália",
    "totalCases.Spain": "Espanha",
    "totalCases.China": "China",
    "totalCases.United States": "EUA",
    "totalCases.South Korea": "Coreia do Sul"
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
      .then(data => {
        let parsedData = COUNTRIES.reduce((acc, country) => {
          return {
            ...acc,
            [country]: L.pipe(
              L.filter(L.propEq("location", country)),
              L.orderBy("date", "asc"),
              L.filter(item => {
                return item.total_cases >= 100
              }),
              L.map(item => {
                return Number(item.total_cases)
              })
            )(data)
          }
        }, {})

        return L.range(0, 10).map(i => {
          return {
            day: i + 1,
            totalCases: COUNTRIES.reduce((acc, country) => {
              return {
                ...acc,
                [country]: parsedData[country][i]
              }
            }, {})
          }
        })
      })
      .then(setData)
  }, [])

  return (
    <>
      <Navbar />
      <Content>
        <Card
          title="Progressão de casos"
          description="Evolução do acumulado de casos no Brasil comparando com o ritmo de crescimento de outros países a partir do registro do 100º caso"
          dataSource={{
            name: "World in Data - Coronavirus Source Data",
            url: "https://ourworldindata.org/coronavirus-source-data"
          }}
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
              <XAxis dataKey="day" hide />
              <YAxis
                tickFormatter={value => {
                  return numeral(value).format("0,0")
                }}
                tickLine={false}
              />
              <Legend
                iconType="plainline"
                formatter={getCountryNameByDataKey}
                wrapperStyle={{
                  paddingTop: 20
                }}
              />
              <Tooltip
                labelFormatter={label => {
                  return `Casos no ${label}º dia`
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
                dataKey="totalCases.Brazil"
                stroke="#38a169"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalCases.United States"
                stroke="#3182ce"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalCases.Italy"
                stroke="#d53f8c"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalCases.Spain"
                stroke="#d69e2e"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalCases.China"
                stroke="#e53e3e"
                strokeWidth={1.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalCases.South Korea"
                stroke="#718096"
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
      <div className="border-t border-gray-200 p-6">
        <p className="text-gray-500 text-sm leading-5">
          <strong>Fonte:</strong>{" "}
          <a
            className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
            href={props.dataSource.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.dataSource.name}
          </a>
        </p>
      </div>
    </div>
  )
}
