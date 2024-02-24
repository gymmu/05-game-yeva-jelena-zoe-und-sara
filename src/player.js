import { TILESIZE } from "./globals.js"

export default function createPlayer() {
  const player = add([
    sprite("hero", { anim: "idleRight", animSpeed: 1 }),
    pos(0, 0),
    body(),
    area({}),
    health(100),
    "player",
    {
      speed: TILESIZE * 5,
      dir: null,
      dead: false,
    },
  ])

  player.playAnimation = function () {
    const anim = this.curAnim()
    if (anim != null) return

    if (this.dir === RIGHT) {
      this.play("runRight")
    } else if (this.dir === LEFT) {
      this.play("runLeft")
    } else if (this.dir === UP) {
      this.play("runUp")
    } else if (this.dir === DOWN) {
      this.play("runDown")
    }
  }

  return player
}
