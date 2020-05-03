const make = require('mkdata')

module.exports = function gen (p) {
  const params = {
    dataset: p['Dataset type'].toLowerCase().replace(/\s+/g, ''),
    format: p['File format'].toLowerCase(),
    n: p['Number of samples']
  }
  console.log('[Gen] Generate data with parameters:', params)
  const [X, y] = make[params.dataset]({
    nSamples: params.n
  })
  const colNames = X[0].map((_, i) => 'x' + (i + 1)).concat('y')
  const data = X.map((x, i) => x.concat(y[i]))

  let res
  if (params.format === 'csv') {
    res = colNames.join(',') + '\n' + data.map(row => row.join(',')).join('\n') + '\n'
  } else {
    res = JSON.stringify({
      data: data.map(row => {
        const record = {}
        colNames.forEach((name, i) => { record[name] = row[i] })
        return record
      }),
      name: p['Dataset type'],
      n: params.n
    })
  }
  return { file: { content: res, filename: params.dataset + '.' + params.format } }
}
