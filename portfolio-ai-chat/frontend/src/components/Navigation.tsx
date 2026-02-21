import React from 'react';
import { Menu, X, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavProps {
  onChatClick: () => void;
}

const Navigation: React.FC<NavProps> = ({ onChatClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 glass border-b border-slate-700"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">VS</span>
          </div>
          <span className="text-xl font-bold gradient-text">Vaibhav Sanap</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-blue-400 transition"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="hover:text-blue-400 transition"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-blue-400 transition"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="hover:text-blue-400 transition"
          >
            Skills
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onChatClick}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg"
          >
            Chat with AI <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-light border-t border-slate-700 p-4 space-y-4"
        >
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left hover:text-blue-400 transition py-2"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="block w-full text-left hover:text-blue-400 transition py-2"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="block w-full text-left hover:text-blue-400 transition py-2"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="block w-full text-left hover:text-blue-400 transition py-2"
          >
            Skills
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={onChatClick}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            Chat with AI <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navigation;
