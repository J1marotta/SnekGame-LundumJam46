
let TILE_WIDTH  = settings.tileSize.width  || settings.tileSize[0];
let TILE_HEIGHT = settings.tileSize.height || settings.tileSize[1];

const MAP_LIMITS = {
  x: 160,
  y: 160,
}

const Lx = MAP_LIMITS.x * TILE_WIDTH
const Ly = MAP_LIMITS.y * TILE_HEIGHT

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
  flipH: false,
  image:  153,
};





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

const warnings = []
let timeLastbox = 0;

const createBox = (warnings) => {
  const tile = {
    x: getRandomIntInclusive(playArea.Xmin, playArea.Xmax, true),
    y: getRandomIntInclusive(playArea.Ymin, playArea.Ymax)
  }

  const warning = (Date.now() - timeLastbox) / 1000  >= 5 
  
  if (warning) { 
    warnings.push(tile)
    startDanger()
    timeLastbox = Date.now()
   }
  return warnings 

}



let dangers = []
let counter = 0
const startDanger = () => {
    counter ++ 

  if(counter > 2) {
    dangers.push(warnings.shift())
    counter = 0
  }

  return dangers
}


const background = getMap("map");
paper(7);
pen(0)

let score = 0;

exports.update = function () {  
  moveHero()
  cls();
  draw(background, 0, 8);
  print('SNEK', 8, 1)
  print(score, 140, 1)
  camera(0,0);
  sprite(hero.image, hero.x, hero.y, hero.flipH, );
  createBox(warnings)



  warnings.map( t =>  
      sprite(58, t.x, t.y)
  )
  
  
  dangers.map( t => 
    sprite(230, t.x, t.y)  
  )

  // checkContact(hero, dangers)
  


};
