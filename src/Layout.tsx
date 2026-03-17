import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Facebook } from 'lucide-react';
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
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/90 backdrop-blur-md py-4 shadow-xl border-b border-white/10' : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="logo text-white font-heading font-black text-2xl tracking-tighter uppercase cursor-pointer">
                        Red Dirt <span className="text-brand-red">Tractors</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        <a href="#" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">Inventory</a>
                        <a href="#" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">Parts & Service</a>
                        <a href="#" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">About</a>
                        <a href="#" className="text-white hover:text-brand-red transition-colors font-medium uppercase tracking-wide text-sm">Contact</a>
                        <button className="bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2 rounded font-bold uppercase tracking-wider transition-all transform hover:-translate-y-1 hover:shadow-lg">
                            Text Us
                        </button>
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
                        <a href="#" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Inventory</a>
                        <a href="#" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Parts & Service</a>
                        <a href="#" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                        <a href="#" className="text-white text-3xl font-heading font-black uppercase tracking-tight hover:text-brand-red transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-charcoal text-white py-20 border-t border-white/10">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">Red Dirt Tractors</h3>
                        <p className="opacity-60 mb-6 leading-relaxed max-w-sm">
                            Central Louisiana's headquarters for heavy-duty construction equipment, premium tractors, and the attachments to get the job done right.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-red transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 uppercase text-brand-red tracking-widest">Quick Links</h4>
                        <ul className="space-y-4 opacity-60">
                            <li><a href="#" className="hover:text-white transition-colors">Inventory</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Parts & Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6 uppercase text-brand-red tracking-widest">Contact</h4>
                        <ul className="space-y-6 opacity-60">
                            <li className="flex gap-4 items-start">
                                <MapPin className="shrink-0 mt-1" size={20} />
                                <span>7547 Hwy 71<br />Alexandria, LA 71302</span>
                            </li>
                            <li className="flex gap-4 items-center">
                                <Phone className="shrink-0" size={20} />
                                <a href="tel:3184429010" className="hover:text-white transition-colors font-bold">318-442-9010</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center opacity-40 text-sm">
                    &copy; {new Date().getFullYear()} Red Dirt Tractors & Construction Equipment. All Rights Reserved.
                </div>
            </footer>

            {/* Kenect Floating FAB */}
            <a
                href="tel:3184429010"
                className="fixed bottom-8 right-8 z-50 bg-brand-red text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 font-bold uppercase tracking-wider group"
            >
                <Phone size={24} className="animate-pulse" />
                <span className="hidden md:inline group-hover:block transition-all duration-300">Text or Call Us</span>
            </a>
        </div>
    );
};

export default Layout;
