import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About',
};

const About = () => {
  return (
    <>
      <h1>Blog - Show yourself</h1>
      <p>&copy; Kokapuk</p>
    </>
  );
};

export default About;
