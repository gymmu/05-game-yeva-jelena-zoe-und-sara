import { k } from "../game.js"

import "./level-01.js"
//Code für Dialogen ist von https://kaboomjs.com/play?example=dialog

k.scene("level-00", () => {
  // Define the dialogue data
  const dialogs = [
    [
      "mushroomhero",
      "Ugh, that Bowser! I don't understand him, why can't he be calmer?",
    ],
    ["mushroomhero", "And where am I now? What should I do?"],
    ["mushroomhero", "It's dark and chilly in here . . ."],
    ["mushroomhero", "I wonder what Mario would do on my place."],
    [
      "mushroomhero",
      "I'm scared, what if I won't be able to find the way back?",
    ],
    ["mushroomhero", "OK there's no reason for panic, it's gonna be fine."],
    ["mushroomhero", "Well, here it begins . . ."],
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
      k.go("level-01")
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
