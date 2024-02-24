export default function loadKeyboard(player) {
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
