import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../api';
import ProfileImg from '../assets/Scatter.jpg';

const Hero: React.FC = () => {
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    portfolioAPI.getPortfolio().then(setPortfolio);
  }, []);

  const words = ['Developer', 'Designer', 'AI Enthusiast', 'Problem Solver'];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!portfolio) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-80 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4 gradient-text"
              whileHover={{ scale: 1.02 }}
            >
              {portfolio.fullName}
            </motion.h1>
            <div className="text-2xl md:text-3xl font-semibold h-12 mb-6 text-blue-400">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {words[wordIndex]}
              </motion.span>
            </div>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {portfolio.summary}
            </p>
            <div className="flex gap-4 flex-wrap">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${portfolio.email}`}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Get in Touch
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="border-2 border-blue-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-400/10 transition"
              >
                View My Work
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-1">
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={ProfileImg}
                    alt="Profile"
                    className="w-72 h-72 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
