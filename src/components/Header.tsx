import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/Assets/logo.png';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Team', href: '#team' },
  { name: 'Career', href: '/careers' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Clients', href: '#clients' },
  { name: 'Contact', href: '#contact' },
];


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ... existing scroll logic ...
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      scrollToSection(location.hash);
    }
  }, [location]);

  const scrollToSection = (href: string) => {
    // If it's an internal page route, navigate to it
    if (href.startsWith('/')) {
      navigate(href);
      setIsMobileMenuOpen(false);
      return;
    }

    // If we are not on the home page and the link is an anchor, navigate to home first
    if (location.pathname !== '/' && href.startsWith('#')) {
      navigate('/' + href);
      setIsMobileMenuOpen(false);
      return;
    }

    // Otherwise treat as an anchor on the current page.
    // If the target isn't mounted yet (due to lazy/suspended content or delayed rendering),
    // poll briefly and scroll once it appears to avoid a blank / jump experience.
    if (!href.startsWith('#')) {
      setIsMobileMenuOpen(false);
      return;
    }

    const tryScroll = () => {
      const element = document.querySelector(href);
      if (element) {
        // Use smooth scroll where available. Some smooth-scroll libraries (Lenis) may override behavior,
        // but element.scrollIntoView is a safe fallback.
        try {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch {
          element.scrollIntoView();
        }
        return true;
      }
      return false;
    };

    // Immediate attempt first
    if (tryScroll()) {
      setIsMobileMenuOpen(false);
      return;
    }

    // Poll for up to ~1.5s for the element to appear
    let attempts = 0;
    const maxAttempts = 30;
    const interval = 50; // ms
    const id = window.setInterval(() => {
      attempts += 1;
      if (tryScroll() || attempts >= maxAttempts) {
        clearInterval(id);
        setIsMobileMenuOpen(false);
      }
    }, interval);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
              <img src={logo} alt="Code Craft Pakistan logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Code<span className="gradient-text"> Craft</span> <span className="font-display font-bold text-xl text-foreground">Pakistan</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 gradient-bg transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="gradient"
              size="default"
              onClick={() => scrollToSection('#contact')}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center gap-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-2xl font-display font-semibold text-foreground hover:text-primary transition-colors"
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 20 },
                }}
              >
                <Button
                  variant="gradient"
                  size="lg"
                  onClick={() => scrollToSection('#contact')}
                >
                  Get Started
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
