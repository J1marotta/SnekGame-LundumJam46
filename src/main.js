var character = {
  x: 60,
  y: 60
};

var background = getMap("map");
paper(7);



exports.update = function () {
  console.log(JSON.stringify(btn))
  if (btn.right) character.x += 1;
  if (btn.left)  character.x -= 1;
  if (btn.up)    character.y -= 1;
  if (btn.down)  character.y += 1;

  cls();
  draw(background, 0, 0);
  camera(character.x , character.y)
  sprite(153, character.x + 50, character.y + 50);
};