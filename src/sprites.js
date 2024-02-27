import { TILESIZE as TS } from "./globals"
import { k } from "./game.js"

/*
 * Diese Funktion soll alle Spritesheets in das Spiel laden.
 *
 * Diese Funktion muss ganz am Anfang einmal ausgeführt werden, bevor dann
 * Spielobjekte mit diesen Sprites erstellt werden.
 *
 * Die Spritesheets könnten auch pro Level neu bzw. anders geladen werden,
 * damit können einfach andere Atmosphären im Spiel erzeugt werden.
 */
export default function loadSprites() {
  k.loadSpriteAtlas("sprites/char.png", {
    hero: {
      x: 0,
      y: 0,
      width: 3 * TS,
      height: 4 * TS,
      sliceX: 3,
      sliceY: 4,
      anims: {
        runDown: { from: 0, to: 2, loop: true },
        idleDown: 1,
        runLeft: { from: 3, to: 5, loop: true },
        idleLeft: 4,
        runRight: { from: 6, to: 8, loop: true },
        idleRight: 7,
        runUp: { from: 9, to: 11, loop: true },
        idleUp: 10,
      },
    },
  })

  k.loadSpriteAtlas("sprites/ground.png", {
    grass: { x: 0, y: 0, width: TS, height: TS },
    stone: { x: 1 * TS, y: 0, width: TS, height: TS },
    mushroom: { x: 2 * TS, y: 0 * TS, width: TS, height: TS },
    flower: { x: 3 * TS, y: 0 * TS, width: TS, height: TS },
    trunk: { x: 0 * TS, y: 1 * TS, width: TS, height: TS },
    tree: { x: 1 * TS, y: 1 * TS, width: TS, height: TS },
    cave: { x: 2 * TS, y: 1 * TS, width: TS, height: TS },
    wall: { x: 3 * TS, y: 1 * TS, width: TS, height: TS },
  })
}
