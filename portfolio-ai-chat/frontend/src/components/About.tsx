import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Zap, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code2 size={32} />,
      title: 'Clean Code',
      description: 'I write maintainable, scalable code following best practices and design patterns',
    },
    {
      icon: <Zap size={32} />,
      title: 'Fast & Efficient',
      description: 'Performance optimization is at the core of everything I build',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Always Learning',
      description: 'Constantly exploring new technologies and methodologies in web development',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            About Me
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            I'm an aspiring developer focused on building web and AI projects, learning modern stacks, and preparing for internships or entry-level roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass rounded-lg p-8 text-center hover:border-blue-400/50 transition"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="flex justify-center mb-4 text-blue-400"
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass rounded-lg p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 gradient-text">
                My Journey
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                As an aspiring developer, I'm focused on building personal projects, learning modern web and AI tools,
                and preparing for internships or entry-level roles. My journey is centered on growth and practical learning.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                I'm particularly passionate about integrating AI and machine learning into practical applications,
                and I love mentoring junior developers and contributing to open-source projects.
              </p>
              <p className="text-slate-300 leading-relaxed">
                When I'm not coding, you can find me exploring new frameworks, writing technical blog posts, or
                contributing to the developer community.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-6 text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">0</div>
                <p className="text-slate-400">Years Experience</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-6 text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">5+</div>
                <p className="text-slate-400">Personal Projects</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-6 text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">—</div>
                <p className="text-slate-400">Clients</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass rounded-lg p-6 text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-2">∞</div>
                <p className="text-slate-400">Always Learning</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
