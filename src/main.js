import kaboom from "kaboom"

import loadSprites from "./sprites.js"
import loadKeyboard from "./keyboard.js"
import createPlayer from "./player.js"
import addGeneralGameLogic from "./game.js"

import { TILESIZE } from "./globals.js"

kaboom({
    background: [0, 0, 0],
    debug: true,
    height: TILESIZE * 16,
    width: TILESIZE * 30,
    canvas: document.getElementById("game-canvas"),
})

loadSprites()

scene("level-01", () => {
    setGravity(1200)
    const player = createPlayer()
    loadKeyboard(player)
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

    addGeneralGameLogic(player)
})

go("level-01")
