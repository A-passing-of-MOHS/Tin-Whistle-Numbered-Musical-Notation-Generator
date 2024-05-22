const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  // packagerConfig: {
  //   name: 'APP_NAME',
  //   // 不加扩展名，MAC 会自动查找 .icns、WIN 使用 .ico
  //   icon: './icon/icon',
  //   // 最终包不使用的代码，不要打入 asar
  //   ignore: [/\.yarn/, /src\/render/],
  //   appBundleId: `com.xxx.xxx`,
  //   appCopyright: `Copyright © 2023 ${packageJson.author}`
  // },
  rebuildConfig: {},
  makers: [
    // windows 上的打包
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },

    // mac 上的打包
    // {
    //   name: '@electron-forge/maker-dmg',
    //   config: {
    //     //background: './assets/dmg-background.png',
    //     format: 'ULFO'
    //   }
    // },
    // 打成 zip 的包，windows 上和 mac 上都有
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin','win32'],
    },

  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

