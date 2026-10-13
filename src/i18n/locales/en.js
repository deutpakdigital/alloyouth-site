// English (source language). Text wrapped in **double asterisks** is rendered bold.
export default {
  meta: {
    title: 'Alloyouth Grocery Store',
    logoAlt: 'Alloyouth Grocery Store',
  },
  nav: {
    home: 'Home',
    story: 'Our Story',
    products: 'Products',
    gallery: 'Gallery',
    toggleMenu: 'Toggle navigation menu',
    language: 'Language',
  },
  hero: {
    title: 'Alloyouth',
    subtitle:
      "Bringing the world's finest chocolates, premium teas, and quality foods closer to you. With decades of experience and a commitment to international standards, we deliver authentic taste, exceptional quality, and trusted products to every home.",
  },
  products: {
    goToSlide: (n) => `Go to sub-slide ${n}`,
  },
  brands: {
    roshen: [
      'ROSHEN is an international confectionery brand offering a diverse portfolio of chocolate and jelly sweets, caramels, toffees, chocolate bars, biscuits, wafers, sponge cakes, marshmallows, marmalade, and cakes.',
      'We combine carefully selected, high-quality ingredients sourced from around the world with original recipes, advanced production technologies, and decades of confectionery expertise. Every ROSHEN product is created to deliver exceptional taste, consistent quality, and a memorable experience.',
      'From classic favourites to modern confectionery creations, ROSHEN brings together craftsmanship, innovation, and quality to delight consumers around the world.',
    ],
    tcboy: [
      'TC BOY has been a trusted name in Malaysian households, since the 1990s, built on a simple commitment to quality, authentic flavours, and everyday value.',
      'Proudly rooted in Malaysia, TC Boy was created with a clear purpose: to make delicious, nutritious, and convenient canned seafood accessible to families everywhere. What began as a local Malaysian initiative has grown into a respected brand enjoyed by consumers across Asia and beyond.',
      'For decades, TC Boy has remained true to its heritage while embracing the evolving needs of modern consumers. We carefully select quality ingredients and combine them with trusted recipes and consistent standards to deliver convenient, wholesome meals without compromising on taste.',
      'From Malaysian homes to tables around the world, TC Boy continues to bring the familiar taste of quality, convenience, and home to every meal.',
    ],
    mabroc: [
      'Since 1988, MABROC has been driven by a simple yet enduring vision: to share the finest Ceylon tea with the world.',
      'What began as a dream among a small group of passionate Sri Lankan tea lovers has grown into an internationally recognized tea brand, with MABROC premium Ceylon tea now enjoyed in more than 50 countries worldwide.',
      "Rooted in the rich heritage of Sri Lanka, MABROC combines the island's exceptional tea-growing conditions with generations of expertise, rigorous quality standards, and modern tea-making practices. More than 12.5 million kilograms of premium Ceylon tea are cultivated annually across 9,605 hectares of pristine tea gardens and carefully processed through 48 tea factories.",
      'From the lush highlands of Sri Lanka to tea cups around the globe, MABROC represents the authentic character, quality, and timeless elegance of Ceylon tea.',
    ],
  },
  story: {
    heading: 'Our Story',
    subtitle: 'Rooted in Heritage. Driven by Excellence.',
    paragraphs: [
      'For more than five decades, our journey has been guided by a simple principle: delivering trusted, high-quality food products while building lasting relationships founded on integrity, reliability, and excellence.',
      "The story of **Alloyouth Joint Stock Company for Food Import** began in the 1970s, rooted in our family's longstanding tradition in the food trade. Our heritage traces back to Bani Laith in Msallata, a region celebrated for its rich cultural legacy and the production of some of Libya's finest olive oil.",
      'In **1992**, we established our wholesale food distribution center in Tripoli, laying the foundation for decades of trusted partnerships across the Libyan market. Building on this success, **Alloyouth Joint Stock Company for Food Import** was formally incorporated in **2004** as a family-owned joint-stock company specializing in the importation and nationwide distribution of premium international food brands.',
      'Today, we are a trusted importer and distributor, connecting leading global food manufacturers with customers throughout Libya. Every product we supply reflects our commitment to international standards of quality, safety, and reliability.',
      'In **2026**, we will embark on an exciting new chapter as we begin our digital transformation. By extending our decades of distribution expertise into the online marketplace, we will make premium international food brands more accessible while continuing to uphold the values of excellence, trust, and long-term partnership that have defined our company for generations.',
    ],
  },
  footer: {
    followUs: 'Follow Us',
    facebook: 'Facebook',
    contactHeading: 'Contact Information',
    addressLabel: 'Address',
    address: 'Msallata City - towards Tarhuna City, 1 km',
    emailLabel: 'Email',
    roles: {
      generalManager: 'General Manager',
      businessDevelopment: 'International Business Development Manager',
    },
    contactLabel: (name, role) => `${name}, ${role}`,
    partners: 'Partners',
  },
  gallery: {
    title: 'Product Gallery',
    subtitle: 'Cinematic 3D showcase — drag, swipe or use arrows to explore',
    allBrands: 'All Brands',
    featured: 'Featured',
    all: 'All',
    images: 'Images',
    videos: 'Videos',
    previous: 'Previous image',
    next: 'Next image',
    close: 'Close',
  },
}
