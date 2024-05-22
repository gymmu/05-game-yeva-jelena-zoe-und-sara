import { k } from "./game.js"
import { TILESIZE } from "./globals.js"
import { getPlayer } from "./player.js"
import * as GameObjects from "./gameObjects.js"

/**
 *  Diese Funktion liest eine txt-Datei ein, und erstellt aufgrund der Struktur
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
      } else if (char === "F") {
        GameObjects.fireballJumpAndRun(x, y)
      } else if (char === "g") {
        GameObjects.goalJumpAndRun(x, y)
      }
    }
  }
}

/**
 * Liest das gewünschte Level ein, und erstellt die entsprechende Karte.
 *
 * Siehe bei der Funktion generateMapJumpAndRun für mehr Dokumentation.
 */
export async function generateMapRPG(mapfile) {
  const map = await fetch(mapfile)
  const mapContent = await map.text()
  const lines = mapContent.split("\n")
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]
    for (let x = 0; x < line.length; x++) {
      const char = line[x]

      // Das wird bei jeder Kachel hinzugefügt, damit alles einen Hintergrund
      // hat.
      GameObjects.backgroundRPG(x, y)

      if (char === "p") {
        const player = getPlayer()
        player.pos = k.vec2(x, y).scale(TILESIZE)
      } else if (char === "s") {
        GameObjects.stoneRPG(x, y)
      } else if (char === "w") {
        GameObjects.wallRPG(x, y)
      } else if (char === "c") {
        GameObjects.caveRPG(x, y)
      } else if (char === "T") {
        GameObjects.trunkRPG(x, y)
      } else if (char === "t") {
        GameObjects.treeRPG(x, y)
      } else if (char === "f") {
        GameObjects.flowerRPG(x, y)
      } else if (char === "m") {
        GameObjects.mushroomRPG(x, y)
      }
    }
  }
}
