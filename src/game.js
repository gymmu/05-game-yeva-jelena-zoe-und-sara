import {GAME} from "./globals.js"

export default function gameLogic(player) {
  createHPBar(50, 20, get("player")[0])

  onUpdate(() => {
    if (player.dir != null) {
      player.move(player.dir.scale(player.speed))

      player.playAnimation()
    }
  })

  player.onCollide("heal", (heal) => {
    player.heal(5)
    heal.destroy()
  })

  player.onCollide("obstacle", (obstacle) => {
    player.hurt(10)
    if (obstacle.isConsumable === true) {
      obstacle.destroy()
    }
  })

  player.on("hurt", () => {
    const hp = get("interface-hp-current", {recursive: true})[0]
    hp.width = player.hp()
  })

  player.on("heal", () => {
    const hp = get("interface-hp-current", {recursive: true})[0]
    hp.width = player.hp()
        const oldSpeed = player.speed
    player.speed *= 1.2
    wait(2, () => {
            player.speed = oldSpeed
        })
  })

  player.on("death", () => {
    go("lose")
  })
}

function createHPBar(x, y) {

    const player = get("player")[0]
    if (player == null) return

    const HP_BAR_WIDTH = 100
    const HP_BAR_HEIGHT = 10

    const bar = add([
        pos(x, y),
        fixed(),
        z(10),
    ])

    bar.add([
        text("HP", {size: 20}),
        anchor("right")
    ])

    bar.add([    rect(HP_BAR_WIDTH, HP_BAR_HEIGHT),
        outline(4, GREEN.darken(100)),
        color(0, 0, 0),
        pos(20, 0),
        anchor("left"),
        "interface-hp-max",
    ])

    bar.add([
    rect(player.hp() / player.max_hp * HP_BAR_WIDTH, HP_BAR_HEIGHT),
    color(0, 255, 0),
        pos(20, 0),
        anchor("left"),
    "interface-hp-current",

    ])

}
