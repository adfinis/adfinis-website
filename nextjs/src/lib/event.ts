type EventDates = {
  is_past_event?: boolean | null
  date_event: string
  date_event_end?: string | null
}

export function today() {
  return new Date().toISOString().slice(0, 10)
}

export function isPastEvent(
  { is_past_event, date_event, date_event_end }: EventDates,
  now = today(),
) {
  return is_past_event === true || (date_event_end || date_event) < now
}
