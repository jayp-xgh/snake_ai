const play_board = document.querySelector(".play-board");

let food = { x: 0, y: 0};
let velocity = { x: null, y: null };
let snake =  { x: 5, y: 10 };
let snake_body = [];
const change_food_position = () => {
  // Gerando valores de 0 - 30 para geral comida
  food.x = Math.floor(Math.random() * 30) + 1;
  food.y = Math.floor(Math.random() * 30) + 1;
};

const change_direction = (e) => {
  console.log(e);
  // Mudando a velocidade com base na tecla pressionada
  switch (e.key) {
    case "ArrowUp":
      velocity.x = 0;
      velocity.y = -1;
      break;
    case "ArrowDown":
      velocity.x =  0;
      velocity.y =  1;
      break;
    case "ArrowLeft":
      velocity.x = -1;
      velocity.y = 0;
      break;
    case "ArrowRight":
      velocity.x = 1;
      velocity.y = 0;
      break;
    default:
      break;
  }
  init_game();
};

const init_game = () => {
  let html_markup = ` <div class="food" style="grid-area: ${food.y} / ${food.x} "></div>`;
  
  // Verificando se a cobra comeu a comida
  if(snake.x === food.x && snake.y === food.y){
    change_food_position();
    snake_body.push([food.x, food.y]);
  }
  
  // Atualizando a posição da cabeça da cobra com base na velocidade atual
  snake.x += velocity.x;
  snake.y += velocity.y;

  html_markup += ` <div class="heade-snake" style="grid-area: ${snake.y} / ${snake.x} "></div>`;
  play_board.innerHTML = html_markup;
};

change_food_position();
setInterval(init_game, 125); // Setando taxa de atualização do campo
document.addEventListener("keydown", change_direction);
