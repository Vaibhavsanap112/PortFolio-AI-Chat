import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: <Github size={24} />,
      label: 'GitHub',
      url: 'https://github.com/Vaibhavsanap112',
      color: 'hover:text-gray-300',
    },
    {
      icon: <Linkedin size={24} />,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/vaibhavsanap18//vaibhavsanap18',
      color: 'hover:text-blue-400',
    },
    {
      icon: <Twitter size={24} />,
      label: 'Twitter',
      url: '#',
      color: 'hover:text-cyan-400',
    },
    {
      icon: <Mail size={24} />,
      label: 'Email',
      url: 'sanapvaibhav8767@gmail.com',
      color: 'hover:text-red-400',
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="border-t border-slate-700 py-12 px-4 sm:px-6 lg:px-8 mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <span className="text-xl font-bold gradient-text">Vaibhav Sanap</span>
            </div>
            <p className="text-slate-400">
              Full Stack Developer & AI Enthusiast building amazing digital experiences
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#about" className="hover:text-blue-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-blue-400 transition">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-400 transition">
                  Skills
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-400 ${link.color} transition`}
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 Vaibhav Sanap. All rights reserved.
            </p>
            <div className="flex gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-blue-400 transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                Sitemap
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-8 border-t border-slate-700"
        >
          <p className="text-slate-400 text-sm mb-4">
            Made with React, TypeScript, Python, and love
          </p>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Python', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 border border-slate-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
