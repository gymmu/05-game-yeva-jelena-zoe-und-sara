import { k } from "./game.js"
import { getPlayer } from "./player.js"

/**
 * Diese Funktion lädt die Tastenbelegung wie sie pro Level sein soll. Die
 * generelle Steuerung für ein Jump'n'Run-Level ist immer etwa gleich, deshalb
 * laden wir sie hier in einer eigenen Funktion.
 */
export function loadKeyboardJumpAndRun() {
  const player = getPlayer()
  // Wenn die Taste gedrückt wird, dann soll die Animation abgespielt werden.
  k.onKeyPress("left", () => {
    player.play("left")
  })
  // Solange wie die Taste gedrückt wird, wird der Spieler in jedem Frame nach
  // links verschoben.
  k.onKeyDown("left", () => {
    player.move(k.LEFT.scale(player.speed))
  })
  // Wenn die Taste losgelassen wird, wird die idleAnimation abgespielt.
  k.onKeyRelease("left", () => {
    player.play("down")
  })

  k.onKeyPress("right", () => {
    player.play("right")
  })
  k.onKeyDown("right", () => {
    player.move(k.RIGHT.scale(player.speed))
  })
  k.onKeyRelease("right", () => {
    player.play("down")
  })

  k.onKeyPress("space", () => {
    player.doubleJump()
  })
}

/**
 * Diese Funktion lädt die Tastenbelegung wie sie pro Level sein soll. Die
 * generelle Steuerung für ein RPG-Level ist immer etwa gleich, deshalb
 * laden wir sie hier in einer eigenen Funktion.
 *
 * Da wir uns hier anders bewegen können wie in einem Jump'n'Run, haben wir
 * extra eine weitere Funktion erstellt, wo all diese Funktionen drin sind, wie
 * zum Beispiel nach oben oder unten laufen.
 */
export function loadKeyboardRPG() {
  const player = getPlayer()
  k.onKeyPress("left", () => {
    player.play("left")
  })
  k.onKeyDown("left", () => {
    player.move(k.LEFT.scale(player.speed))
  })
  k.onKeyPress("right", () => {
    player.play("right")
  })
  k.onKeyDown("right", () => {
    player.move(k.RIGHT.scale(player.speed))
  })
  k.onKeyPress("up", () => {
    player.play("up")
  })
  k.onKeyDown("up", () => {
    player.move(k.UP.scale(player.speed))
  })
  k.onKeyPress("down", () => {
    player.play("up")
  })
  k.onKeyDown("down", () => {
    player.move(k.DOWN.scale(player.speed))
  })
}
