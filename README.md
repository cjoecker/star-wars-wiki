# Star Wars WIKI 🪐📙

**A small wiki for star wars characters, planets and starships**

![app preview](https://user-images.githubusercontent.com/46030630/204901128-b516e5e4-d1e0-4f2a-bf9f-b500a81a7d59.gif)

## 🚀 How to start

1. Install Node (see below)
2. Run `npm install`
3. Run `npm run dev`
4. Go to [http://localhost:8000/](http://localhost:8000/)

### Install the right version of node

1. Install `n` in your machine with `npm install -g n`
2. Run `n auto` to install the right node version.

In case you need to update the node version, run `n <version number>` and then `node --version > .node-version`.\
Then, commit and push the new `.node-version` file to `main` branch once you checked everything is working as expected.

## 🕹 Commands

```bash
npm run dev # starts application locally in dev mode
npm run build # builds the application

npm run format:all # runs prettier to format all the code in src folder
npm run lint <file path> # runs eslint to check the code
npm run lint:fix <file path> # runs eslint to check and fix the code
npm run lint:all # runs lint in all the code in src folder
npm run lint:fix:all # runs and fix lint in all the code in src folder
npm run check-types # checks typescript files
```
