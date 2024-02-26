// Dieser import lädt die GameEngine
import kaboom from "kaboom"

/* Hier werden Funktionen aus den eigenen Datein eingebunden.
 * Die Dateien liegen jeweils im `src` Verzeichnis. Funktionen die in anderen
 * Dateien definiert werden, und hier verwendet werden, müssen das
 * Schlüsselwort `export` haben. Werden mehrere Funktionen exportiert, braucht
 * es die `{}`-Klammern. Wird nur eine einzige Funktion exportiert, kann man
 * diese mit dem Schlüsselwort `default` kennzeichnen, und dann kann die
 * Funktion auch ohne `{}`-Klammer importiert werden.
 */
import loadSprites from "./sprites.js"
import { loadKeyboardJumpAndRun, loadKeyboardRPG } from "./keyboard.js"
import createPlayer from "./player.js"
import addGeneralGameLogic from "./game.js"
import { generateMapJumpAndRun, generateMapRPG } from "./map.js"

/* Wir können auch einzelne Variablen importieren.
 * Das können wir verwenden um globale Konstanten zu definieren, die wir
 * dann in verschiedenen Datein brauchen können. Das eignet sich vor allem
 * für Dinge wie TILESIZE oder FPS. Diese möchten wir an einem Ort
 * haben, und schnell um ganzen Code ändern können.
 */
import { TILESIZE } from "./globals.js"

let player = null

/*
 * Hier wird die GameEngine initialisiert. Wir können hier verschiedene Dinge
 * anpassen. Wichtig ist das wir kaboom sagen wo unser Spiel gezeichnet werden
 * soll, dafür geben wir das HTML-Canvas-Element an.
 * Ganz wichtig ist die Höhe und Breite von unserem Spiel, das müssen Sie so
 * anpassen, dass es für Sie stimmt. Am besten verwenden Sie hier ein
 * vielfaches von TILESIZE.
 */
const k = kaboom({
  font: "sinko",
  background: [0, 0, 0],
  debug: true,
  height: TILESIZE * 16,
  width: TILESIZE * 30,
  canvas: document.getElementById("game-canvas"),
})

/*
 * Diese Funktion ladet die Graphiken und Animationen die wir später im Spiel
 * verwenden möchten. Wir müssen diese Funktion noch vor allen anderen
 * aufrufen, damit die Graphiken auch verfügbar sind.
 */
loadSprites()

/*
 * Die Funktion `scene` kommt von Kaboom, und erstellt uns einen
 * abgeschlossenen Teil von unserem Spiel. Wir können das auch wie ein Level in
 * unserem Spiel betrachten. Es können aber auch Menu-Bildschirme und
 * GameOver-Bildschirme als Scenen erstellt werden.
 *
 * Eine Szene braucht immer einen Namen, und dann kommt eine Funktion. Diese
 * wird dann ausgeführt, wenn wir zu der Szene wechseln.
 *
 * Mit der Funktion `go("intro")` können wir zur Intro-Szene wechseln.
 */
k.scene("intro", () => {
  // Mit der `add`-Funktion können Objekte zu einer Szene hinzugefügt werden.
  // Wir geben dem Spielobjekt eine Liste von Funktionen an, die sagen wie
  // sich das Spielobjekt verhalten soll.
  // Hier sagen wir dem Objekt das es Text haben soll, und an welcher
  // Position der Text sein soll. Mit `anchor` können wir angeben wie das
  // Objekt verankert werden soll. Versuchen Sie mal was passiert wenn Sie
  // `anchor("botright)` verwenden.
  k.add([
    k.text("Press SPACE to start", { size: 32 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ])

  // Mit dieser Funktion können wir auf Tastendrucke reagieren. Diese können
  // pro Szene anders angegeben werden. Hier wird mit `space` zur nächsten
  // Szene gewechselt. In der nächsten Szene können wir `space` dann auch zum
  // Springen verwenden.
  k.onKeyPress("space", () => {
    k.go("level-01")
  })
})

/*
 * Dies ist eine weitere Szene die angezeigt wird wenn das Spiel vorbei bzw.
 * gewonnen ist.
 */
k.scene("finish", () => {
  player.destroy()
  k.add([
    k.text("Ziel erreicht", { size: 32, font: "sinko" }),
    k.pos(width() / 2, height() / 2),
    k.anchor("center"),
  ])

  k.onKeyPress("space", () => {
    k.go("intro")
  })
})

/* Diese Szene  wird verwendet wenn das Spiel verloren ist, also wenn der
 * Spieler gestorben ist.
 */
k.scene("lose", () => {
  player.destroy()
  k.add([
    k.text("Game over", { size: 44 }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("bot"),
  ])

  k.add([
    k.text("Drücke SPACE um das Spiel neu zu starten", {
      size: 22,
    }),
    k.pos(k.width() / 2, k.height() / 2 + 20),
    k.anchor("center"),
  ])

  k.onKeyPress("space", () => {
    k.go("level-01")
  })
})

/* Das ist unser erstes Level. Hier können wir Dinge einstellen die nur für
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
k.scene("level-01", async () => {
  // Wir stellen die Gravitation ein, damit es sich um ein Jump'n'Run-Spiel
  // handelt.
  k.setGravity(1200)

  // Wir erstellen den Spieler
  player = createPlayer()

  // Wir laden die Tasenbelegung für ein Jump'n'Run-Spiel.
  loadKeyboardJumpAndRun(player)

  // Hier lassen wir die Spielwelt erstellen.
  // Wir müssen dieser Funktion auch den Spieler übergeben, damit die
  // Position vom Spieler richtig gesetzt werden kann.
  await generateMapJumpAndRun("maps/level-01.txt", player)

  // Hier laden wir die generelle Spiellogik. Also was passieren soll wenn
  // der Spieler mit einem Objekt kollidiert.
  addGeneralGameLogic(player)

  // Hier wird zusätzliche Spiellogik erstellt, die nur in diesem Level
  // verwendet wird.
  // Hier ist es so das wenn der Spieler mit dem "goal" kollidiert, dann
  // kommen wir ins nächste Level.
  k.onCollide("player", "goal", () => {
    k.go("level-02")
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
})

k.scene("level-02", async () => {
  k.setGravity(0)
  loadKeyboardRPG(player)

  await generateMapRPG("maps/level-02.txt", player)

  addGeneralGameLogic(player)

  k.onCollide("player", "cave", (player, _) => {
    if (player.hasFlower === true) {
      k.go("finish")
    }
  })

  k.onCollide("player", "flower", (player, flower) => {
    flower.destroy()
    player.hasFlower = true
  })
})

k.go("intro")
