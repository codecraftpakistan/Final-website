
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Facebook } from 'lucide-react';
import logo from '@/Assets/logo.png';

/** Custom X (Twitter) logo: latest glyph */
const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    role="img"
    {...props}
  >
    {/* X glyph (monochrome, uses currentColor) */}
    <path d="M3.5 3h5.8l4.1 5.6L17.8 3H21l-6.6 8.3L21.7 21h-5.8l-4.5-6.1L10.2 21H3l7.4-9.3L3.5 3zm3.1 1.8l5.3 7-5.9 7.4h3.5l4.7-6.1 4.5 6.1h3.2l-6.3-8.5L20.1 4.8h-3.4l-4.2 5.6-4.2-5.6H6.6z"/>
  </svg>
);

/** Custom TikTok logo: single-color, clean path */
const TikTokIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    role="img"
    {...props}
  >
    {/* TikTok glyph (monochrome, uses currentColor) */}
    <path d="M16.5 3c.3 2.1 1.9 3.9 4 4.3v2.1c-1.7-.1-3.3-.7-4.7-1.7v6.8c0 3.9-2.8 7.2-6.8 7.5-1.8.1-3.6-.4-5-1.6A6.9 6.9 0 0 1 2.4 14c.2-3.6 3.1-6.5 6.7-6.7.6 0 1.2 0 1.8.1v2.5c-.6-.1-1.2-.1-1.8 0A4.3 4.3 0 0 0 5 14.2c-.1 1.2.3 2.4 1.1 3.3a4.3 4.3 0 0 0 3.2 1.2c2.4-.2 4.2-2.3 4.2-4.7V3h3z" />
  </svg>
);

import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const footerLinks = {
    company: [
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Career', href: '/careers' },
    ],
    resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Documentation', href: '/documentation' },
      { name: 'Support', href: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Cookie Policy', href: '/cookie-policy' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/codecraftpakistan', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/code-craft-pakistan', label: 'LinkedIn' },
    { icon: XIcon, href: 'https://x.com/codecraftpak', label: 'X (Twitter)' },
    { icon: Instagram, href: 'https://www.instagram.com/codecraftpakistan/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/share/1AfmkTNzC7/', label: 'Facebook' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@codecraftpakistan?_r=1&_t=ZS-92viO4Wc7lp', label: 'TikTok' },
    { icon: Mail, href: 'mailto:codecraftpakistan@gmail.com', label: 'Email' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
        navigate(href);
        return;
    }
    if (location.pathname !== '/' && href.startsWith('#')) {
        navigate('/' + href);
        return;
    }

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              className="inline-flex items-center gap-2 mb-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img src={logo} alt="Code Craft logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Code<span className="gradient-text"> Craft</span><span> Pakistan</span>
              </span>
            </motion.div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Transforming ideas into powerful digital solutions. We're your trusted partner for
              web development, mobile apps, and enterprise software.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Code Craft Pakistan. Created by Khalid Bin Waheed. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground"></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
