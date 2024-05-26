import { FusesPlugin }  from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

export default  {
  packagerConfig: {
    asar: true,
  },
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

