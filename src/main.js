
let TILE_WIDTH  = settings.tileSize.width  || settings.tileSize[0];
let TILE_HEIGHT = settings.tileSize.height || settings.tileSize[1];

const MAP_LIMITS = {
  x: 160,
  y: 160,
}

const hero = {
  x: 0,
  y: 0,
  flipH: false,
  width: TILE_WIDTH,
};

const background = getMap("map");
paper(7);



// // const move = (hero, btn, Lx, Ly ) => {
//   if (btn.right && hero.x < Lx ) hero.x += 1;
//   if (btn.left && hero.x > 0 ) hero.x -= 1;
//   if (btn.up && hero.y < Ly)    hero.y -= 1;
//   if (btn.down && hero.y > 0)  hero.y += 1;

// // }

const Lx = MAP_LIMITS.x * TILE_WIDTH
const Ly = MAP_LIMITS.y * TILE_HEIGHT

exports.update = function () {  
  
  if (btn.right) hero.x += 1;
  if (btn.left)  hero.x -= 1;
  if (btn.up)    hero.y -= 1;
  if (btn.down)  hero.y += 1;

  cls();
  draw(background, 0, 0);
  camera(0,0);
  sprite(153, hero.x, hero.y, hero.x < 0, );
};
