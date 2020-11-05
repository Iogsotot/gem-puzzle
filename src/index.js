// import * as $ from 'jquery'
// import json from './assets/json.json'
// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
// import WebpackLogo from '@/assets/webpack-logo.png'
// import React from 'react'
// import {render} from 'react-dom'
// import './styles/styles.css'
// import './styles/less.less'
import './styles/style.scss'

// index.js
// создание свойства класса без конструктора
class Game {
  name = 'Violin Charades'
}
const myGame = new Game()

// создаем параграф
const p = document.createElement('p')
p.textContent = `I like ${myGame.game}.`

// создаем элемент заголовка
const heading = document.createElement('h1')
heading.textContent = 'Как интересно!'

// добавляем параграф и заголовок в DOM
const root = document.querySelector('#root')
root.append(heading, p)