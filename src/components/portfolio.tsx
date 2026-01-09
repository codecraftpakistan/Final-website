import { motion } from "framer-motion";
import { ExternalLink, Github, Globe2, Layers } from "lucide-react";

const projects = [
  {
    title: "Enhancing Solar Energetic Partical Prediction",
    description:
      "Machine Learning approaches and Insights into Solar Energetic Particle Events",
    tech: ["Python", "TensorFlow", "Pandas", "numpy"],
    link: "#",
    repo: "#",
  },
  {
    title: "MATLAB-Centric",
    description:
      "MATLAB-Centric Modeling and Simulation of Intelligent Systems Using Machine Learning and Data-Driven Approaches",
    tech: ["MATLAB", "Simulink", "Machine Learning"],
    link: "#",
    repo: "#",
  },
  {
    title: "Development of MATLAB Algorithms",
    description:
      "Development of MATLAB Algorithms for Climate Change Prediction Using Machine Learning and Time-Series Analysis",
    tech: ["MATLAB", "Time-Series Analysis", "Machine Learning"],
    link: "#",
    repo: "#",
  },
  {
    title: "Higher Education Admission Dashboard(2025)",
    description:
      "A Tableau dashboard to analyze admissions data across programs and countries. Visualized applicant trends, demographics,acceptance rates, and program demand to support strategic decisionsin higher Education",
    tech: ["Tableau", "Data Visualization", "Dashboard Design"],
    link: "#",
    repo: "#",
  },
  {
    title: "Inventary Tracking(Capital Enterprises)",
    description:
      "Built Excel-based inventory and sales traking system,reducing stock errors by 30% and improving order fulfillment speed for a retail business.",
    tech: ["Excel", "VBA", "Inventory Management"],
    link: "#",
    repo: "#",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="h-5 w-5 text-primary" />
          <span className="text-primary font-medium tracking-wide uppercase text-sm">Portfolio</span>
        </div>
        <div className="flex flex-col gap-3 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
            Work that delivers <span className="gradient-text">outcomes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Recent projects where we partnered end-to-end: discovery, design, engineering, QA, and
            deployment. Each shipped with measurable business impact.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card p-6 border border-glass-border/60 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted/40 hover:bg-muted transition-colors"
                    aria-label="View live project"
                  >
                    <Globe2 className="h-4 w-4" />
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted/40 hover:bg-muted transition-colors"
                    aria-label="View code repository"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-muted/40 text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 text-primary font-medium">
                <ExternalLink className="h-4 w-4" />
                <span>Case study coming soon</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
