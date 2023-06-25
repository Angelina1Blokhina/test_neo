import * as PIXI from 'pixi.js';

var app=null;
function drawGraph() {
  // Параметры функции
  let A = Number(document.getElementById("amplitudeInput").value);
  let T = Number(document.getElementById("periodInput").value);
  let F = Number(document.getElementById("phaseInput").value);
  let W = Number(document.getElementById("widthInput").value);
  let H = Number(document.getElementById("heightInput").value);

  if (app) {
    app.destroy(true);
    app = null;
  }
  // Создание массива для хранения данных
  const data = [];
  
  // Заполнение массива данными
  for (let x = 0; x <= 10 * T; x += 1) {
    const y = A * Math.sin(x / T + F);
    data.push({ x, y });
  }
  
  
  // Создание холста Pixi.js
  app = new PIXI.Application({
    width: W,
    height: H,
    antialias: true,
    transparent: false,
    resolution: window.devicePixelRatio || 1
  });
  
  // Добавление холста в тело HTML-страницы
  document.body.appendChild(app.view);
  
  
  // Создание графического контейнера для графика
  let graphContainer = new PIXI.Container();
  app.stage.addChild(graphContainer);
  
  // Рисование графика
  const graphics = new PIXI.Graphics()
  graphics.lineStyle(2, 0xFF0000);
  
  for (let i = 0; i < data.length - 1; i++) {
    const { x: x1, y: y1 } = data[i];
    const { x: x2, y: y2 } = data[i + 1];
    graphics.moveTo(x1, H / 2 - y1);
    graphics.lineTo(x2, H / 2 - y2);
  }
  
  // Добавление графического объекта в графический контейнер
  graphContainer.addChild(graphics);
  }
  
  const drawButton = document.querySelector('#updateButton') 
  drawButton.addEventListener('click', drawGraph)