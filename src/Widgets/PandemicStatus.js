import React from "react"
import { Card } from "Components/Card"
import { Stats } from "Components/Stats"
import { Stat } from "Components/Stat"
import { formatNumber } from "Utils/formatNumber"

export function PandemicStatus(props) {
  return (
    <Card
      title="Situação no Brasil"
      description="Estatísticas gerais da pandemia no Brasil"
      dataSource={{
        name: "World in Data",
        url: "https://ourworldindata.org/coronavirus-source-data"
      }}
    >
      <Stats>
        <Stat
          label="Casos"
          value={formatNumber(props.totalsInBrazil.totalCases)}
        />
        <Stat
          label="Mortes"
          value={formatNumber(props.totalsInBrazil.totalDeaths)}
        />
        <Stat
          label="Taxa de letalidade"
          value={`${formatNumber(
            (props.totalsInBrazil.totalDeaths /
              props.totalsInBrazil.totalCases) *
              100,
            "0.00"
          )}%`}
        />
      </Stats>
    </Card>
  )
}
