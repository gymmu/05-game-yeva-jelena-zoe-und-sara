import kaboom from "kaboom"

kaboom({
  background: [0, 0, 0],
  debug: true,
  fullscreen: true,
})

loadSprite("hero", "sprites/char.png", {
        sliceX: 3,
        sliceY: 4,
        anims: {
            runDown: { from: 0, to: 2 },
            idleDown: 1,
            runLeft: { from: 3, to: 5},
            idleLeft: 4,
            runRight: { from: 6, to: 8},
            idleRight: 7,
            runUp: { from: 9, to: 11},
            idleUp: 10,
        },
    },
)


setGravity(1200)

const player = add([
  sprite("hero", { animSpeed: 0.1 }),
  pos(100, 100),
  // color(255, 0, 0),
  body(),
  area(),
  health(100),
  "player",
  {
    speed: 20,
    dir: RIGHT,
    dead: false,
  },
  anchor("center"),
    scale(2),
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

player.play("runRight")
