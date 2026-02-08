"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Check, Mail, Phone, MapPin, Linkedin, Instagram, Dribbble } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <main className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen relative overflow-hidden">
            <Navbar />

            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-40 left-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl"
                />

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-primary/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-7xl mx-auto"
                >
                    <motion.div
                        className="flex items-center gap-4 mb-8"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white">
                            Reach out
                        </h1>
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <ArrowRight className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                        </motion.div>
                    </motion.div>
                    <motion.p
                        className="text-lg md:text-xl text-secondary max-w-xl font-sans"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Whether it's a role, a project, or an idea worth exploring,
                        I'm always open to a conversation.
                    </motion.p>
                </motion.div>
            </section>

            {/* Main Content - Form and Features */}
            <section className="py-16 px-6 md:px-12 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Side - Features and Social */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-12"
                        >
                            {/* Features */}
                            <div className="space-y-6">
                                {[
                                    "Product thinking",
                                    "Visual clarity",
                                    "Collaborative execution"
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 group cursor-pointer"
                                    >
                                        <motion.div
                                            className="w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center flex-shrink-0"
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Check className="w-4 h-4 text-primary" />
                                        </motion.div>
                                        <span className="text-lg text-secondary font-sans group-hover:text-white transition-colors">
                                            {feature}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Links */}
                            <motion.div
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <h3 className="text-sm font-sans uppercase tracking-widest text-secondary">
                                    Connect with me
                                </h3>
                                <div className="flex gap-4">
                                    {[
                                        { icon: Linkedin, href: "https://www.linkedin.com/in/shoaib-opu-a8aaa0184/" },
                                        { icon: Instagram, href: "https://www.instagram.com/shoaib_opu/" },
                                        { icon: Dribbble, href: "https://dribbble.com/ShoaibOpu" }
                                    ].map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300 group relative overflow-hidden"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-primary/20"
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileHover={{ scale: 2, opacity: 1 }}
                                                transition={{ duration: 0.4 }}
                                            />
                                            <social.icon className="w-5 h-5 text-secondary group-hover:text-black relative z-10" />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side - Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="relative"
                        >
                            {/* Form Glow Effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-2xl opacity-50" />

                            <form onSubmit={handleSubmit} className="space-y-6 relative">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {["name", "email"].map((field, i) => (
                                        <motion.div
                                            key={field}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + i * 0.1 }}
                                        >
                                            <motion.input
                                                type={field === "email" ? "email" : "text"}
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                value={formData[field as keyof typeof formData]}
                                                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-secondary/50 focus:outline-none focus:border-primary focus:bg-white/10 transition-all font-sans backdrop-blur-sm"
                                                required
                                                whileFocus={{ scale: 1.02 }}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <motion.textarea
                                        placeholder="Message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={6}
                                        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-secondary/50 focus:outline-none focus:border-primary focus:bg-white/10 transition-all resize-none font-sans backdrop-blur-sm"
                                        required
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="w-full py-4 bg-white text-black rounded-full font-sans font-medium tracking-wide hover:bg-primary transition-all duration-300 text-lg relative overflow-hidden group"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <span className="relative z-10">Submit</span>
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 px-6 md:px-12 border-t border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Email Card */}
                        <motion.a
                            href="mailto:shoaibopu@gmail.com"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0, duration: 0.5 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-purple-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            {/* Gradient Glow on Hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                initial={false}
                            />

                            {/* Animated Border Glow */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
                                    filter: "blur(20px)",
                                }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                                    whileHover={{ rotate: 12 }}
                                >
                                    <Mail className="w-7 h-7 text-purple-400" />
                                </motion.div>
                                <h3 className="text-xl font-display text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                                    Email me
                                </h3>
                                <p className="text-secondary font-sans text-sm mb-1">shoaibopu@gmail.com</p>
                                <p className="text-secondary/60 font-sans text-xs">Available 24/7</p>
                            </div>
                        </motion.a>

                        {/* Phone Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
                        >
                            {/* Gradient Glow on Hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                initial={false}
                            />

                            {/* Animated Border Glow */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)",
                                    filter: "blur(20px)",
                                }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                                    whileHover={{ rotate: 12 }}
                                >
                                    <Phone className="w-7 h-7 text-blue-400" />
                                </motion.div>
                                <h3 className="text-xl font-display text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    Call me
                                </h3>
                                <p className="text-secondary font-sans text-sm mb-1">Available on request</p>
                                <p className="text-secondary/60 font-sans text-xs">Business hours</p>
                            </div>
                        </motion.div>

                        {/* Location Card with Map Background */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative p-8 rounded-2xl hover:border-emerald-500/50 transition-all duration-500 cursor-pointer overflow-hidden border border-white/10"
                        >
                            {/* Dark Map Background Pattern */}
                            <div
                                className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                    backgroundSize: "30px 30px",
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-zinc-900/80 to-zinc-900/90 backdrop-blur-xl" />

                            {/* Gradient Glow on Hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                initial={false}
                            />

                            {/* Animated Border Glow */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent)",
                                    filter: "blur(20px)",
                                }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                                    whileHover={{ rotate: 12 }}
                                >
                                    <MapPin className="w-7 h-7 text-emerald-400" />
                                </motion.div>
                                <h3 className="text-xl font-display text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                                    My location
                                </h3>
                                <p className="text-secondary font-sans text-sm mb-1">Dhaka, Bangladesh</p>
                                <p className="text-secondary/60 font-sans text-xs">GMT+6 • Remote Friendly</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
