import { TILESIZE } from "./globals.js"
import { k } from "./game.js"

export default function createPlayer() {
  const player = k.add([
    k.sprite("hero", { anim: "idleRight", animSpeed: 1 }),
    k.pos(0, 0),
    k.body(),
    k.area({}),
    k.health(50),
    k.stay(),
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

    if (this.dir === k.RIGHT) {
      this.play("runRight")
    } else if (this.dir === k.LEFT) {
      this.play("runLeft")
    } else if (this.dir === k.UP) {
      this.play("runUp")
    } else if (this.dir === k.DOWN) {
      this.play("runDown")
    }
  }

  player.setPosition = function (x, y) {
    this.pos.x = x * TILESIZE
    this.pos.y = y * TILESIZE
  }

  player.onUpdate(() => {
    k.camPos(player.pos)
  })

  return player
}

export function getPlayer() {
    return k.get("player")[0]
}
