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

  player.setPosition = function (x, y) {
    this.pos.x = x * TILESIZE
    this.pos.y = y * TILESIZE
  }

  player.onUpdate(() => {
    k.camPos(player.pos)
  })
}

export function getPlayer() {
  return k.get("player")[0]
}
