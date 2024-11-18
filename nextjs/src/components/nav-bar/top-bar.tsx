import clsx from "clsx"
import Logo from "@/components/logo"
import ActionWrappers from "@/components/nav-bar/action-wrappers"

export default function TopBar() {
  return (
    <div className="hidden lg:grid  divide-y divide-jumbo/30 pr-[50px]">
      <section
        className={clsx([
          "min-h-16 h-16 py-4 transition-all duration-150 flex justify-between items-center",
          "min-h-[90px]",
        ])}
      >
        <Logo color="biscay" variant="horizontal" />
        <ActionWrappers />
      </section>
    </div>
  )
}
