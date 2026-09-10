type Edges = { left: number; right: number }

export function cardSliderOffset(
  view: Edges,
  cards: Edges[],
  direction: 1 | -1,
): number {
  if (direction === 1) {
    const next = cards.find((card) => card.right > view.right + 1)
    return next ? next.left - view.left : 0
  }
  const previous = cards.findLast((card) => card.left < view.left - 1)
  return previous ? previous.right - view.right : 0
}
