import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const CookiePolicyPage = () => {
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
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Cookie Policy</h1>
                 <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p>We use cookies to enhance your experience. This policy describes what cookies we use and how you can manage them.</p>
                     {/* Placeholder content - can be replaced with real legal text later */}
                </div>
            </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicyPage;
