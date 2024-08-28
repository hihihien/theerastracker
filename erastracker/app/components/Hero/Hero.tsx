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

const Hero = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content">
        <div className="max-w-md flex flex-row flex-nowrap">
          <button>
            <Image src={taylorswift} alt='hero'/>
          </button>
          <button>
            <Image src={fearless} alt='hero'/>
          </button>
          <button>
            <Image src={speaknow} alt='hero'/>
          </button>
          <button>
            <Image src={red} alt='hero'/>
          </button>
          <button>
            <Image src={nine} alt='hero'/>
          </button>
          <button>
            <Image src={reputation} alt='hero'/>
          </button>
          <button>
            <Image src={lover} alt='hero'/>
          </button>
          <button>
            <Image src={folklore} alt='hero'/>
          </button>
          <button>
            <Image src={evermore} alt='hero'/>
          </button>
          <button>
            <Image src={midnights} alt='hero'/>
          </button>
          <button>
            <Image src={ttpd} alt='hero'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero