export default function gameLogic(player) {

    createHPBar(50, 20, player)

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
        const hp = get("interface-hp-current")[0]
        hp.width = player.hp()
    })

    player.on("heal", () => {
        const hp = get("interface-hp-current")[0]
        hp.width = player.hp()
        player.speed *= 1.2
    })

    player.on("death", () => {
        go("lose")
    })
}

function createHPBar(x, y, player) {
    add([
        text("HP", {size: 16, weight: "bold"}),
        pos(x, y),
        anchor("right"),
        fixed()
    ])

    add([
        pos(x + 10, y),
        anchor("left"),
        rect(player.hp(), 10),
        outline(4, GREEN.darken(100)),
        color(0, 0, 0),
        z(10),
        fixed(),
        "interface-hp-max"
    ])

    add([
        anchor("left"),
        pos(x + 10, y),
        rect(player.hp(), 10),
        color(0, 255, 0),
        z(11),
        fixed(),
        "interface-hp-current"
    ])

}
