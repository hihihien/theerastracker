'use client'
import React from 'react';
import Image from 'next/image';
import me from './../../public/img/me.jpg'


const AboutMe = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className='prose font-mono antialiased'>
<h2 className="font-bold text-center mb-6 text-pink-500 hover:text-pink-700 no-underline">About Me</h2>
      
      <div className="flex justify-center mb-8">
        <Image 
          src={me}
          alt="My Photo"
          className="rounded-full shadow-lg w-32 h-32"
          width={128}
          height={128}
        />
      </div>
      <div>
        <p className="text-lg text-gray-700 mb-4">
        Hey there! I’m <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">Hien</a> 🌟, and I’m so glad you stopped by!
      </p>

      <p className="text-lg text-gray-700 mb-4">
        I’m from <a className="font-bold text-red-700 hover:text-red-500 no-underline">Hanoi, Vietnam</a> 🇻🇳, with a passion for music and technology 💻 that inspires everything I work on.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        I had the wonderful opportunity to study <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">Business English</a> for one semester at the <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">Foreign Trade University</a> in Hanoi 📚, before taking a leap of faith and moving to 
          <a className="font-bold text-pink-500 hover:text-pink-700 no-underline"> Germany</a> 🇩🇪 to study abroad at the age of 18.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        I graduated with a degree in <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">Media & Information Technology</a> from the <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">University of Cologne</a> 🎓 . I am currently diving into my master&#39;s degree, also in <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">
          Media & IT</a> at the <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">University of Applied Sciences Düsseldorf</a>.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        As a big fan of <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">Taylor Swift</a> 💖, I love exploring her music and connecting with fellow Swifties 😊. 
      </p>

      <p className="text-lg text-gray-700 mb-4">
        This <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">Eras Tour</a> 🌍 project grew from my appreciation for Taylor Swift and a genuine curiosity about tracking each surprise song and tour detail.
        It’s been an exciting blend of web development, visuals and research — and yes, I’m a bit proud of the result! I hope it brings a dash of insight, and maybe some joy to fellow Swiftie curiosities along the way. 🎶
      </p>

      <p className="text-lg text-gray-700 mb-4">
        As I look forward, I’m excited to continue this journey in <a className="font-bold text-pink-500 hover:text-pink-700 no-underline">digital storytelling</a> 📖 and uncover fresh, creative ways to engage with people ✨ 
        Whether you’re a Swiftie, who enjoyed this project, or just wandered by out of curiosity, feel free to reach out — I’d love to connect!
      </p>
      </div>
      </div>
      
      <div className="mockup-window bg-base-300 border mt-12">
        <div className="bg-base-200 flex justify-center px-4 py-5">
        <div className="flex flex-col mx-2">
          <div className="flex ">
          <div className="chat chat-start">
              <div className="chat-image avatar online">
                <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                  <Image
                    alt="chat bubble component"
                    src={me}/>
                </div>
              </div>
              <div className="chat-header prose">
                hihihien 
                <time className="text-xs opacity-50"> 12:29</time>
              </div>
              <div className="chat-bubble chat-bubble-secondary"><p className="text-lg">
                Feel free to reach out to me on 
                <a target="_blank" href="https://x.com/hokano29" className="underline underline-offset-2 decoration-2 decoration-pink-500 ml-2 text-slate-950 font-bold">Twitter</a>, 
                <a target="_blank" href="https://www.linkedin.com/in/hien-giang/" className="underline underline-offset-2 decoration-2 decoration-pink-500 ml-2 text-slate-950 font-bold">LinkedIn</a>, or 
                <a target="_blank" href="mailto:gianghien2999@gmail.com" className="underline underline-offset-2 decoration-2 decoration-pink-500 ml-2 text-slate-950 font-bold">Email</a>. 
                
              </p></div>
              <div className="chat-footer opacity-50 prose">Delivered</div>
            </div>
          </div>
          <div className="flex">
            <div className="chat chat-start">
                <div className="chat-image avatar online">
                  <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
                    <Image
                      alt="chat bubble component"
                      src={me}/>
                  </div>
                </div>
                <div className="chat-header">
                  hihihien
                  <time className="text-xs opacity-50 prose"> 12:29</time>
                </div>
                <div className="chat-bubble chat-bubble-secondary text-lg">Let’s chat! 🤝</div>
                <div className="chat-footer opacity-50 prose">Delivered</div>
              </div>
          </div>
        </div>

        
          
            

        </div>
      </div>
      
    </div>
  );
};

export default AboutMe;
