export function loadKeyboardJumpAndRun(player) {
  onKeyPress("left", () => {
    player.dir = LEFT
    player.play("runLeft")
  })
  onKeyRelease("left", () => {
    player.dir = null
    player.play("idleLeft")
  })

  onKeyPress("right", () => {
    player.dir = RIGHT
    player.play("runRight")
  })
  onKeyRelease("right", () => {
    player.dir = null
    player.play("idleRight")
  })

  onKeyPress("space", () => {
    player.jump()
  })
}

export function loadKeyboardRPG(player) {
  onKeyPress("left", () => {
    player.dir = LEFT
    player.play("runLeft")
  })
  onKeyRelease("left", () => {
    player.dir = null
    player.play("idleLeft")
  })

  onKeyPress("right", () => {
    player.dir = RIGHT
    player.play("runRight")
  })
  onKeyRelease("right", () => {
    player.dir = null
    player.play("idleRight")
  })

  onKeyPress("up", () => {
    player.dir = UP
    player.play("runUp")
  })
  onKeyRelease("up", () => {
    player.dir = null
    player.play("idleUp")
  })

  onKeyPress("down", () => {
    player.dir = DOWN
    player.play("runDown")
  })
  onKeyRelease("down", () => {
    player.dir = null
    player.play("idleDown")
  })
}
