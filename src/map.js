import { TILESIZE } from "./globals.js"

export async function generateMapJumpAndRun(mapfile, player) {
    const map = await fetch(mapfile)
    const mapContent = await map.text()
    const lines = mapContent.split("\n")
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        for (let x = 0; x < line.length; x++) {
            const char = line[x]

            if (char === "p") {
                player.setPosition(x, y)
            } else if (char === "-") {
                add([
                    sprite("wall"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                    "ground",
                ])
            } else if (char === "o") {
                add([
                    sprite("mushroom"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                    "obstacle",
                    {
                        isConsumable: true
                    }
                ])
            } else if (char === "f") {
                add([
                    sprite("flower"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                    "heal",
                    {
                        isConsumable: true
                    }
                ])
            } else if (char === "g") {
                add([
                    sprite("cave"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                    "goal",
                ])
            }
        }
    }
}

export async function generateMapRPG(mapfile, player) {
    const map = await fetch(mapfile)
    const mapContent = await map.text()
    const lines = mapContent.split("\n")
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y]
        for (let x = 0; x < line.length; x++) {
            const char = line[x]
            add([
                sprite("grass"),
                pos(x * TILESIZE, y * TILESIZE),
                z(-10)
            ])

            if (char === "p") {
                player.setPosition(x, y)
            } else if (char === "s") {
                add([
                    sprite("stone"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                ])
            } else if (char === "w") {
                add([
                    sprite("wall"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                ])
            } else if (char === "c") {
                add([
                    sprite("cave"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                    "cave"
                ])
            } else if (char === "T") {
                add([
                    sprite("trunk"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                ])
            } else if (char === "t") {
                add([
                    sprite("tree"),
                    pos(x * TILESIZE, y * TILESIZE),
                    body({ isStatic: true }),
                    area(),
                ])
            } else if (char === "f") {
                add([
                    sprite("flower"),
                    pos(x * TILESIZE, y * TILESIZE),
                    area(),
                    "flower",
                    "heal",
                    {
                        isConsumable: true
                    }
                ])
            } else if (char === "m") {
                add([
                    sprite("mushroom"),
                    pos(x * TILESIZE, y * TILESIZE),
                    area(),
                    "obstacle",
                    {
                        isConsumable: true
                    }
                ])
            }
        }
    }
}
