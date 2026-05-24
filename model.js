const make = require('mkdata')

function gen (input) {
  input = input || {}
  const dataset = datasetByName(input.dataset || input['Dataset type'] || 'Friedman 1')
  const format = String(input.format || input['File format'] || 'CSV').toLowerCase()
  const nSamples = Number(input.nSamples || input.n || input['Number of samples'] || 1000)

  if (format !== 'csv' && format !== 'json') throw new Error('Format must be CSV or JSON')
  if (!Number.isInteger(nSamples) || nSamples < 1) throw new Error('Rows must be a positive integer')

  const generated = make[dataset.key]({ nSamples })
  const X = generated[0]
  const y = generated[1]
  const columns = X[0].map((_, i) => 'x' + (i + 1)).concat('y')
  const rows = X.map((x, i) => x.concat(y[i]))
  const content = format === 'csv'
    ? toCsv(columns, rows)
    : JSON.stringify({ name: dataset.label, n: nSamples, data: toRecords(columns, rows) })

  return {
    file: {
      content,
      filename: dataset.key + '.' + format,
      mime: format === 'csv' ? 'text/csv' : 'application/json'
    }
  }
}

const datasets = [
  { label: 'Friedman 1', key: 'friedman1' },
  { label: 'Friedman 2', key: 'friedman2' },
  { label: 'Friedman 3', key: 'friedman3' },
  { label: 'Peak', key: 'peak' },
  { label: 'Hastie', key: 'hastie' },
  { label: 'Moons', key: 'moons' },
  { label: 'Spirals', key: 'spirals' },
  { label: 'Ringnorm', key: 'ringnorm' }
]

function datasetByName (value) {
  const raw = String(value).toLowerCase()
  const key = raw.replace(/[\s_-]+/g, '')
  const dataset = datasets.find(d => d.label.toLowerCase() === raw || d.key === key)
  if (!dataset) throw new Error('Unknown dataset: ' + value)
  if (typeof make[dataset.key] !== 'function') throw new Error('mkdata does not provide dataset: ' + dataset.key)
  return dataset
}

function toCsv (columns, rows) {
  return columns.join(',') + '\n' + rows.map(row => row.map(formatNumber).join(',')).join('\n') + '\n'
}

function toRecords (columns, rows) {
  return rows.map(row => {
    const record = {}
    columns.forEach((name, i) => { record[name] = row[i] })
    return record
  })
}

function formatNumber (value) {
  const text = String(value)
  return text.includes('e') ? value.toFixed(15).replace(/0+$/, '').replace(/\.$/, '') : text
}

module.exports = gen
