export default function gameLogic(player) {
    onUpdate(() => {
        if (player.dead) {
            console.log("player dead")
        }

        if (player.dir != null) {
            player.move(player.dir.scale(player.speed))

            player.playAnimation()
        }
    })

    player.onCollide("obstacle", () => {
        player.hurt(10)
        console.log("player hit obstacle")
        console.log(player.health)
    })

    player.on("hurt", () => {
        console.log("player hurt")
    })
}
