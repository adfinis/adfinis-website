"use server"

type SaveSimpleFormStateErrors = {
  firstName?: string[]
  lastName?: string[]
  email?: string[]
}
type SaveSimpleFormState = {
  success: boolean
  errors?: SaveSimpleFormStateErrors
}
export async function saveSimpleForm(
  locale: string,
  state: SaveSimpleFormState,
  formDate: FormData,
): Promise<SaveSimpleFormState> {
  console.log(locale, state, formDate)
  return {
    success: true,
  }
}
