import React from 'react'
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
import Image from 'next/image'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <div className="">
      <div className="">
        <div className={styles.heroContainer}>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={taylorswift} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={fearless} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={speaknow} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={red} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={nine} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={reputation} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={lover} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={folklore} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={evermore} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '6,5%'}}>
            <Image src={midnights} alt='hero'/>
          </button>
          <button className={styles.Hero_imageButton} style={{opacity: '1', width: '35%'}}>
            <Image src={ttpd} alt='hero'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero