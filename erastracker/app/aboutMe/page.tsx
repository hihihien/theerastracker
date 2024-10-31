// app/aboutMe/page.tsx
import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import AboutMe from './AboutMe';

export default function AboutMePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <AboutMe />
    </main>
  );
}
