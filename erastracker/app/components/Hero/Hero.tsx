
'use client';

import React, { useState } from 'react'
import taylorswift from '../../../public/img/taylorswift.jpg'
import fearless from '../../../public/img/fearless.jpg'
import speaknow from '../../../public/img/speaknow.jpg'
import red from '../../../public/img/red.jpg'
import nine from '../../../public/img/nine.jpg'
import reputation from '../../../public/img/reputation.jpg'
import lover from '../../../public/img/lover.jpg'
import folklore from '../../../public/img/folklore.jpg'
import evermore from '../../../public/img/evermore.jpg'
import midnights from '../../../public/img/midnights.jpg'
import ttpd from '../../../public/img/ttpd.jpg'
import Image, { StaticImageData } from 'next/image'
import styles from './Hero.module.css'

const themes: string[] = [
  'lemonade',
  'cyberpunk',
  'synthwave',
  'red',
  'pastel',
  'black',
  'valentine',
  'luxury',
  'retro',
  'aqua',
  'wireframe',
];

const Hero: React.FC = () => {
  const [expandedImage, setExpandedImage] = useState<number | null>(null);
  const [theme, setTheme] = useState<string>('light');

  const images: StaticImageData[] = [
    taylorswift,
    fearless,
    speaknow,
    red,
    nine,
    reputation,
    lover,
    folklore,
    evermore,
    midnights,
    ttpd
  ];

  const handleClick = (index:number) => {
    setExpandedImage(index === expandedImage ? null : index);
    setTheme(theme[index]);
    document.documentElement.setAttribute('data-theme', themes[index]);
  };

  return (
    <div className="">
      <div className="">
        <div className={styles.heroContainer}>
          {images.map((image, index) => (
            <button
              key={index}
              className={styles.Hero_imageButton}
              style={{ width: expandedImage === index ? '35%' : '6.5%', opacity: '1 '}}
              onClick={() => handleClick(index)}
            >
              <Image src={image} alt={'hero ${index}'} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;