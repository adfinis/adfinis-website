/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adfinis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adfinis-assets.ams3.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "adfinis-assets.ams3.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    dirs: ["src"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1200, must-revalidate", // 20 minutes
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // de-ch redirects
      {
        source: "/adservices/opensource-is-the-way-to-go",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/adservices/support",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/basler-kantonalbank-2",
        destination: "/de-ch/referenzen/basler-kantonalbank",
        permanent: true,
      },
      {
        source: "/bbz-bl-linux-client",
        destination: "/de-ch/referenzen/bbzbl",
        permanent: true,
      },
      {
        source:
          "/blog-with-headline/adfinis-bringt-snyk-in-die-schweiz-holland-und-australien",
        destination:
          "/de-ch/news/adfinis-bringt-snyk-in-die-schweiz-holland-und-australien",
        permanent: true,
      },
      {
        source:
          "/blog-with-headline/adfinis-expands-its-position-as-a-leading-hashicorp-partner",
        destination:
          "/de-ch/news/adfinis-expands-its-position-as-a-leading-hashicorp-partner",
        permanent: true,
      },
      {
        source:
          "/blog-with-headline/adfinis-und-owncloud-schliessen-partnerschaft",
        destination:
          "/de-ch/news/adfinis-und-owncloud-schliessen-partnerschaft",
        permanent: true,
      },
      {
        source:
          "/blog-with-headline/rascher-aufstieg-adfinis-ist-erster-gitlab-select-partner-in-der-schweiz",
        destination:
          "/de-ch/news/rascher-aufstieg-adfinis-ist-erster-gitlab-select-partner-in-der-schweiz",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source:
          "/blog/5-building-blocks-for-a-successful-terraform-implementation",
        destination:
          "/de-ch/news/5-building-blocks-for-a-successful-terraform-implementation",
        permanent: true,
      },
      {
        source:
          "/blog/adfinis-ernennt-einen-chief-strategy-growth-officer-und-einen-neuen-chief-commercial-officer",
        destination:
          "/de-ch/news/adfinis-ernennt-einen-chief-strategy-growth-officer-und-einen-neuen-chief-commercial-officer",
        permanent: true,
      },
      {
        source: "/blog/adfinis-erweitert-sein-service-portfolio-mit-element",
        destination:
          "/de-ch/news/adfinis-erweitert-sein-service-portfolio-mit-element",
        permanent: true,
      },
      {
        source: "/blog/adfinis-und-isovalent-gehen-partnerschaft-ein",
        destination:
          "/de-ch/news/adfinis-und-isovalent-gehen-partnerschaft-ein",
        permanent: true,
      },
      {
        source:
          "/blog/auszeichnung-fur-adfinis-als-hashicorp-emea-focus-partner-award-of-the-year",
        destination:
          "/de-ch/news/auszeichnung-fur-adfinis-als-hashicorp-emea-focus-partner-award-of-the-year",
        permanent: true,
      },
      {
        source: "/blog/automated-debian-packagebuild-gitlabci",
        destination: "/de-ch/news/automated-debian-packagebuild-gitlabci",
        permanent: true,
      },
      {
        source: "/blog/caluma-und-nachhaltige-entwicklung-von-graphql",
        destination:
          "/de-ch/news/caluma-und-nachhaltige-entwicklung-von-graphql",
        permanent: true,
      },
      {
        source: "/blog/collabora-office-on-ios-and-android-just-got-better",
        destination:
          "/de-ch/news/collabora-office-on-ios-and-android-just-got-better",
        permanent: true,
      },
      {
        source:
          "/blog/database-clustering-with-galera-cluster-and-galera-manager",
        destination:
          "/de-ch/news/database-clustering-with-galera-cluster-and-galera-manager",
        permanent: true,
      },
      {
        source: "/blog/decrypt-luks-devices-remotely-via-dropbear-ssh",
        destination:
          "/de-ch/news/decrypt-luks-devices-remotely-via-dropbear-ssh",
        permanent: true,
      },
      {
        source: "/blog/die-free-open-source-community-trauert-um-obri",
        destination:
          "/de-ch/news/die-free-open-source-community-trauert-um-obri",
        permanent: true,
      },
      {
        source:
          "/blog/die-open-source-konferenzloesung-jitsi-punktet-mit-sicherheit-und-datenschutz-bei-der-stiftung-mercator-schweiz",
        destination:
          "/de-ch/news/die-open-source-konferenzloesung-jitsi-punktet-mit-sicherheit-und-datenschutz-bei-der-stiftung-mercator-schweiz",
        permanent: true,
      },
      {
        source:
          "/blog/effort-by-adfinis-sygroup-and-collabora-bring-bits-of-staroffice-openoffice-and-libreoffice-to-the-world-of-apple-ios-and-ipad",
        destination:
          "/de-ch/news/effort-by-adfinis-sygroup-and-collabora-bring-bits-of-staroffice-openoffice-and-libreoffice-to-the-world-of-apple-ios-and-ipad",
        permanent: true,
      },
      {
        source:
          "/blog/ein-schneller-zuverlaessiger-und-vertrauenswuerdiger-mirror-fuer-linux-enthusiasten",
        destination:
          "/de-ch/news/ein-schneller-zuverlaessiger-und-vertrauenswuerdiger-mirror-fuer-linux-enthusiasten",
        permanent: true,
      },
      {
        source:
          "/blog/feature-sponsoring-ermoeglicht-anbindung-von-servicenow-an-zammad",
        destination:
          "/de-ch/news/feature-sponsoring-ermoeglicht-anbindung-von-servicenow-an-zammad",
        permanent: true,
      },
      {
        source: "/blog/finja-your-friendly-finding-ninja",
        destination: "/de-ch/news/finja-your-friendly-finding-ninja",
        permanent: true,
      },
      {
        source:
          "/blog/first-system-engineer-joins-adfinis-it-australia-pty-ltd",
        destination:
          "/de-ch/news/first-system-engineer-joins-adfinis-it-australia-pty-ltd",
        permanent: true,
      },
      {
        source: "/blog/form-validation-with-ember-js",
        destination: "/de-ch/news/form-validation-with-ember-js",
        permanent: true,
      },
      {
        source: "/blog/fosdem-2020-main-takeaways",
        destination: "/de-ch/news/fosdem-2020-main-takeaways",
        permanent: true,
      },
      {
        source: "/blog/german-interpretation-of-rfc-2119",
        destination: "/de-ch/news/german-interpretation-of-rfc-2119",
        permanent: true,
      },
      {
        source: "/blog/gitlab-adfinis",
        destination: "/de-ch/news/gitlab-adfinis",
        permanent: true,
      },
      {
        source: "/blog/gitlab-ci",
        destination: "/de-ch/news/gitlab-ci",
        permanent: true,
      },
      {
        source: "/blog/gitlab-services-partner-of-the-year-for-emea",
        destination: "/de-ch/news/gitlab-services-partner-of-the-year-for-emea",
        permanent: true,
      },
      {
        source: "/blog/gnupg-and-smartcards",
        destination: "/de-ch/news/gnupg-and-smartcards",
        permanent: true,
      },
      {
        source: "/blog/hashidays-munich-2023",
        destination: "/de-ch/news/hashidays-munich-2023",
        permanent: true,
      },
      {
        source: "/blog/hello-fosdem-2020-world",
        destination: "/de-ch/news/hello-fosdem-2020-world",
        permanent: true,
      },
      {
        source:
          "/blog/how-to-deploy-an-application-that-stores-its-state-in-a-persistent-service-on-cloud-foundry",
        destination:
          "/de-ch/news/how-to-deploy-an-application-that-stores-its-state-in-a-persistent-service-on-cloud-foundry",
        permanent: true,
      },
      {
        source: "/blog/how-to-deploy-suse",
        destination: "/de-ch/news/blogs/how-to-deploy-suse",
        permanent: true,
      },
      {
        source: "/blog/how-to-manage-secret-keys-with-hashicorp-vault",
        destination:
          "/de-ch/news/how-to-manage-secret-keys-with-hashicorp-vault",
        permanent: true,
      },
      {
        source: "/blog/how-to-prevent-cloud-lock-in-with-robert",
        destination: "/de-ch/news/how-to-prevent-cloud-lock-in-with-robert",
        permanent: true,
      },
      {
        source: "/blog/jazoon-techdays-2016",
        destination: "/de-ch/news/jazoon-techdays-2016",
        permanent: true,
      },
      {
        source: "/blog/jitsi-videoconference",
        destination: "/de-ch/news/jitsi-videoconference",
        permanent: true,
      },
      {
        source: "/blog/learnings-aus-produktiver-umgebung",
        destination: "/de-ch/news/learnings-aus-produktiver-umgebung",
        permanent: true,
      },
      {
        source: "/blog/libreoffice-on-ios-some-insights",
        destination: "/de-ch/news/libreoffice-on-ios-some-insights",
        permanent: true,
      },
      {
        source: "/blog/libreoffice-template-contest-2020",
        destination: "/de-ch/news/libreoffice-template-contest-2020",
        permanent: true,
      },
      {
        source: "/blog/linux-conf-au-2021",
        destination: "/de-ch/news/linux-conf-au-2021",
        permanent: true,
      },
      {
        source: "/blog/mailserver-security",
        destination: "/de-ch/news/mailserver-security",
        permanent: true,
      },
      {
        source: "/blog/mariadb-galera-cluster-on-openshift",
        destination: "/de-ch/news/mariadb-galera-cluster-on-openshift",
        permanent: true,
      },
      {
        source: "/blog/matrix",
        destination: "/de-ch/news/matrix",
        permanent: true,
      },
      {
        source: "/blog/mssql-on-linux-the-details",
        destination: "/de-ch/news/mssql-on-linux-the-details",
        permanent: true,
      },
      {
        source: "/blog/multi-factor-authentication",
        destination: "/de-ch/news/multi-factor-authentication",
        permanent: true,
      },
      {
        source: "/blog/mysql-mariadb-ha-galera-cluster-vs-drbd-replication",
        destination:
          "/de-ch/news/mysql-mariadb-ha-galera-cluster-vs-drbd-replication",
        permanent: true,
      },
      {
        source: "/blog/office365-google-docs-or-data-integrity",
        destination: "/de-ch/news/office365-google-docs-or-data-integrity",
        permanent: true,
      },
      {
        source: "/blog/open-source-software-in-der-cloud",
        destination: "/de-ch/news/open-source-software-in-der-cloud",
        permanent: true,
      },
      {
        source: "/blog/openssh-security",
        destination: "/de-ch/news/openssh-security",
        permanent: true,
      },
      {
        source: "/blog/openssl-x509-certificates",
        destination: "/de-ch/news/openssl-x509-certificates",
        permanent: true,
      },
      {
        source: "/blog/openvpn-with-gitlab-userdb",
        destination: "/de-ch/news/openvpn-with-gitlab-userdb",
        permanent: true,
      },
      {
        source: "/blog/our-view-on-toxicity-and-inclusion",
        destination: "/de-ch/news/our-view-on-toxicity-and-inclusion",
        permanent: true,
      },
      {
        source: "/blog/page/11",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/blog/page/4",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/blog/page/8",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/blog/page/9",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/blog/pyark-cyberark-enterprise-password-vault-cli-tool",
        destination:
          "/de-ch/news/pyark-cyberark-enterprise-password-vault-cli-tool",
        permanent: true,
      },
      {
        source: "/blog/release-and-patch-management-with-suse-manager-3",
        destination:
          "/de-ch/news/release-and-patch-management-with-suse-manager-3",
        permanent: true,
      },
      {
        source:
          "/blog/robert-de-bock-joins-adfinis-as-a-devops-architect-in-the-netherlands",
        destination:
          "/de-ch/news/robert-de-bock-joins-adfinis-as-a-devops-architect-in-the-netherlands",
        permanent: true,
      },
      {
        source: "/blog/secret-management-with-vault",
        destination: "/de-ch/news/secret-management-with-vault",
        permanent: true,
      },
      {
        source: "/blog/secret-zero-with-acme",
        destination: "/de-ch/news/blogs/secret-zero-with-acme",
        permanent: true,
      },
      {
        source: "/blog/ssl-certificate-monitoring-with-bash",
        destination: "/de-ch/news/ssl-certificate-monitoring-with-bash",
        permanent: true,
      },
      {
        source: "/blog/strace-performance-analysis",
        destination: "/de-ch/news/strace-performance-analysis",
        permanent: true,
      },
      {
        source: "/blog/suse-cloud-application-blog",
        destination: "/de-ch/news/suse-cloud-application-blog",
        permanent: true,
      },
      {
        source: "/blog/suse-enterprise-storage-2-ceph",
        destination: "/de-ch/news/suse-enterprise-storage-2-ceph",
        permanent: true,
      },
      {
        source: "/blog/susecon-2016",
        destination: "/de-ch/news/susecon-2016",
        permanent: true,
      },
      {
        source: "/blog/systemd-start-and-stop-dependencies",
        destination: "/de-ch/news/systemd-start-and-stop-dependencies",
        permanent: true,
      },
      {
        source: "/blog/terraform-and-ansible-a-great-combination",
        destination: "/de-ch/news/terraform-and-ansible-a-great-combination",
        permanent: true,
      },
      {
        source: "/blog/testing-with-pytest",
        destination: "/de-ch/news/testing-with-pytest",
        permanent: true,
      },
      {
        source:
          "/blog/the-impact-of-the-infrastructure-as-code-approach-on-your-organization",
        destination:
          "/de-ch/news/the-impact-of-the-infrastructure-as-code-approach-on-your-organization",
        permanent: true,
      },
      {
        source: "/blog/tmux-und-vim-im-homeoffice",
        destination: "/de-ch/news/tmux-und-vim-im-homeoffice",
        permanent: true,
      },
      {
        source: "/blog/ucs-ansible-modules",
        destination: "/de-ch/news/ucs-ansible-modules",
        permanent: true,
      },
      {
        source: "/blog/unsere-mission-vision",
        destination: "/de-ch/news/unsere-mission-vision",
        permanent: true,
      },
      {
        source: "/blog/webserver-security",
        destination: "/de-ch/news/webserver-security",
        permanent: true,
      },
      {
        source: "/blog/winners-of-the-libreoffice-template-contest-2020",
        destination:
          "/de-ch/news/winners-of-the-libreoffice-template-contest-2020",
        permanent: true,
      },
      {
        source: "/blog/yubikey-validation-server-setup",
        destination: "/de-ch/news/yubikey-validation-server-setup",
        permanent: true,
      },
      {
        source: "/blog/yubikeys",
        destination: "/de-ch/news/yubikeys",
        permanent: true,
      },
      {
        source: "/bundesgericht-jitsi",
        destination: "/de-ch/referenzen/swiss-federal-supreme-court-jitsi",
        permanent: true,
      },
      {
        source: "/bundesgericht-libreoffice",
        destination:
          "/de-ch/referenzen/swiss-federal-supreme-court-libreoffice",
        permanent: true,
      },
      {
        source: "/category/news",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/cloud-services",
        destination: "/de-ch/partner-und-produkte/partners",
        permanent: true,
      },
      {
        source: "/concordia",
        destination: "/de-ch/referenzen/concordia",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/de-ch/kontakt",
        permanent: true,
      },
      {
        source: "/customer-story_dectris",
        destination: "/de-ch/referenzen/dectris",
        permanent: true,
      },
      {
        source: "/cybersecurity",
        destination: "/de-ch/loesungen/security",
        permanent: true,
      },
      {
        source: "/datenschutzerklaerung",
        destination: "/de-ch/datenschutzerklaerung",
        permanent: true,
      },
      {
        source: "/dectris",
        destination: "/de-ch/referenzen/dectris",
        permanent: true,
      },
      {
        source: "/digital-sovereignty",
        destination: "/de-ch/loesungen/digital-sovereignty",
        permanent: true,
      },
      {
        source: "/events",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/16145",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/17720",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/adfinis-25-jahre-jubilaeum",
        destination: "/de-ch/events/25-years-adfinis",
        permanent: true,
      },
      {
        source: "/events/ansible-meetup-bern",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/bern-roadshow",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/cloud-foundry-on-azure",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/exclusive-switzerland-standing-apero",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/gitlab-roadshow-2024-zurich",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/global-azure-bootcamp-switzerland-2019",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/hashiconf-eu",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/hug-11-zero-trust-and-service-mesh-journey",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/hug-2-consul-packer-and-vault",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source:
          "/events/hug-8-gitlab-setup-w-terraform-localstack-for-testing-terraform",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/invitation-to-hashicorp-vault-workshop-in-zurich",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/isovalent-workshop-tour-2023",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/kubernetes-community-days-zuerich",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/kubernetes-multi-cluster-management-with-rancher",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/kubernetes-multi-cluster-management-with-suse",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/lets-talk-technical-suse-manager-security",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/levenment-connecte-lec-sitb-2019",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/microsoft-tech-summit-switzerland-2019",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source:
          "/events/red-hat-enterprise-linux-rhel-8-introduction-day-for-partners",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/red-hat-summit-connect-zurich-2024",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/red-hat-summit-connect",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/secrets-management-at-scale-with-hashicorp-vault",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source:
          "/events/secrets-management-at-scale-with-hashicorps-vault-on-suses-rancher",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/suse-expert-day-2019",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/susecon-2023",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source:
          "/events/talk-software-supply-chain-security-slsa-assessment-for-argo-cd",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/terraform-cloud-on-aws-virtual-workshop",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/terraform-hands-on",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/terraform-in-azure-2",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/understand-the-hype-kubernetes-in-60-minutes",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source:
          "/events/unlocking-the-cloud-operating-model-with-hashicorp-adfinis",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/vortrag-mit-armon-dadgar-cto-co-founder-hashicorp",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/events/what-you-mightve-missed-at-hashiconf-digital-2020",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/ginlab",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/gitlab",
        destination: "/de-ch/events",
        permanent: true,
      },
      {
        source: "/harness-the-power-of-open-source",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/hashicorp-terraform",
        destination: "/de-ch/partner-und-produkte/hashicorp",
        permanent: true,
      },
      {
        source: "/hashicorp-terraform/thank-you-adfinis-terraform-form",
        destination: "/de-ch/partner-und-produkte/hashicorp",
        permanent: true,
      },
      {
        source: "/hashicorp-vault",
        destination: "/de-ch/partner-und-produkte/hashicorp",
        permanent: true,
      },
      {
        source: "/hashicorp",
        destination: "/de-ch/partner-und-produkte/hashicorp",
        permanent: true,
      },
      {
        source: "/helvetia-linux-client",
        destination: "/de-ch/referenzen/helvetia",
        permanent: true,
      },
      {
        source: "/high-availability-story",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/hypothekarbank-lenzburg",
        destination: "/de-ch/referenzen/hbl",
        permanent: true,
      },
      {
        source: "/kanton-uri",
        destination: "/de-ch/referenzen/kanton-uri",
        permanent: true,
      },
      {
        source: "/kontakt",
        destination: "/de-ch/kontakt",
        permanent: true,
      },
      {
        source: "/linux-client",
        destination: "/de-ch/loesungen/linux-clients",
        permanent: true,
      },
      {
        source: "/linux-clients",
        destination: "/de-ch/loesungen/linux-clients",
        permanent: true,
      },
      {
        source: "/managed-services",
        destination: "/de-ch/loesungen/managed-services",
        permanent: true,
      },
      {
        source: "/more-solutions",
        destination: "/de-ch/loesungen",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-bringt-element-enterprise-als-saas-loesung-auf-den-markt",
        destination:
          "/de-ch/news/adfinis-bringt-element-enterprise-als-saas-loesung-auf-den-markt",
        permanent: true,
      },
      {
        source: "/news/adfinis-deutschland",
        destination: "/de-ch/news/adfinis-deutschland",
        permanent: true,
      },
      {
        source: "/news/adfinis-ernennt-michael-hofer-zum-neuen-cto",
        destination: "/de-ch/news/adfinis-ernennt-michael-hofer-zum-neuen-cto",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-erweitert-globale-praesenz-mit-neuer-niederlassung-in-aegypten",
        destination:
          "/de-ch/news/adfinis-erweitert-globale-praesenz-mit-neuer-niederlassung-in-aegypten",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-gewinnt-2024-den-gitlab-partner-of-the-year-award-fuer-apac",
        destination:
          "/de-ch/news/adfinis-gewinnt-2024-den-gitlab-partner-of-the-year-award-fuer-apac",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-gewinnt-ausschreibung-des-kantons-aargau-zur-implementierung-von-ebau-mit-inosca",
        destination:
          "/de-ch/news/adfinis-gewinnt-ausschreibung-des-kantons-aargau-zur-implementierung-von-ebau-mit-inosca",
        permanent: true,
      },
      {
        source: "/news/adfinis-ist-red-hats-best-swiss-partner-2019",
        destination: "/de-ch/news/adfinis-ist-red-hats-best-swiss-partner-2019",
        permanent: true,
      },
      {
        source: "/news/adfinis-sygroup-ist-red-hat-premier-partner",
        destination: "/de-ch/news/adfinis-sygroup-ist-red-hat-premier-partner",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-sygroup-schliesst-sich-dem-hashicorp-partnerprogramm-an-und-wird-erster-schweizer-partner",
        destination:
          "/de-ch/news/adfinis-sygroup-schliesst-sich-dem-hashicorp-partnerprogramm-an-und-wird-erster-schweizer-partner",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-sygroup-und-mattermost-feiern-ihre-einjaehrige-partnerschaft",
        destination:
          "/de-ch/news/adfinis-sygroup-und-mattermost-feiern-ihre-einjaehrige-partnerschaft",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-sygroup-und-nextcloud-schliessen-strategische-partnerschaft",
        destination:
          "/de-ch/news/adfinis-sygroup-und-nextcloud-schliessen-strategische-partnerschaft",
        permanent: true,
      },
      {
        source:
          "/news/adfinis-sygroup-wird-mit-dem-suse-innovationspreise-ausgezeichnet",
        destination:
          "/de-ch/news/adfinis-sygroup-wird-mit-dem-suse-innovationspreise-ausgezeichnet",
        permanent: true,
      },
      {
        source: "/news/container-wie-sich-bekannte-technik-zum-hype-mauserte",
        destination:
          "/de-ch/news/container-wie-sich-bekannte-technik-zum-hype-mauserte",
        permanent: true,
      },
      {
        source:
          "/news/das-neue-microsoft-und-wie-die-schweizer-open-source-community-davon-profitiert",
        destination:
          "/de-ch/news/das-neue-microsoft-und-wie-die-schweizer-open-source-community-davon-profitiert",
        permanent: true,
      },
      {
        source: "/news/ein-einhorn-draengt-in-die-devops-welt",
        destination: "/de-ch/news/ein-einhorn-draengt-in-die-devops-welt",
        permanent: true,
      },
      {
        source:
          "/news/freedomvote-schafft-klarheit-in-fragen-zur-digitalisierung-für-die-wahl-2019",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source:
          "/news/hashicorp-vault-on-exoscale-scalable-kubernetes-service-sks",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source:
          "/news/mit-e-wigl-ermoeglichen-wir-lernen-damit-beginnt-für-fachlehrpersonen-und-lernende-eine-reise-in-die-digitale-zukunft",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/news/page/14",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/news/page/21",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/news/page/3",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/news/page/6",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/news/page/7",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/news/ralf-scharly-wird-verwaltungsratsmitglied-der-adfinis",
        destination:
          "/de-ch/news/ralf-scharly-wird-verwaltungsratsmitglied-der-adfinis",
        permanent: true,
      },
      {
        source: "/news/red-hat-forum-2019-netzwoche",
        destination: "/de-ch/news/red-hat-forum-2019-netzwoche",
        permanent: true,
      },
      {
        source:
          "/news/red-hat-kuert-adfinis-sygroup-zum-best-swiss-partner-of-the-year",
        destination:
          "/de-ch/news/red-hat-kuert-adfinis-sygroup-zum-best-swiss-partner-of-the-year",
        permanent: true,
      },
      {
        source:
          "/news/seit-januar-2019-ist-adfinis-sygroup-auch-in-der-romandie",
        destination:
          "/de-ch/news/seit-januar-2019-ist-adfinis-sygroup-auch-in-der-romandie",
        permanent: true,
      },
      {
        source: "/news/softwareone-und-adfinis-sygroup-gehen-partnerschaft-ein",
        destination:
          "/de-ch/news/softwareone-und-adfinis-sygroup-gehen-partnerschaft-ein",
        permanent: true,
      },
      {
        source: "/news/we-won-suses-best-application-delivery-award",
        destination: "/de-ch/news/we-won-suses-best-application-delivery-award",
        permanent: true,
      },
      {
        source:
          "/news/wie-unternehmen-den-sprung-in-die-neue-sap-welt-schaffen",
        destination:
          "/de-ch/news/wie-unternehmen-den-sprung-in-die-neue-sap-welt-schaffen",
        permanent: true,
      },
      {
        source: "/news/wir-sind-microsoft-gold-partner",
        destination: "/de-ch/news/wir-sind-microsoft-gold-partner",
        permanent: true,
      },
      {
        source: "/nouveau-test-a-domicile",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/nts-workspace",
        destination: "/de-ch/referenzen/nts-workspace",
        permanent: true,
      },
      {
        source: "/owncloud",
        destination: "/de-ch/partner-und-produkte/partners",
        permanent: true,
      },
      {
        source: "/red-hat-ansible-short",
        destination: "/de-ch/partner-und-produkte/red-hat",
        permanent: true,
      },
      {
        source: "/red-hat-ansible",
        destination: "/de-ch/partner-und-produkte/red-hat",
        permanent: true,
      },
      {
        source: "/red-hat-openshift",
        destination: "/de-ch/partner-und-produkte/red-hat",
        permanent: true,
      },
      {
        source: "/red-hat-subscriptions",
        destination: "/de-ch/partner-und-produkte/red-hat",
        permanent: true,
      },
      {
        source: "/red-hat",
        destination: "/de-ch/partner-und-produkte/red-hat",
        permanent: true,
      },
      {
        source: "/referenzen",
        destination: "/de-ch/referenzen",
        permanent: true,
      },
      {
        source: "/roche",
        destination: "/de-ch/referenzen/roche",
        permanent: true,
      },
      {
        source: "/s4hana",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/services/managed-service",
        destination: "/de-ch/loesungen/managed-services",
        permanent: true,
      },
      {
        source: "/solutions",
        destination: "/de-ch/loesungen",
        permanent: true,
      },
      {
        source: "/success-story-sbb",
        destination: "/de-ch/referenzen/page-case-study",
        permanent: true,
      },
      {
        source: "/supermicro",
        destination: "/de-ch/partner-und-produkte/supermicro",
        permanent: true,
      },
      {
        source: "/suse-manager",
        destination: "/de-ch/partner-und-produkte/suse",
        permanent: true,
      },
      {
        source: "/suse-neuvector",
        destination: "/de-ch/partner-und-produkte/suse",
        permanent: true,
      },
      {
        source: "/suse-rancher",
        destination: "/de-ch/partner-und-produkte/suse",
        permanent: true,
      },
      {
        source: "/suse",
        destination: "/de-ch/partner-und-produkte/suse",
        permanent: true,
      },
      {
        source: "/tag/caasp-2",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/tag/kubernetes",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/tag/middleware",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/tag/suse-2",
        destination: "/de-ch/partner-und-produkte/suse",
        permanent: true,
      },
      {
        source: "/terraform-trainings",
        destination: "/de-ch/partner-und-produkte/hashicorp",
        permanent: true,
      },
      {
        source: "/the-automated-enterprise",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/ueber-uns",
        destination: "/de-ch/ueber-uns",
        permanent: true,
      },
      {
        source: "/ueber-uns/branding",
        destination: "/de-ch/ueber-uns",
        permanent: true,
      },
      {
        source: "/ueber-uns/jobs",
        destination: "/de-ch/karriere",
        permanent: true,
      },
      {
        source: "/ueber-uns/jobs/marketing-specialist",
        destination: "/de-ch/karriere",
        permanent: true,
      },
      {
        source: "/ueber-uns/jobs/praktikum-marketing-kommunikation-m-w-40-60",
        destination: "/de-ch/karriere",
        permanent: true,
      },
      {
        source: "/ueber-uns/jobs/senior-linux-system-engineer-m-w-80-100",
        destination: "/de-ch/karriere",
        permanent: true,
      },
      {
        source: "/ueber-uns/jobs/software-engineer-backend-m-w-80-100",
        destination: "/de-ch/karriere",
        permanent: true,
      },
      {
        source: "/ueber-uns/jobs/software-engineer-frontend-m-w-80-100",
        destination: "/de-ch/karriere",
        permanent: true,
      },
      {
        source: "/ueber-uns/jobs/verkaufsadministration",
        destination: "/de-ch/karriere",
        permanent: true,
      },
      {
        source: "/ueber-uns/news",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/ueber-uns/news/page/9",
        destination: "/de-ch/news",
        permanent: true,
      },
      {
        source: "/ueber-uns/team",
        destination: "/de-ch/unser-team",
        permanent: true,
      },
      {
        source: "/ueber-uns/unser-engagement",
        destination: "/de-ch/our-commitment",
        permanent: true,
      },
      {
        source:
          "/unkategorisiert/adfinis-awarded-gitlab-services-partner-of-the-year-for-emea",
        destination:
          "/de-ch/news/adfinis-awarded-gitlab-services-partner-of-the-year-for-emea",
        permanent: true,
      },
      {
        source:
          "/unkategorisiert/adfinis-erweitert-globale-praesenz-mit-neuer-niederlassung-in-aegypten",
        destination:
          "/de-ch/news/adfinis-erweitert-globale-praesenz-mit-neuer-niederlassung-in-aegypten",
        permanent: true,
      },
      {
        source: "/vault_basler_kantonalbank_bkb",
        destination: "/de-ch/referenzen/basler-kantonalbank",
        permanent: true,
      },
      {
        source: "/viollier-devopsjourney",
        destination: "/de-ch/referenzen/viollier-hashicorp",
        permanent: true,
      },
      {
        source: "/viollier",
        destination: "/de-ch/referenzen/viollier-suse-multi-linux-manager",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2017/05/Pressemitteilung_Nextcloud-Partnerschaft.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2018/11/job_Linux_System_Engineer_m⁄w_80-100.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2018/11/successstory_Camac_AdfinisSyGroup_.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/sites/9/2018/12/HashiCorp_Adfinis_EN.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/sites/9/2018/12/HashiCorp_adfinis.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2018/12/PM_SUSE-Innovationspreis_14.02.2017.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2018/12/PressRelease_Mattermost_.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2018/12/successstory_NTS_link-neu_DE_.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2019/01/PremierPartnerschaft_RedHat_Adfinis.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/sites/9/2019/03/AGB_SIK_vaj.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2019/03/Pressemitteilung_Edificom_Adfinis_DE.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2019/03/Pressemitteilung_Edificom_Adfinis_EN.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/sites/9/2019/04/wigl-day.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/sites/9/2019/05/WO-callout.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/sites/9/2021/06/VaultRancher.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2022/06/GinLab_Sildes_June2022.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2022/10/Privacy-Policy-Australia_221012.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      {
        source:
          "/wp-content/uploads/sites/9/2023/05/CNI-switch-to-Cilium-Presentation.pdf",
        destination: "/de-ch/",
        permanent: true,
      },
      // en redirects
      {
        source: "/en/15-reasons-to-adopt-red-hat-openshift-virtualization",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/9-reasons-to-explore-red-hat-enterprise-linux-9",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/about-us/branding",
        destination: "/en/about-us",
        permanent: true,
      },
      {
        source: "/en/about-us/jobs",
        destination: "/en/career",
        permanent: true,
      },
      {
        source: "/en/about-us/jobs/praktikum-marketing-kommunikation-m-w-40-60",
        destination: "/en/career",
        permanent: true,
      },
      {
        source: "/en/about-us/jobs/senior-linux-system-engineer-m-w-80-100",
        destination: "/en/career",
        permanent: true,
      },
      {
        source: "/en/about-us/jobs/software-engineer-backend-m-w-80-100",
        destination: "/en/career",
        permanent: true,
      },
      {
        source: "/en/about-us/jobs/software-engineer-frontend-m-w-80-100",
        destination: "/en/career",
        permanent: true,
      },
      {
        source: "/en/about-us/news",
        destination: "/en/news",
        permanent: true,
      },
      {
        source: "/en/about-us/news/page/7",
        destination: "/en/news",
        permanent: true,
      },
      {
        source: "/en/about-us/our-engagement",
        destination: "/en/our-commitment",
        permanent: true,
      },
      {
        source: "/en/about-us/team",
        destination: "/en/our-team",
        permanent: true,
      },
      {
        source: "/en/adservices/caluma",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/adservices/container-orchestration-ci-cd-pipelines",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/adservices/open-source-consulting",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/adservices/support",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/ai-policy-and-implementation-meetup",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/ansible-beginners-guide",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/basler-kantonalbank",
        destination: "/en/case-studies/basler-kantonalbank",
        permanent: true,
      },
      {
        source: "/en/bbz-bl-linux-client",
        destination: "/en/case-studies/bbzbl",
        permanent: true,
      },
      {
        source: "/en/blog-with-headline/adfinis-and-owncloud-form-partnership",
        destination: "/en/news/adfinis-and-owncloud-form-partnership",
        permanent: true,
      },
      {
        source:
          "/en/blog-with-headline/adfinis-brings-snyk-to-australia-switzerland-and-the-netherlands",
        destination:
          "/en/news/adfinis-brings-snyk-to-australia-switzerland-and-the-netherlands",
        permanent: true,
      },
      {
        source:
          "/en/blog-with-headline/adfinis-expands-its-position-as-a-leading-hashicorp-partner",
        destination:
          "/en/news/adfinis-expands-its-position-as-a-leading-hashicorp-partner",
        permanent: true,
      },
      {
        source: "/en/blog-with-headline/kubecon-2023-in-amsterdam",
        destination: "/en/news/kubecon-2023-in-amsterdam",
        permanent: true,
      },
      {
        source: "/en/blog-with-headline/our-view-on-toxicity-and-inclusion",
        destination: "/en/news/our-view-on-toxicity-and-inclusion",
        permanent: true,
      },
      {
        source: "/en/blog",
        destination: "/en/news",
        permanent: true,
      },
      {
        source:
          "/en/blog/5-building-blocks-for-a-successful-terraform-implementation",
        destination:
          "/en/news/5-building-blocks-for-a-successful-terraform-implementation",
        permanent: true,
      },
      {
        source:
          "/en/blog/a-fast-reliable-and-trustworthy-mirror-for-linux-enthusiasts",
        destination:
          "/en/news/a-fast-reliable-and-trustworthy-mirror-for-linux-enthusiasts",
        permanent: true,
      },
      {
        source: "/en/blog/adfinis-adds-element-to-its-portfolio-of-services",
        destination:
          "/en/news/adfinis-adds-element-to-its-portfolio-of-services",
        permanent: true,
      },
      {
        source:
          "/en/blog/adfinis-and-collabora-10-years-of-driving-innovation-and-shaping-the-digital-sovereignty-landscape",
        destination:
          "/en/news/adfinis-and-collabora-10-years-of-driving-innovation-and-shaping-the-digital-sovereignty-landscape",
        permanent: true,
      },
      {
        source:
          "/en/blog/adfinis-appoints-a-chief-strategy-growth-officer-and-a-new-chief-commercial-officer",
        destination:
          "/en/news/adfinis-appoints-a-chief-strategy-growth-officer-and-a-new-chief-commercial-officer",
        permanent: true,
      },
      {
        source:
          "/en/blog/adfinis-awarded-gitlab-services-partner-of-the-year-for-emea",
        destination:
          "/en/news/adfinis-awarded-gitlab-services-partner-of-the-year-for-emea",
        permanent: true,
      },
      {
        source: "/en/blog/adfinis-enters-into-partnership-with-isovalent",
        destination: "/en/news/adfinis-enters-into-partnership-with-isovalent",
        permanent: true,
      },
      {
        source: "/en/blog/adfinis-ernennt-michael-hofer-zum-neuen-cto",
        destination: "/en/",
        permanent: true,
      },
      {
        source:
          "/en/blog/adfinis-receives-the-hashicorp-emea-focus-partner-of-the-year-award",
        destination:
          "/en/news/adfinis-receives-the-hashicorp-emea-focus-partner-of-the-year-award",
        permanent: true,
      },
      {
        source: "/en/blog/automated-debian-packagebuild-gitlabci",
        destination: "/en/news/automated-debian-packagebuild-gitlabci",
        permanent: true,
      },
      {
        source: "/en/blog/caluma-and-sustainable-development-of-graphql",
        destination: "/en/news/caluma-and-sustainable-development-of-graphql",
        permanent: true,
      },
      {
        source: "/en/blog/cni-switch-kubespray-cluster-to-cilium-at-dectris",
        destination:
          "/en/news/cni-switch-kubespray-cluster-to-cilium-at-dectris",
        permanent: true,
      },
      {
        source: "/en/blog/collabora-office-on-ios-and-android-just-got-better",
        destination:
          "/en/news/collabora-office-on-ios-and-android-just-got-better",
        permanent: true,
      },
      {
        source:
          "/en/blog/database-clustering-with-galera-cluster-and-galera-manager",
        destination:
          "/en/news/database-clustering-with-galera-cluster-and-galera-manager",
        permanent: true,
      },
      {
        source: "/en/blog/decrypt-luks-devices-remotely-via-dropbear-ssh",
        destination: "/en/news/decrypt-luks-devices-remotely-via-dropbear-ssh",
        permanent: true,
      },
      {
        source: "/en/blog/django-girls-workshop-zurich-2017",
        destination: "/en/news/django-girls-workshop-zurich-2017",
        permanent: true,
      },
      {
        source: "/en/blog/emberfest-berlin-2017",
        destination: "/en/news/emberfest-berlin-2017",
        permanent: true,
      },
      {
        source:
          "/en/blog/feature-sponsoring-allows-integration-of-servicenow-into-zammad",
        destination:
          "/en/news/feature-sponsoring-allows-integration-of-servicenow-into-zammad",
        permanent: true,
      },
      {
        source: "/en/blog/finja-your-friendly-finding-ninja",
        destination: "/en/news/finja-your-friendly-finding-ninja",
        permanent: true,
      },
      {
        source: "/en/blog/form-validation-with-ember-js",
        destination: "/en/news/form-validation-with-ember-js",
        permanent: true,
      },
      {
        source: "/en/blog/german-interpretation-of-rfc-2119",
        destination: "/en/news/german-interpretation-of-rfc-2119",
        permanent: true,
      },
      {
        source:
          "/en/blog/gitlab-and-adfinis-are-now-partners-and-promote-devops-enablement",
        destination:
          "/en/news/gitlab-and-adfinis-are-now-partners-and-promote-devops-enablement",
        permanent: true,
      },
      {
        source: "/en/blog/gitlab-ci",
        destination: "/en/news/gitlab-ci",
        permanent: true,
      },
      {
        source: "/en/blog/gitlab-services-partner-of-the-year-for-emea",
        destination: "/en/news/gitlab-services-partner-of-the-year-for-emea",
        permanent: true,
      },
      {
        source: "/en/blog/gnupg-and-smartcards",
        destination: "/en/news/gnupg-and-smartcards",
        permanent: true,
      },
      {
        source: "/en/blog/hashiconf-europe-2019",
        destination: "/en/news/hashiconf-europe-2019",
        permanent: true,
      },
      {
        source: "/en/blog/homeoffice-with-tmux-and-vim",
        destination: "/en/news/homeoffice-with-tmux-and-vim",
        permanent: true,
      },
      {
        source: "/en/blog/how-to-deploy-suse",
        destination: "/en/news/how-to-deploy-suse",
        permanent: true,
      },
      {
        source:
          "/en/blog/how-to-set-up-your-own-matrix-org-homeserver-with-federation",
        destination:
          "/en/news/how-to-set-up-your-own-matrix-org-homeserver-with-federation",
        permanent: true,
      },
      {
        source: "/en/blog/jitsi-videoconference",
        destination: "/en/news/jitsi-videoconference",
        permanent: true,
      },
      {
        source: "/en/blog/libreoffice-on-ios-some-insights",
        destination: "/en/news/libreoffice-on-ios-some-insights",
        permanent: true,
      },
      {
        source: "/en/blog/libreoffice-template-contest-2020",
        destination: "/en/news/libreoffice-template-contest-2020",
        permanent: true,
      },
      {
        source: "/en/blog/linux-conf-au-2021",
        destination: "/en/news/linux-conf-au-2021",
        permanent: true,
      },
      {
        source:
          "/en/blog/mariadb-galera-cluster-on-red-hat-openshift-kubernetes",
        destination:
          "/en/news/mariadb-galera-cluster-on-red-hat-openshift-kubernetes",
        permanent: true,
      },
      {
        source: "/en/blog/matrix",
        destination: "/en/news/matrix",
        permanent: true,
      },
      {
        source: "/en/blog/mssql-on-linux-the-details",
        destination: "/en/news/mssql-on-linux-the-details",
        permanent: true,
      },
      {
        source: "/en/blog/multi-factor-authentication",
        destination: "/en/news/multi-factor-authentication",
        permanent: true,
      },
      {
        source: "/en/blog/mysql-mariadb-ha-galera-cluster-vs-drbd-replication",
        destination:
          "/en/news/mysql-mariadb-ha-galera-cluster-vs-drbd-replication",
        permanent: true,
      },
      {
        source: "/en/blog/office365-google-docs-or-data-integrity",
        destination: "/en/news/office365-google-docs-or-data-integrity",
        permanent: true,
      },
      {
        source: "/en/blog/openssh-security",
        destination: "/en/news/openssh-security",
        permanent: true,
      },
      {
        source: "/en/blog/openssl-x509-certificates",
        destination: "/en/news/openssl-x509-certificates",
        permanent: true,
      },
      {
        source: "/en/blog/openvpn-with-gitlab-userdb",
        destination: "/en/news/openvpn-with-gitlab-userdb",
        permanent: true,
      },
      {
        source:
          "/en/blog/operating-suse-cloud-application-platform-for-the-swiss-federal-government",
        destination:
          "/en/news/operating-suse-cloud-application-platform-for-the-swiss-federal-government",
        permanent: true,
      },
      {
        source: "/en/blog/our-mission-vision",
        destination: "/en/news/our-mission-vision",
        permanent: true,
      },
      {
        source: "/en/blog/page/10",
        destination: "/en/news",
        permanent: true,
      },
      {
        source: "/en/blog/page/3",
        destination: "/en/news",
        permanent: true,
      },
      {
        source: "/en/blog/pyark-cyberark-enterprise-password-vault-cli-tool",
        destination:
          "/en/news/pyark-cyberark-enterprise-password-vault-cli-tool",
        permanent: true,
      },
      {
        source:
          "/en/blog/rapid-advancement-adfinis-is-the-first-gitlab-select-partner-in-switzerland",
        destination:
          "/en/news/rapid-advancement-adfinis-is-the-first-gitlab-select-partner-in-switzerland",
        permanent: true,
      },
      {
        source: "/en/blog/release-and-patch-management-with-suse-manager-3",
        destination:
          "/en/news/release-and-patch-management-with-suse-manager-3",
        permanent: true,
      },
      {
        source: "/en/blog/rescue-disk-and-multi-boot-system",
        destination: "/en/news/rescue-disk-and-multi-boot-system",
        permanent: true,
      },
      {
        source:
          "/en/blog/robert-de-bock-joins-adfinis-as-a-devops-architect-in-the-netherlands",
        destination:
          "/en/news/robert-de-bock-joins-adfinis-as-a-devops-architect-in-the-netherlands",
        permanent: true,
      },
      {
        source: "/en/blog/secret-management-with-vault",
        destination: "/en/news/secret-management-with-vault",
        permanent: true,
      },
      {
        source:
          "/en/blog/secrets-management-at-swiss-federal-railways-sbb-with-hashicorp-vault",
        destination:
          "/en/news/secrets-management-at-swiss-federal-railways-sbb-with-hashicorp-vault",
        permanent: true,
      },
      {
        source: "/en/blog/ssl-certificate-monitoring-with-bash",
        destination: "/en/news/ssl-certificate-monitoring-with-bash",
        permanent: true,
      },
      {
        source: "/en/blog/strace-performance-analysis",
        destination: "/en/news/strace-performance-analysis",
        permanent: true,
      },
      {
        source: "/en/blog/suse-cloud-application-blog",
        destination: "/en/news/suse-cloud-application-blog",
        permanent: true,
      },
      {
        source: "/en/blog/suse-enterprise-storage-2-ceph",
        destination: "/en/news/suse-enterprise-storage-2-ceph",
        permanent: true,
      },
      {
        source: "/en/blog/susecon-2016",
        destination: "/en/news/susecon-2016",
        permanent: true,
      },
      {
        source: "/en/blog/systemd-start-and-stop-dependencies",
        destination: "/en/news/systemd-start-and-stop-dependencies",
        permanent: true,
      },
      {
        source: "/en/blog/terraform-and-ansible-a-great-combination",
        destination: "/en/news/terraform-and-ansible-a-great-combination",
        permanent: true,
      },
      {
        source: "/en/blog/testing-with-pytest",
        destination: "/en/news/testing-with-pytest",
        permanent: true,
      },
      {
        source:
          "/en/blog/the-document-foundation-welcomes-adfinis-sygroup-to-the-projects-advisory-board",
        destination:
          "/en/news/the-document-foundation-welcomes-adfinis-sygroup-to-the-projects-advisory-board",
        permanent: true,
      },
      {
        source:
          "/en/blog/the-impact-of-the-infrastructure-as-code-approach-on-your-organization",
        destination:
          "/en/news/the-impact-of-the-infrastructure-as-code-approach-on-your-organization",
        permanent: true,
      },
      {
        source: "/en/blog/trashed",
        destination: "/en/news/trashed",
        permanent: true,
      },
      {
        source: "/en/blog/ucs-ansible-modules",
        destination: "/en/news/ucs-ansible-modules",
        permanent: true,
      },
      {
        source: "/en/blog/web-server-security",
        destination: "/en/news/web-server-security",
        permanent: true,
      },
      {
        source: "/en/blog/year-of-the-linux-client",
        destination: "/en/news/year-of-the-linux-client",
        permanent: true,
      },
      {
        source: "/en/blog/yubikey-validation-server-setup",
        destination: "/en/news/yubikey-validation-server-setup",
        permanent: true,
      },
      {
        source: "/en/blog/yubikeys",
        destination: "/en/news/yubikeys",
        permanent: true,
      },
      {
        source: "/en/bundesgericht-jitsi",
        destination: "/en/case-studies/swiss-federal-supreme-court-jitsi",
        permanent: true,
      },
      {
        source: "/en/bundesgericht-libreoffice",
        destination: "/en/case-studies/swiss-federal-supreme-court-libreoffice",
        permanent: true,
      },
      {
        source: "/en/canton-uri",
        destination: "/en/case-studies/canton-of-uri",
        permanent: true,
      },
      {
        source: "/en/case-study-linux",
        destination: "/en/case-studies",
        permanent: true,
      },
      {
        source: "/en/category/blog/page/7",
        destination: "/en/news",
        permanent: true,
      },
      {
        source: "/en/category/news-en",
        destination: "/en/news",
        permanent: true,
      },
      {
        source: "/en/cilium-hands-on-workshop",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/cloud-services",
        destination: "/en/partners-and-products/partners",
        permanent: true,
      },
      {
        source: "/en/concordia",
        destination: "/en/case-studies/concordia",
        permanent: true,
      },
      {
        source: "/en/contact",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/en/customer-story_dectris",
        destination: "/en/case-studies/dectris",
        permanent: true,
      },
      {
        source: "/en/customer-story_hbl",
        destination: "/en/case-studies/hbl",
        permanent: true,
      },
      {
        source: "/en/cybersecurity",
        destination: "/en/cybersecurity/",
        permanent: true,
      },
      {
        source: "/en/dectris",
        destination: "/en/case-studies/dectris",
        permanent: true,
      },
      {
        source: "/en/digital-sovereignty",
        destination: "/en/solutions/digital-sovereignty",
        permanent: true,
      },
      {
        source: "/en/docker-hub-rate-limit",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/docker-hub-rate-limits",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/event-gitlab-duo",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/event-transforming-multi-linux-management",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/16145",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/17720",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/20-year-adfinis",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/4186",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/adfinis-25-years-anniversary",
        destination: "/en/events/adfinis-25-years-anniversary/",
        permanent: true,
      },
      {
        source: "/en/events/bern-roadshow",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/devsecops-world-tour",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/global-azure-bootcamp-switzerland-2019",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/hashiconf-eu",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/hug-2-consul-packer-and-vault",
        destination: "/en/events",
        permanent: true,
      },
      {
        source:
          "/en/events/hug-8-gitlab-setup-w-terraform-localstack-for-testing-terraform",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/isovalent-workshop-tour-2023",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/kubernetes-community-days-zuerich",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/kubernetes-multi-cluster-management-with-rancher",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/kubernetes-multi-cluster-management-with-suse",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/lec-2019-in-geneva-with-armon-dadgar",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/lets-talk-technical-suse-manager-security",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/microsoft-tech-summit-switzerland-2019",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/red-hat-forum-geneva-2019",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/red-hat-forum",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/red-hat-summit-connect-zurich-2024",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/red-hat-summit-connect",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/redhat-summit-connect",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/secrets-management-at-scale-with-hashicorp-vault",
        destination: "/en/events",
        permanent: true,
      },
      {
        source:
          "/en/events/secrets-management-at-scale-with-hashicorps-vault-on-rancher",
        destination: "/en/events",
        permanent: true,
      },
      {
        source:
          "/en/events/secrets-management-at-scale-with-vault-on-suses-rancher",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/suse-expert-days-2019-2",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/susecon-2023",
        destination: "/en/events",
        permanent: true,
      },
      {
        source:
          "/en/events/talk-software-supply-chain-security-slsa-assessment-for-argo-cd",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/terraform-cloud-on-azure-virtual-workshop",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/terraform-in-azure",
        destination: "/en/events",
        permanent: true,
      },
      {
        source:
          "/en/events/unlocking-the-cloud-operating-model-with-hashicorp-adfinis",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/vortrag-mit-armon-dadgar-cto-co-founder-hashicorp",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/what-you-mightve-missed-at-hashiconf-digital-2020",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/events/zero-trust-with-hashicorps-cto-armon-dadgar",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/gitlab",
        destination: "/en/partners-and-products/gitlab",
        permanent: true,
      },
      {
        source: "/en/gitlab/devsecops-gitlab",
        destination: "/en/partners-and-products/gitlab",
        permanent: true,
      },
      {
        source: "/en/harness-the-power-of-open-source-short",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/harness-the-power-of-open-source",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/hashicorp-terraform",
        destination: "/en/partners-and-products/hashicorp",
        permanent: true,
      },
      {
        source: "/en/hashicorp-terraform/thank-you-adfinis-terraform",
        destination: "/en/partners-and-products/hashicorp",
        permanent: true,
      },
      {
        source: "/en/hashicorp-vault",
        destination: "/en/partners-and-products/hashicorp",
        permanent: true,
      },
      {
        source: "/en/hashicorp-vault/book-a-techie",
        destination: "/en/partners-and-products/hashicorp",
        permanent: true,
      },
      {
        source: "/en/hashicorp",
        destination: "/en/partners-and-products/hashicorp",
        permanent: true,
      },
      {
        source: "/en/helvetia-linux-client",
        destination: "/en/case-studies/helvetia",
        permanent: true,
      },
      {
        source: "/en/high-availability-story",
        destination: "/en/case-studies",
        permanent: true,
      },
      {
        source: "/en/hypothekarbank-lenzburg",
        destination: "/en/case-studies/hbl",
        permanent: true,
      },
      {
        source: "/en/imprint",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/leverage-your-linux-choices",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/liberate-your-mixed-it-environment",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/linux-clients",
        destination: "/en/en/solutions/linux-clients",
        permanent: true,
      },
      {
        source: "/en/managed-services",
        destination: "/en/solutions/managed-services",
        permanent: true,
      },
      {
        source: "/en/meetup-brisbane",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/more-solutions",
        destination: "/en/solutions",
        permanent: true,
      },
      {
        source:
          "/en/news-en/a-consistent-approach-to-provision-secure-connect-and-run-any-infrastructure-for-any-application-with-hashicorp",
        destination:
          "/en/news/a-consistent-approach-to-provision-secure-connect-and-run-any-infrastructure-for-any-application-with-hashicorp",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-awarded-suses-solution-provider-of-the-year",
        destination:
          "/en/news/adfinis-awarded-suses-solution-provider-of-the-year",
        permanent: true,
      },
      {
        source: "/en/news-en/adfinis-ernennt-michael-hofer-zum-neuen-cto",
        destination: "/en/news/adfinis-ernennt-michael-hofer-zum-neuen-cto",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-expands-global-reach-with-new-subsidiary-in-egypt",
        destination:
          "/en/news/adfinis-expands-global-reach-with-new-subsidiary-in-egypt",
        permanent: true,
      },
      {
        source: "/en/news-en/adfinis-germany",
        destination: "/en/news/adfinis-germany",
        permanent: true,
      },
      {
        source: "/en/news-en/adfinis-is-red-hats-best-swiss-partner-2019",
        destination: "/en/news/adfinis-is-red-hats-best-swiss-partner-2019",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-launches-element-enterprise-as-a-saas-solution",
        destination:
          "/en/news/adfinis-launches-element-enterprise-as-a-saas-solution",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-sygroup-and-mattermost-celebrate-their-one-year-partnership",
        destination:
          "/en/news/adfinis-sygroup-and-mattermost-celebrate-their-one-year-partnership",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-sygroup-and-nextcloud-enter-into-partnership",
        destination:
          "/en/news/adfinis-sygroup-and-mattermost-celebrate-their-one-year-partnership",
        permanent: true,
      },
      {
        source: "/en/news-en/adfinis-sygroup-is-red-hat-premier-partner",
        destination: "/en/news/adfinis-sygroup-is-red-hat-premier-partner",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-sygroup-joins-hashicorp-partner-program-to-become-first-swiss-partner",
        destination:
          "/en/news/adfinis-sygroup-joins-hashicorp-partner-program-to-become-first-swiss-partner",
        permanent: true,
      },
      {
        source: "/en/news-en/adfinis-sygroup-wins-suse-innovation-award",
        destination: "/en/news/adfinis-sygroup-wins-suse-innovation-award",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-wins-2024-gitlab-partner-of-the-year-award-for-apac",
        destination:
          "/en/news/adfinis-wins-2024-gitlab-partner-of-the-year-award-for-apac",
        permanent: true,
      },
      {
        source:
          "/en/news-en/adfinis-wins-tender-from-canton-of-aargau-to-implement-ebau-with-inosca",
        destination:
          "/en/news/adfinis-wins-tender-from-canton-of-aargau-to-implement-ebau-with-inosca",
        permanent: true,
      },
      {
        source:
          "/en/news-en/how-companies-make-the-jump-into-the-new-sap-world",
        destination:
          "/en/news/how-companies-make-the-jump-into-the-new-sap-world",
        permanent: true,
      },
      {
        source: "/en/news-en/ralf-scharly-joins-adfinis-board-of-directors",
        destination: "/en/news/ralf-scharly-joins-adfinis-board-of-directors",
        permanent: true,
      },
      {
        source:
          "/en/news-en/since-january-2019-adfinis-sygroup-has-alsobeen-active-in-french-speaking-switzerland",
        destination:
          "/en/news/since-january-2019-adfinis-sygroup-has-alsobeen-active-in-french-speaking-switzerland",
        permanent: true,
      },
      {
        source:
          "/en/news-en/softwareone-and-adfinis-sygroup-announce-their-partnership",
        destination:
          "/en/news/softwareone-and-adfinis-sygroup-announce-their-partnership",
        permanent: true,
      },
      {
        source:
          "/en/news-en/the-new-microsoft-and-how-the-swiss-open-source-community-benefits-from-it",
        destination:
          "/en/news/the-new-microsoft-and-how-the-swiss-open-source-community-benefits-from-it",
        permanent: true,
      },
      {
        source:
          "/en/news-en/who-is-hashicorp-the-unicorn-that-talks-to-the-devops",
        destination:
          "/en/news/who-is-hashicorp-the-unicorn-that-talks-to-the-devops",
        permanent: true,
      },
      {
        source: "/en/nts-workspace",
        destination: "/en/case-studies/nts-workspace",
        permanent: true,
      },
      {
        source: "/en/owncloud",
        destination: "/en/partners-and-products/partners",
        permanent: true,
      },
      {
        source: "/en/owncloud/thank-you-adfinis-owncloud-form",
        destination: "/en/partners-and-products/partners",
        permanent: true,
      },
      {
        source: "/en/press",
        destination: "/en/about-us",
        permanent: true,
      },
      {
        source: "/en/privacypolicy-australia",
        destination: "/en/privacy-policy",
        permanent: true,
      },
      {
        source: "/en/privacypolicy",
        destination: "/en-au/privacy-policy",
        permanent: true,
      },
      {
        source: "/en/rancher-prime",
        destination: "/en/partners-and-products/suse",
        permanent: true,
      },
      {
        source: "/en/rancher-prime/thank-you-adfinis-suse-rancher-form",
        destination: "/en/partners-and-products/suse",
        permanent: true,
      },
      {
        source: "/en/red-hat-ansible",
        destination: "/en/partners-and-products/red-hat",
        permanent: true,
      },
      {
        source: "/en/red-hat-openshift",
        destination: "/en/partners-and-products/red-hat",
        permanent: true,
      },
      {
        source: "/en/red-hat-subscriptions",
        destination: "/en/en/red-hat-subscriptions",
        permanent: true,
      },
      {
        source: "/en/red-hat",
        destination: "/en/partners-and-products/red-hat",
        permanent: true,
      },
      {
        source: "/en/references",
        destination: "/en/case-studies",
        permanent: true,
      },
      {
        source: "/en/services",
        destination: "/en/solutions",
        permanent: true,
      },
      {
        source: "/en/services/managed-service",
        destination: "/en/solutions/managed-services",
        permanent: true,
      },
      {
        source: "/en/success-story-hbl",
        destination: "/en/case-studies/hbl",
        permanent: true,
      },
      {
        source: "/en/success-story-sbb",
        destination: "/en/case-studies/sbb",
        permanent: true,
      },
      {
        source: "/en/supermicro",
        destination: "/en/partners-and-products/supermicro",
        permanent: true,
      },
      {
        source: "/en/suse-manager-success-story",
        destination: "/en/case-studies/viollier-suse-multi-linux-manager",
        permanent: true,
      },
      {
        source: "/en/suse-manager",
        destination: "/en/partners-and-products/suse",
        permanent: true,
      },
      {
        source: "/en/suse-neuvector-short",
        destination: "/en/partners-and-products/suse",
        permanent: true,
      },
      {
        source: "/en/suse-neuvector",
        destination: "/en/partners-and-products/suse",
        permanent: true,
      },
      {
        source: "/en/suse-subscriptions",
        destination: "/en/partners-and-products/suse",
        permanent: true,
      },
      {
        source: "/en/suse",
        destination: "/en/partners-and-products/suse",
        permanent: true,
      },
      {
        source: "/en/transforming-multi-linux-management",
        destination: "/en/events",
        permanent: true,
      },
      {
        source:
          "/en/uncategorized/adfinis-expands-global-reach-with-new-subsidiary-in-egypt",
        destination:
          "/en/news/adfinis-expands-global-reach-with-new-subsidiary-in-egypt",
        permanent: true,
      },
      {
        source: "/en/vault_basler_kantonalbank_bkb",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/vault-subscriptions",
        destination: "/en/",
        permanent: true,
      },
      {
        source: "/en/viollier-devopsjourney",
        destination: "/en/case-studies/viollier-hashicorp",
        permanent: true,
      },
      {
        source: "/en/webinar-automating-with-suse-rancher-prime",
        destination: "/en/events",
        permanent: true,
      },
      {
        source: "/en/webinar-no-vendor-locking-for-kubernetes",
        destination: "/en/events",
        permanent: true,
      },
      // fr (depreciated)
      {
        source: "/fr/:path*",
        destination: "/en/",
        permanent: true,
      },
      // nl redirects
      {
        source: "/nl/adservices/caluma-caluma",
        destination: "/nl/",
        permanent: true,
      },
      {
        source: "/nl/adservices/ondersteuning",
        destination: "/nl/",
        permanent: true,
      },
      {
        source: "/nl/automation-health-check",
        destination: "/nl/",
        permanent: true,
      },
      {
        source: "/nl/basler-kantonalbank",
        destination: "/nl/casestudies/basler-kantonalbank",
        permanent: true,
      },
      {
        source:
          "/nl/blog-mit-uberschrift/adfinis-brengt-snyk-naar-zwitserland-nederland-en-australie",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/blog-mit-uberschrift/adfinis-expands-its-position-as-a-leading-hashicorp-partner",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/blog",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/blog/5-building-blocks-for-a-successful-terraform-implementation",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/blog/adfinis-awarded-gitlab-services-partner-of-the-year-for-emea",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/blog/adfinis-ontvangt-de-hashicorp-emea-focus-partner-of-the-year-award",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/blog/database-clustering-with-galera-cluster-and-galera-manager",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/blog/een-snelle-en-betrouwbare-mirror-voor-linux-gebruikers",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/blog/gitlab-ci",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/blog/gitlab-services-partner-of-the-year-for-emea",
        destination: "/nl/nieuws/gitlab-services-partner-of-the-year-for-emea",
        permanent: true,
      },
      {
        source: "/nl/blog/our-view-on-toxicity-and-inclusion",
        destination: "/nl/nieuws/our-view-on-toxicity-and-inclusion",
        permanent: true,
      },
      {
        source: "/nl/blog/page/3",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/category/blog/page/2",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/cloud-services",
        destination: "/nl/partners-en-producten/partners",
        permanent: true,
      },
      {
        source: "/nl/concordia",
        destination: "/nl/casestudies/concordia",
        permanent: true,
      },
      {
        source: "/nl/contact",
        destination: "/nl/contact",
        permanent: true,
      },
      {
        source: "/nl/customer-story_dectris",
        destination: "/nl/casestudies/dectris",
        permanent: true,
      },
      {
        source: "/nl/customer-story_hbl",
        destination: "/nl/casestudies/hbl",
        permanent: true,
      },
      {
        source: "/nl/cybersecurity",
        destination: "/nl/",
        permanent: true,
      },
      {
        source: "/nl/dectris",
        destination: "/nl/casestudies/dectris",
        permanent: true,
      },
      {
        source: "/nl/diensten",
        destination: "/nl/oplossingen",
        permanent: true,
      },
      {
        source: "/nl/diensten/managed-service",
        destination: "/nl/oplossingen/managed-services",
        permanent: true,
      },
      {
        source: "/nl/events",
        destination: "/nl/events",
        permanent: true,
      },
      {
        source: "/nl/events/adfinis-25-jarig-jubileum",
        destination: "/nl/events/25-jaar-adfinis",
        permanent: true,
      },
      {
        source: "/nl/events/exclusive-switzerland-standing-apero",
        destination: "/nl/events",
        permanent: true,
      },
      {
        source:
          "/nl/events/hug-8-gitlab-setup-w-terraform-localstack-for-testing-terraform",
        destination: "/nl/events",
        permanent: true,
      },
      {
        source:
          "/nl/events/talk-software-supply-chain-security-slsa-assessment-for-argo-cd",
        destination: "/nl/events",
        permanent: true,
      },
      {
        source:
          "/nl/geen-onderdeel-van-een-categorie/adfinis-introduceert-element-enterprise-als-saas-oplossing",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/geen-onderdeel-van-een-categorie/adfinis-vergroot-wereldwijd-bereik-met-nieuwe-dochteronderneming-in-egypte",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/geen-onderdeel-van-een-categorie/adfinis-voegt-element-aan-haar-dienstenportfolio-toe",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/geen-onderdeel-van-een-categorie/een-snelle-en-betrouwbare-mirror-voor-linux-gebruikers",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/geen-onderdeel-van-een-categorie/robert-de-bock-joins-adfinis-as-a-devops-architect-in-the-netherlands",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/gitlab-health-check",
        destination: "/nl/partners-en-producten/gitlab",
        permanent: true,
      },
      {
        source: "/nl/gitlab",
        destination: "/nl/partners-en-producten/gitlab",
        permanent: true,
      },
      {
        source: "/nl/hashicorp-vault",
        destination: "/nl/partners-en-producten/hashicorp",
        permanent: true,
      },
      {
        source: "/nl/hashicorp",
        destination: "/nl/partners-en-producten/hashicorp",
        permanent: true,
      },
      {
        source: "/nl/hypotheek-bank-lenzburg",
        destination: "/nl/casestudies/hbl",
        permanent: true,
      },
      {
        source: "/nl/informatie",
        destination: "/nl/over-ons",
        permanent: true,
      },
      {
        source: "/nl/informatie/branding",
        destination: "/nl/over-ons",
        permanent: true,
      },
      {
        source: "/nl/informatie/management",
        destination: "/nl/ons-team",
        permanent: true,
      },
      {
        source: "/nl/informatie/nieuws",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/informatie/onze-bijdrage",
        destination: "/nl/onze-betrokkenheid",
        permanent: true,
      },
      {
        source: "/nl/informatie/vacatures",
        destination: "/nl/carriere",
        permanent: true,
      },
      {
        source: "/nl/kanton-uri",
        destination: "/nl/casestudies/canton-of-uri",
        permanent: true,
      },
      {
        source: "/nl/linux-client",
        destination: "/nl/oplossingen/linux-clients",
        permanent: true,
      },
      {
        source: "/nl/managed-services",
        destination: "/nl/oplossingen/managed-services",
        permanent: true,
      },
      {
        source: "/nl/meer-oplossingen",
        destination: "/nl/oplossingen",
        permanent: true,
      },
      {
        source:
          "/nl/news-en-nl/adfinis-apac-wint-2024-gitlab-partner-of-the-year-award",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/news-en-nl/adfinis-duitsland",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source:
          "/nl/news-en-nl/adfinis-wint-aanbesteding-van-kanton-aargau-voor-implementatie-ebau-met-inosca",
        destination: "/nl/nieuws",
        permanent: true,
      },
      {
        source: "/nl/nts-werkruimte",
        destination: "/nl/casestudies/nts-workspace",
        permanent: true,
      },
      {
        source: "/nl/oplossingen",
        destination: "/nl/oplossingen",
        permanent: true,
      },
      {
        source: "/nl/privacybeleid",
        destination: "/nl/privacy-policy",
        permanent: true,
      },
      {
        source: "/nl/red-hat-ansible",
        destination: "/nl/partners-en-producten/red-hat",
        permanent: true,
      },
      {
        source: "/nl/red-hat",
        destination: "/nl/partners-en-producten/red-hat",
        permanent: true,
      },
      {
        source: "/nl/referenties-2",
        destination: "/nl/casestudies",
        permanent: true,
      },
      {
        source: "/nl/success-story-sbb",
        destination: "/nl/casestudies/sbb",
        permanent: true,
      },
      {
        source: "/nl/suse",
        destination: "/nl/partners-en-producten/suse",
        permanent: true,
      },
      {
        source: "/nl/vault_basler_kantonalbank_bkb",
        destination: "/nl/casestudies/basler-kantonalbank",
        permanent: true,
      },
      {
        source: "/nl/verhaal-met-hoge-beschikbaarheid",
        destination: "/nl/nieuws",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
