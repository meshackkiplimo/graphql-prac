const navbarNavigations = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Services",
    url: "/services",
  },
  {
    title: "About Us",
    url: "/about",
  },
  {
    title: "Regulation",
    child: [
      {
        title: "General Enquiry",
        url: "/enquiries/general",
      },
      {
        title: "Business Enquiry",
        url: "/enquiries/business",
      },
    ],
  },
  {
    title: "Listings",
    url: "/listings",
  },
  {
    title: "Media",
    url: "/media",
  },
  {
    title: "search",
    
    isIcon: true,
  },
];

export default navbarNavigations;
