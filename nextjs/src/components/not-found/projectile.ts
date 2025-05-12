export class Projectile {
  x: number
  y: number
  width = 3
  height = 3
  vx: number
  vy: number
  active = true

  constructor(x: number, y: number, vx: number, vy: number) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
  }

  update(canvasHeight: number) {
    this.x += this.vx
    this.y += this.vy

    if (this.y < 0 || this.y > canvasHeight) {
      this.active = false
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return
    ctx.fillStyle = "black"
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}
