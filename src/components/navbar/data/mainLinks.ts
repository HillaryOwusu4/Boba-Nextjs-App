export type MainLink = {
  label: string;
  href: string;
  image: string;
};

export const MAIN_LINKS: MainLink[] = [
  {
    label: "Home",
    href: "/",
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1000&q=80",
  },
  {
    label: "Products",
    href: "/product-list",
    image:
      "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=1000&q=80",
  },
  {
    label: "About",
    href: "/about",
    image: "/boba_store_lifestyle_1778329727033.png",
  },
  {
    label: "Contact",
    href: "/contact",
    image:
      "https://images.unsplash.com/photo-1515876305430-f06edab8282a?w=1000&q=80",
  },
];
