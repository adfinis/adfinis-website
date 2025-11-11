import Link from "next/link"
import React from "react"
import IconSocial from "./icons/icon-social"

/**
 * @info for now we hard-code the social media links. In the future, we might want to make this dynamic.
 */
const SocialsGroup: React.FC = () => {
  return (
    <div className="flex space-x-4 justify-center text-stone">
      <Link
        href="https://www.linkedin.com/company/adfinis-com"
        className="rounded-full bg-white p-3 grid place-items-center"
      >
        <IconSocial type={`linkedin`} className="w-4 h-4" />
        <span className="sr-only">LinkedIn</span>
      </Link>
      <Link
        href="https://github.com/adfinis"
        className="rounded-full bg-white p-3 grid place-items-center"
      >
        <IconSocial type={`github`} className="w-4 h-4" />
        <span className="sr-only">GitHub</span>
      </Link>
      <Link
        href="https://www.youtube.com/@adfinis"
        className="rounded-full bg-white p-3 grid place-items-center"
      >
        <IconSocial type={`youtube`} className="w-4 h-4" />
        <span className="sr-only">YouTube</span>
      </Link>
    </div>
  )
}
export default SocialsGroup
