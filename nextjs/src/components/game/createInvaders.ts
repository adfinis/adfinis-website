import { Invader } from "./Invader"
import { blocks } from "./invaderLayout"

export function createInvaders(
  invaderSize: number,
  multiplier: number,
  speedX: number,
): Invader[] {
  const invaders: Invader[] = []

  const getPixelRow = (rowRaw: number): number[] => {
    const textRow: number[] = []
    let placer = 0
    const row = Math.floor(rowRaw / multiplier)
    if (row >= blocks.length) return []

    for (let i = 0; i < blocks[row].length; i++) {
      const base = blocks[row][i] * multiplier
      for (let j = 0; j < multiplier; j++) {
        textRow[placer + j] = base + j
      }
      placer += multiplier
    }

    return textRow
  }

  const rows = blocks.length * multiplier

  for (let y = 0; y < rows; y++) {
    const rowPixels = getPixelRow(y)
    for (const xIndex of rowPixels) {
      invaders.push(new Invader(xIndex * invaderSize, y * invaderSize, speedX))
    }
  }

  return invaders
}
