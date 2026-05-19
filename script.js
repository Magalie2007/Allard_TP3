
let fuseeImage;
let blocImage;
let etoileImage;
let backgroundImage;

// background
let backgroundY = 0;

// les timers
let timerBloc = 0;
let timerEtoile = 0;

// état du jeu
let etatJeu = "menu";

// joueur
let fusee = {

  x: 150,
  y: 400,

  largeur: 80,
  hauteur: 120,

  vitesse: 7,
};

// les tableaux
let blocs = [];
let etoiles = [];

// le jeu
let score = 0;

// le record score
let meilleurScore = 0;

let vitesseJeu = 6;

// la fonction preload
function preload() {

  fuseeImage =
    loadImage("Images/fusee.png");

  etoileImage =
    loadImage("Images/etoile.png");

  blocImage =
    loadImage("Images/bloc.png");

  backgroundImage =
    loadImage("Images/backgroundjeu.png");
}

// fonction setup
function setup() {

  createCanvas(800, 600);
}

// la fonction draw
function draw() {

  background(0);

  // le menu pour commencer à jouer
  if (etatJeu === "menu") {

    afficherMenu();

    return;
  }

  // le game over
  if (etatJeu === "gameover") {

    afficherGameOver();

    return;
  }

  //le background
  backgroundY += 2;

  image(
    backgroundImage,
    0,
    backgroundY,
    width,
    height
  );

  image(
    backgroundImage,
    0,
    backgroundY - height,
    width,
    height
  );

  // le reset de background
  if (backgroundY >= height) {

    backgroundY = 0;
  }

  // les timers
  timerBloc++;

  timerEtoile++;

  // le score du joueur
  score++;

  // les controles
  controlesFusee();

  // l'apparition des objets
  genererBlocs();

  genererEtoiles();

  // l'affichage
  afficherFusee();

  gererBlocs();

  gererEtoiles();

  afficherBoutonBoost();

  afficherScore();
}

// fonction du menu
function afficherMenu() {

  image(
    backgroundImage,
    0,
    0,
    width,
    height
  );

  //le bouton jouer
  fill(180, 80, 255);

  rect(
    width / 2 - 150,
    300,
    300,
    100,
    20
  );

  fill(255);

  textAlign(CENTER);

  textSize(40);

  text(
    "JOUER",
    width / 2,
    365
  );
}

// les controles
function controlesFusee() {

  // vers gauche
  if (keyIsDown(LEFT_ARROW)) {

    fusee.x -= fusee.vitesse;
  }

  // vers droite
  if (keyIsDown(RIGHT_ARROW)) {

    fusee.x += fusee.vitesse;
  }

  // les limites pour pas que la fusée sorte de l'écran
  fusee.x = constrain(
    fusee.x,
    0,
    width - fusee.largeur
  );
}

// la fusée
function afficherFusee() {

  image(

    fuseeImage,

    fusee.x,
    fusee.y,

    fusee.largeur,
    fusee.hauteur
  );
}

// faire apparaitre les blocs
function genererBlocs() {

  if (timerBloc > 140) {

    let bloc = {

      x: random(
        0,
        width - 170
      ),

      y: -200,

      largeur: 170,

      hauteur: 60,
    };

    blocs.push(bloc);

    timerBloc = 0;
  }
}

// pour gérer les blocs
function gererBlocs() {

  for (

    let i = blocs.length - 1;

    i >= 0;

    i--

  ) {

    let bloc = blocs[i];

    // pour que ça descende
    bloc.y += vitesseJeu;

    // image des blocs
    image(

      blocImage,

      bloc.x,
      bloc.y,

      bloc.largeur,
      bloc.hauteur
    );

    // collision
    let collision =

      fusee.x + 20 <
      bloc.x + bloc.largeur - 20 &&

      fusee.x + fusee.largeur - 20 >
      bloc.x + 20 &&

      fusee.y + 20 <
      bloc.y + bloc.hauteur - 20 &&

      fusee.y + fusee.hauteur - 20 >
      bloc.y + 20;

    if (collision) {

      // le record
      if (score > meilleurScore) {

        meilleurScore = score;
      }

      etatJeu = "gameover";
    }

    // le replace
    if (bloc.y > height + 200) {

      bloc.y = -200;

      bloc.x = random(
        0,
        width - 170
      );
    }
  }
}

// pour apparaitre des étoiles
function genererEtoiles() {

  if (timerEtoile > 120) {

    let etoile = {

      x: random(
        0,
        width - 60
      ),

      y: -100,

      taille: 60,
    };

    etoiles.push(etoile);

    timerEtoile = 0;
  }
}

// gérer les étoiles
function gererEtoiles() {

  for (

    let i = etoiles.length - 1;

    i >= 0;

    i--

  ) {

    let etoile = etoiles[i];

    // pour que ça descende
    etoile.y += vitesseJeu;

    // image étoile
    image(

      etoileImage,

      etoile.x,
      etoile.y,

      etoile.taille,
      etoile.taille
    );

    // pour la distance
    let distance = dist(

      fusee.x +
      fusee.largeur / 2,

      fusee.y +
      fusee.hauteur / 2,

      etoile.x +
      etoile.taille / 2,

      etoile.y +
      etoile.taille / 2
    );

    // collision
    if (distance < 60) {

      score += 10;

      etoile.y = -100;

      etoile.x = random(
        0,
        width - 60
      );
    }

    // le replace
    if (etoile.y > height + 100) {

      etoile.y = -100;

      etoile.x = random(
        0,
        width - 60
      );
    }
  }
}

// le bouton boost 
function afficherBoutonBoost() {

  fill(180, 80, 255);

  rect(
    width - 170,
    20,
    150,
    60,
    20
  );

  fill(255);

  textAlign(CENTER);

  textSize(25);

  text(
    "BOOST",
    width - 95,
    58
  );
}

//le score
function afficherScore() {

  fill(255);

  textSize(35);

  textAlign(LEFT);

  text(

    "Record : " + meilleurScore,

    20,
    height - 60
  );

  text(

    "Score : " + score,

    20,
    height - 20
  );
}

// le game over 
function afficherGameOver() {

  fill(255);

  textAlign(CENTER);

  textSize(80);

  text(

    "GAME OVER",

    width / 2,
    height / 2
  );

  textSize(40);

  text(

    "Score : " + score,

    width / 2,
    height / 2 + 80
  );

  //le bouton de retour
  fill(180, 80, 255);

  rect(
    width / 2 - 150,
    height / 2 + 140,
    300,
    100,
    20
  );

  fill(255);

  textSize(35);

  text(
    "RETOUR",
    width / 2,
    height / 2 + 205
  );
}

// le clic de la souris pour le boost
function mousePressed() {

  // le boost
  if (etatJeu === "jeu") {

    if (

      mouseX > width - 170 &&
      mouseX < width - 20 &&

      mouseY > 20 &&
      mouseY < 80

    ) {

      fusee.vitesse += 2;
    }
  }

  // le menu
  if (etatJeu === "menu") {

    if (

      mouseX > width / 2 - 150 &&
      mouseX < width / 2 + 150 &&

      mouseY > 300 &&
      mouseY < 400

    ) {

      etatJeu = "jeu";
    }
  }

  // game over
  if (etatJeu === "gameover") {

    if (

      mouseX > width / 2 - 150 &&
      mouseX < width / 2 + 150 &&

      mouseY > height / 2 + 140 &&
      mouseY < height / 2 + 240

    ) {

      // le reset de la partie
      score = 0;

      blocs = [];

      etoiles = [];

      fusee.x = 150;

      fusee.vitesse = 7;

      etatJeu = "menu";

    }

  }
}