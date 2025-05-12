import { Game } from "./Game"
import { Projectile } from "./Projectile"

export class Invader {
  x: number
  y: number
  width = 20
  height = 20
  active = true

  patrolX = 0
  speedX: number

  constructor(x: number, y: number, speedX: number = 1) {
    this.x = x
    this.y = y
    this.speedX = speedX
  }

  update(game: Game) {
    if (Math.random() > game.invaderAttackRate && !game.invadersBelow(this)) {
      const projectile = new Projectile(
        this.x + this.width / 2,
        this.y + this.height,
        0,
        2,
      )
      game.invaderShots.push(projectile)
    }
  }

  move(game: Game) {
    if (this.patrolX < 0 || this.patrolX > 100) {
      this.speedX = -this.speedX
      this.patrolX += this.speedX
      this.y += this.height

      if (this.y + this.height * 2 > game.height) {
        game.lost = true
      }
    } else {
      this.x += this.speedX
      this.patrolX += this.speedX
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.active) {
      ctx.fillStyle = "black"
      ctx.fillRect(this.x, this.y, this.width, this.height)
    }
  }

  destroy(game: Game) {
    this.active = false
    game.kills += 1
  }
}
