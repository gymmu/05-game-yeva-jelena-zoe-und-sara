import { k, addGeneralGameLogic } from "../game.js"
import { generateMapRPG } from "../map.js"
import { loadKeyboardRPG } from "../keyboard.js"

import "./level-03.js"

/**
 * Szene für das Level 2.
 *
 * Hier gibt es keine Gravitation, wir sind hier in einem RPG-Setting.
 */
k.scene("level-02", async () => {
  k.setGravity(0)
  loadKeyboardRPG()

  await generateMapRPG("maps/level-02.txt")

  addGeneralGameLogic()

  k.onCollide("player", "cave", (player) => {
    if (player.hasKey === true) {
      k.go("level-03")
    }
  })

  k.onCollide("player", "flower", (player, flower) => {
    flower.destroy()
    player.hasKey = true
  })

  k.onCollide("player", "key", (player, key) => {
    key.destroy()
    player.hasKey = true
    player.color = k.rgb(0, 255, 0)
  })

  // Define the dialogue data
  const dialogs = [
    ["mushroomhero", "Where am I?"],
    ["mushroomhero", "How did I get here?"],
    ["mushroomhero", "you love me? pretty baby"],
    ["mushroomhero", "mark is a stupid"],
    ["mushroomhero", "he did not know how to take care of you..."],
    ["mushroomhero", "you don't know me ..."],
    ["mushroomhero", "what!"],
    ["mushroomhero", "oh...hi "],
  ]

  let curDialog = 0

  // Text bubble
  const textbox = k.add([
    k.rect(k.width() - 200, 120, { radius: 32 }),
    k.anchor("center"),
    k.pos(k.center().x, k.height() - 100),
  ])

  // Text
  const txt = k.add([
    k.text("", { size: 32, width: k.width() - 230, align: "center" }),
    k.pos(textbox.pos),
    k.anchor("center"),
    k.color(0, 0, 0),
  ])

  // Character avatar
  const avatar = k.add([
    k.sprite("mushroomhero"),
    k.scale(3),
    k.anchor("center"),
    k.pos(k.center().sub(0, 50)),
  ])

  k.onKeyPress("space", () => {
    // Cycle through the dialogs
    curDialog = curDialog + 1
    if (curDialog === dialogs.length) {
      avatar.destroy()
      txt.destroy()
      textbox.destroy()
    } else {
      updateDialog()
    }
  })

  // Update the on screen sprite & text
  function updateDialog() {
    const [char, dialog] = dialogs[curDialog]

    // Use a new sprite component to replace the old one
    avatar.use(k.sprite(char))
    // Update the dialog text
    txt.text = dialog
  }

  updateDialog()
})
