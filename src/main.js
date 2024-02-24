import kaboom from "kaboom"

import loadSprites from "./sprites.js"
import {loadKeyboardJumpAndRun, loadKeyboardRPG} from "./keyboard.js"
import createPlayer from "./player.js"
import addGeneralGameLogic from "./game.js"
import {generateMapJumpAndRun, generateMapRPG} from "./map.js"

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

scene("finish", () => {
  add([
    text("Ziel erreicht", { size: 32, font: "sinko" }),
    pos(width() / 2, height() / 2),
    anchor("center"),
  ])

  onKeyPress("space", () => {
    go("intro")
  })
})

scene("lose", () => {
  add([
    text("Game over", { size: 32, font: "sinko" }),
    pos(width() / 2, height() / 2),
    anchor("bottom"),
  ])

  add([
    text("Drücke SPACE um das Spiel neu zu starten", { size: 22, font: "sinko" }),
    pos(width() / 2, height() / 2 + 20),
    anchor("top"),
  ])

  onKeyPress("space", () => {
    go("level-01")
  })

})

scene("level-01", async () => {
  setGravity(1200)
  const player = createPlayer()
  loadKeyboardJumpAndRun(player)

  await generateMapJumpAndRun("maps/level-01.txt", player)

  addGeneralGameLogic(player)

  player.onCollide("goal", () => {
    go("level-02")
  })

})

scene("level-02", async () => {
  setGravity(0)
  const player = createPlayer()
  loadKeyboardRPG(player)

  await generateMapRPG("maps/level-02.txt", player)

  addGeneralGameLogic(player)

  player.onCollide("cave", () => {
        if (player.hasFlower === true) {

    go("finish")
        }
  })

  player.onCollide("flower", (flower) => {
    flower.destroy()
    player.hasFlower = true
  })
})

go("intro")
