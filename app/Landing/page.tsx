"use client";

import "./Landing.css";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    setAnimateItems(true);
  }, []);

  const stackCategories = [
    {
      title: "Frontend & Mobile",
      icon: "📱",
      skills: ["Flutter", "Dart", "React", "Next.js", "TypeScript"]
    },
    {
      title: "Backend & Database",
      icon: "⚙️",
      skills: ["Node.js", "Firebase", "Supabase", "SQL", "RESTful API"]
    },
    {
      title: "Cloud & Services",
      icon: "☁️",
      skills: ["Cloud Services", "Push Notifications", "Google Maps", "Payment Integration"]
    },
    {
      title: "Tools & Others",
      icon: "🛠️",
      skills: ["State Management", "Provider", "Postman", "Git"]
    }
  ];
  return (
    <div className="portfolio-container">
      {/* Hero Section */}
      <section className="hero-section"  >
        <div className="hero-content">
          <div className="hero-tagline">
            <span className="tagline-prefix">#</span>
            <span className="tagline-text">Mobile|Web developer solving problems</span>
          </div>
          {/* <h1 className="hero-title">Unlock your full potential</h1> */}
        </div>
      </section>

    

      {/* Designer Intro Section */}
      <section className="designer-section">
        <div className="designer-content">
          <h2 className="designer-name">I&apos;m Daniel Narterh</h2>
          <p className="designer-desc">A web designer with a passion for crafting unique experiences.</p>
          <p className="designer-desc">I create websites that are not only functional but also visually appealing.</p>
          <p className="designer-desc">I help businesses grow and thrive online.</p>
          <div className="designer-cta">
            <span>Let&apos;s connect!</span>
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>
      </section>

         {/* STACK SECTION WITH BADGES */}
         <section className="stack-section">
        <div className="stack-header">
          <span className="stack-badge">💻 Tech Stack</span>
          <h2 className="stack-title">My Development Arsenal</h2>
          <p className="stack-subtitle">Tools & technologies I master to build exceptional digital experiences</p>
        </div>

        <div className="stack-grid">
          {stackCategories.map((category, idx) => (
            <div 
              key={idx} 
              className={`stack-category ${animateItems ? 'animate' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
              </div>
              <div className="skills-badge-container">
                {category.skills.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx} 
                    className="skill-badge"
                    style={{ animationDelay: `${skillIdx * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>


        <div className="apps-showcase">
  <div className="apps-header">
    <span className="apps-badge">📱 My Apps</span>
    {/* <h3 className="apps-title">Available on Play Store</h3> */}
    <p className="apps-subtitle">Check out my published applications</p>
  </div>
  
  <div className="apps-grid">
    <div className="app-card">
      <div className="app-image-container">
        <img 
          src="/images/borla.png" 
          alt="Borla App Icon"
          className="app-image"
        />
      </div>
      <div className="app-info">
        <h4 className="app-name">Borla Client</h4>
        {/* <p className="app-description">High-quality audio player with equalizer</p> */}
        <a 
          href="https://apps.apple.com/gh/app/borla-client/id6745721296" 
          target="_blank" 
          rel="noopener noreferrer"
          className="playstore-link"
        >
          <span></span> View 
        </a>
      </div>
    </div>

    <div className="app-card">
      <div className="app-image-container">
        <img 
          src="/images/borlawns.jpg" 
          alt="Task Manager App Icon"
          className="app-image"
        />
      </div>
      <div className="app-info">
        <h4 className="app-name">Borla WMS</h4>
        {/* <p className="app-description">Smart to-do list with reminders</p> */}
        <a 
          href="https://apps.apple.com/gh/app/borla-wms/id6745770160Borla WMS" 
          target="_blank" 
          rel="noopener noreferrer"
          className="playstore-link"
        >
          <span></span> View
        </a>
      </div>
    </div>

    <div className="app-card">
      <div className="app-image-container">
        <img 
          src="/images/filld.png" 
          alt="Fill'd Client App Icon"
          className="app-image"
        />
      </div>
      <div className="app-info">
        <h4 className="app-name">Fill'd Client</h4>
        {/* <p className="app-description">Manage your finances easily</p> */}
        <a 
          href="https://apps.apple.com/gh/app/filld-client/id6743875119" 
          target="_blank" 
          rel="noopener noreferrer"
          className="playstore-link"
        >
          <span></span> View
        </a>
      </div>
    </div>

    <div className="app-card">
      <div className="app-image-container">
        <img 
          src="/images/filld.png" 
          alt="Fill'd Rider App Icon"
          className="app-image"
        />
      </div>
      <div className="app-info">
        <h4 className="app-name">Fill'd Rider</h4>
        <p className="app-description"></p>
        <a 
          href="https://apps.apple.com/gh/app/filld-rider/id6744003756Fill'd Rider" 
          target="_blank" 
          rel="noopener noreferrer"
          className="playstore-link"
        >
          <span></span> View 
        </a>
      </div>
    </div>

    

    <div className="app-card">
      <div className="app-image-container">
        <img 
          src="/images/1fastMart.png" 
          alt="Chat Messenger App Icon"
          className="app-image"
        />
      </div>
      <div className="app-info">
        <h4 className="app-name">One Fast Mart</h4>
        {/* <p className="app-description">Real-time messaging with push notifications</p> */}
        {/* <a 
          href="https://play.google.com/store/apps/details?id=com.example.chat" 
          target="_blank" 
          rel="noopener noreferrer"
          className="playstore-link"
        >
          <span>📱</span> Get it on Play Store
        </a> */}
      </div>
    </div>

    <div className="app-card">
  
    <div className="app-image-container">
        <img 
          src="/images/team1.png" 
          alt="team"
          className="app-image"
        />
      </div>
      <div className="app-info">
        <h4 className="app-name">Team Business Reset</h4>
        <p className="app-description"></p>
        <a 
          href="https://teambusinessreset.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="playstore-link"
        >
          <span></span> View 
        </a>
      </div>
    </div>
  </div>
</div>



      </section>


 

      {/* Projects Section */}
      <section className="projects-section">
        <h3 className="projects-heading">Projects I&apos;m building at the moment</h3>
        <ul className="projects-list">
          <li>Luxina - Brand Studio</li>
          <li>Alexandra - Website</li>
          <li>Natalia - Landing Page</li>
        </ul>
      </section>
    </div>
  );
}