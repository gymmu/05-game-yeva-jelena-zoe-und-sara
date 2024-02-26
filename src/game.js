export default function gameLogic() {

  const player = get("player")[0]

  createHPBar()

  onUpdate(() => {
    if (player.dir != null) {
      player.move(player.dir.scale(player.speed))

      player.playAnimation()
    }
  })

  onCollide("heal", (heal) => {
    player.heal(5)
    heal.destroy()
  })

  player.onCollide("obstacle", (obstacle) => {
    player.hurt(10)
    if (obstacle.isConsumable === true) {
      obstacle.destroy()
    }
  })

  player.on("heal", () => {
    const oldSpeed = player.speed
    player.speed *= 2
    wait(1, () => {
      player.speed = oldSpeed
    })
  })

  player.on("death", () => {
    go("lose")
  })
}

function createHPBar() {
  const player = get("player")[0]
  if (player == null) return

    const x = 50
    const y = 20
  const HP_BAR_WIDTH = 100
  const HP_BAR_HEIGHT = 10

  const bar = add([pos(x, y), fixed(), z(10), "hp-bar"])

  bar.add([text("HP", { size: 20 }), anchor("right")])

  bar.add([
    rect(HP_BAR_WIDTH, HP_BAR_HEIGHT),
    outline(4, GREEN.darken(100)),
    color(0, 0, 0),
    anchor("left"),
        pos(10, 0)
  ])

  bar.add([
    rect((player.hp() / player.max_hp) * HP_BAR_WIDTH, HP_BAR_HEIGHT),
    color(0, 255, 0),
    anchor("left"),
        pos(10, 0),
    {
      update() {
        const player = get("player")[0]
        this.width = (player.hp() / player.max_hp) * HP_BAR_WIDTH
      },
    },
  ])
}
