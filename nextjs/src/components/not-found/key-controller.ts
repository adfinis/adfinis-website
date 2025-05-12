export class KeyController {
  private keyState: Record<number, boolean> = {}

  KEYS = {
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
  }

  constructor() {
    window.addEventListener("keydown", this.handleKeyDown)
    window.addEventListener("keyup", this.handleKeyUp)
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if ([37, 39, 32].includes(e.keyCode)) {
      this.keyState[e.keyCode] = true
      e.preventDefault()
    }
  }

  private handleKeyUp = (e: KeyboardEvent) => {
    if ([37, 39, 32].includes(e.keyCode)) {
      this.keyState[e.keyCode] = false
      e.preventDefault()
    }
  }

  isDown(code: number): boolean {
    return this.keyState[code] === true
  }

  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown)
    window.removeEventListener("keyup", this.handleKeyUp)
  }
}
