// app/aboutMe/page.tsx
import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import AboutMe from './AboutMe';

export default function AboutMePage() { // Rename this function
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <AboutMe />
      <Footer />
    </main>
  );
}
