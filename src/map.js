import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import * as GameObjects from "./gameObjects.js"
/* Diese Funktion liest eine txt-Datei ein, und erstellt aufgrund der Struktur
 * eine Karte für das Spiel. Jedes Zeichen in der txt-Datei entspricht einer
 * Kachel im Spiel, wenn in der txt-Datei kein Buchstabe ist, dann wird die
 * Stelle einfach frei gelassen.
 *
 * Die verschiedenen Buchstaben entsprechen der Art der Kachel die erzeugt
 * werden soll. Wie die folgenden Beispiele.
 *  - p: Player
 *  - o: Hindernis
 *  - f: Blume
 */
export async function generateMapJumpAndRun(mapfile) {
  // Lädt die txt-Datei die gefragt wurde, für das entsprechende Level.
  const map = await fetch(mapfile)

  // Liest den Textinhalt der txt-Datei ein.
  const mapContent = await map.text()

  // Spaltet den Text in die einzelnen Zeilen. Die Zeilennummer entspricht dann
  // gleich der y-Koordinate in der Spielkarte
  const lines = mapContent.split("\n")

  // Geht über jede einzelne Zeile drüber. Die Zeilennummer entspricht der
  // y-Koordinate auf der Spielkarte
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    // Geht alle Zeichen in einer Zeile durch. Die Stelle des Zeichens
    // entspricht dann der x-Koordinate im Spiel.
    for (let x = 0; x < line.length; x++) {
      const char = line[x]

      // Wenn wir ein 'p' lesen, dann möchten wir an der Stelle den Spieler
      // platzieren.
      if (char === "p") {
        const player = getPlayer()
        player.pos = k.vec2(x, y).scale(TILESIZE)
      } else if (char === "-") {
        GameObjects.wallJumpAndRun(x, y)
      } else if (char === "o") {
        GameObjects.mushroomJumpAndRun(x, y)
      } else if (char === "f") {
        GameObjects.flowerJumpAndRun(x, y)
      } else if (char === "g") {
        GameObjects.goalJumpAndRun(x, y)
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
