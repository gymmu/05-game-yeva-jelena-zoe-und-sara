import { k } from "../game.js"
import { getPlayer } from "../player.js"
import "./intro.js"

/**
 * Dies ist eine weitere Szene die angezeigt wird wenn das Spiel vorbei bzw.
 * gewonnen ist.
 */
k.scene("finish", () => {
  const player = getPlayer()
  if (player != null) {
    player.destroy()
  }

  k.add([
    k.text("Congratulations, you won!", {
      size: 32,
    }),
    k.pos(k.width() / 2, k.height() / 2),
    k.anchor("center"),
  ])
  //Code für Confetti ist von der Website https://kaboomjs.com/play?example=confetti
  k.add([
    k.text("(Klick vor confetti)", {
      size: 28,
    }),
    k.pos(k.width() / 2, k.height() / 2 + 20),
    k.anchor("top"),
  ])

  const DEF_COUNT = 80
  const DEF_GRAVITY = 800
  const DEF_AIR_DRAG = 0.9
  const DEF_VELOCITY = [1000, 4000]
  const DEF_ANGULAR_VELOCITY = [-200, 200]
  const DEF_FADE = 0.3
  const DEF_SPREAD = 80
  const DEF_SPIN = [2, 8]
  const DEF_SATURATION = 0.7
  const DEF_LIGHTNESS = 0.6

  function addConfetti(opt = {}) {
    const sample = (s) => (typeof s === "function" ? s() : s)
    for (let i = 0; i < (opt.count ?? DEF_COUNT); i++) {
      const p = add([
        pos(sample(opt.pos ?? vec2(0, 0))),
        choose([rect(rand(5, 20), rand(5, 20)), circle(rand(3, 10))]),
        color(
          sample(
            opt.color ?? hsl2rgb(rand(0, 1), DEF_SATURATION, DEF_LIGHTNESS),
          ),
        ),
        opacity(1),
        lifespan(4),
        scale(1),
        anchor("center"),
        rotate(rand(0, 360)),
      ])
      const spin = rand(DEF_SPIN[0], DEF_SPIN[1])
      const gravity = opt.gravity ?? DEF_GRAVITY
      const airDrag = opt.airDrag ?? DEF_AIR_DRAG
      const heading = sample(opt.heading ?? 0) - 90
      const spread = opt.spread ?? DEF_SPREAD
      const head = heading + rand(-spread / 2, spread / 2)
      const fade = opt.fade ?? DEF_FADE
      const vel = sample(opt.velocity ?? rand(DEF_VELOCITY[0], DEF_VELOCITY[1]))
      let velX = Math.cos(deg2rad(head)) * vel
      let velY = Math.sin(deg2rad(head)) * vel
      const velA = sample(
        opt.angularVelocity ??
          rand(DEF_ANGULAR_VELOCITY[0], DEF_ANGULAR_VELOCITY[1]),
      )
      p.onUpdate(() => {
        velY += gravity * dt()
        p.pos.x += velX * dt()
        p.pos.y += velY * dt()
        p.angle += velA * dt()
        p.opacity -= fade * dt()
        velX *= airDrag
        velY *= airDrag
        p.scale.x = wave(-1, 1, time() * spin)
      })
    }
  }
  onMousePress(() => addConfetti({ pos: mousePos() }))
})
