# WH-A-M!

![Node.js][shield-node]
![React][shield-react]
![React Native][shield-rn]

**A simple whack-a-mole game made using React and React Native based on Ania Kubow's tutorial.**

[This here][1] ~~is~~was the link to the tutorial video.

While I mainly did this tutorial because of "whack-a-mole", it was also a good opportunity to learn about React Redux and React Native. Honestly, I still cannot properly wrap my head around Redux, and this app would have been a lot easier without it.

<p text-align='center'>
  <img src='./sample-screen.gif'>
  <em>Preview</em>
</p>

## Usage

- ![Web][shield-html5]: This version is available at [mtc-20.github.io/Whack-a-Mole_react/][3]!
- ![Android][shield-android] : The old version is available as [APK][7] in [Releases][8]

## Development

### Prerequisites

![NodeJS logo][shield-nodejs-logo] ![Expo][shield-expo]

If you already have some version of node installed, I would recommend using a Node version Manager to manage multiple versions of node. With `nvm`, you can easily switch between different versions:

> [!TIP]
> Here are some sources depending on your OS and shell
> - [nvim][4]
> - [nvm.fish][5]
> - [nvm-windows][6]

```bash
 nvm install 18 --lts
```

### Usage

1. Clone this repo

  ```bash
  git clone https://github.com/mtc-20/Whack-a-Mole_react.git
  cd Whack-a-Mole_react
  ```

2. Install dependencies

  ```bash
  # Ensure you're using Node v18
  npm install
```

3. Quick start (build for all platforms, live reload)

  ```bash
  npm run start
  ```

  This should open a page in your browser. 
  - To test live on Android, install the [expo app](https://play.google.com/store/apps/details?id=host.exp.exponent), and from the app, scan the QR code on the terminal
    > [!NOTE]
    > If it says network error on your android device, select `Tunnel` Connection from the left menu tab, and rescan the newly generated QR code 
  - To test directly on your web browser, select `Run in web browser` from the left menu tab 
  - Alternatively, it is possible to run them on "virtual" android or iOS (MacOS is required for testing on simulated iOS) devices, but I have not tried them yet. Please follow the [tutorial][1] for this approach

  > [!TIP]
  > If you only want the web app, then
  >
  > ```bash
  >   npm run web
  > ```

## Future

- [ ] Introduce levels
- [x] Figure out ways to host this as both app and website
- [x] Add **Start** and **Reload** buttons
- [ ] Display Score and Player name at end



<!-- LINKS -->
[1]: https://www.youtube.com/watch?v=yrSFLZ_b0Aw&feature=youtu.be
[2]: https://www.cleanpng.com/png-pull-up-mole-fat-mole-cartoon-animation-2043565/
[3]: mtc-20.github.io/Whack-a-Mole_react
[4]: https://github.com/nvm-sh/nvm
[5]: https://github.com/jorgebucaran/nvm.fish
[6]: https://github.com/coreybutler/nvm-windows
[7]: https://github.com/mtc-20/Whack-a-Mole_react/releases/download/v0.1-alpha/my-whack-a-mole-signed.apk
[8]: https://github.com/mtc-20/Whack-a-Mole_react/releases

[shield-node]: https://img.shields.io/badge/node-18.x-green
[shield-nodejs-logo]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
[shield-react]: https://img.shields.io/badge/React-18.2-blue
[shield-rn]: https://img.shields.io/badge/React_Native-0.73-green
[shield-expo]: https://img.shields.io/badge/Build-000.svg?style=for-the-badge&logo=EXPO&labelColor=000&logoColor=FFF
[shield-android]: https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=Android&logoColor=white
[shield-html5]: https://shields.io/badge/HTML-f06529?logo=html5&logoColor=white&labelColor=f06529 
