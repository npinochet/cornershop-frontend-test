# Cornershop Frontend Test

[![End-to-end Tests](https://github.com/npinochet/cornershop-frontend-test/workflows/End-to-end%20Tests/badge.svg)](https://github.com/npinochet/cornershop-frontend-test/actions)

This simple counter app was designed following the specs detailed [here](https://www.figma.com/file/6CnuM0Gj9oiwi2AV9vXLRH/Counters-for-the-web?node-id=0%3A1).

## Design decisions and observations

* I based my project structure on [this article](https://www.robinwieruch.de/react-folder-structure), with some tweaks. Basically I'm trying to keep everything related to a component in it's own folder.

* I used plain old css and **Flexbox** since that's what I'm used to. There is a main stylesheet in **'src'** and local stylesheets with every component. I may use some inline styles if it's something minor, since it's more practical.

* I used **Redux** to keep the main state of the app and to make API calls, because that's what I'm used to, I think it works well enough.

* I made most of my commits on **'master'** with simple messages, since git practices like **Git Flow** are meant to be use with teams where a lot of concurrent code is being written.

* I used **Cypress** to make some simple and general behavioral tests, which covers cases from creating counters, adding +1, deleting, searching and sharing.

## Getting started

First and foremost, make sure you have `node` and `npm` installed on your machine, then run:

```bash
$ npm install
$ npm start
```

**Author:** Nicolás Pinochet
![Beer Party Parrot](https://cultofthepartyparrot.com/parrots/hd/beerparrot.gif)
