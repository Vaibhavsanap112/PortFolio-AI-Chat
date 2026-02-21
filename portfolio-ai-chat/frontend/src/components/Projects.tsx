import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

import TiffinImg from '../assets/SaiSanchit.png';
import CrimeImg from '../assets/PredectivePolicing.jpeg';
import DefaultProjectImg from '../assets/Scatter.jpg';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link: string;
  github: string;
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg">
            A selection of my recent work and achievements
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const imageMap: Record<string, string> = {
              'Tiffin Service Management Website': TiffinImg,
              'Crime Prediction and Analysis System': CrimeImg,
            };

            const imageSrc =
              imageMap[project.title] ||
              project.image ||
              DefaultProjectImg;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass rounded-lg overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden flex items-center justify-center bg-slate-800">
                  <img
                    src={imageSrc}
                    alt={project.title}
                    className="w-full h-full object-contain transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-40 transition" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-purple-300 border border-purple-500/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-purple-400 transition"
                    >
                      <Github size={20} />
                      Code
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-purple-400 transition"
                    >
                      <ExternalLink size={20} />
                      Visit
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;