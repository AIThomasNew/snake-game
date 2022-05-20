let scoreBlock; // отображение очков
let score = 0; // очки внутри игры

// настройки игры
const config = {
  step: 0, // пропуск игрового цикла
  maxStep: 6, // пропуск игрового цикла
  sizeCell: 16, // размер ячейки
  sizeBerry: 16 / 4, // размер ягоды
};

// хранение характеристик змейки
const snake = {
  x: 16, // координата
  y: 16, // координата
  dx: config.sizeCell, // скорость по горизонтали
  dy: 0, // скорость по вертикали
  tails: [], // массив ячеек под контролем моей змейки
  maxTails: 3,
};

// координаты ягоды
let berry = {
  x: 0,
  y: 0,
};

// увеличивает значение очков на 1
function incScore() {
  score++;
  drawScore();
}

// отображает это значение на странице
function drawScore() {
  scoreBlock.innerHTML = score;
}


