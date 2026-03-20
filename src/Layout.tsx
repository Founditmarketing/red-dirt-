import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Facebook, Wrench, Clock, ShieldCheck, Mail, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans text-charcoal bg-off-white">
            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-4 shadow-xl border-b border-white/10' : 'bg-charcoal/80 backdrop-blur-sm py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="cursor-pointer block opacity-90 hover:opacity-100 transition-opacity">
                        <img src="/logo.png" alt="Red Dirt Tractors" className="h-12 md:h-16 w-auto object-contain drop-shadow-md bg-white/90 p-2 rounded-sm" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        <Link to="/inventory" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">Inventory</Link>
                        <Link to="/parts-service" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">Parts & Service</Link>
                        <Link to="/transparency" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">Transparency</Link>
                        <a href="/#about" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">About</a>
                        <a href="#contact" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">Contact</a>
                        <a href="sms://+13184429010" className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2 rounded font-bold uppercase tracking-wider transition-all transform hover:-translate-y-1 hover:shadow-lg">
                            Text Us!
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', ease: 'circOut' }}
                        className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        <Link to="/inventory" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Inventory</Link>
                        <Link to="/parts-service" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Parts & Service</Link>
                        <Link to="/transparency" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Transparency</Link>
                        <a href="/#about" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                        <a href="#contact" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Institutional Footer */}
            <footer id="contact" className="bg-charcoal text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src="/hero_contact.png" alt="" className="w-full h-full object-cover opacity-10" />
                </div>
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-red/5 to-transparent pointer-events-none z-[1]"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                        {/* Brand & Mission */}
                        <div className="lg:col-span-1">
                            <img src="/logo.png" alt="Red Dirt Tractors" className="h-14 mb-6 w-auto object-contain drop-shadow-md bg-white/90 p-2 rounded-sm" />
                            <p className="opacity-60 mb-8 leading-relaxed text-sm">
                                Central Louisiana's premium headquarters for heavy-duty construction equipment, agricultural tractors, and professional-grade attachments. Built on trust, driven by power.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red transition-all"><Facebook size={18} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-sm font-bold mb-6 uppercase text-brand-red tracking-[0.2em]">Equipment</h4>
                            <ul className="space-y-4 opacity-70 text-sm font-medium">
                                <li><Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">New Inventory</Link></li>
                                <li><Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Pre-Owned Inventory</Link></li>
                                <li><Link to="/parts-service" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Attachments & Implements</Link></li>
                                <li><Link to="/" className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300">Financing Options</Link></li>
                            </ul>
                        </div>

                        {/* Institutional Service */}
                        <div>
                            <h4 className="text-sm font-bold mb-6 uppercase text-brand-red tracking-[0.2em]">Parts & Service</h4>
                            <ul className="space-y-4 opacity-70 text-sm font-medium">
                                <li className="flex items-center gap-3"><Wrench size={16} className="text-brand-red shrink-0" /> <Link to="/parts-service" className="hover:text-white transition-colors">Schedule Service</Link></li>
                                <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-brand-red shrink-0" /> <Link to="/parts-service" className="hover:text-white transition-colors">Warranty Info</Link></li>
                                <li className="flex items-center gap-3"><Clock size={16} className="text-brand-red shrink-0" /> <span>Mon - Fri: 8:00 AM - 5:00 PM</span></li>
                                <li className="flex items-center gap-3"><Clock size={16} className="text-brand-red shrink-0" /> <span>Saturday: 8:00 AM - 3:00 PM</span></li>
                            </ul>
                        </div>

                        {/* Contact & Location */}
                        <div>
                            <h4 className="text-sm font-bold mb-6 uppercase text-brand-red tracking-[0.2em]">Visit Us</h4>
                            <ul className="space-y-6 opacity-80 text-sm">
                                <li className="flex gap-4 items-start group">
                                    <MapPin className="shrink-0 mt-1 text-white/40 group-hover:text-brand-red transition-colors" size={20} />
                                    <span><strong className="block text-white mb-1">Red Dirt Headquarters</strong>7547 Hwy 71 South<br />Alexandria, LA 71302</span>
                                </li>
                                <li className="flex gap-4 items-center group">
                                    <Phone className="shrink-0 text-white/40 group-hover:text-brand-red transition-colors" size={20} />
                                    <a href="tel:3184429010" className="hover:text-white transition-colors font-bold text-lg">318-442-9010</a>
                                </li>
                                <li className="flex gap-4 items-center group">
                                    <Mail className="shrink-0 text-white/40 group-hover:text-brand-red transition-colors" size={20} />
                                    <a href="mailto:reddirttractors@gmail.com" className="hover:text-white transition-colors font-bold">reddirttractors@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest opacity-40">
                        <p>&copy; {new Date().getFullYear()} Red Dirt Tractors & Construction Equipment. All Rights Reserved.</p>
                        <div className="flex gap-6">
                            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Kenect Floating FAB */}
            <a
                href="sms://+13184429010"
                className="fixed bottom-8 right-8 z-50 bg-brand-red text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 font-bold uppercase tracking-wider group"
            >
                <MessageSquare size={24} className="animate-pulse" />
                <span className="hidden md:inline group-hover:block transition-all duration-300">Text Us!</span>
            </a>
        </div>
    );
};

export default Layout;
