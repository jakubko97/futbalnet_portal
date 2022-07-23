import InfluxDB from '@influxdata/influxdb-client'
import { url, token, org } from './env'

const queryApi = new InfluxDB({ url, token }).getQueryApi(org)
const fluxQuery =
  'from(bucket:"temperature") |> range(start: -1d) |> filter(fn: (r) => r._field == "temperature")'

const query = queryApi.queryRows(fluxQuery, {
  next: (row, tableMeta) => {
    // the following line creates an object for each row
    const o = tableMeta.toObject(row)
    // console.log(JSON.stringify(o, null, 2))
    console.log(
      `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
    )

    // alternatively, you can get only a specific column value without
    // the need to create an object for every row
    // console.log(tableMeta.get(row, '_time'))

    // or you can create a proxy to get column values on demand
    // const p = new Proxy<Record<string, any>>(row, tableMeta)
    // console.log(
    //  `${p._time} ${p._measurement} in '${p.location}' (${p.example}): ${p._field}=${p._value}`
    // )
  },
  error: (error) => {
    console.error(error)
    console.log('\nFinished ERROR')
  },
  complete: () => {
    console.log('\nFinished SUCCESS')
  },
})

export default query