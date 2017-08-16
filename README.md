# Powder Day

Snowboarding game written in TypeScript with React and Redux running on top of Phonegap.

Gain score by going though the forest on a powder day.

## Quick Start
Install **powderday** in production mode:
```
git checkout https://github.com/frolovilya/powderday.git
npm install --production
npm run init-phonegap-app
npm run start-phonegap-server
```
Install _Phonegap Mobile_ app on your device:
http://docs.phonegap.com/getting-started/2-install-mobile-app/

## Development
Install all dependencies:
```
git checkout https://github.com/frolovilya/powderday.git
npm install
```
### Packages structure

| Package | Description |
| ------- | ----------- |
| *src/main/typescript/scene* | Contains common code to build a canvas game: scene, layers, objects manipulations. |
| *src/main/typescript/device* | Wrappers around Phonegap device API. |
| *src/main/typescript/app* | Game code: screens, controllers, scene. |
