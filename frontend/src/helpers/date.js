import { parse, formatISO } from 'date-fns'


export function convertToISO(strDate) {
  const newDate = parse(strDate, 'dd/mm/yyyy', new Date())
  return formatISO(newDate)
}