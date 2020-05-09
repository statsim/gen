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

  let res = ''
  if (params.format === 'csv') {
    res = colNames.join(',') + '\n'
    // To prevent scientific notation, toFixed, then trim right zeros and '.'
    // Tried this: https://stackoverflow.com/questions/26299160/using-regex-how-do-i-remove-the-trailing-zeros-from-a-decimal-number#26299205
    // Doesn't work with negative numbers. So more transparent script:
    res += data.map(row => row.map(v => {
      const vstr = v.toString()
      return vstr.includes('e') ? v.toFixed(15).replace(/0*$/, '') : vstr
    }).join(',')).join('\n') + '\n'
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
