let scoreBlock // отображение очков
let score = 0 // очки внутри игры
 
// настройки игры
const config = {
  step: 0, // пропуск игрового цикла
  maxStep: 6, // пропуск игрового цикла
  sizeCell: 16, // размер ячейки
  sizeBerry: 16 / 4, // размер ягоды
}

// хранение характеристик змейки
const snake = {
  x: 160, // координата
  y: 160, // координата
  dx: config.sizeCell, // скорость по горизонтали
  dy: 0, // скорость по вертикали
  tails: [], // массив ячеек под контролем моей змейки
  maxTails: 3, // кол-во ячеек
}

// координаты ягоды
let berry = {
  x: 0,
  y: 0,
}

let canvas = document.querySelector('#game-canvas') // получить канвас
let context = canvas.getContext('2d')
scoreBlock = document.querySelector('.game-score .score-count')
drawScore()


// игровой цикл
function gameLoop() {
  requestAnimationFrame(gameLoop) // gameLoop будет выз. бесконечно

  // значение из конфига step < maxStep, то пропуск дальнейшей работы ф.
  if (++config.step < config.maxStep) {
    return
  }
  config.step = 0

  // каждый кадр очищать канвас
  context.clearRect(0, 0, canvas.width, canvas.height)

  // и заново отрисовывать все элементы
  drawBerry() // ягоду
  drawSnake() // змейку
}
requestAnimationFrame(gameLoop) // gameLoop будет выз. бесконечно

function drawSnake() {
  // изменение координат змейки согласно скорости
  snake.x += snake.dx
  snake.y += snake.dy

  collisionBorder()

  // добавить в начало массива объект с 'x' и 'y' координатами
  snake.tails.unshift({ x: snake.x, y: snake.y })

  // если кол-во дочерних элементов у змейки больше чем разрешено, то удалить последний элемент
  if (snake.tails.length > snake.maxTails) {
    snake.tails.pop()
  }

  // перебрать все дочерние элементы у змейки, и отрисовываю их, попутно проверяя на соприкосновение их друг с другом и с ягодой
  snake.tails.forEach(function (el, index) {
    if (index == 0) {
      context.fillStyle = '#00b7ff'
    } else {
      context.fillStyle = '#127aa3'
    }
    context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell)

    if (el.x === berry.x && el.y === berry.y) {
      snake.maxTails++
      incScore()
      randomPositionBerry()
    }

    for (let i = index + 1; i < snake.tails.length; i++) {
      if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
        refreshGame()
      }
    }
  })
}

function collisionBorder() {
  if (snake.x < 0) {
    snake.x = canvas.width - config.sizeCell
  } else if (snake.x >= canvas.width) {
    snake.x = 0
  }

  if (snake.y < 0) {
    snake.y = canvas.height - config.sizeCell;
  } else if (snake.y >= canvas.height) {
    snake.y = 0
  }
}
function refreshGame() {
  score = 0
  drawScore()

  snake.x = 160
  snake.y = 160
  snake.tails = []
  snake.maxTails = 3
  snake.dx = config.sizeCell
  snake.dy = 0

  randomPositionBerry()
}

function drawBerry() {
  context.beginPath()
  context.fillStyle = '#127aa3'
  context.arc(berry.x + config.sizeCell / 2, berry.y + config.sizeCell / 2, config.sizeBerry, 0, 2 * Math.PI);
  context.fill()
}

// рандомное позиционирование ягоды
function randomPositionBerry() {
  berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell
  berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell
}

// увеличивает значение очков на 1
function incScore() {
  score++
  drawScore()
}

// отображает это значение на странице
function drawScore() {
  scoreBlock.innerHTML = score;
}

// принимает диапазон чисел и возвращает рандомное значение в заданном диапазоне
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// добавить обработчик события и назначить управления клавишами
document.addEventListener('keydown', function (event) {
  if (event.code == 'KeyW') {
    snake.dy = -config.sizeCell
    snake.dx = 0
  } else if (event.code == 'KeyA') {
    snake.dx = -config.sizeCell
    snake.dy = 0
  } else if (event.code == 'KeyS') {
    snake.dy = config.sizeCell
    snake.dx = 0
  } else if (event.code == 'KeyD') {
    snake.dx = config.sizeCell
    snake.dy = 0
  }
})
