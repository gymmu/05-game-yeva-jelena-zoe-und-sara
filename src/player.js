import { TILESIZE } from "./globals.js"

export default function createPlayer() {
  const player = add([
    sprite("hero", { anim: "idleRight", animSpeed: 1 }),
    pos(0, 0),
    body(),
    area({}),
    health(50),
    stay(),
    "player",
    {
      speed: TILESIZE * 5,
      dir: null,
      dead: false,
      max_hp: 100,
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

  player.setPosition = function (x, y) {
    this.pos.x = x * TILESIZE
    this.pos.y = y * TILESIZE
  }

  player.onUpdate(() => {
    camPos(player.pos)
  })

  return player
}
