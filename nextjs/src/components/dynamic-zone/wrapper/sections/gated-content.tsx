import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"
import Image from "next/image"
import Text from "@/components/text"
import GatedContentForm, {
  type GatedContentState,
} from "@/components/dynamic-zone/forms/gated-content-form"
import { saveGatedContentForm } from "@/app/actions"
import { getDictionary } from "@/lib/get-dictionary.server"
import { Locale } from "@/lib/locale"

type ContentOffer = {
  description: string
  download_file?: {
    url: string
  }
  cover_image?: {
    url: string
    alternativeText: string
  }
}

type Props = {
  props: SectionProps
  content_offer: ContentOffer
  submit_label: string
  thank_you_message: string
}

export default async function GatedContent({
  section,
  locale,
}: {
  section: Props
  locale: Locale
}) {
  const dictionary = await getDictionary(locale)
  const downloadUrl = section.content_offer?.download_file?.url

  async function submit(
    state: GatedContentState,
    formData: FormData,
  ): Promise<GatedContentState> {
    "use server"
    const result = await saveGatedContentForm(locale, state, formData)
    return result.success ? { ...result, downloadUrl } : result
  }

  return (
    <Container
      background={section.props.background}
      padding={section.props.padding}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-12 items-center">
        <div className="mx-auto lg:order-1">
          <Image
            className="rounded-xl max-h-64 lg:max-h-full w-auto"
            src={section.content_offer?.cover_image?.url ?? ""}
            alt={section.content_offer?.cover_image?.alternativeText ?? ""}
            width={800}
            height={400}
          />
        </div>

        <div className="col-span-2">
          <GatedContentForm
            intro={<Text markdown={section.content_offer?.description ?? ""} />}
            thankYou={<Text markdown={section.thank_you_message ?? ""} />}
            submitLabel={section.submit_label}
            dictionary={dictionary}
            action={submit}
          />
        </div>
      </div>
    </Container>
  )
}
