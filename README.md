# Contacts Project

## Installation
1. Unzip the project into some directory.
2. Go to your command window in that directory and type: 
`npm install`

## Project Build
* From a project directory command window type: 
`npm run build:all`

## json-server
* Before testing or debugging, open a command window in the project directory and type: 
`npm run startjsonserver`

## Vscode support
* This project is vscode compatible so you can run the debugger on the code as well as run the production code.

## Debugging
* Select the debug button to the left in vscode and select "Debug" from the drop down. Then push the green arrow button next to the dropdown.

## Run Production Code
* (Outside vscode) 
  1. Start the express production server in a command window with
  `npm run startp`
  2. Open a browser to: http://localhost:3002
* (Inside vscode) - Select the debug button to the left in vscode and select "Production" from the drop down. Then push the green arrow button next to the dropdown. This will run your production code in the browser.
 
## React/Enzyme Test Run and Debugging
* (Outside vscode) - `npm run test`
* (Inside vscode) - Select the debug button to the left in vscode and select "Run Mocha Tests" from the debug drop down. Then push the green arrow button next to the dropdown.  **Note, set the key "program" in the launch.json file under "Run Mocha Tests" to the location of your mocha program. Currently, it is "program": `"${workspaceRoot}/node_modules/mocha/bin/_mocha"`** Most likely, this default will work.

## Comments
* Sometimes vscode will put up an error message during a long build indicating that it cannot track a preLaunchTask. This is an admitted flaw in vscode introduced in the most recent release. Wait until the compile is complete and click Debug anyway.
* Debugging in this project supports HMR.
* The project build and debugging environments were implemented by me.
* All code adheres to the JS standard code style.

## Easter Eggs
1. Up Up Down Down
2. Up Down Up Down
3. Up Up Up Up

