import { TILESIZE } from "./globals"

export default function loadSprites() {
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
    })

    loadSpriteAtlas("sprites/ground.png", {
        "grass": { x: 0, y: 0, width: TILESIZE, height: TILESIZE },
        "stone": { x: 1 * TILESIZE, y: 0, width: TILESIZE, height: TILESIZE },
        "mushroom": { x: 2 * TILESIZE, y: 0 * TILESIZE, width: TILESIZE, height: TILESIZE },
        "flower": { x: 3 * TILESIZE, y: 0 * TILESIZE, width: TILESIZE, height: TILESIZE },
        "trunk": { x: 0 * TILESIZE, y: 1 * TILESIZE, width: TILESIZE, height: TILESIZE },
        "tree": { x: 1 * TILESIZE, y: 1 * TILESIZE, width: TILESIZE, height: TILESIZE },
        "cave": { x: 2 * TILESIZE, y: 1 * TILESIZE, width: TILESIZE, height: TILESIZE },
        "wall": { x: 3 * TILESIZE, y: 1 * TILESIZE, width: TILESIZE, height: TILESIZE },
    })
}
