"use client"

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer"
import Title from "@/components/title"
export default function RichBlocks({ content }: { content: BlocksContent }) {
  if (!content) return null
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
            case 2:
            case 3:
              return <Title level={level}>{children}</Title>
            case 4:
              return <h4>{children}</h4>
            case 5:
              return <h5>{children}</h5>
            case 6:
              return <h6>{children}</h6>
            default:
              return <h1>{children}</h1>
          }
        },
        // code: ({ children }) => {
        //   return <>CODE BLOCKKKKK {children}</>
        // },
        paragraph: ({ children }) => {
          return <p className={"mb-4"}>{children}</p>
        },
      }}
    />
  )
}
