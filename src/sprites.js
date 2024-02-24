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
}
