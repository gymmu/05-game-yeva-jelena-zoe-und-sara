import { k } from "./game.js"
import {getPlayer} from "./player.js"

export function loadKeyboardJumpAndRun() {
  const player = getPlayer()
  k.onKeyPress("left", () => {
    player.dir = k.LEFT
    player.play("runLeft")
  })
  k.onKeyRelease("left", () => {
    player.dir = null
    player.play("idleLeft")
  })

  k.onKeyPress("right", () => {
    player.dir = k.RIGHT
    player.play("runRight")
  })
  k.onKeyRelease("right", () => {
    player.dir = null
    player.play("idleRight")
  })

  k.onKeyPress("space", () => {
    player.jump()
  })
}

export function loadKeyboardRPG() {
  const player = getPlayer()
  k.onKeyPress("left", () => {
    player.dir = k.LEFT
    player.play("runLeft")
  })
  k.onKeyRelease("left", () => {
    player.dir = null
    player.play("idleLeft")
  })

  k.onKeyPress("right", () => {
    player.dir = k.RIGHT
    player.play("runRight")
  })
  k.onKeyRelease("right", () => {
    player.dir = null
    player.play("idleRight")
  })

  k.onKeyPress("up", () => {
    player.dir = k.UP
    player.play("runUp")
  })
  k.onKeyRelease("up", () => {
    player.dir = null
    player.play("idleUp")
  })

  k.onKeyPress("down", () => {
    player.dir = k.DOWN
    player.play("runDown")
  })
  k.onKeyRelease("down", () => {
    player.dir = null
    player.play("idleDown")
  })
}
