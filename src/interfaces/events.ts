export interface Events {
  "title": string,
  "startDate": string,
  "endDate": string,
  "imageUrl": string,
  "shopUrl": string,
  "address": {
    "@type": string,
    "streetAddress": string,
    "addressLocality": string,
    "addressRegion": null,
    "postalCode": string,
    "addressCountry": string
  },
  "priceFrom": number
}