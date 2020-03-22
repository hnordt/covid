import numeral from "numeral"
import "numeral/locales/pt-br"

numeral.locale("pt-br")

export function formatNumber(number, format = "0,0") {
  return numeral(number).format(format)
}
