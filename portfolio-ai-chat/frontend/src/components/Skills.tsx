import React from 'react';
import { motion } from 'framer-motion';

interface SkillsProps {
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    ai_ml: string[];
    tools: string[];
  };
}

const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  const categories = [
    { name: 'Frontend', items: skills.frontend, color: 'from-blue-500 to-cyan-500' },
    { name: 'Backend', items: skills.backend, color: 'from-purple-500 to-pink-500' },
    { name: 'Databases', items: skills.databases, color: 'from-green-500 to-emerald-500' },
    { name: 'AI & ML', items: skills.ai_ml, color: 'from-indigo-500 to-purple-500' },
    { name: 'Tools', items: skills.tools, color: 'from-cyan-500 to-blue-500' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Technical Skills
          </h2>
          <p className="text-slate-400 text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="glass rounded-lg p-6"
            >
              <h3 className={`text-xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`px-4 py-2 bg-gradient-to-r ${category.color} bg-opacity-10 border border-blue-500/30 rounded-lg text-sm font-semibold text-white hover:bg-opacity-20 transition cursor-default`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
