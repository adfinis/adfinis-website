type Props = {
  message: string
  prompt: string
  link: string
  onSubmitAnother: () => void
}

export default function FormConfirmation({
  message,
  prompt,
  link,
  onSubmitAnother,
}: Props) {
  return (
    <div
      className="w-full text-center text-input-primary py-8"
      data-testid="form-confirmation"
    >
      <h2 className="text-2xl md:text-3xl font-bold">{message}</h2>
      <p className="mt-4">
        {prompt}{" "}
        <button
          type="button"
          onClick={onSubmitAnother}
          className="font-bold underline hover:no-underline"
        >
          {link}
        </button>
      </p>
    </div>
  )
}
