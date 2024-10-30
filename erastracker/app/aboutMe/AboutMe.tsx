import React from 'react';


const AboutMe = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>
      
      {/* Uncomment and provide a valid path for the photo */}
      {/* <div className="flex justify-center mb-8">
        <Image 
          src="/path/to/your/photo.jpg" // Adjust path accordingly
          alt="My Photo"
          className="rounded-full shadow-lg w-32 h-32"
          width={128}
          height={128}
        />
      </div> */}
      
      <p className="text-lg text-gray-700 mb-4">
        Hey there! I’m <strong>Hien</strong> 🌟, and I’m so glad you stopped by! I’m a digital storyteller from <strong>Hanoi, Vietnam</strong> 🇻🇳, fueled by a passion for music 🎶 and technology 💻 that inspires everything I create.
      </p>
      
      <p className="text-lg text-gray-700 mb-4">
        I had the wonderful opportunity to study <strong>Business English</strong> for a semester at the <strong>Foreign Trade University in Hanoi</strong> 📚. At 18, I took a leap of faith and moved to <strong>Germany</strong> 🇩🇪 to follow my dreams. I graduated with a degree in <strong>Media & Information Technology</strong> from the <strong>University of Cologne</strong> 🎓 and am currently diving into my master's degree in <strong>Media & IT</strong> at the <strong>University of Applied Sciences Düsseldorf</strong>.
      </p>
      
      <p className="text-lg text-gray-700 mb-4">
        As a big fan of <strong>Taylor Swift</strong> 💖, I love exploring her music and connecting with fellow Swifties! When I’m not busy coding my latest web projects 💻 or enjoying live concerts 🎤, I’m on the lookout for new tunes to share with friends.
      </p>
      
      <p className="text-lg text-gray-700 mb-4">
        I recently worked on an exciting project about the <strong>Eras Tour</strong> 🌍, which let me blend my web development skills with my research interests. I’m super proud of what I created and can’t wait to see what’s next! 🚀
      </p>
      
      <p className="text-lg text-gray-700 mb-4">
        Looking ahead, I’m excited to continue my journey in <strong>digital storytelling</strong> 📖 and find creative ways to engage with amazing audiences like you. I truly believe in the power of storytelling to connect people, and I can’t wait to see where this adventure takes me! ✨
      </p>
      
      <div className="text-center mt-6">
        <p className="text-lg text-gray-700">
          I’d love to connect! Feel free to reach out to me on 
          <a href="[]" className="text-blue-500 hover:underline"> Twitter</a>, 
          <a href="[]" className="text-blue-500 hover:underline"> LinkedIn</a>, or 
          <a href="[]" className="text-blue-500 hover:underline"> Email</a>. 
          Let’s chat and explore new opportunities together! 🤝
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
