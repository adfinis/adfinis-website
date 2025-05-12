import { Projectile } from "./Projectile"
import { KeyController } from "./KeyController"
import { Game } from "./Game"

export class Player {
  x: number
  y: number
  width = 16
  height = 8
  projectiles: Projectile[] = []
  active = true

  private shooterHeat = -3
  private controller = new KeyController()

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  update(game: Game) {
    if (!this.active) return

    if (this.controller.isDown(this.controller.KEYS.LEFT) && this.x > 0) {
      this.x -= 2
    } else if (
      this.controller.isDown(this.controller.KEYS.RIGHT) &&
      this.x < game.width - this.width
    ) {
      this.x += 2
    }

    if (this.controller.isDown(this.controller.KEYS.SPACE)) {
      this.shooterHeat += 1
      if (this.shooterHeat < 0) {
        const proj = new Projectile(
          this.x + this.width / 2 - 1,
          this.y - 1,
          0,
          -7,
        )
        this.projectiles.push(proj)
      } else if (this.shooterHeat > 12) {
        this.shooterHeat = -3
      }
    } else {
      this.shooterHeat = -3
    }

    this.projectiles.forEach((p) => p.update(game.height))
    this.projectiles = this.projectiles.filter((p) => p.active)
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return

    ctx.fillStyle = "black"
    ctx.fillRect(this.x, this.y, this.width, this.height)

    ctx.fillRect(this.x - 2, this.y + 2, 20, 6)
    ctx.fillRect(this.x + 6, this.y - 4, 4, 4)

    this.projectiles.forEach((p) => p.draw(ctx))
  }

  destroy(game: Game) {
    this.active = false
    game.lost = true
  }
}
