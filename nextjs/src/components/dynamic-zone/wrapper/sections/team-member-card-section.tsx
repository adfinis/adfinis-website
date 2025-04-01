import CardMember from "@/components/cards/card-member"
import CardGroup from "@/components/cards/card-group"
import Container from "@/components/container"
import { SectionProps } from "@/components/dynamic-zone/wrapper/section-props"

type Props = {
  props: SectionProps
  team_members: {
    full_name: string
    description: string
    photo_main: {
      url?: string
    }
    photo_hover: {
      url?: string
    }
  }[]
}

export default function TeamMemberCardSection({ section }: { section: Props }) {
  return (
    <Container
      padding={section.props.padding}
      background={section.props.background}
    >
      <CardGroup
        columns={2}
        smColumns={3}
        lgColumns={4}
        className="gap-4 sm:gap-6 lg:gap-8"
      >
        {section.team_members.map((member: any) => {
          return (
            <CardMember
              key={`member_${member.id}`}
              title={member.full_name}
              description={member.description}
              imageUrl={member.photo_main.url}
              imageUrl2={member.photo_hover.url}
            />
          )
        })}
      </CardGroup>
    </Container>
  )
}
