import React from 'react';
import { SWRConfig } from 'swr';
import Header from './components/Header';
import Landing from './components/Landing';
import About from './components/About';
import Career from './components/Career';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Activity from './components/Activity';
import Footer from './components/Footer';
import './styles/themes.css';
import './styles/animations.css';

const App = () => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnFocus: false,
        dedupingInterval: 0,
        errorRetryCount: 3,
      }}
    >
      <div className="min-h-screen">
        <Header />
        <Landing />
        <main className="container mx-auto px-4">
          <About />
          <Career />
          <Projects />
          <Skills />
          <Activity />
        </main>
        <Footer />
      </div>
    </SWRConfig>
  );
}

export default App;