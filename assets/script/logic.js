const play_board = document.querySelector(".play-board");
const score_element = document.querySelector(".score");
const high_score_element = document.querySelector(".high-score");

let game_over = false;
let snake_body = [];
let velocity = { x: 0, y: 0 };
let snake =    { x: 5, y: 10};
let food =     { x: 0, y: 0 };
let set_interval_id;
let score = 0;
let high_score = localStorage.getItem("high-score") || 0;


high_score_element.innerText = `Recorde: ${high_score}`;

const change_food_position = () => {
  // 30 = tamano tablueiro
  food.x = Math.floor(Math.random() * 30) + 1;
  food.y = Math.floor(Math.random() * 30) + 1;
};

const handle_game_over = () => {
  clearInterval(set_interval_id);
  alert("Você perdeu! Pressione OK para recomeçar...");
  location.reload();
};

const change_direction = (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (velocity.y !== 1) {
        velocity.x = 0;
        velocity.y = -1;
      }
      break;
    case "ArrowDown":
      if (velocity.y !== -1) {
        velocity.x = 0;
        velocity.y = 1;
      }
      break;
    case "ArrowLeft":
      if (velocity.x !== 1) {
        velocity.x = -1;
        velocity.y = 0;
      }
      break;
    case "ArrowRight":
      if (velocity.x !== -1) {
        velocity.x = 1;
        velocity.y = 0;
      }
      break;
  }
  init_game();
};

const init_game = () => {
  if (game_over) return handle_game_over();
  
  let html_markup = ` <div class="food" style="grid-area: ${food.y} / ${food.x} "></div>`;

  // Verificando se a cobra comeu a comida
  if (snake.x === food.x && snake.y === food.y) {
    change_food_position();
    snake_body.push([food.x, food.y]);
    score++;

    high_score = score >= high_score ? score : high_score;
    localStorage.setItem("high-score", high_score);
    score_element.innerText = `Pontos: ${score}`;
    high_score_element.innerText = `Recorde: ${high_score}`;
  }

  // Mudando para frente e os valores dos elementos no corpo da cobra um
  for (let i = snake_body.length - 1; i > 0; i--) {
    snake_body[i] = snake_body[i - 1];
  }

  //configurando o primeiro elemento do corpo da cobra para a posição atual da cobra
  snake_body[0] = [snake.x, snake.y];

  // Atualizando a posição da cabeça da cobra com base na velocidade atual
  snake.x += velocity.x;
  snake.y += velocity.y;

  //Ver. se passou do limite da tela
  if (snake.x <= 0 || snake.y > 30 || snake.y <= 0 || snake.y > 30) {
    game_over = true;
  }

  // criando corpo da cobra
  for (let i = 0; i < snake_body.length; i++) {
    html_markup += ` <div class="heade-snake" style="grid-area: ${snake_body[i][1]} / ${snake_body[i][0]} "></div>`;
    // Verificar colisão com o corpo
    if (
      i !== 0 &&
      snake_body[0][1] === snake_body[i][1] &&
      snake_body[0][0] === snake_body[i][0]
    ) {
      game_over = true;
    }
  }

  play_board.innerHTML = html_markup;
};

change_food_position();
set_interval_id = setInterval(init_game, 125); // Setando taxa de atualização do campo
document.addEventListener("keydown", change_direction);
