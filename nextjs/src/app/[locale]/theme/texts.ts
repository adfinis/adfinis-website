import { type Card } from "@/components/cards/card"
import { CTA } from "@/lib/actions"

export const hero = {
  title: `## Potential. **Unlocked.**`,
  text: `Open Source is our key to innovation and sustainable digitalization!
          
   Plan innovatively. Build sustainably. Run resiliently.`,
} as const

export const intro = {
  title: `# Meet **Adfinis**`,
  text: `
Originating in Switzerland, Adfinis draws inspiration from the majestic Swiss Alps, embodying the spirit of exploration and the pursuit of excellence. We provide cutting-edge technology services, including consulting, software development, and managed services, to help organizations optimize their IT environments and boost operational efficiency.  Much like a journey through mountainous terrain, our deep expertise in various technologies and our strong commitment to open-source principles guide you through the complexities of IT landscapes. With Adfinis, you embark on a path towards greater flexibility, scalability, and security in your IT operations, ensuring your organization reaches new heights of success.
### Potential. **Unlocked.**
`,
} as const

export const cards = [
  {
    title: "Cloud Journey",
    description:
      "Embark on a cloud journey with Adfinis and discover the benefits of cloud computing.",
    color: "sky",
  },
  {
    title: "Cloud Journey",
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    color: "cinnamon",
  },
  {
    title: "Cloud Journey",
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    color: "green",
  },
  {
    title: "Cloud Journey",
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    color: "fuchsia",
  },
  {
    title: "Cloud Journey",
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    color: "jumbo",
  },
  {
    title: "Cloud Journey",
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut et massa mi.",
    color: "manhattan",
  },
  {
    title: "Cloud Journey",
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna.",
    color: "razzmatazz",
  },
  {
    title: "Cloud Journey",
    description:
      "Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.",
    color: "sunglow",
  },
] satisfies Card[]

const ctas = [
  {
    text: "Get started",
    href: "/contact",
    variant: "primary",
  },
  {
    text: "More info",
    href: "/services",
    variant: "secondary",
  },
] as CTA[]

export const solutions = {
  title: "Our Solutions",
  description: `Embark on a journey with us and discover our comprehensive range of open-source solutions, meticulously designed to empower your organization with unparalleled flexibility, scalability, and cost-effectiveness.
  
  Check out our [solution journeys](https://www.adfinis.com/en-US/solutions), get in touch for more information or to schedule a demo.
  `,
  cards,
  ctas,
}

export const mediaSection = {
  title: "## Our Projects",
  text: `Lorem ipsum dolor sit amet, [consectetur adipiscing elit](https://example.com), sed do eiusmod tempor incididunt.
Ut enim ad minim veniam, quis nostrud exercitation [ullamco laboris nisi](https://example.com) ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse [cillum dolore eu fugiat nulla](https://example.com) pariatur.`,
  media: [
    {
      image: {
        src: "https://images.unsplash.com/photo-1655121075517-a20eb4e6fe8f?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Image of an SBB train in Switzerland",
      },
      title: "About our projects",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      ctas,
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1655121075517-a20eb4e6fe8f?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Image of an SBB train in Switzerland",
      },
      title: "About our projects",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      ctas,
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1655121075517-a20eb4e6fe8f?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Image of an SBB train in Switzerland",
      },
      title: "About our projects",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      ctas,
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1655121075517-a20eb4e6fe8f?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Image of an SBB train in Switzerland",
      },
      title: "About our projects",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      ctas,
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1655121075517-a20eb4e6fe8f?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Image of an SBB train in Switzerland",
      },
      title: "About our projects",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      ctas,
    },
  ],
} as const

export const logoSection = {
  title: "## Meet our **Partners**",
  text: `We work together with partners like GitLab, HashiCorp, Red Hat, and SUSE to help our customers from the first step to the optimal solutions. This includes everything from planning to integration, as well as 24/7 monitoring and operation of their systems.`,
  logos: [
    {
      alt: "GitLab logo",
      src: "/svg/logo/gitlab-white-logo.svg",
    },
    {
      alt: "Red Hat logo",
      src: "/svg/logo/redhat-white-logo.svg",
    },
    {
      alt: "SUSE logo",
      src: "/svg/logo/suse-white-logo.svg",
    },
    {
      alt: "HashiCorp logo",
      src: "/svg/logo/hashicorp-white-logo.svg",
    },
  ],
  ctas: ctas.map((el) => {
    el.size = "large"
    return el
  }),
} as const

export const journeySection = {
  title: "## Let's Shape Your Journey **Together**",
  cards: [
    {
      title: "Plan",
      description:
        "We create a situation analysis and elicit the best possible solution for your current infrastructure.",
      icon: {
        src: "/svg/icons/icon_plan.svg",
        alt: "Plan icon",
      },
      cta: {
        text: "Get your checkup",
        href: "/contact",
        variant: "secondary",
      },
    },
    {
      title: "Build",
      description:
        "We optimally support you in the implementation of your individual infrastructure.",
      icon: {
        src: "/svg/icons/icon_build.svg",
        alt: "Build icon",
      },
      cta: {
        text: "Find your solution",
        href: "/contact",
        variant: "secondary",
      },
    },
    {
      title: "Run",
      description:
        "With our 24/7 SLA, we provide you with all-round support. Benefit from fast and reliable support.",
      icon: {
        src: "/svg/icons/icon_run.svg",
        alt: "Run icon",
      },
      cta: {
        text: "Choose your service",
        href: "/contact",
        variant: "secondary",
      },
    },
  ],
} as const

export const example = `
# Heading 1 **Example**
## Heading 2 **Example**
### Heading 3 **Example**

Originating in **Switzerland**, Adfinis draws *inspiration* from the ***majestic Swiss Alps***, embodying the spirit of exploration and the pursuit of excellence. We provide cutting-edge technology services, including ~~manual work~~ consulting, software development, and managed services, to help organizations optimize their IT environments and boost operational efficiency.  Much like a journey through mountainous terrain, our deep expertise in various technologies and our strong commitment to open-source principles guide you through the complexities of IT landscapes. With Adfinis, you embark on a path towards greater flexibility, scalability, and security in your IT operations, ensuring your organization reaches new heights of success. Feel free to [visit our website](https://www.adfinis.com/en-US/theme).

Originating in **Switzerland**, Adfinis draws *inspiration* from the ***majestic Swiss Alps***, embodying the spirit of exploration and the pursuit of excellence. We provide cutting-edge technology services, including ~~manual work~~ consulting, software development, and managed services, to help organizations optimize their IT environments and boost operational efficiency.  Much like a journey through mountainous terrain, our deep expertise in various technologies and our strong commitment to open-source principles guide you through the complexities of IT landscapes. With Adfinis, you embark on a path towards greater flexibility, scalability, and security in your IT operations, ensuring your organization reaches new heights of success. Feel free to [visit our website](https://www.adfinis.com/en-US/theme).
> Blockquote example
1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered list item 1
   2. Nested ordered list item 2

Small text.

- Unordered list item 1
- Unordered list item 2
   - Nested unordered list item 1
   - Nested unordered list item 2

### Lists with **long blocks**
- This is a very long sentence that is meant to test how well the markdown renderer handles text that spans multiple lines without any line breaks, ensuring that the text wraps correctly and maintains readability across different devices and screen sizes.
- Another extremely long sentence follows, designed to push the limits of the markdown formatting and see if it can gracefully manage extensive content without breaking the layout or causing any unexpected issues in the display, making sure that everything remains user-friendly and visually appealing.
`
