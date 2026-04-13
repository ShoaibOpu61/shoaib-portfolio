// SEO Configuration - Update this file with your personal information
export const seoConfig = {
    // REQUIRED: Update with your actual Vercel domain
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.vercel.app",

    // Personal Information
    name: "Shoaib",
    title: "Product Designer & UI/UX Expert",
    description: "Premium UI/UX design portfolio showcasing innovative product design, user experience research, and creative solutions. Available for freelance projects worldwide.",

    // Location (for local SEO)
    location: "Dhaka, Bangladesh", // Update with your location

    // Keywords for SEO
    keywords: [
        "UI/UX Designer",
        "Product Designer",
        "Portfolio",
        "Shoaib",
        "Design",
        "User Experience",
        "Web Design",
        "Interface Design",
        "Prototyping",
        "Design Systems",
    ],

    // Social Media (update with your actual handles)
    social: {
        twitter: "@shoaib", // Update or set to null if you don't have
        linkedin: "shoaib", // Update or set to null if you don't have
        github: "shoaib", // Update or set to null if you don't have
        behance: "shoaib", // Update or set to null if you don't have
        dribbble: "shoaib", // Update or set to null if you don't have
    },

    // Open Graph Image
    ogImage: {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shoaib - Product Designer Portfolio",
    },

    // Additional metadata
    author: "Shoaib",
    locale: "en_US",
    type: "website",
};
