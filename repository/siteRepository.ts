import ISite from "../models/site.js";

const sites: ISite[] = [
  {
    siteId: 1,
    siteName: "Product Management",
    contactEmail: "peter.vogel@phvis.com",
    contactName: "Peter Vogel",
  },
];

export const fetchSiteBySiteId = (siteId: number): Promise<ISite> =>
  Promise.resolve({
    ...sites[0],
    siteId,
  });
