import { motion } from 'framer-motion';
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  ShieldCheck, 
  Palette, 
  TrendingUp, 
  LineChart,
  FileChartColumn,
  Brain,
  Clapperboard,
  PenTool,
  Megaphone
} from 'lucide-react';
import { useState } from 'react';
import { Line } from 'recharts';

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies like bootstrap, React, Next.js, and Node.js.',
    details: 'We build responsive, accessible, and performant web apps with a focus on SEO, maintainability, and fast load times. Includes CI/CD setup and optional hosting.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Native and cross‑platform mobile applications for iOS and Android built using Flutter.',
    details: 'Cross-platform Flutter apps with native performance, push notifications, onboarding flows, and store deployment support.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Clapperboard,
    title: 'Video Editing',
    description: 'Professional video editing services for all your media needs.',
    details: 'Color grading, cuts, transitions, subtitles, and format delivery optimized for web and social platforms.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    description: 'Simple and effective security checks to keep your data and systems safe.',
    details: 'Vulnerability scanning, basic hardening, secure configuration guidance, and incident response planning.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: PenTool,
    title: 'UI/UX / Graphic Design',
    description: 'Creative logo, UI/UX, and poster design services focused on clarity, visuals, and ease of use.',
    details: 'Branding, wireframes, prototypes, and high-fidelity designs delivered in Figma or source files.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'SEO, content strategy, and performance marketing to grow your online presence.',
    details: 'SEO audits, keyword strategy, content calendars, and paid campaign setup and optimization.',
    gradient: 'from-pink-500 to-rose-500',
  },
   {
    icon: LineChart ,
    title: 'Data Analytics',
    description: 'We turn data into actionable insights to drive business growth.',
    details: 'Data collection, visualization, and predictive analytics using tools like Excel, PowerBI, and Tableau.',
    gradient: 'from-pink-500 to-rose-500',
  },
    {
    icon: FileChartColumn,
    title: 'Business Analytics',
    description: 'Analyzes business needs and proposes solutions to improve processes',
    details: 'Process mapping, requirement gathering, and solution assessment to enhance business operations.',
    gradient: 'from-pink-500 to-rose-500',
  },
      {
    icon: Brain,
    title: 'Machine Learning/ Deep Learning',
    description: 'We build intelligent systems that learn and adapt to your needs.',
    details: 'Model development, training, and deployment using frameworks like TensorFlow and PyTorch.',
    gradient: 'from-pink-500 to-rose-500',
  },
  
  
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />

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
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
            Solutions That Drive <span className="gradient-text">Success</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to deployment, we offer end-to-end digital solutions 
            tailored to your business needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="glass-card p-8 group cursor-pointer relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Expanded details (shown on click) */}
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-sm text-muted-foreground"
                >
                  {service.details}
                </motion.div>
              )}

              {/* Arrow indicator */}
              <div
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveIndex(activeIndex === index ? null : index); }}
                className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="text-sm font-medium">{activeIndex === index ? 'Hide' : 'Learn More'}</span>
                <span className="group-hover:translate-x-1 transition-transform">{activeIndex === index ? '←' : '→'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;