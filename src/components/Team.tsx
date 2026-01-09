import { motion } from 'framer-motion';
import { Linkedin, Twitter, Github, Link } from 'lucide-react';
import bilal from '@/Assets/bilal.jpg';
import asad from '@/Assets/asad.jpeg';
import khalid from '@/Assets/khalid.jpeg';
import abdullahBurhan from '@/Assets/abdullah burhan.jpeg';
import ammar from '@/Assets/ammar.jpeg';
import amna from '@/Assets/amna.jpeg';
import alishba from '@/Assets/Alishba.jpeg';
import tanveer from '@/Assets/tanveer.jpeg';

const teamMembers = [
  {
    name: 'Bilal Ahmad (Founder & CEO)',
    role: 'Business and Data Analyst',
    image: bilal,
    bio: 'Data driven Junior Business Analyst with real world impact',
    social: { linkedin: '#', twitter: '#', github: '#', website: '#' },
  },
  {
    name: 'Abdullah Burhan (COO)',
    role: 'Digital Marketing',
    image: abdullahBurhan,
    bio: 'Digital marketing specialist driving growth through SEO and content strategy.',
    social: { linkedin: '#', twitter: '#', github: '#', website: '#' },
  },
  {
    name: 'Asad Ullah (CTO)',
    role: 'Web Developer',
    image: asad,
    bio: 'Java Backend Developer with strong knowledge of Java, Spring, Spring Boot, Servlets, REST APIs, and MySQL',
    social: { linkedin: '#', twitter: '#', github: '#', website: '#' },
  },
  {
    name: 'Khalid Bin Waheed',
    role: 'App Developer and Certified Ethical Hacker',
    image: khalid,
    bio: 'Flutter App Developer and Certified Ethical Hacker passionate about cybersecurity and mobile solutions.',
    social: { linkedin: 'https://www.linkedin.com/in/ikhalidbinwaheed/', twitter: 'https://x.com/Khalidjan63', github: 'https://github.com/Khalidbinwaheed', website: 'https://khalidbinwaheed.github.io/Khalid-Portfolio/' },
  },
  
  {
    name: 'Ammar Farooq',
    role: 'Graphic Designer',
    image: ammar,
    bio: 'Visual storytelling through logos, posters, flyers capturing your brands essence.',
    social: { linkedin: '#', twitter: '#', github: '#', website: '#' },
  },
  {
    name: 'Amna Noor',
    role: 'Web Developer',
    image: amna,
    bio: 'Web development lead specializing in React and Node.js.',
    social: { linkedin: '#', twitter: '#', github: '#', website: '#' },
  },
  {
    name: 'Alishba Hayat',
    role: 'Video Editor',
    image: alishba,
    bio: 'Video editing expert with a passion for storytelling.',
    social: { linkedin: '#', twitter: '#', github: '#', website: '#' },
  },
  {
    name: 'Umar Tanveer Khan',
    role: 'Junior Data Analyst',
    image: tanveer,
    bio: 'Junior Data Analyst with real world impact',
    social: { linkedin: '#', twitter: '#', github: '#', website: '#' },
  },
  
];

const Team = () => {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />

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
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-4 mb-6">
            Meet the <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A passionate team of developers, designers, and strategists dedicated to your success.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-6 text-center group"
            >
              {/* Avatar */}
              <div className="relative w-28 h-28 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-full h-full rounded-full object-cover border-2 border-glass-border group-hover:border-primary transition-colors duration-300"
                />
              </div>

              {/* Info */}
              <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-2">
                {member.role}
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {member.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <a
                  href={member.social.linkedin}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={member.social.twitter}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href={member.social.github}
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                {member.social.website && (
                  <a
                    href={member.social.website}
                    className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    aria-label="Website"
                  >
                    <Link className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
