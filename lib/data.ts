export const projects = [
    {
        id: "beauty-editor",
        numericId: 1,
        title: "Beauty Editor - Face & Body",
        category: "iOS Mobile App",
        year: "2025",
        description: "A comprehensive beauty editor app allowing real-time face and body reshaping with AI-powered precision.",
        color: "bg-zinc-800",
        image: "/images/projects/beauty-editor-cover.jpg",
        content: "Detailed case study content would go here. Challenge: Users needed a way to edit videos as easily as photos. Solution: We implemented a mesh-deformation engine that works on video frames in real-time.",
        images: ["/images/projects/beauty-editor-cover.jpg"]
    },
    {
        id: "retouch-eraser",
        numericId: 2,
        title: "Retouch - Photo Object Eraser",
        category: "iOS Mobile App",
        year: "2024",
        description: "Remove objects, people or text from photos easily with this ai retouch app. Erase backgrounds of a photo and save as transparent with just one tap. Fix your blemishes also with advanced one-tap-retouch feature. Change your outfit with our advanced ai clothes changer feature instantly.",
        color: "bg-stone-800",
        image: "/images/projects/retouch-eraser-cover.jpg", // Replaced missing 'retouch-eraser' with available 'social-ob-cover' as placeholder or correct file if renamed
        content: "Designed an AI-powered photo editing app that simplifies complex retouching tasks, enabling users to remove objects, backgrounds, and imperfections effortlessly while delivering fast, intuitive, one-tap editing experiences.",
        images: ["/images/projects/retouch-eraser-cover.jpg"]
    },
    {
        id: "walton-tick",
        numericId: 3,
        title: "Walton Tick V3",
        category: "Android Mobile App",
        year: "2023",
        description: "A complete redesign of the Walton smart watch mobile app for thousand of android users.",
        color: "bg-neutral-800",
        image: "/images/projects/walton-tick-cover.jpg",
        content: "Redesigning a legacy platform. Improved conversion rates by 45% through a streamlined checkout process and better product discovery.",
        images: ["/images/projects/walton-tick-cover.jpg"]
    },
    {
        id: "vision-vibe",
        numericId: 4,
        title: "Vision Vibe Website",
        category: "Web Design",
        year: "2023",
        description: "Vision Vibe is a modern eyewear website focused on clean visuals, smooth navigation, and an intuitive shopping experience that highlights style and usability.",
        color: "bg-stone-800",
        image: "/images/projects/vision-vibe-cover.jpg",
        content: "Designed a clean and intuitive eyewear website that enhances product discovery, strengthens brand identity, and delivers a smooth, user-friendly shopping experience across devices.",
        images: ["/images/projects/vision-vibe-cover.jpg"]
    },
    {
        id: "calmio-chatbot",
        numericId: 5,
        title: "Calmio Chatbot",
        category: "MOBILE / UI",
        year: "2023",
        description: "Calmio Chatbot is a mobile app design focused on creating a calming, intuitive chat experience, helping users feel supported through a clean interface, gentle interactions, and user-friendly conversational flow.",
        color: "bg-zinc-900",
        image: "/images/projects/calmio-chatbot-cover.jpg",
        content: "Designed a soothing and user-friendly chatbot experience that improves engagement, reduces cognitive load, and makes conversations feel natural and comforting for users.",
        images: ["/images/projects/calmio-chatbot-cover.jpg"]
    },
    {
        id: "shuddho-dairy",
        numericId: 6,
        title: "Shuddho Dairy App",
        category: "Android App",
        year: "2023",
        description: "Shuddho Dairy App is a mobile app designed to simplify dairy product ordering and management through a clean interface, clear product presentation, and an easy-to-use customer experience.",
        color: "bg-stone-900",
        image: "/images/projects/shuddho-dairy-cover.jpg",
        content: "Created a streamlined and user-friendly app experience that improved product visibility, simplified ordering, and enhanced trust in the brand through clear and intuitive design.",
        images: ["/images/projects/shuddho-dairy-cover.jpg"]
    }
];

export const caseStudies = [
    {
        id: "case-study-1",
        numericId: 101,
        title: "UX RESEARCH: Beauty Editor",
        category: "RESEARCH / UX",
        year: "2025",
        description: "In-depth research and usability testing for Beauty Ediotr App",
        color: "bg-blue-900",
        image: "/images/case-studies/beautyeditor-research-cover.jpg",
        content: "Full case study details finding pain points in traditional beauty editing apps...",
        images: ["/images/case-studies/beautyeditor-research-cover.jpg"]
    },
    {
        id: "case-study-2",
        numericId: 102,
        title: "REBRANDING: Shuddho Dairy",
        category: "BRANDING / STRATEGY",
        year: "2023",
        description: "Complete visual identity overhaul for a Shuddho Dairy App is a mobile app designed to simplify dairy product ordering and management through a clean interface, clear product presentation, and an easy-to-use customer experience for this startup.",
        color: "bg-green-900",
        image: "/images/case-studies/shuddhodairy-research-cover.jpg",
        content: "From logo conception to brand guidelines...",
        images: ["/images/case-studies/shuddhodairy-research-cover.jpg"]
    }
];

export const playground = [
    { id: 1, title: "Magicfood Flayer Concept", type: "Flayer", image: "/images/playground/magicfood-flayer.jpg" },
    { id: 2, title: "Abstract 3D Logo Art", type: "Logo", image: "/images/playground/shop-logo.jpg" },
    { id: 3, title: "Sports Jersey Design", type: "Print", image: "/images/playground/kitejersey-design.jpg" },
    { id: 4, title: "Daily UI Challenge #01", type: "UI", image: "/images/playground/contentcreator-flayer.jpg" },
    { id: 5, title: "Electronic Product Flyer", type: "Flayer", image: "/images/playground/walton-flayer.jpg" },
    { id: 6, title: "Geezman Stream Logo", type: "Logo", image: "/images/playground/geezmanlogo-design.jpg" },
    { id: 7, title: "Up Dogs Logo", type: "Logo", image: "/images/playground/updogs-logo.jpg" },
    { id: 8, title: "Khilkhet Express Logo", type: "Logo", image: "/images/playground/khilkhet-express-logo.jpg" },
    { id: 9, title: "Nova Reign Logo Branding", type: "Logo", image: "/images/playground/nova-reign-logo.jpg" },
    { id: 10, title: "T-shirt Design", type: "Print", image: "/images/playground/tshirt-logo.jpg" },
    { id: 11, title: "HR Innobarcamp Logo Design", type: "Logo", image: "/images/playground/barcamp-logo.jpg" },
    { id: 12, title: "Walton Takyon Tri-Fold Flyer Design", type: "Tri-Fold Flyer", image: "/images/playground/walton-takyon-flayer.jpg" },
];

export function getAllContent() {
    return [...projects, ...caseStudies];
}
