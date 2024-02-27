import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"

export async function generateMapJumpAndRun(mapfile) {
  const player = getPlayer()
  const map = await fetch(mapfile)
  const mapContent = await map.text()
  const lines = mapContent.split("\n")
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const char = line[x]

      if (char === "p") {
        player.pos = k.vec2(x, y).scale(TILESIZE)
      } else if (char === "-") {
        k.add([
          k.sprite("wall"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
          "ground",
        ])
      } else if (char === "o") {
        k.add([
          k.sprite("mushroom"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
          "obstacle",
          {
            isConsumable: true,
          },
        ])
      } else if (char === "f") {
        k.add([
          k.sprite("flower"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
          "heal",
          {
            isConsumable: true,
          },
        ])
      } else if (char === "g") {
        k.add([
          k.sprite("cave"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
          "goal",
        ])
      }
    }
  }
}

export async function generateMapRPG(mapfile) {
  const player = getPlayer()
  const map = await fetch(mapfile)
  const mapContent = await map.text()
  const lines = mapContent.split("\n")
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const char = line[x]
      k.add([k.sprite("grass"), k.pos(x * TILESIZE, y * TILESIZE), k.z(-10)])

      if (char === "p") {
        player.pos = k.vec2(x, y).scale(TILESIZE)
      } else if (char === "s") {
        k.add([
          k.sprite("stone"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
        ])
      } else if (char === "w") {
        k.add([
          k.sprite("wall"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
        ])
      } else if (char === "c") {
        k.add([
          k.sprite("cave"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
          "cave",
        ])
      } else if (char === "T") {
        k.add([
          k.sprite("trunk"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
        ])
      } else if (char === "t") {
        k.add([
          k.sprite("tree"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.body({ isStatic: true }),
          k.area(),
        ])
      } else if (char === "f") {
        k.add([
          k.sprite("flower"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.area(),
          "flower",
          "heal",
          {
            isConsumable: true,
          },
        ])
      } else if (char === "m") {
        k.add([
          k.sprite("mushroom"),
          k.pos(x * TILESIZE, y * TILESIZE),
          k.area(),
          "obstacle",
          {
            isConsumable: true,
          },
        ])
      }
    }
  }
}
