import kaboom from "kaboom"
import { TILESIZE } from "./globals.js"

const k = kaboom({
  font: "sinko",
  background: [0, 0, 0],
  debug: true,
  height: TILESIZE * 1,
  width: TILESIZE * 30,
  canvas: document.getElementById("minigame"),
})

k.loadSpriteAtlas("sprites/char.png", {
  hero: {
    // Alles war hier kommt, gehört zum Sprite `hero`
    x: 0, // x-Koordinate des Pixels wo das Sprite beginnt.
    y: 0, // y-Koordinate des Pixels wo das Sprite beginnt.
    width: 3 * TILESIZE, // Die Breite des Sprites in Pixeln. Hier sind jeweils 3 Animationen nebeneinander, deshalb 3 * TILESIZE
    height: 4 * TILESIZE, // Die Höhe des Sprites in Pixeln. Hier sind die 4 Laufrichtungen untereinander, deshalb 4 * TILESIZE
    sliceX: 3, // In der x-Richtung sind es 3 Kacheln, so wird es gleichmässig aufgeteilt.
    sliceY: 4, // In der y-Richtung sind es 4 Kacheln, so wird es gleichmässig aufgeteilt.
    anims: {
      // Hier werden die verschiedenen Animationen definiert.
      runDown: { from: 0, to: 2, loop: true }, // Die Animation nach unten rennen, besteht aus den ersten 3 Kacheln. Die Animation soll sich wiederholen wenn sie durchlaufen ist.
      idleDown: 1, // Ist es nur eine Kachel, kann diese direkt angegeben werden.
      runLeft: { from: 3, to: 5, loop: true, speed: 10 }, // Die Geschwindigkeit der Animation kann auch verändert werden.
      idleLeft: 4,
      runRight: { from: 6, to: 8, loop: true },
      idleRight: 7,
      runUp: { from: 9, to: 11, loop: true, speed: 5 },
      idleUp: 10,
    },
  },
})

const player = k.add([
  k.sprite("hero", { anim: "idleRight" }),
  k.pos(0, 0),
  k.body(),
  k.area(),
])

k.onKeyPress("space", () => {
  player.play("runRight")
  setInterval(() => {
    player.move(k.RIGHT.scale(100))
  }, 1000 / 60)
})
