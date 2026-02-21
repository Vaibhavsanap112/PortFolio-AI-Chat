import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import SkillsSection from './components/Skills';
import Footer from './components/Footer';
import Chat from './components/Chat';
import { portfolioAPI, Experience as ExperienceType, Project, Skills } from './api';
import './index.css';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [experience, setExperience] = useState<ExperienceType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skills | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [expData, projData, skillsData] = await Promise.all([
          portfolioAPI.getExperience(),
          portfolioAPI.getProjects(),
          portfolioAPI.getSkills(),
        ]);
        setExperience(expData);
        setProjects(projData);
        setSkills(skillsData);
      } catch (error) {
        console.error('Failed to load portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-blue-500 border-t-purple-500 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Navigation onChatClick={() => setIsChatOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <Experience experience={experience} />
        <Projects projects={projects} />
        {skills && <SkillsSection skills={skills} />}
      </main>

      <Footer />

      {/* Chat Button - Fixed */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 left-4 md:left-auto md:right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/50 transition"
          title="Open AI Chat"
        >
          <MessageCircle size={28} className="text-white" />
        </motion.button>
      )}

      {/* Chat Window */}
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;
