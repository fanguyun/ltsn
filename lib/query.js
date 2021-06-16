const Table = require('cli-table');

function query(dist) {
  const keys = Object.keys(dist[0]);
  // 建立表头
  const table = new Table({
    head: keys
  });

  // 拼接出表格的每一行
  return dist
    .reduce((res, item) => {
      table.push(Object.values(item));
      return res;
    }, table)
    .toString();
}

module.exports = query;
