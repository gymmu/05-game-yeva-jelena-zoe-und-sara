import kaboom from "kaboom"

import loadSprites from "./sprites.js"
import loadKeyboard from "./keyboard.js"
import createPlayer from "./player.js"
import addGeneralGameLogic from "./game.js"
import generateMap from "./map.js"

import { TILESIZE } from "./globals.js"

kaboom({
  background: [0, 0, 0],
  debug: true,
  height: TILESIZE * 16,
  width: TILESIZE * 30,
  canvas: document.getElementById("game-canvas"),
})

loadSprites()

scene("intro", () => {
  add([
    text("Press SPACE to start", { size: 32, font: "sinko" }),
    pos(width() / 2, height() / 2),
    anchor("center"),
  ])

  onKeyPress("space", () => {
    go("level-01")
  })
})

scene("level-01", async () => {
  setGravity(1200)
  const player = createPlayer()
  loadKeyboard(player)

  await generateMap("maps/level-01.txt", player)

  addGeneralGameLogic(player)
})

go("intro")
