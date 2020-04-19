
let TILE_WIDTH  = settings.tileSize.width  || settings.tileSize[0];
let TILE_HEIGHT = settings.tileSize.height || settings.tileSize[1];

const playArea = {
  Xmin: 8,
  Ymin: 16,
  Xmax: 144,
  Ymax: 152,
}

const hero = {
  x: 0,
  y: 0,
  speed: 2,
  width: TILE_WIDTH,
  height: TILE_HEIGHT,
  flipH: false,
  image:  153,
};

// GLOBALS
let warnings = []
const background = getMap("map");
let timeLastbox = 0;
let dangers = []
let counter = 0
let dead = false;
let score = 0;


paper(7);
pen(0)



const updateHeroFrames = () => {   
  let i = Math.floor(Math.random() * (8 - 1)) + 1

  const frames = {
    1: 119,
    2: 120,
    3: 121,
    4: 122,
    5: 153,
    6: 154,
    7: 155,
    8: 156,
  }
  let frame = frames[i]
  return frame  
}
 

const moveHero = () => {
  if (btn.right){
    hero.x += hero.speed;
    hero.flipH = false;
    hero.image = updateHeroFrames()
    score++
  }
    
  if (btn.left)  {
    hero.x -= hero.speed;
    hero.flipH = true;
    hero.image = updateHeroFrames()  
    score++
  }

  if (btn.up)  {  
    hero.y -= hero.speed; 
    hero.image = updateHeroFrames()
    score++
  }

  if (btn.down){ 
    hero.y += hero.speed;
    hero.image = updateHeroFrames()
    score++ 
  }

  if (hero.x < playArea.Xmin) hero.x = playArea.Xmin;
  if (hero.x > playArea.Xmax) hero.x = playArea.Xmax;
  if (hero.y < playArea.Ymin ) hero.y = playArea.Ymin;
  if (hero.y > playArea.Ymax) hero.y = playArea.Ymax;
}


function getRandomIntInclusive(min, max, x) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let buffer = x ? 8 : 16

    let num = Math.floor(Math.random() * (max - min +  buffer) + min) 
     if(x && num < playArea.Xmin) num = playArea.Xmin
     if(x && num > playArea.Xmax) num = playArea.Xmax
     if(num < playArea.Ymin) num = playArea.Ymin
     if(num > playArea.Ymax) num = playArea.Ymax

    return num
}


const startDanger = () => {
  counter ++ 
  if(counter > 2) {
    dangers.push(warnings.shift())
    counter = 0
  }
  return dangers
}


const createBox = (warnings) => {
  const tile = {
    x: getRandomIntInclusive(playArea.Xmin, playArea.Xmax, true),
    y: getRandomIntInclusive(playArea.Ymin, playArea.Ymax),
    width: TILE_WIDTH,
    height: TILE_HEIGHT
  }

  const warning = (Date.now() - timeLastbox) / 1000  >= 5 
  
  if (warning) { 
    warnings.push(tile)
    startDanger()
    timeLastbox = Date.now()
   }

  return warnings 
}


// use radius of characters and check if distance between the two middles is greater than the radius of them 
const checkContact = (hero, dangers)  => {
  // center of hero
  let x1 = hero.x + hero.width / 2
  let y1 = hero.y + hero.height / 2

  dangers.map( other => {
    // center of the danger
      let x2 = other.x + other.width / 2
      let y2 = other.y + other.height / 2

      // distance between the two 
      let d = Math.sqrt( (x2 - x1) ** 2 + (y2 - y1) ** 2)

      // distance less than raidus of both they are intersecting
      if (d < hero.width /2 + other.width /2 && !dead){
         dead = true
      }
  })
}


function resetGame () {
  score = 0
  dead = false,
  dangers = []
  warnings = []
  counter = 0
  timeLastbox = 0;
}

exports.update = function () {
  if(!dead) { 
    moveHero();
    cls();
    draw(background, 0, 8);
    print('SNEK', 8, 1)
    print(score, 140, 1)
    camera(0,0);
    
    createBox(warnings)

    warnings.map( t =>  
        sprite(58, t.x, t.y)
    )
      
    dangers.map( t => 
      sprite(230, t.x, t.y)  
    )
    
    sprite(hero.image, hero.x, hero.y, hero.flipH );
    checkContact(hero, dangers)
  } else {
      print('Ded', 80, 80)
      print(`push 'a' to reset`, 60, 100)
      if(btn.a){
        resetGame()
    }
  }
  print('Avoid the skulls, move to score', 20, 170)

};
