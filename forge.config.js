const path = require('path');

const dependencies = [
  "webidl-conversions",
  "@cliqz/adblocker-electron",
  "cross-fetch",
  "node-fetch",
  "@cliqz/adblocker-electron-preload",
  "tldts-experimental",
  "@cliqz/adblocker-content",
  "original-fs",
  "whatwg-url",
  "tr46",
  "tldts-core"
]

module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'src/icons/',
    ignore: [
        "^\\/public$",
        "^\\/src$",
        //"^\\/node_modules$",
        //`/node_modules/(?!(${dependencies.join("|")})/).*`,
        "^\\/[.].+",
        "!\\/icons\\/[.]."
        // [...]
    ],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
