# Template Repo Features

There are many tools in this repository to help you with code quality and organization. This document is meant to be a hub to introduce you to all of them.

## Features

- React boilerplate with Typescript
- Autoformatting with Prettier
- Linting with ESLint
- CI with GitHub Actions
- Helpful npm commands
- Documentation for repo features + setting up Amplify

## React boilerplate with Typescript

This template repo was built for teams who want to use Typescript with a React project. All of the neccessary code is stored in the [src](/src/) directory. When the website first renders, the [App.tsx](/src/App.tsx) file will be displayed. The src directory also has a [tests](/src/tests/) directory where you can write tests. There is currently only one boilerplate test.

## Autoformatting with Prettier

An autoformatter is a tool to help ensure that everyone on your team follows the same coding styles, such as line width, tab width, semicolons, etc. This formatting can be entirely automated, so after setup, it shouldn't require any work on your end. There are three parts of autoformatting that we reccomend using: **(1)** IDE extension, **(2)** pre-commit hook, and **(3)** CI check. Steps one and two are explained over on the [getting-started](./getting-started.md) document since each person on your team must set it up locally. Step three is already set up and is described more in the CI section of this document.

If you ever want to change how Prettier is formatting your code, you can change it in the [.prettierrc.json](/.prettierrc.json) file.

If you want certain files to be ignored by the autoformatter, you can specify them in the [.prettierignore](/.prettierignore) file.

If you want to control the scope of files checked by the pre-commit hook, you can modify the glob before the colon in the `"lint-staged"` portion of [package.json](/package.json)

For more info, visit the [Prettier Docs](https://prettier.io/docs/en/index.html)

## Linting with ESLint

A linter is an opinionated code quality tool that can be used to ensure your team is following good coding practices. This can range from not declaring unused variables, all the way to seperating local imports from npm imports. This can take a little bit of time for some developers to get used to since it can be picky sometimes, but in the long run will lead to a better maintained codebase. If you ever find that a rule is too intrusive, you can disable it in the configuration file.

If you ever want to change how ESLint is analyzing your code, you can change it in the [.eslintrc.js](/.eslintrc.js) file.

If you want certain files to be ignored by the linter, you can specify them in the [.eslintignore](/.eslintignore) file.

If you want to control the scope of files checked by the linter, you can modify the `"include"` section of [tsconfig.eslint.json](/tsconfig.eslint.json)

For more info, visit the [ESLint Docs](https://eslint.org/docs/latest/user-guide/)

## CI with GitHub Actions

Github Actions is a tool for setting up CI/CD workflows in your repo. Right now, a standard script is set up to build, test, and lint your code on every PR or push to main. The code for Github Actions can be found in the [.github/workflows/node.js.yml](/.github/workflows/node.js.yml). Lines 29-31 correspond to linting, building, and testing respectively.

## Helpful npm commands

The React boilerplate included some helpful npm commands, as well as some we added ourseves.

- `npm start`
- `npm test`
- `npm run build`
- `npm run eject`
- `npm run lint-check`
- `npm run lint-write`

### Create-React-App npm Commands

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Custom npm Commands

### `npm run lint-check`

This command will read all of your code and check it to make sure its conforming to all Prettier and ESLint rules. Any rules that aren't followed will be reported.

**Note: this command is run in your GitHub Actions CI workflow.**

### `npm run lint-write`

This command will read all of your code and check it to make sure its conforming to all Prettier and ESLint rules. Any rules that aren't followed will be automatically fixed. Note that all Prettier rules can be automatically fixed, but some ESLint rules must be manually fixed.

## Documentation for repo features + setting up Amplify

Inside of the [docs](/docs) directory, you may see other other helpful documentation for getting started, setting up Amplify, and other useful info.
