type Item = {
  title: string
  url: string
}

type Segment = {
  title: string
  items: Item[]
}

export type NavItem = {
  title: string
  url?: string
  menu_segment?: Segment[]
}
