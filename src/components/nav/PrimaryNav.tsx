import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowRight,
    ChevronDown,
    ChevronRight,
    Clock,
    Heart,
    MapPin,
    Menu,
    MessageSquare,
    Phone,
    X,
} from 'lucide-react';

import { NAV_GROUPS, type NavGroup } from './navData';
import { useSaved } from '../../context/SavedContext';

const isGroupActive = (pathname: string, group: NavGroup) =>
    group.items.some((item) => {
        const path = item.to.split('#')[0];
        if (path === '/' || path === '') return false;
        return pathname === path || pathname.startsWith(`${path}/`);
    });

const PrimaryNav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [openGroup, setOpenGroup] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileGroup, setMobileGroup] = useState<string | null>(null);
    const location = useLocation();
    const closeTimer = useRef<number | null>(null);
    const headerId = useId();
    const { count: savedCount } = useSaved();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        // Expose the nav height as a CSS variable so sticky elements
        // (inventory filter bar, anchor offsets) can align under it.
        const update = () => {
            const isLg = window.matchMedia('(min-width: 1024px)').matches;
            const utility = !scrolled && isLg ? 41 : 0;
            const main = scrolled ? 64 : 80;
            document.documentElement.style.setProperty('--nav-height', `${utility + main}px`);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [scrolled]);

    useEffect(() => {
        setOpenGroup(null);
        setMobileOpen(false);
        setMobileGroup(null);
    }, [location.pathname]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpenGroup(null);
                setMobileOpen(false);
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [mobileOpen]);

    const scheduleClose = () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpenGroup(null), 120);
    };

    const cancelClose = () => {
        if (closeTimer.current) {
            window.clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    return (
        <>
            <header
                id={headerId}
                style={{
                    paddingLeft: 'env(safe-area-inset-left, 0px)',
                    paddingRight: 'env(safe-area-inset-right, 0px)',
                    paddingTop: 'env(safe-area-inset-top, 0px)',
                }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled || openGroup
                        ? 'bg-charcoal/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] border-b border-white/10'
                        : 'bg-charcoal/80 backdrop-blur-sm'
                }`}
            >
                {/* Utility strip */}
                <div
                    className={`hidden lg:block border-b border-white/5 overflow-hidden transition-all duration-300 ${
                        scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
                    }`}
                >
                    <div className="container mx-auto px-6 flex items-center justify-between text-[11px] font-medium tracking-[0.2em] uppercase text-white/55 py-2.5">
                        <div className="flex items-center gap-7">
                            <span className="flex items-center gap-2">
                                <MapPin size={12} className="text-brand-red" />
                                7547 Hwy 71 South, Alexandria, LA
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={12} className="text-brand-red" />
                                Mon-Fri 8-5 · Sat 8-3
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <a
                                href="tel:3184429010"
                                className="flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <Phone size={12} className="text-brand-red" />
                                318.442.9010
                            </a>
                            <Link
                                to="/dealer/alexandria-la"
                                className="hover:text-white transition-colors"
                            >
                                Service area
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main nav row */}
                <nav className="container mx-auto px-5 lg:px-6">
                    <div
                        className={`flex items-center justify-between gap-6 transition-all duration-300 ${
                            scrolled ? 'h-16' : 'h-20'
                        }`}
                    >
                        <Link
                            to="/"
                            aria-label="Red Dirt Tractors home"
                            className="shrink-0 inline-flex items-center"
                        >
                            <picture
                                className={`block w-auto transition-all duration-300 ${
                                    scrolled ? 'h-9 md:h-10' : 'h-10 md:h-14'
                                }`}
                            >
                                <source
                                    type="image/avif"
                                    srcSet="/reddirtlightlogo-120.avif 120w, /reddirtlightlogo-200.avif 200w, /reddirtlightlogo-320.avif 320w"
                                    sizes="(min-width: 768px) 200px, 120px"
                                />
                                <source
                                    type="image/webp"
                                    srcSet="/reddirtlightlogo-120.webp 120w, /reddirtlightlogo-200.webp 200w, /reddirtlightlogo-320.webp 320w"
                                    sizes="(min-width: 768px) 200px, 120px"
                                />
                                <img
                                    src="/reddirtlightlogo-200.webp"
                                    alt="Red Dirt Tractors"
                                    width="200"
                                    height="64"
                                    fetchPriority="high"
                                    decoding="async"
                                    className="h-full w-auto object-contain"
                                />
                            </picture>
                        </Link>

                        {/* Desktop groups */}
                        <ul className="hidden lg:flex items-stretch gap-1">
                            {NAV_GROUPS.map((group) => {
                                const isOpen = openGroup === group.id;
                                const active = isGroupActive(location.pathname, group);
                                return (
                                    <li
                                        key={group.id}
                                        className="relative"
                                        onMouseEnter={() => {
                                            cancelClose();
                                            setOpenGroup(group.id);
                                        }}
                                        onMouseLeave={scheduleClose}
                                        onFocus={() => {
                                            cancelClose();
                                            setOpenGroup(group.id);
                                        }}
                                        onBlur={(e) => {
                                            if (
                                                !e.currentTarget.contains(e.relatedTarget as Node)
                                            ) {
                                                scheduleClose();
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={`nav-panel-${group.id}`}
                                            onClick={() =>
                                                setOpenGroup((current) =>
                                                    current === group.id ? null : group.id,
                                                )
                                            }
                                            className={`group relative h-full px-4 py-2 inline-flex items-center gap-1.5 text-[12px] xl:text-[13px] font-bold uppercase tracking-[0.2em] transition-colors ${
                                                active || isOpen
                                                    ? 'text-white'
                                                    : 'text-white/70 hover:text-white'
                                            }`}
                                        >
                                            {group.label}
                                            <ChevronDown
                                                size={14}
                                                className={`transition-transform duration-300 ${
                                                    isOpen ? 'rotate-180' : ''
                                                }`}
                                            />
                                            <span
                                                aria-hidden
                                                className={`absolute left-4 right-4 -bottom-0.5 h-px bg-brand-red transition-all duration-300 ${
                                                    active || isOpen ? 'opacity-100' : 'opacity-0'
                                                }`}
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="hidden lg:flex items-center gap-3">
                            <a
                                href="tel:3184429010"
                                className="text-white/75 hover:text-white text-[12px] font-bold uppercase tracking-[0.2em] transition-colors hidden xl:inline-flex items-center gap-2"
                            >
                                <Phone size={14} />
                                318.442.9010
                            </a>
                            <Link
                                to="/saved"
                                aria-label={savedCount > 0 ? `${savedCount} saved units` : 'Saved units'}
                                className={`relative inline-flex items-center justify-center w-10 h-10 transition-colors ${
                                    savedCount > 0
                                        ? 'text-brand-red hover:text-white'
                                        : 'text-white/65 hover:text-white'
                                }`}
                            >
                                <Heart size={18} fill={savedCount > 0 ? 'currentColor' : 'none'} />
                                {savedCount > 0 ? (
                                    <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-brand-red text-white text-[9px] font-black leading-none">
                                        {savedCount}
                                    </span>
                                ) : null}
                            </Link>
                            <a
                                href="sms://+13184429010"
                                className="bg-brand-red hover:bg-brand-red-dark text-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 transition-colors"
                            >
                                <MessageSquare size={14} />
                                Text Us
                            </a>
                        </div>

                        {/* Mobile right-side actions */}
                        <div className="lg:hidden inline-flex items-center gap-1">
                            <Link
                                to="/saved"
                                aria-label={savedCount > 0 ? `${savedCount} saved units` : 'Saved units'}
                                className={`relative inline-flex items-center justify-center min-w-11 min-h-11 p-2 transition-colors ${
                                    savedCount > 0 ? 'text-brand-red' : 'text-white/85'
                                }`}
                            >
                                <Heart size={22} fill={savedCount > 0 ? 'currentColor' : 'none'} />
                                {savedCount > 0 ? (
                                    <span className="absolute top-1.5 right-1 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-brand-red text-white text-[9px] font-black leading-none">
                                        {savedCount}
                                    </span>
                                ) : null}
                            </Link>
                            <button
                                type="button"
                                className="text-white p-3 -mr-2 inline-flex items-center justify-center min-w-11 min-h-11"
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileOpen}
                                aria-controls="mobile-menu"
                            >
                                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Desktop mega panel */}
                <AnimatePresence>
                    {openGroup ? (
                        <motion.div
                            key={openGroup}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            id={`nav-panel-${openGroup}`}
                            className="hidden lg:block absolute inset-x-0 top-full bg-charcoal border-t border-white/10 shadow-2xl"
                            onMouseEnter={cancelClose}
                            onMouseLeave={scheduleClose}
                        >
                            {NAV_GROUPS.filter((g) => g.id === openGroup).map((group) => (
                                <div key={group.id} className="container mx-auto px-6 py-10">
                                    <div className="grid grid-cols-12 gap-10">
                                        <div className="col-span-7">
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red mb-6">
                                                {group.label}
                                            </p>
                                            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
                                                {group.items.map((item) => {
                                                    const Icon = item.icon;
                                                    const path = item.to.split('#')[0];
                                                    const itemActive =
                                                        location.pathname === path ||
                                                        location.pathname.startsWith(`${path}/`);
                                                    return (
                                                        <li key={item.to}>
                                                            <Link
                                                                to={item.to}
                                                                className={`group flex items-start gap-4 rounded-sm px-4 py-3.5 transition-colors ${
                                                                    itemActive
                                                                        ? 'bg-white/5'
                                                                        : 'hover:bg-white/5'
                                                                }`}
                                                            >
                                                                {Icon ? (
                                                                    <span className="shrink-0 w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                                                                        <Icon size={16} />
                                                                    </span>
                                                                ) : null}
                                                                <span className="flex-1 min-w-0">
                                                                    <span className="flex items-center gap-2">
                                                                        <span className="text-white text-[13px] font-bold uppercase tracking-[0.15em]">
                                                                            {item.label}
                                                                        </span>
                                                                        {item.badge ? (
                                                                            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-red border border-brand-red/40 px-1.5 py-0.5">
                                                                                {item.badge}
                                                                            </span>
                                                                        ) : null}
                                                                    </span>
                                                                    {item.description ? (
                                                                        <span className="block mt-1 text-[12px] text-white/55 font-medium leading-relaxed">
                                                                            {item.description}
                                                                        </span>
                                                                    ) : null}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>

                                        <div className="col-span-5">
                                            <Link
                                                to={group.feature.ctaTo}
                                                className="group relative block aspect-[4/3] overflow-hidden bg-charcoal-light"
                                            >
                                                <img
                                                    src={group.feature.image}
                                                    alt=""
                                                    className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ease-out opacity-90"
                                                />
                                                <div
                                                    aria-hidden
                                                    className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/10"
                                                />
                                                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red mb-2">
                                                        {group.feature.eyebrow}
                                                    </p>
                                                    <h3 className="font-heading font-black uppercase tracking-tight text-white text-2xl xl:text-3xl leading-tight mb-2">
                                                        {group.feature.title}
                                                    </h3>
                                                    <p className="text-white/70 font-medium text-sm leading-relaxed mb-4 max-w-xs">
                                                        {group.feature.copy}
                                                    </p>
                                                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white">
                                                        {group.feature.ctaLabel}
                                                        <ArrowRight
                                                            size={14}
                                                            className="group-hover:translate-x-1 transition-transform"
                                                        />
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </header>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen ? (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] bg-charcoal lg:hidden flex flex-col pt-safe"
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                            <Link to="/" aria-label="Red Dirt Tractors home" className="block h-9">
                                <picture className="block h-full w-auto">
                                    <source
                                        type="image/avif"
                                        srcSet="/reddirtlightlogo-120.avif 120w, /reddirtlightlogo-200.avif 200w"
                                        sizes="160px"
                                    />
                                    <source
                                        type="image/webp"
                                        srcSet="/reddirtlightlogo-120.webp 120w, /reddirtlightlogo-200.webp 200w"
                                        sizes="160px"
                                    />
                                    <img
                                        src="/reddirtlightlogo-200.webp"
                                        alt="Red Dirt Tractors"
                                        width="160"
                                        height="40"
                                        decoding="async"
                                        className="h-full w-auto object-contain"
                                    />
                                </picture>
                            </Link>
                            <button
                                type="button"
                                className="text-white p-3 -mr-2 inline-flex items-center justify-center min-w-11 min-h-11"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                            >
                                <X size={26} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
                            <ul className="divide-y divide-white/10">
                                {NAV_GROUPS.map((group) => {
                                    const expanded = mobileGroup === group.id;
                                    return (
                                        <li key={group.id}>
                                            <button
                                                type="button"
                                                aria-expanded={expanded}
                                                onClick={() =>
                                                    setMobileGroup((c) =>
                                                        c === group.id ? null : group.id,
                                                    )
                                                }
                                                className="w-full flex items-center justify-between py-5 text-left"
                                            >
                                                <span className="text-white text-2xl font-heading font-black uppercase tracking-tight">
                                                    {group.label}
                                                </span>
                                                <ChevronDown
                                                    size={22}
                                                    className={`text-white/60 transition-transform duration-300 ${
                                                        expanded ? 'rotate-180 text-brand-red' : ''
                                                    }`}
                                                />
                                            </button>
                                            <AnimatePresence initial={false}>
                                                {expanded ? (
                                                    <motion.ul
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{
                                                            duration: 0.25,
                                                            ease: [0.16, 1, 0.3, 1],
                                                        }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pb-5 space-y-1">
                                                            {group.items.map((item) => {
                                                                const Icon = item.icon;
                                                                return (
                                                                    <Link
                                                                        key={item.to}
                                                                        to={item.to}
                                                                        className="flex items-start gap-3 px-3 py-3 text-white/85 hover:text-white hover:bg-white/5 transition-colors"
                                                                    >
                                                                        {Icon ? (
                                                                            <span className="mt-0.5 text-brand-red">
                                                                                <Icon size={16} />
                                                                            </span>
                                                                        ) : null}
                                                                        <span>
                                                                            <span className="block text-sm font-bold uppercase tracking-[0.15em] flex items-center gap-2">
                                                                                {item.label}
                                                                                {item.badge ? (
                                                                                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-brand-red border border-brand-red/40 px-1.5 py-0.5">
                                                                                        {item.badge}
                                                                                    </span>
                                                                                ) : null}
                                                                            </span>
                                                                            {item.description ? (
                                                                                <span className="block mt-1 text-xs text-white/55 font-medium leading-relaxed">
                                                                                    {item.description}
                                                                                </span>
                                                                            ) : null}
                                                                        </span>
                                                                    </Link>
                                                                );
                                                            })}
                                                            <Link
                                                                to={group.feature.ctaTo}
                                                                className="mt-2 inline-flex items-center gap-2 text-brand-red text-xs font-bold uppercase tracking-[0.25em] px-3"
                                                            >
                                                                {group.feature.ctaLabel}
                                                                <ChevronRight size={14} />
                                                            </Link>
                                                        </div>
                                                    </motion.ul>
                                                ) : null}
                                            </AnimatePresence>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="border-t border-white/10 px-5 pt-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] grid grid-cols-2 gap-3 bg-charcoal">
                            <a
                                href="tel:3184429010"
                                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white hover:text-charcoal text-white px-4 py-3 min-h-12 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                            >
                                <Phone size={14} />
                                Call
                            </a>
                            <a
                                href="sms://+13184429010"
                                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-4 py-3 min-h-12 font-bold uppercase tracking-[0.2em] text-xs transition-colors"
                            >
                                <MessageSquare size={14} />
                                Text Us
                            </a>
                            <p className="col-span-2 mt-2 text-center text-[10px] tracking-[0.25em] uppercase text-white/40 font-bold">
                                Mon-Fri 8-5 · Sat 8-3 · 7547 Hwy 71 S, Alexandria
                            </p>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            {/* Backdrop while mega panel open (desktop only) */}
            <AnimatePresence>
                {openGroup ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="hidden lg:block fixed inset-0 top-32 z-40 bg-charcoal/40 pointer-events-none"
                        aria-hidden
                    />
                ) : null}
            </AnimatePresence>
        </>
    );
};

export default PrimaryNav;
