
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
  speed: 1,
  width: TILE_WIDTH,
  flipH: false,
  image:  153,

};

const background = getMap("map");
paper(7);

const updateHeroFrames = () => Math.random() > 0.5 ? 153 : 154
 
const moveHero = () => {
  if (btn.right){
    hero.x += hero.speed;
    hero.flipH = false;
    hero.image = updateHeroFrames()
  }
    
  if (btn.left)  {
    hero.x -= hero.speed;
    hero.flipH = true;
    hero.image = updateHeroFrames()  
  }

  if (btn.up)  {  
    hero.y -= hero.speed; 
    hero.image = updateHeroFrames()
  }

  if (btn.down){ 
    hero.y += hero.speed;
    hero.image = updateHeroFrames()
  }

  if(hero.x < playArea.Xmin) hero.x = playArea.Xmin;
  if(hero.x > playArea.Xmax) hero.x = playArea.Xmax;
  if(hero.y < playArea.Ymin ) hero.y = playArea.Ymin;
  if(hero.y > playArea.Ymax) hero.y = playArea.Ymax;
}



exports.update = function () {  
  moveHero()
  cls();
  draw(background, 0, 8);
  camera(0,0);
  sprite(hero.image, hero.x, hero.y, hero.flipH, );
};
