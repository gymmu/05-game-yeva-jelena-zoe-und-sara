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

k.loadSpriteAtlas("sprites/mushroom-char.png", {
  mushroomhero: {
    // Alles war hier kommt, gehört zum Sprite `hero`
    x: 0, // x-Koordinate des Pixels wo das Sprite beginnt.
    y: 0, // y-Koordinate des Pixels wo das Sprite beginnt.
    width: 2 * TILESIZE, // Die Breite des Sprites in Pixeln. Hier sind jeweils 3 Animationen nebeneinander, deshalb 3 * TILESIZE
    height: 2 * TILESIZE, // Die Höhe des Sprites in Pixeln. Hier sind die 4 Laufrichtungen untereinander, deshalb 4 * TILESIZE
    sliceX: 2, // In der x-Richtung sind es 3 Kacheln, so wird es gleichmässig aufgeteilt.
    sliceY: 2, // In der y-Richtung sind es 4 Kacheln, so wird es gleichmässig aufgeteilt.
    anims: {
      // Hier werden die verschiedenen Animationen definiert.

      down: 0, // Ist es nur eine Kachel, kann diese direkt angegeben werden.
      left: 2,
      right: 3,
      up: 1,
    },
  },
})

const player = k.add([
  k.sprite("mushroomhero", { anim: "down" }),
  k.pos(0, 0),
  k.body(),
  k.area(),
])

k.onKeyPress("space", () => {
  player.play("right")
  setInterval(() => {
    player.move(k.RIGHT.scale(100))
  }, 1000 / 60)
})

player.onUpdate(() => {
  if (player.pos.x > k.width() - TILESIZE) {
    player.pos.x = 0
  }
})
