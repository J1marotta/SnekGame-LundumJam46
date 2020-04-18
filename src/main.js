
let TILE_WIDTH  = settings.tileSize.width  || settings.tileSize[0];
let TILE_HEIGHT = settings.tileSize.height || settings.tileSize[1];

const MAP_LIMITS = {
  x: 160,
  y: 160,
}

const Lx = MAP_LIMITS.x * TILE_WIDTH
const Ly = MAP_LIMITS.y * TILE_HEIGHT
const playArea = {
  min: 8,
  max: 144
}


const hero = {
  x: 0,
  y: 0,
  speed: 2,
  width: TILE_WIDTH,
  flipH: false,
  image:  Math.random() < 0.5 ? 153 : 154
};

const background = getMap("map");
paper(7);

 
const moveHero = () =>  {
  if (btn.right){
    hero.x += hero.speed;
    hero.flipH = false;
  }
    
  if (btn.left)  {
    hero.x -= hero.speed;
    hero.flipH = true;
  }

  if (btn.up)    hero.y -= hero.speed;
  if (btn.down)  hero.y += hero.speed;

  if(hero.x < playArea.min) hero.x = playArea.min;
  if(hero.x > playArea.max) hero.x = playArea.max;
  if(hero.y < playArea.min ) hero.y = playArea.min;
  if(hero.y > playArea.max) hero.y = playArea.max;
}




exports.update = function () {  
  moveHero()
  cls();
  draw(background, 0, 0);
  camera(0,0);
  sprite(Math.random() < 0.5 ? 153 : 154, hero.x, hero.y, hero.flipH, );
};
