import { k, addGeneralGameLogic } from "../game.js"
import createPlayer from "../player.js"
import { generateMapJumpAndRun } from "../map.js"
import { loadKeyboardJumpAndRun } from "../keyboard.js"

import "./finish.js"
import "./lose.js"
import { TILESIZE } from "../globals.js"

/** Das ist unser erstes Level. Hier können wir Dinge einstellen die nur für
 * dieses Level gelten sollen, und aber auch Funktionen verwenden die in allen
 * Levels gleich sind.
 *
 * Wir brauchen hier das Schlüsselwort `async` direkt vor der Funktion, weil
 * wir innerhalb der Funktion eine spezielle Funktion aufrufen und warten
 * müssen bis diese beendet ist. Dieses warten passiert mit dem Schlüsselwort
 * `await`.
 *
 * Bei diesem ersten Level handelt es sich um ein Jump'n'Run-Spiel. Da müssen
 * wir einige spezialisierte Funktionen verwenden.
 *
 */
k.scene("level-03", async () => {
  // Wir stellen die Gravitation ein, damit es sich um ein Jump'n'Run-Spiel
  // handelt.
  k.setGravity(1200)

  // Wir erstellen den Spieler
  //createPlayer()

  k.add([
    k.sprite("background", { width: k.width(), height: k.height() }),
    k.pos(0, 0),
    k.z(-100),
    k.fixed(),
  ])

  // Wir laden die Tasenbelegung für ein Jump'n'Run-Spiel.
  loadKeyboardJumpAndRun()

  // Hier lassen wir die Spielwelt erstellen.
  // Wir müssen dieser Funktion auch den Spieler übergeben, damit die
  // Position vom Spieler richtig gesetzt werden kann.
  await generateMapJumpAndRun("maps/level-03.txt")

  // Hier laden wir die generelle Spiellogik. Also was passieren soll wenn
  // der Spieler mit einem Objekt kollidiert.
  addGeneralGameLogic()

  // Hier wird zusätzliche Spiellogik erstellt, die nur in diesem Level
  // verwendet wird.
  // Hier ist es so das wenn der Spieler mit dem "goal" kollidiert, dann
  // kommen wir ins nächste Level.
  k.onCollide("player", "goal", () => {
    k.go("finish")
  })

  // Diese Funktion wird bei jedem Frame ausgeführt. Bei einem Jump'n'Run ist
  // es so das wenn der Spieler von einer PLattform stützt, dann hat man das
  // Spiel verloren. Man könnte hier auch anders darauf reagieren, zum
  // Beispiel den Spieler an einen Checkpoint zurück setzen, und die
  // Lebenspunkte von dem Spieler anpassen.
  k.onUpdate(() => {
    const player = k.get("player")[0]
    if (player.pos.y > 720) {
      k.go("lose")
    }
  })

  k.onUpdate("fireball", (fireball) => {
    const player = k.get("player")[0]
    if (fireball.pos.x - fireball.distanceToPlayer * TILESIZE < player.pos.x) {
      fireball.isStatic = false
    }
    if (fireball.isGrounded()) {
      fireball.jump(600)
    }
  })
})
