import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What technologies do you work with?',
    answer: 'We specialize in modern web technologies including React, Next.js, Node.js, Python, and cloud platforms like AWS and Azure. Our mobile team is proficient in React Native and Flutter.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity. A simple website might take 2-4 weeks, while a full-featured enterprise application could take 3-6 months. We provide detailed timelines during our initial consultation.',
  },
  {
    question: 'Do you offer ongoing support and maintenance?',
    answer: 'Yes! We offer comprehensive maintenance packages that include bug fixes, security updates, performance optimization, and feature enhancements. Our support team is available 24/7.',
  },
  {
    question: 'What is your pricing model?',
    answer: 'We offer flexible pricing models including fixed-price projects, time & materials, and dedicated team arrangements. We\'ll recommend the best model based on your project requirements.',
  },
  {
    question: 'Can you work with international clients?',
    answer: 'Absolutely! We work with clients worldwide. Our team is experienced in remote collaboration, using tools like Slack, Zoom, and project management platforms to ensure seamless communication.',
  },
  {
    question: 'Do you sign NDAs?',
    answer: 'Yes, we take confidentiality seriously. We\'re happy to sign NDAs before discussing project details. Your intellectual property and business ideas are safe with us.',
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers. Here are some of the most common questions we receive.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-glass-border data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:text-primary py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;