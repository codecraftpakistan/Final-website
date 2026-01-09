import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const features = [
  'Custom Software Development',
  'Agile Methodology',
  'Dedicated Support Team',
  '100% Secure & Scalable',
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
              We Transform Ideas Into{' '}
              <span className="gradient-text">Digital Reality</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Code Craft Pakistan is a leading software development company dedicated to 
              delivering innovative digital solutions. With a team of passionate developers, 
              designers, and strategists, we help businesses thrive in the digital age.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-display font-bold gradient-text">150+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div>
                <div className="text-3xl font-display font-bold gradient-text">10+</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="glass-card p-8 relative z-10">
                <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-display font-bold text-primary-foreground">&lt;/&gt;</span>
                    </div>
                    <p className="text-muted-foreground">Crafting Excellence Since 2025</p>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 glass-card p-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">⚡</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Fast Delivery</div>
                    <div className="text-xs text-muted-foreground">On-time, every time</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass-card p-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                    <span className="text-secondary font-bold">🛡️</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">100% Secure</div>
                    <div className="text-xs text-muted-foreground">Enterprise-grade</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
