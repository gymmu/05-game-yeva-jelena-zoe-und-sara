import { TILESIZE } from "./globals.js"

export default async function generateMap(mapfile, player) {
  const map = await fetch(mapfile)
  const mapContent = await map.text()
  const lines = mapContent.split("\n")
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const char = line[x]

      if (char === "p") {
        player.setPosition(x, y)
      } else if (char === "-") {
        add([
          rect(TILESIZE, TILESIZE),
          pos(x * TILESIZE, y * TILESIZE),
          color(0, 255, 0),
          body({ isStatic: true }),
          area(),
          "ground",
        ])
      } else if (char === "o") {
        add([
          rect(TILESIZE, TILESIZE),
          pos(x * TILESIZE, y * TILESIZE),
          color(0, 0, 255),
          body({ isStatic: true }),
          area(),
          "obstacle",
        ])
      }
    }
  }
}
