# Lógica

Começo declarando algumas variáveis que serão usadas ao longo do jogo, incluindo o painel de jogo, a pontuação atual, o recorde de pontuação, o status do jogo (se o jogo acabou ou não), as coordenadas da cobra, a velocidade da cobra, a posição da comida, um ID que será usado para atualizar a tela e as pontuações atuais e recordes.

```js
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
```

A função `change_food_position()` é definida para escolher uma nova posição aleatória para a comida sempre que a cobra a come.

```js
const change_food_position = () => {
  // 30 = tamanho do tabuleiro
  food.x = Math.floor(Math.random() * 30) + 1;
  food.y = Math.floor(Math.random() * 30) + 1;
};
```

A função `handle_game_over()` é definida para lidar com o fim do jogo, interrompendo o intervalo de atualização da tela, exibindo uma mensagem de alerta e recarregando a página quando o jogador perde.

```js
const handle_game_over = () => {
  clearInterval(set_interval_id);
  alert("Você perdeu! Pressione OK para recomeçar...");
  location.reload();
};
```

A função `change_direction(e)` é definida para lidar com a mudança de direção da cobra quando o jogador pressiona uma tecla de seta. A função verifica a tecla pressionada e altera a velocidade da cobra de acordo com a tecla pressionada.

```js
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
```

A função `init_game()` é definida para inicializar o jogo e atualizar a tela do jogo a cada intervalo de tempo. A função começa verificando se o jogo acabou, e se for o caso, a função `handle_game_over()` é chamada. Em seguida, a função cria o HTML para o jogo, incluindo a comida, a cobra e sua pontuação atual. Se a cobra comer a comida, a pontuação é atualizada e a comida é movida aleatóriamente.


