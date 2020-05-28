# Cornershop Frontend Test

[![End-to-end Tests](https://github.com/npinochet/cornershop-frontend-test/workflows/End-to-end%20Tests/badge.svg)](https://github.com/npinochet/cornershop-frontend-test/actions?query=workflow%3A%22End-to-end+tests%22)

#### ⚠️ Before you begin

> Create a new git repository on the root of this folder, upload it to Github, and invite [@RoHerrera](https://github.com/RoHerrera) and [@varellanov](https://github.com/varellanov) as collaborators.

## Personal Observations:

* I based my project structure on [this article](https://www.robinwieruch.de/react-folder-structure), with some tweaks. Basically I'm trying to keep everyhting related to a component in it's own folder.

* I used plain old css and Flexbox since that's what I'm used to. There is a main stylesheet in 'src' and local stylesheets with every component. I may use some inline styles if it's something minor, since it's more practical.

* I used Redux to keep the main state of the app, and to make API calls, because that's what I'm used to, also I think it works well enough.

* I made most of my commits on 'master' with simple messages, since git practices like Git Flow are meant to be use with teams where a lot of cocurrent code is being written.

## Overview

You have been commissioned to implement a counter application following the design specs provided [here](https://www.figma.com/file/6CnuM0Gj9oiwi2AV9vXLRH/Counters-for-the-web?node-id=0%3A1).

The application consists of several screens where each screen has one or multiple states that you will have to implement following the design specs the best you can.

We have provided starter boilerplate so you can write your application without any hassle and also a NodeJS dummy backend with all the neccessary endpoints to persist your data.

For bootstrapping the frontend application we're using `react-scripts`, so as you might have guessed you **must** use React (it's our primary view layer for frontend applications here at Cornershop).

> Note: This is NOT a backend test. Don't make it require any databases. Don't touch the server folder. Just leave it as it is.

## Requirements

Your submission will be evaluated considering the following criterias:

- Good implementation of UI elements, both visually and at code level.
  - Extra points for writing custom styling code for UI elements.
  - Use whatever CSS flavor you want: plane old CSS, SASS, LESS, CSS-in-JS, CSS modules, everything is allowed.
- Good architecture and software design.
  - _Hint:_ Usage of design patterns, good code organization, separation of concerns, etc. 
- Use of best practices when writing code.
  - _Hint:_ Idiomatic & readable code, good use of composition, DRY, etc.
- The application must persist data back to the server.
- Feature completion (all features must be implemented for a perfect score).
- Good management of state using built-in React features or third party dependencies (context, `redux`, `mobx`, `xstate` or whatever you might like).
- You must include tests.
  - Behavior tests are perfect.
- Your project must be self-contained (make sure you're not using global dependencies).
- We would love to understand your thought process, so writing a little summary of your choices, what you did and how you solved the test is required (write it here on this README file).

Please consider that we expect your solution to be production-ready. In other words, that millions of users would be thrilled to use your product.

> Note: You can use whatever dependencies/libraries you want, the only requirement dependency-wise is to use React.

## Getting started

First and foremost, make sure you have `node` and `npm` (or `yarn`) installed on your machine, then run:

```bash
$ npm install
$ npm start
```

For `yarn` users:

```bash
$ yarn
$ yarn start
```

## API endpoints / examples

Since the backend API runs locally on a different port (`3001`) than the `react-scripts` dev server (`3000`), we have setup a proxy so you don't have to do anything special to consume the API (fetching data from `/api/v1/counter` will do).

> The following endpoints are expecting a `Content-Type: application/json` header.

#### **GET** `/api/v1/counter`.

_Fetch a list of counters._
```javascript
/* Response */
[]
```

#### **POST** `/api/v1/counter`.

_Adds a counter._

```javascript
/* Body */
{ title: "bob" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **POST** `/api/v1/counter/inc`
_Increments the value of a counter._
```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 1 }
```

#### **POST** `/api/v1/counter/dec`
_Decrements the value of a counter._

```javascript
/* Body */
{ id: "asdf" }

/* Response */
{ id: "asdf", title: "bob", count: 0 }
```

#### **DELETE** `/api/v1/counter`
_Deletes a counter._

```javascript
/* Body */
{ id: "qwer" }

/* Response */
"qwer" // The id of the deleted counter
```
---

Good luck! 🎉

We hope your submission is… to die for.

![Coffin dance](coffin.gif)
