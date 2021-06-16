const axios = require('axios');
const color = require('cli-color');
const terminalLink = require('terminal-link');
const compareVersions = require('compare-versions');

module.exports = async () => {
  // 拿到所有Node版本
  const { data } = await axios.get('https://nodejs.org/dist/index.json');

  // 把目标版本的LTS都挑选出来
  return data
    .filter((node) => {
      const cp = v ? compareVersions(node.version, 'v' + v + '0.0') >= 0 : true;
      return node.lts && cp;
    })
    .map((it) => {
      // 剔除files字段
      const { files, ...rest } = it;
      const doc = color.yellow(
        terminalLink(
          'API',
          `https://nodejs.org/dist/${it.version}/docs/api/documentation.html`
        )
      );
      return { ...rest, doc };
    });
};
