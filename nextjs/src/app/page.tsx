import Wrapper from "@/components/nav-bar/wrapper"
import Title from "@/components/title"
import Text from "@/components/text"
import Link from "@/components/link"
import Hero from "@/components/hero"
import Intro from "@/components/intro"

export default async function Page() {
  const { data } = await (
    await fetch(
      "http://localhost:1337/api/homepage?populate=hero_image.external_cta&populate=intro_section&populate=localizations",
    )
  ).json()
  const hero = data.hero_image ?? {
    Description: "placeholder",
    Title: "placeholder",
  }
  const intro = data.intro_section ?? {
    Title: "placeholder",
    Paragraph: "placeholder",
  }

  return (
    <>
      <Wrapper items={["aaa", "bbb"]} />
      <Hero
        color="white"
        imageUrl="https://images.unsplash.com/photo-1682687220198-88e9bdea9931?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >
        <Title markdown={hero.Title} />
        <Text markdown={hero.Description} />
        <Link href={hero.external_cta.external_url} size="large">
          {hero.external_cta.label}
        </Link>
      </Hero>
      <Intro>
        <Title markdown={intro.Title} align="center" />
        <Text markdown={intro.Paragraph} className="grid gap-8" />
      </Intro>
    </>
  )
}
