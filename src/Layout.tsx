import React from 'react';
import { Link } from 'react-router-dom';
import {
    Phone,
    MapPin,
    Facebook,
    Wrench,
    Clock,
    ShieldCheck,
    Mail,
    MessageSquare,
} from 'lucide-react';

import PrimaryNav from './components/nav/PrimaryNav';
import { useCompare } from './context/CompareContext';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { items: compareItems } = useCompare();
    const trayActive = compareItems.length > 0;

    return (
        <div className="min-h-screen flex flex-col font-sans text-charcoal bg-off-white">
            <PrimaryNav />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <footer
                id="site-footer"
                className="bg-charcoal text-white pt-24 pb-12 border-t border-white/10 relative overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero_contact.png"
                        alt=""
                        aria-hidden
                        className="w-full h-full object-cover opacity-10"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                        <div className="lg:col-span-1">
                            <picture className="block h-14 md:h-16 mb-6 w-auto">
                                <source
                                    type="image/avif"
                                    srcSet="/reddirtlightlogo-200.avif 200w, /reddirtlightlogo-320.avif 320w"
                                    sizes="(min-width: 768px) 240px, 200px"
                                />
                                <source
                                    type="image/webp"
                                    srcSet="/reddirtlightlogo-200.webp 200w, /reddirtlightlogo-320.webp 320w"
                                    sizes="(min-width: 768px) 240px, 200px"
                                />
                                <img
                                    src="/reddirtlightlogo-320.webp"
                                    alt="Red Dirt Tractors"
                                    width="240"
                                    height="80"
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-auto object-contain"
                                />
                            </picture>
                            <p className="opacity-60 mb-8 leading-relaxed text-sm">
                                Central Louisiana's premium headquarters for heavy-duty
                                construction equipment, agricultural tractors, and
                                professional-grade attachments. Built on trust, driven by
                                power.
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Red Dirt Tractors on Facebook"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-red transition-colors"
                                >
                                    <Facebook size={18} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold mb-6 uppercase text-brand-red tracking-[0.2em]">
                                Equipment
                            </h4>
                            <ul className="space-y-4 opacity-70 text-sm font-medium">
                                <li>
                                    <Link
                                        to="/inventory"
                                        className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300"
                                    >
                                        All Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/implements"
                                        className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300"
                                    >
                                        Implements
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/trailers"
                                        className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300"
                                    >
                                        Trailers
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/financing"
                                        className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300"
                                    >
                                        Financing
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/trade-in"
                                        className="hover:text-white hover:translate-x-1 inline-block transition-transform duration-300"
                                    >
                                        Trade-In Valuation
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold mb-6 uppercase text-brand-red tracking-[0.2em]">
                                Parts & Service
                            </h4>
                            <ul className="space-y-4 opacity-70 text-sm font-medium">
                                <li className="flex items-center gap-3">
                                    <Wrench size={16} className="text-brand-red shrink-0" />
                                    <Link to="/parts-service" className="hover:text-white transition-colors">
                                        Schedule Service
                                    </Link>
                                </li>
                                <li className="flex items-center gap-3">
                                    <ShieldCheck size={16} className="text-brand-red shrink-0" />
                                    <Link to="/parts-service" className="hover:text-white transition-colors">
                                        Warranty Info
                                    </Link>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock size={16} className="text-brand-red shrink-0" />
                                    <span>Mon to Fri: 8:00 AM - 5:00 PM</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock size={16} className="text-brand-red shrink-0" />
                                    <span>Saturday: 8:00 AM - 3:00 PM</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold mb-6 uppercase text-brand-red tracking-[0.2em]">
                                Visit Us
                            </h4>
                            <ul className="space-y-6 opacity-80 text-sm">
                                <li className="flex gap-4 items-start group">
                                    <MapPin
                                        className="shrink-0 mt-1 text-white/40 group-hover:text-brand-red transition-colors"
                                        size={20}
                                    />
                                    <span>
                                        <strong className="block text-white mb-1">
                                            Red Dirt Headquarters
                                        </strong>
                                        7547 Hwy 71 South
                                        <br />
                                        Alexandria, LA 71302
                                    </span>
                                </li>
                                <li className="flex gap-4 items-center group">
                                    <Phone
                                        className="shrink-0 text-white/40 group-hover:text-brand-red transition-colors"
                                        size={20}
                                    />
                                    <a
                                        href="tel:3184429010"
                                        className="hover:text-white transition-colors font-bold text-lg"
                                    >
                                        318-442-9010
                                    </a>
                                </li>
                                <li className="flex gap-4 items-center group">
                                    <Mail
                                        className="shrink-0 text-white/40 group-hover:text-brand-red transition-colors"
                                        size={20}
                                    />
                                    <a
                                        href="mailto:reddirttractors@gmail.com"
                                        className="hover:text-white transition-colors font-bold"
                                    >
                                        reddirttractors@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 text-xs font-medium uppercase tracking-widest opacity-40">
                        <p>
                            &copy; {new Date().getFullYear()} Red Dirt Tractors &amp;
                            Construction Equipment. All Rights Reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                            <Link to="/about" className="hover:text-white transition-colors">
                                About
                            </Link>
                            <Link to="/reviews" className="hover:text-white transition-colors">
                                Reviews
                            </Link>
                            <Link to="/trade-in" className="hover:text-white transition-colors">
                                Trade-In
                            </Link>
                            <Link to="/resources" className="hover:text-white transition-colors">
                                Resources
                            </Link>
                            <Link to="/find-my-tractor" className="hover:text-white transition-colors">
                                Find My Tractor
                            </Link>
                            <Link to="/contact" className="hover:text-white transition-colors">
                                Contact
                            </Link>
                            <Link to="/privacy" className="hover:text-white transition-colors">
                                Privacy
                            </Link>
                            <Link to="/terms" className="hover:text-white transition-colors">
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Text-Us FAB - hidden on mobile when CompareTray is open */}
            <a
                href="sms://+13184429010"
                aria-label="Text Red Dirt Tractors at 318-442-9010"
                className={`fixed right-4 md:right-6 z-50 bg-brand-red text-white p-4 md:px-5 md:py-4 rounded-full md:rounded-none shadow-2xl hover:bg-brand-red-dark transition-all flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-xs md:text-sm ${
                    trayActive ? 'hidden md:flex' : 'flex'
                }`}
                style={{
                    bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1rem)',
                }}
            >
                <MessageSquare size={18} />
                <span className="hidden sm:inline">Text Us</span>
            </a>
        </div>
    );
};

export default Layout;
