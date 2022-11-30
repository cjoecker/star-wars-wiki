# Star Wars WIKI 🪐📙

**A small wiki for star wars characters, planets and starships**\

<img style="https://user-images.githubusercontent.com/46030630/204879006-088f68f9-dc72-49ee-bb86-311b2562a080.gif" alt="preview" width="400"/>

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

npm run format # runs prettier to format the code
npm run lint <file path> # runs eslint to check the code
npm run lint:fix <file path> # runs eslint to check and fix the code
npm run lint:all # runs lint in all the code
npm run lint:fix:all # runs lint in all the code and fix it
npm run check-types # checks typescript files
```
