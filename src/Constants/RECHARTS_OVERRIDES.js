export let RECHARTS_OVERRIDES = {
  lineChart: {
    className: "text-gray-900 text-sm",
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
  },
  line: {
    dot: false
  },
  xAxis: {
    tickLine: false
  },
  yAxis: {
    tickLine: false
  },
  legend: {
    wrapperStyle: {
      paddingTop: 20
    }
  },
  tooltip: {
    separator: ": ",
    labelStyle: {
      fontWeight: 500
    },
    itemStyle: {
      marginBottom: -5
    }
  }
}
