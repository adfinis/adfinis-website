import React from "react"

const IconMaps: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      fill="none"
      height="30"
      viewBox="0 0 30 30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <clipPath id="a">
        <path d="m0 0h30v30h-30z" />
      </clipPath>
      <g clipPath="url(#a)" fill="currentColor">
        <path d="m15 5.46661c-.8216 0-1.6123.24715-2.2867.71473-.1993.13822-.2497.41309-.1125.61395s.41.2516.6094.11343c.5275-.3658 1.1464-.55916 1.7898-.55916 1.7434 0 3.1617 1.42899 3.1617 3.18545 0 1.75649-1.4183 3.18549-3.1617 3.18549s-3.1618-1.429-3.1618-3.18549c0-.51814.1195-1.01209.3549-1.46806.1117-.21633.0283-.48288-.1864-.59537-.2147-.11245-.4792-.02848-.5909.18785-.2969.57492-.4539 1.22349-.4539 1.87558.0001 2.24339 1.8115 4.06849 4.0381 4.06849 2.2265 0 4.0379-1.8251 4.0379-4.06849 0-2.24332-1.8114-4.0684-4.0379-4.0684z" />
        <path d="m29.9663 29.3889-4.3244-10.4686c-.068-.1646-.2275-.2718-.4045-.2718h-4.3094c.8382-1.1425 1.5359-2.2805 2.0807-3.3978.9657-1.9801 1.4552-3.9031 1.4552-5.71562 0-5.25768-4.2455-9.53508-9.4639-9.53508-5.21845 0-9.46392 4.2774-9.46392 9.53502 0 1.81258.48955 3.73558 1.45518 5.71568.5448 1.1173 1.24248 2.2553 2.08072 3.3977h-4.30939c-.17696 0-.33657.1073-.40448.2718l-2.94679 7.1336c-.09299.2251.01271.4835.23613.5771.05508.0231.11203.0341.16816.0341.17168 0 .33463-.1023.40465-.272l.42047-1.0179h2.98277l-1.5457 3.742h-2.98271l.44806-1.0848c.09299-.2251-.01271-.4835-.23613-.5771-.22353-.0939-.479941.0128-.572871.2378l-.700488 1.6959c-.0563086.1363-.04130862.2919.0400195.4146.0812105.1227.2179685.1965.3644535.1965h29.123666c.1464 0 .2832-.0738.3645-.1965s.0963-.2783.04-.4146zm-23.55389-19.85388c0-4.77082 3.85239-8.652129 8.58759-8.652129s8.5875 3.881369 8.5875 8.652129c0 2.00058-.6899 5.19748-3.8815 9.27138-.0032.0038-.0061.0078-.0092.0117-.163.2079-.3323.4179-.5086.6303-1.7538 2.113-3.5286 3.656-4.1883 4.2042-.6577-.5463-2.4241-2.0815-4.1767-4.1905-.1807-.2175-.3541-.4324-.5209-.6451-.0027-.0034-.0052-.0069-.008-.0103-3.19148-4.0736-3.88189-7.2704-3.88189-9.27168zm-1.35762 9.99628h2.98284l-1.08797 2.6337h-2.98278zm2.56219 9.5858 2.73872-6.6298 7.7938 6.6298zm11.89092 0-9.0441-7.6934c-.1067-.0908-.2502-.1249-.3858-.0917-.13567.0331-.2477.1295-.30131.2594l-3.10881 7.5257h-1.64086l1.65797-4.0138c.05631-.1363.04131-.2918-.04002-.4146-.08121-.1227-.21803-.1965-.36451-.1965h-3.27487l.59661-1.4443h3.63972c.17696 0 .33656-.1073.40447-.2719l1.3404-3.2447h.76043c.13201.1658.26618.3317.40398.4975 2.2608 2.7205 4.487 4.4671 4.5806 4.5402.079.0616.1736.0923.2682.0923.0945 0 .1892-.0308.2681-.0923.0515-.0401.7475-.5865 1.7386-1.5211h4.9618c.242 0 .4382-.1976.4382-.4414s-.1962-.4415-.4382-.4415h-4.0587c.6075-.6154 1.2715-1.3329 1.939-2.1361.1378-.1659.272-.3317.404-.4976h4.6923l1.088 2.6337h-2.312c-.242 0-.4381.1977-.4381.4415s.1961.4414.4381.4414h2.6766l.5966 1.4443h-9.0275c-.1829 0-.3465.1144-.4105.287-.0639.1727-.0148.3671.1233.4879l4.4023 3.85zm3.9109 0-4.2788-3.7419h8.2191l1.5458 3.7419z" />
      </g>
    </svg>
  )
}

export default IconMaps
