// src/data/stories-data.js

const normalizeImageName = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const localImageUrls = Object.entries(
  import.meta.glob('../assets/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  }),
).reduce((images, [path, url]) => {
  const imageName = path.slice(path.lastIndexOf('/') + 1);
  const key = normalizeImageName(imageName);
  if (!images.has(key)) images.set(key, url);
  return images;
}, new Map());

export const getImageUrl = (imageName) => {
  if (typeof imageName === 'string') {
    if (imageName.startsWith('http') || imageName.startsWith('/') || imageName.startsWith('data:')) {
      return imageName;
    }
    const localImage = localImageUrls.get(normalizeImageName(imageName));
    // Falls back to /assets/<filename> — served from public/assets on the server
    return localImage || `/assets/${encodeURIComponent(imageName)}`;
  }
  return imageName;
};

const storyRecords = [
  {
    id: 1,
    slug: "dhruvi-akshar",
    image: "IMG488.jpg",
    title: "TOLD YOU SO",
    couple: "Dhruvi & Akshar",
    location: "Singapore",
    date: "May 2025",
    description: "Some stories don't begin with coincidence. They begin with intent. Avinash saw Rachel in a friend's photos, felt an inexplicable pull, and when she finally showed up one night, skipped the small talk and said, \"We are going to get married.\"",

    gallery: [
      { title: "THE WEDDING", images: [
        "IMG488.jpg", "IMG489.jpg", "IMG490.jpg", "IMG491.jpg",
        "IMG492.jpg", "IMG493.jpg", "IMG494.jpg", "IMG495.jpg",
        "IMG496.jpg", "IMG497.jpg", "IMG498.jpg", "IMG499.jpg",
        "IMG500.jpg", "IMG501.jpg", "IMG502.jpg", "IMG503.jpg",
        "IMG504.jpg", "IMG505.jpg", "IMG506.jpg", "IMG507.jpg",
        "IMG508.jpg", "IMG509.jpg", "IMG510.jpg", "IMG511.jpg",
        "IMG512.jpg", "IMG513.jpg"
      ] }
    ],

    photobookImages: [
      "IMG488.jpg", "IMG489.jpg", "IMG490.jpg", "IMG491.jpg",
      "IMG492.jpg", "IMG493.jpg", "IMG494.jpg", "IMG495.jpg",
      "IMG496.jpg", "IMG497.jpg", "IMG498.jpg", "IMG499.jpg",
      "IMG500.jpg", "IMG501.jpg", "IMG502.jpg", "IMG503.jpg",
      "IMG504.jpg", "IMG505.jpg", "IMG506.jpg", "IMG507.jpg",
      "IMG508.jpg", "IMG509.jpg", "IMG510.jpg", "IMG511.jpg",
      "IMG512.jpg", "IMG513.jpg"
    ],

    categories: [
      { slug: "wedding", title: "WEDDING", images: [
        "IMG488.jpg", "IMG489.jpg", "IMG490.jpg", "IMG491.jpg",
        "IMG492.jpg", "IMG493.jpg", "IMG494.jpg", "IMG495.jpg",
        "IMG496.jpg", "IMG497.jpg", "IMG498.jpg", "IMG499.jpg",
        "IMG500.jpg", "IMG501.jpg", "IMG502.jpg", "IMG503.jpg",
        "IMG504.jpg", "IMG505.jpg", "IMG506.jpg", "IMG507.jpg",
        "IMG508.jpg", "IMG509.jpg", "IMG510.jpg", "IMG511.jpg",
        "IMG512.jpg", "IMG513.jpg"
      ] }
    ]
  },
  {
    id: 2,
    slug: "namisha-mayur",
    image: "N_x_M3.jpg",
    title: "YIN & YANG",
    couple: "Namisha & Mayur",
    location: "Rome, Italy",
    date: "May 2025",
    description: "A decade ago, their paths crossed only briefly, but perhaps time had other plans. Years later, destiny brought them back together, and this time, love arrived with quiet certainty.",

    gallery: [
      { title: "PRE-WEDDING", images: [
        "N_x_M3.jpg", "N_x_M16.jpg", "N_x_M20.jpg", "N_x_M24.jpg",
        "N_x_M57.jpg", "N_x_M91.jpg", "N_x_M123.jpg", "N_x_M130.jpg",
        "N_x_M142.jpg", "N_x_M149.jpg", "N_x_M153.jpg", "N_x_M154.jpg",
        "N_x_M156.jpg", "N_x_M162.jpg", "N_x_M262.jpg", "N_x_M267.jpg",
        "N_x_M304.jpg", "N_x_M305.jpg", "N_x_M306.jpg", "N_x_M311.jpg",
        "N_x_M329.jpg", "N_x_M344.jpg", "N_x_M347.jpg", "N_x_M360.jpg",
        "N_x_M362.jpg", "N_x_M384.jpg", "N_x_M413.jpg", "N_x_M422.jpg",
        "N_x_M429.jpg"
      ] },
      { title: "THE WEDDING", images: [
        "N_x_M586.jpg", "N_x_M589.jpg", "N_x_M592.jpg", "N_x_M594.jpg",
        "N_x_M596.jpg", "N_x_M600.jpg", "N_x_M605.jpg", "N_x_M606.jpg",
        "N_x_M610.jpg", "N_x_M611.jpg"
      ] }
    ],

    photobookImages: [
      "N_x_M3.jpg", "N_x_M16.jpg", "N_x_M20.jpg", "N_x_M24.jpg",
      "N_x_M57.jpg", "N_x_M91.jpg", "N_x_M123.jpg", "N_x_M130.jpg",
      "N_x_M142.jpg", "N_x_M149.jpg", "N_x_M153.jpg", "N_x_M154.jpg",
      "N_x_M156.jpg", "N_x_M162.jpg", "N_x_M262.jpg", "N_x_M267.jpg",
      "N_x_M304.jpg", "N_x_M305.jpg", "N_x_M306.jpg", "N_x_M311.jpg",
      "N_x_M329.jpg", "N_x_M344.jpg", "N_x_M347.jpg", "N_x_M360.jpg",
      "N_x_M362.jpg", "N_x_M384.jpg", "N_x_M413.jpg", "N_x_M422.jpg",
      "N_x_M429.jpg", "N_x_M586.jpg", "N_x_M589.jpg", "N_x_M592.jpg",
      "N_x_M594.jpg", "N_x_M596.jpg", "N_x_M600.jpg", "N_x_M605.jpg",
      "N_x_M606.jpg", "N_x_M610.jpg", "N_x_M611.jpg"
    ],

    categories: [
      { slug: "pre-wedding", title: "PRE-WEDDING", images: [
        "N_x_M3.jpg", "N_x_M16.jpg", "N_x_M20.jpg", "N_x_M24.jpg",
        "N_x_M57.jpg", "N_x_M91.jpg", "N_x_M123.jpg", "N_x_M130.jpg",
        "N_x_M142.jpg", "N_x_M149.jpg", "N_x_M153.jpg", "N_x_M154.jpg",
        "N_x_M156.jpg", "N_x_M162.jpg", "N_x_M262.jpg", "N_x_M267.jpg",
        "N_x_M304.jpg", "N_x_M305.jpg", "N_x_M306.jpg", "N_x_M311.jpg",
        "N_x_M329.jpg", "N_x_M344.jpg", "N_x_M347.jpg", "N_x_M360.jpg",
        "N_x_M362.jpg", "N_x_M384.jpg", "N_x_M413.jpg", "N_x_M422.jpg",
        "N_x_M429.jpg"
      ] },
      { slug: "wedding", title: "WEDDING", images: [
        "N_x_M586.jpg", "N_x_M589.jpg", "N_x_M592.jpg", "N_x_M594.jpg",
        "N_x_M596.jpg", "N_x_M600.jpg", "N_x_M605.jpg", "N_x_M606.jpg",
        "N_x_M610.jpg", "N_x_M611.jpg"
      ] }
    ]
  },
  {
    id: 3,
    slug: "richa-aniket",
    image: "IMGG503.jpg",
    title: "THE BEGINNING OF FOREVER",
    couple: "Richa & Aniket",
    location: "India",
    date: "2025",
    description: "Ek nayi shuruaat, ek naya vaada. Richa aur Aniket ki engagement ki khoobsurat yaadein, jahan do parivaar ek saath jud gaye.",

    gallery: [
      { title: "THE ENGAGEMENT", images: [
        "IMGG488.jpg", "IMGG489.jpg", "IMGG490.jpg", "IMGG491.jpg",
        "IMGG492.jpg", "IMGG493.jpg", "IMGG494.jpg", "IMGG495.jpg",
        "IMGG496.jpg", "IMGG497.jpg", "IMGG498.jpg", "IMGG499.jpg",
        "IMGG500.jpg", "IMGG501.jpg", "IMGG502.jpg", "IMGG503.jpg"
      ] }
    ],

    photobookImages: [
      "IMGG488.jpg", "IMGG489.jpg", "IMGG490.jpg", "IMGG491.jpg",
      "IMGG492.jpg", "IMGG493.jpg", "IMGG494.jpg", "IMGG495.jpg",
      "IMGG496.jpg", "IMGG497.jpg", "IMGG498.jpg", "IMGG499.jpg",
      "IMGG500.jpg", "IMGG501.jpg", "IMGG502.jpg", "IMGG503.jpg"
    ],

    categories: [
      { slug: "engagement", title: "ENGAGEMENT", images: [
        "IMGG488.jpg", "IMGG489.jpg", "IMGG490.jpg", "IMGG491.jpg",
        "IMGG492.jpg", "IMGG493.jpg", "IMGG494.jpg", "IMGG495.jpg",
        "IMGG496.jpg", "IMGG497.jpg", "IMGG498.jpg", "IMGG499.jpg",
        "IMGG500.jpg", "IMGG501.jpg", "IMGG502.jpg", "IMGG503.jpg"
      ] }
    ]
  },
  {
    id: 4,
    slug: "priyanka-vijay",
    image: "Img173.jpg",
    title: "A PROMISE OF FOREVER",
    couple: "Priyanka & Vijay",
    location: "India",
    date: "2025",
    description: "Priyanka aur Vijay ki engagement ki khoobsurat yaadein. Ek nayi shuruaat, jahan do dilon ne ek saath zindagi bitane ka vaada kiya.",

    gallery: [
      { title: "THE ENGAGEMENT", images: [
        "Img135.jpg", "Img136.jpg", "Img138.jpg", "Img139.jpg",
        "Img140.jpg", "Img141.jpg", "Img143.jpg", "Img144.jpg",
        "Img145.jpg", "Img146.jpg", "Img149.jpg", "Img150.jpg",
        "Img152.jpg", "Img153.jpg", "Img154.jpg", "Img157.jpg",
        "Img158.jpg", "Img160.jpg", "Img162.jpg", "Img163.jpg",
        "Img164.jpg", "Img165.jpg", "Img167.jpg", "Img168.jpg",
        "Img169.jpg", "Img170.jpg", "Img171.jpg", "Img172.jpg",
        "Img173.jpg", "Img174.jpg", "Img175.jpg", "Img176.jpg",
        "Img177.jpg", "Img178.jpg", "Img179.jpg", "Img180.jpg",
        "Img181.jpg", "Img182.jpg", "Img183.jpg", "Img184.jpg",
        "Img185.jpg", "Img186.jpg", "Img187.jpg", "Img188.jpg"
      ] }
    ],

    photobookImages: [
      "Img135.jpg", "Img136.jpg", "Img138.jpg", "Img139.jpg",
      "Img140.jpg", "Img141.jpg", "Img143.jpg", "Img144.jpg",
      "Img145.jpg", "Img146.jpg", "Img149.jpg", "Img150.jpg",
      "Img152.jpg", "Img153.jpg", "Img154.jpg", "Img157.jpg",
      "Img158.jpg", "Img160.jpg", "Img162.jpg", "Img163.jpg",
      "Img164.jpg", "Img165.jpg", "Img167.jpg", "Img168.jpg",
      "Img169.jpg", "Img170.jpg", "Img171.jpg", "Img172.jpg",
      "Img173.jpg", "Img174.jpg", "Img175.jpg", "Img176.jpg",
      "Img177.jpg", "Img178.jpg", "Img179.jpg", "Img180.jpg",
      "Img181.jpg", "Img182.jpg", "Img183.jpg", "Img184.jpg",
      "Img185.jpg", "Img186.jpg", "Img187.jpg", "Img188.jpg"
    ],

    categories: [
      { slug: "engagement", title: "ENGAGEMENT", images: [
        "Img135.jpg", "Img136.jpg", "Img138.jpg", "Img139.jpg",
        "Img140.jpg", "Img141.jpg", "Img143.jpg", "Img144.jpg",
        "Img145.jpg", "Img146.jpg", "Img149.jpg", "Img150.jpg",
        "Img152.jpg", "Img153.jpg", "Img154.jpg", "Img157.jpg",
        "Img158.jpg", "Img160.jpg", "Img162.jpg", "Img163.jpg",
        "Img164.jpg", "Img165.jpg", "Img167.jpg", "Img168.jpg",
        "Img169.jpg", "Img170.jpg", "Img171.jpg", "Img172.jpg",
        "Img173.jpg", "Img174.jpg", "Img175.jpg", "Img176.jpg",
        "Img177.jpg", "Img178.jpg", "Img179.jpg", "Img180.jpg",
        "Img181.jpg", "Img182.jpg", "Img183.jpg", "Img184.jpg",
        "Img185.jpg", "Img186.jpg", "Img187.jpg", "Img188.jpg"
      ] }
    ]
  },
  {
    id: 5,
    slug: "chandan-sarita",
    image: "S_x_C106.jpg",
    title: "A BEAUTIFUL JOURNEY",
    couple: "Chandan & Sarita",
    location: "India",
    date: "2025",
    description: "Ek khoobsurat safar jo do dilon ko ek saath laya. Chandan aur Sarita ki kahani pyaar, vishwas aur naye shuruaat ki hai.",

    gallery: [
      { title: "PRE-WEDDING", images: [
        "S_x_C106.jpg", "S_x_C109.jpg", "S_x_C114.jpg", "S_x_C115.jpg",
        "S_x_C119.jpg", "S_x_C135.jpg", "S_x_C137.jpg", "S_x_C140.jpg",
        "S_x_C150.jpg", "S_x_C152.jpg", "S_x_C158.jpg", "S_x_C159.jpg",
        "S_x_C160.jpg", "S_x_C161.jpg", "S_x_C165.jpg", "S_x_C180.jpg",
        "S_x_C181.jpg", "S_x_C182.jpg", "S_x_C184.jpg", "S_x_C199.jpg",
        "S_x_C211.jpg", "S_x_C213.jpg", "S_x_C216.jpg", "S_x_C219.jpg",
        "S_x_C220.jpg", "S_x_C224.jpg", "S_x_C226.jpg", "S_x_C230.jpg",
        "S_x_C231.jpg", "S_x_C294.jpg", "S_x_C299.jpg", "S_x_C321.jpg",
        "S_x_C325.jpg", "S_x_C335.jpg", "S_x_C336.jpg", "S_x_C350.jpg"
      ] }
    ],

    photobookImages: [
      "S_x_C106.jpg", "S_x_C109.jpg", "S_x_C114.jpg", "S_x_C115.jpg",
      "S_x_C119.jpg", "S_x_C135.jpg", "S_x_C137.jpg", "S_x_C140.jpg",
      "S_x_C150.jpg", "S_x_C152.jpg", "S_x_C158.jpg", "S_x_C159.jpg",
      "S_x_C160.jpg", "S_x_C161.jpg", "S_x_C165.jpg", "S_x_C180.jpg",
      "S_x_C181.jpg", "S_x_C182.jpg", "S_x_C184.jpg", "S_x_C199.jpg",
      "S_x_C211.jpg", "S_x_C213.jpg", "S_x_C216.jpg", "S_x_C219.jpg",
      "S_x_C220.jpg", "S_x_C224.jpg", "S_x_C226.jpg", "S_x_C230.jpg",
      "S_x_C231.jpg", "S_x_C294.jpg", "S_x_C299.jpg", "S_x_C321.jpg",
      "S_x_C325.jpg", "S_x_C335.jpg", "S_x_C336.jpg", "S_x_C350.jpg"
    ],

    categories: [
      { slug: "pre-wedding", title: "PRE-WEDDING", images: [
        "S_x_C106.jpg", "S_x_C109.jpg", "S_x_C114.jpg", "S_x_C115.jpg",
        "S_x_C119.jpg", "S_x_C135.jpg", "S_x_C137.jpg", "S_x_C140.jpg",
        "S_x_C150.jpg", "S_x_C152.jpg", "S_x_C158.jpg", "S_x_C159.jpg",
        "S_x_C160.jpg", "S_x_C161.jpg", "S_x_C165.jpg", "S_x_C180.jpg",
        "S_x_C181.jpg", "S_x_C182.jpg", "S_x_C184.jpg", "S_x_C199.jpg",
        "S_x_C211.jpg", "S_x_C213.jpg", "S_x_C216.jpg", "S_x_C219.jpg",
        "S_x_C220.jpg", "S_x_C224.jpg", "S_x_C226.jpg", "S_x_C230.jpg",
        "S_x_C231.jpg", "S_x_C294.jpg", "S_x_C299.jpg", "S_x_C321.jpg",
        "S_x_C325.jpg", "S_x_C335.jpg", "S_x_C336.jpg", "S_x_C350.jpg"
      ] }
    ]
  }
];

export const storiesData = storyRecords.map((story) => ({
  ...story,
  image: getImageUrl(story.image),
  gallery: story.gallery.map((section) => ({
    ...section,
    images: section.images.map(getImageUrl),
  })),
  photobookImages: story.photobookImages.map(getImageUrl),
  categories: story.categories.map((category) => ({
    ...category,
    images: category.images.map(getImageUrl),
  })),
}));

// 🔥 Home page slider images
export const galleryImagesData = [
  "IMG488.jpg", "IMG489.jpg", "IMG490.jpg", "IMG491.jpg",
  "IMG492.jpg", "IMG493.jpg", "IMG494.jpg", "IMG495.jpg",
  "IMG496.jpg", "IMG497.jpg", "IMG498.jpg", "IMG499.jpg",
  "IMG500.jpg", "IMG501.jpg"
].map(getImageUrl);
