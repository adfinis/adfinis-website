import { type Card } from "@/components/cards/card"
import { NavItem } from "@/components/nav-bar/nav"
import { CTA } from "@/lib/cta"

export const navItems: NavItem[] = [
  {
    title: "Solutions",
    items: [
      {
        title: "HashiCorp",
        items: [
          {
            title: "Vault",
            url: "/solutions/vault",
          },
          {
            title: "Terraform",
            url: "/solutions/terraform",
          },
          {
            title: "Consul",
            url: "/solutions/consul",
          },
        ],
      },
      {
        title: "Red Hat",
        items: [
          {
            title: "OpenShift",
            url: "/solutions/openshift",
          },
          {
            title: "Enterprise Linux & SAP Workloads",
            url: "/solutions/enterprise-linux-sap-workloads",
          },
          {
            title: "Ansible Automation Platform",
            url: "/solutions/ansible-automation-platform",
          },
          {
            title: "Red Hat Satellite",
            url: "/solutions/red-hat-satellite",
          },
        ],
      },
    ],
  },
  {
    title: "Partners & Products",
    items: [
      {
        title: "Github",
        url: "/partners/github",
      },
    ],
  },
]

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
] as const

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
      src: "/svg/logo/logo-1.svg",
    },
    {
      alt: "Red Hat logo",
      src: "/svg/logo/logo-2.svg",
    },
    {
      alt: "SUSE logo",
      src: "/svg/logo/logo-3.svg",
    },
    {
      alt: "HashiCorp logo",
      src: "/svg/logo/logo-4.svg",
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

export const ctaSection = {
  title: "## Start your **journey** with Adfinis",
  cta: {
    href: "/contact",
    text: "Get started",
    variant: "primary",
    size: "large",
  },
} as const

export const resourcesSection = {
  title: "Our Resources", // no markdown here!
  description:
    "Your one-stop hub for the latest industry news, upcoming events, insightful whitepapers, and much more. Stay informed and ahead of the curve with a curated selection of content.",
  ctas: [ctas[0]],
  cards: [
    {
      title:
        "Adfinis receives the HashiCorp EMEA Focus Partner of the Year Award",
      description: "date event: june 20, 2023",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZSUyMGJ1c2luZXNzfGVufDB8fDB8fHwy",
      categories: [
        {
          text: "Events",
          href: "/events",
        },
        {
          text: "News",
          href: "/news",
        },
      ],
    },
    {
      title: "Swiss Cyber Security Days 2025",
      description: "date event: june 20, 2023",
      imageUrl:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZSUyMGJ1c2luZXNzfGVufDB8fDB8fHwy",
      categories: [
        {
          text: "Events",
          href: "/events",
        },
        {
          text: "News",
          href: "/news",
        },
      ],
    },
  ],
}

export const media2Section = {
  title: "## Our Projects",
  text: `Lorem ipsum dolor sit amet, [consectetur adipiscing elit](https://example.com), sed do eiusmod tempor incididunt.
Ut enim ad minim veniam, quis nostrud exercitation [ullamco laboris nisi](https://example.com) ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse [cillum dolore eu fugiat nulla](https://example.com) pariatur.`,
  media: [
    {
      image: {
        src: "https://images.unsplash.com/photo-1519014961376-9e3f31b1a812?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Group of people in snow",
      },
      title: "Who we are?",
      text: `Our team is passionate about open source and deeply rooted in technology. As dedicated tech enthusiasts, we thrive on innovation and are committed to leveraging open-source solutions to solve complex problems. Our collective enthusiasm for open source fuels our creativity and dedication, ensuring that we stay at the forefront of the industry while fostering a culture of continuous learning and growth.`,
      ctas,
    },
    {
      image: {
        src: "https://images.unsplash.com/photo-1727805174504-3cd54f92b3eb?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Image of an SBB train in Switzerland",
      },
      title: "Values and committment",
      text: `At Adfinis we shape solutions based on Open Source without Vendor lock-in. We believe in openness and transparency and are a part of a worldwide Open Source community`,
      ctas,
    },
  ],
} as const

export const statisticsSection = {
  title: "## More on **Adfinis**",
  description:
    "Lorem ipsum dolor sit amet consectetur **adfinis** elit litora, cubilia habitant mollis mauris duis eget augue. Viverra curae faucibus fames ante dictum, mi magnis vulputate placerat accumsan vivamus, in nulla lacinia dis.",
  cards: [
    {
      title: "2000",
      description: "founded",
      icon: {
        src: "/svg/icons/icon_plan.svg",
        alt: "Plan icon",
      },
    },
    {
      title: "200+",
      description: "projects",
      icon: {
        src: "/svg/icons/icon_plan.svg",
        alt: "Plan icon",
      },
    },
    {
      title: "150+",
      description: "employees",
      icon: {
        src: "/svg/icons/icon_plan.svg",
        alt: "Plan icon",
      },
    },
  ],
  logos: [...logoSection.logos, ...logoSection.logos],
} as const

export const slaSection = {
  title: "## SLA - Our Managed Service Models",
  cards: [
    {
      title: "Basic",
      usps: [
        {
          text: "24/7 up and running service desk with free coffee and tea around the clock",
          active: true,
        },
        {
          text: "Support",
          active: false,
        },
        {
          text: "Monitoring",
          active: false,
        },
        {
          text: "Incident",
          active: false,
        },
        {
          text: "Management",
          active: false,
        },
        {
          text: "Service",
          active: false,
        },
      ],
    },
    {
      title: "Advanced",
      usps: [
        {
          text: "24/7 up and running service desk with free coffee and tea around the clock",
          active: true,
        },
        {
          text: "Support",
          active: true,
        },
        {
          text: "Monitoring",
          active: true,
        },
        {
          text: "Incident",
          active: true,
        },
        {
          text: "Management",
          active: false,
        },
        {
          text: "Service",
          active: false,
        },
      ],
    },
    {
      title: "Premium",
      usps: [
        {
          text: "24/7 up and running service desk with free coffee and tea around the clock",
          active: true,
        },
        {
          text: "Support",
          active: true,
        },
        {
          text: "Monitoring",
          active: true,
        },
        {
          text: "Incident",
          active: true,
        },
        {
          text: "Management",
          active: true,
        },
        {
          text: "Service",
          active: true,
        },
      ],
    },
  ],
} as const

export const partnerSection = {
  title: "## Security Technological Ecosystem",
  partners: [
    {
      title: "HashiCorp Vault",
      description:
        "HashiCorp Vault is secure software for managing secrets, authentication tokens, and encryption keys. It provides robust access control and audit capabilities.",
      imageUrl: "/svg/logo/logo-1.svg",
      ctas: [
        {
          text: "Get started",
          href: "/contact",
          variant: "primary",
          size: "small",
        },
        {
          text: "More info",
          href: "/services",
          variant: "secondary",
          size: "small",
        },
      ],
    },
    {
      title: "HashiCorp Consul",
      description:
        "HashiCorp Consul is a service networking solution to connect and secure services across any runtime platform and public or private cloud.",
      imageUrl: "/svg/logo/logo-2.svg",
      ctas: [
        {
          text: "Get started",
          href: "/contact",
          variant: "primary",
          size: "small",
        },
        {
          text: "More info",
          href: "/services",
          variant: "secondary",
          size: "small",
        },
      ],
    },
    {
      title: "StackRox",
      description:
        "StackRox is a Kubernetes-native security platform. It protects cloud-native applications across the full life cycle by providing visibility, vulnerability management, compliance, and runtime threat detection.",
      imageUrl: "/svg/logo/logo-3.svg",
      ctas: [
        {
          text: "Get started",
          href: "/contact",
          variant: "primary",
          size: "small",
        },
        {
          text: "More info",
          href: "/services",
          variant: "secondary",
          size: "small",
        },
      ],
    },
  ],
} as const

export const quoteSection = {
  author: "Marc Karcher | Project Manager | Viollier",
  quote: `“We can complete major updates within four hours - 84 percent
    faster. As a result, our systems are protected against new threats
    much more quickly.”`,
  image: {
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
    alt: "Avatar image",
  },
} as const

export const whitepaperSection = {
  title: "Unlock the full potential of GitLab",
  description:
    "Say goodbye to toolchain complexity with GitLab's comprehensive DevSecOps Suite. Our white paper highlights GitLab's integrated capabilities for seamless project management, code testing, and release.",
  cta: {
    text: "Download Whitepaper",
    href: "/",
    variant: "cta",
    size: "large",
  },
  image: {
    src: "https://images.unsplash.com/photo-1618822579297-53087e4cd1de?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Whitepaper image of Gitlab in action",
  },
} as const

export const twoColumnMarkdownSection = {
  column1: `
  ### **How it works**
  - A discovery call will be scheduled to discuss some aspects of your GitLab setup
  - We will send you a questionnaire to gather information about your GitLab setup
  - We will analyse the gathered information and document our recommendations in a report
  - A delivery and Q&A call is scheduled where we go over our findings and recommendations
  - After the call, you will receive a report with all the recommendations and takeaways
  `,
  column2: `
  ### **What it covers**
  - GitLab Architecture and Design for Self-Managed Instances
  - Security configuration in GitLab
  - GitLab Monitoring and Maintenance
  - Disaster Recovery and High Availability
  - Gitlab Runners setup for Gitlab CI/CD
  `,
}

export const calendlySection = {
  title: "### Schedule a **Free Health Check**",
  url: "https://calendly.com/embed-demo-sales/discovery-call",
}

/**
 * @see https://embedresponsively.com/
 */
export const youtubeSection = {
  html: `<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed//byPYe4Fccww' frameborder='0' allowfullscreen></iframe></div>`,
  title: `Watch our latest video on YouTube`,
  text: `Adfinis is a Swiss IT service provider specializing in open-source software solutions. With a strong commitment to innovation and sustainability, Adfinis offers consulting, development, and managed services to help organizations optimize their IT environments. Our team of experts is dedicated to delivering cutting-edge technology services that enhance operational efficiency and drive digital transformation. Discover how Adfinis can unlock your organization's potential by watching our latest video on YouTube.`,
}

export const footer = {
  columns: [
    {
      title: "Adfinis",
      text: `Adfinis is a Swiss IT service provider with a strong focus on open source software. We offer consulting, development, and managed services for a wide range of technologies. 

Our team of experts is dedicated to providing innovative and sustainable solutions to help organizations optimize their IT environments and boost operational efficiency.`,
      links: [],
    },
    {
      title: "Solutions",
      text: undefined,
      links: [
        {
          text: "Cloud Journey",
          href: "/cloud-journey",
        },
        {
          text: "Security Journey",
          href: "/security-journey",
        },
        {
          text: "System Automation Journey",
          href: "/system-automation-journey",
        },
        {
          text: "Digital Sovereignty Journey",
          href: "/digital-sovereignty-journey",
        },
        {
          text: "Form & Workflow Journey",
          href: "/form-workflow-journey",
        },
        {
          text: "Developer Journey",
          href: "/developer-journey",
        },
        {
          text: "SLA's",
          href: "/sla",
        },
      ],
    },
    {
      title: "Partners & Products",
      text: undefined,
      links: [
        {
          text: "HashiCorp",
          href: "/hashicorp",
        },
        {
          text: "Red Hat",
          href: "/red-hat",
        },
        {
          text: "SUSE",
          href: "/suse",
        },
        {
          text: "GitLab",
          href: "/gitlab",
        },
        {
          text: "Cloud services",
          href: "/cloud-services",
        },
        {
          text: "Additional partners",
          href: "/additional-partners",
        },
      ],
    },
    {
      title: "About",
      text: undefined,
      links: [
        {
          text: "About Adfinis",
          href: "/about",
        },
        {
          text: "Team",
          href: "/team",
        },
        {
          text: "Vacancies",
          href: "/vacancies",
        },
        {
          text: "Contact",
          href: "/contact",
        },
      ],
    },
  ],
  icons: [
    {
      name: "linkedin",
      href: "https://www.linkedin.com/company/adfinis/",
    },
    {
      name: "github",
      href: "https://github.com/adfinis",
    },
    {
      name: "youtube",
      href: "https://www.youtube.com/@adfinis",
    },
  ],
  privacyPolicy: {
    text: "Privacy Policy",
    href: "/privacy-policy",
  },
} as const
