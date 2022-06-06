import { FooterLinkType } from 'packages/uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('About'),
    items: [
      {
        label: t('Contact'),
        href: 'mailto:support@wagyuswap.app',
        isHighlighted: true,
      },
      {
        label: t('Brand'),
        href: 'https://docs.wagyuswap.app/brand',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/@wagyuswap.app',
      },
      // {
      //   label: t('Community'),
      //   href: 'https://docs.wagyuswap.app/contact-us/telegram',
      // },
      // {
      //   label: t('Litepaper'),
      //   href: 'https://v2litepaper.pancakeswap.finance/',
      // },
      // {
      //   label: '—',
      // },
      // {
      //   label: t('Online Store'),
      //   href: 'https://pancakeswap.creator-spring.com/',
      // },
    ],
  },
  // {
  //   label: t('Help'),
  //   items: [
  //     {
  //       label: t('Customer Support'),
  //       href: 'https://docs.wagyuswap.app/contact-us/customer-support',
  //     },
  //     {
  //       label: t('Troubleshooting'),
  //       href: 'https://docs.wagyuswap.app/help/troubleshooting',
  //     },
  //     {
  //       label: t('Guides'),
  //       href: 'https://docs.wagyuswap.app/get-started',
  //     },
  //   ],
  // },
  {
    label: t('Developers'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/wagyuswapapp',
      },
      {
        label: t('Documentation'),
        href: 'https://docs.wagyuswap.app',
      },
      // {
      //   label: t('Bug Bounty'),
      //   href: 'https://docs.wagyuswap.app/code/bug-bounty',
      // },
      // {
      //   label: t('Audits'),
      //   href: 'https://docs.wagyuswap.app/help/faq#is-pancakeswap-safe-has-pancakeswap-been-audited',
      // },
      // {
      //   label: t('Careers'),
      //   href: 'https://docs.wagyuswap.app/hiring/become-a-chef',
      // },
    ],
  },
]
