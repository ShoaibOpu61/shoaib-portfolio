export const projects = [
    {
        id: "beauty-editor",
        numericId: 1,
        title: "Beauty Editor - Face & Body",
        category: "iOS Mobile App",
        year: "2025",
        description: "A comprehensive beauty editor app allowing real-time face and body reshaping with AI-powered precision.",
        color: "bg-zinc-800",
        image: "/placeholder-1.jpg",
        content: "Detailed case study content would go here. Challenge: Users needed a way to edit videos as easily as photos. Solution: We implemented a mesh-deformation engine that works on video frames in real-time.",
        images: ["/placeholder-1.jpg", "/placeholder-2.jpg"]
    },
    {
        id: "retouch-eraser",
        numericId: 2,
        title: "Retouch - Photo Object Eraser",
        category: "iOS Mobile App",
        year: "2025",
        description: "Magic eraser tool for removing unwanted objects from photos using generative fill.",
        color: "bg-stone-800",
        image: "/placeholder-2.jpg",
        content: "Content for Retouch app. Focus on the minimalist UI and the one-tap clean up interaction.",
        images: ["/placeholder-2.jpg", "/placeholder-3.jpg"]
    },
    {
        id: "walton-ecommerce",
        numericId: 3,
        title: "Walton E-Commerce",
        category: "WEB/E-Commerce",
        year: "2024",
        description: "A complete redesign of the Walton Group's e-commerce platform handling millions of users.",
        color: "bg-neutral-800",
        image: "/placeholder-3.jpg",
        content: "Redesigning a legacy platform. Improved conversion rates by 45% through a streamlined checkout process and better product discovery.",
        images: ["/placeholder-3.jpg", "/placeholder-4.jpg"]
    },
    {
        id: "walton-tick",
        numericId: 4,
        title: "Walton Tick V3",
        category: "Android Mobile App",
        year: "2024",
        description: "Internal communication and task management tool for Walton employees.",
        color: "bg-stone-800",
        image: "/placeholder-4.jpg",
        content: "Enterprise mobility solution. Focus on offline capabilities and secure messaging.",
        images: ["/placeholder-4.jpg", "/placeholder-1.jpg"]
    },
    {
        id: "health-tracker",
        numericId: 5,
        title: "HEALTH TRACKER",
        category: "MOBILE / UI",
        year: "2023",
        description: "Minimalist health monitoring application.",
        color: "bg-zinc-900",
        image: "/placeholder-1.jpg",
        content: "Focused on data visualization and habit tracking.",
        images: ["/placeholder-1.jpg", "/placeholder-2.jpg"]
    },
    {
        id: "design-system",
        numericId: 6,
        title: "DESIGN SYSTEM",
        category: "WEB / SYSTEM",
        year: "2023",
        description: "Unified design language for a global tech brand.",
        color: "bg-stone-900",
        image: "/placeholder-2.jpg",
        content: "Creating a scalable system with tokens and components.",
        images: ["/placeholder-2.jpg", "/placeholder-3.jpg"]
    }
];

export const caseStudies = [
    {
        id: "case-study-1",
        numericId: 101,
        title: "UX RESEARCH: BANKING APP",
        category: "RESEARCH / UX",
        year: "2024",
        description: "In-depth research and usability testing for a next-gen banking experience.",
        color: "bg-blue-900",
        image: "/placeholder-1.jpg",
        content: "Full case study details finding pain points in traditional banking apps...",
        images: ["/placeholder-3.jpg"]
    },
    {
        id: "case-study-2",
        numericId: 102,
        title: "REBRANDING: ECO STARTUP",
        category: "BRANDING / STRATEGY",
        year: "2023",
        description: "Complete visual identity overhaul for a sustainable energy startup.",
        color: "bg-green-900",
        image: "/placeholder-2.jpg",
        content: "From logo conception to brand guidelines...",
        images: ["/placeholder-4.jpg"]
    }
];

export const playground = [
    { id: 1, title: "Neon Logo Concept", type: "Logo", image: "/playground-1.png" },
    { id: 2, title: "Abstract 3D Art", type: "Digital Art", image: "/playground-2.png" },
    { id: 3, title: "Retro Poster", type: "Print", image: "/playground-3.png" },
    { id: 4, title: "Daily UI Challenge #01", type: "UI", image: "/playground-1.png" },
    { id: 5, title: "Music Festival Flyer", type: "Print", image: "/playground-3.png" },
    { id: 6, title: "Chrome Typography", type: "Type", image: "/playground-2.png" },
];

export function getAllContent() {
    return [...projects, ...caseStudies];
}
