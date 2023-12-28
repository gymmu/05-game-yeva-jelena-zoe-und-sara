import kaboom from "kaboom"

kaboom({
  background: [0, 0, 0],
  debug: true,
  fullscreen: true,
})

setGravity(1200)

const player = add([
  rect(100, 100),
  pos(100, 100),
  color(255, 0, 0),
  body(),
  area(),
  health(100),
  "player",
  {
    speed: 200,
    dir: RIGHT,
    dead: false,
  },
])

// ground
add([
  rect(width(), 20),
  pos(0, height() - 20),
  color(0, 255, 0),
  body({ isStatic: true }),
  area(),
  "ground",
])

// obstacles
add([
  rect(20, 20),
  pos(width() - 40, height() - 40),
  color(0, 0, 255),
  area(),
  body({ isStatic: true }),
  "obstacle",
])

onUpdate(() => {
  if (player.dead) {
    console.log("player dead")
  }
  player.move(player.dir.scale(player.speed))
})

player.onCollide("obstacle", () => {
  player.hurt(10)
  console.log("player hit obstacle")
  console.log(player.health)
})

player.on("hurt", () => {
  console.log("player hurt")
})
