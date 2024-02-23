import kaboom from "kaboom"

const TILESIZE = 32

kaboom({
    background: [0, 0, 0],
    debug: true,
    height: TILESIZE * 16,
    width: TILESIZE * 30,
    canvas: document.getElementById("game-canvas"),
})

loadSprite("hero", "sprites/char.png", {
    sliceX: 3,
    sliceY: 4,
    anims: {
        runDown: { from: 0, to: 2 },
        idleDown: 1,
        runLeft: { from: 3, to: 5 },
        idleLeft: 4,
        runRight: { from: 6, to: 8 },
        idleRight: 7,
        runUp: { from: 9, to: 11 },
        idleUp: 10,
    },
},
)


setGravity(1200)

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

player.playAnimation = function() {
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

// ground
add([
    rect(width(), 20),
    pos(0, height() - 20),
    color(0, 255, 0),
    body({ isStatic: true }),
    area(),
    "ground",
])

// obstacles
add([
    rect(64, 64),
    pos(width() - 32, height() - 20),
    color(0, 0, 255),
    area(),
    body({ isStatic: true }),
    anchor("botright"),
    "obstacle",
])

onUpdate(() => {
    if (player.dead) {
        console.log("player dead")
    }
    if (player.dir != null) {
        player.move(player.dir.scale(player.speed))
    }
    player.playAnimation()
})

player.onCollide("obstacle", () => {
    player.hurt(10)
    console.log("player hit obstacle")
    console.log(player.health)
})

player.on("hurt", () => {
    console.log("player hurt")
})

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
