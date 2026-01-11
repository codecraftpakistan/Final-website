import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Support</h1>
                <p className="text-muted-foreground text-lg">
                    Need help? Our support team is here for you. Contact details and support resources coming soon.
                </p>
            </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
