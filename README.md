# Powder Day

Snowboarding canvas game written in TypeScript with React and Redux running on top of Phonegap.

Gain score by going through the forest on a powder day. 
Use device accelerometer to change player's movement direction.

## Quick Start
Install **powderday** in production mode:
```
git clone https://github.com/frolovilya/powderday.git
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

## Screenshots

![Screenshot 1](https://user-images.githubusercontent.com/271293/29357638-ee5c75ee-8280-11e7-9a8f-73dae9ca6cbc.png) 
![Screenshot 2](https://user-images.githubusercontent.com/271293/29357636-eceebcc6-8280-11e7-8acd-01a109916b21.png)
