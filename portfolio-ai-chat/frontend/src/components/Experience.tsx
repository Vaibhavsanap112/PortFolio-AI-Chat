import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-lg">Journey through my career</p>
        </motion.div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10 }}
              className="glass rounded-lg p-8 border-l-4 border-blue-500 hover:border-purple-500 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    {exp.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span className="text-lg">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{exp.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-slate-300 mb-4 leading-relaxed">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-blue-300 border border-blue-500/30"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
