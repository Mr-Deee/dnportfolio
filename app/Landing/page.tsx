"use client";

import "./Landing.css";
import { useState, useEffect, SetStateAction } from "react";

export default function LandingPage() {
  const [animateItems, setAnimateItems] = useState(false);
  const [contributions, setContributions] = useState<any[]>([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    setAnimateItems(true);
    fetchGitHubContributions();
  }, []);










  const fetchGitHubContributions = async () => {
    try {
      const username = 'Mr-Deee';
      
      // Fetch multiple pages of events for more data
      const pages = [1, 2, 3];
      const allEvents = [];
      
      for (const page of pages) {
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=100&page=${page}`);
        if (response.ok) {
          const events = await response.json();
          allEvents.push(...events);
        }
      }
      
      const contributionsByDay = new Map();
      let total = 0;
      
      allEvents.forEach((event: any) => {
        let contributionCount = 0;
        const date = new Date(event.created_at).toISOString().split('T')[0];
        
        switch (event.type) {
          case 'PushEvent':
            contributionCount = event.payload?.commits?.length || 1;
            break;
          case 'CreateEvent':
            if (event.payload?.ref_type === 'repository') {
              contributionCount = 1;
            }
            break;
          case 'PullRequestEvent':
            if (event.payload?.action === 'opened') {
              contributionCount = 1;
            }
            break;
          case 'IssuesEvent':
            if (event.payload?.action === 'opened') {
              contributionCount = 1;
            }
            break;
          case 'WatchEvent':
            contributionCount = 1;
            break;
          case 'ForkEvent':
            contributionCount = 1;
            break;
        }
        
        if (contributionCount > 0) {
          const currentCount = contributionsByDay.get(date) || 0;
          contributionsByDay.set(date, currentCount + contributionCount);
          total += contributionCount;
        }
      });
      
      // Generate last 52 weeks of contributions
      const weeks = [];
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (52 * 7));
      
      let currentStreakCount = 0;
      let longestStreakCount = 0;
      let tempStreak = 0;
      
      // Calculate streaks
      for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const count = contributionsByDay.get(dateStr) || 0;
        
        if (count > 0) {
          tempStreak++;
          if (i === 0) {
            currentStreakCount = tempStreak;
          }
        } else {
          if (tempStreak > longestStreakCount) {
            longestStreakCount = tempStreak;
          }
          tempStreak = 0;
        }
      }
      
      if (tempStreak > longestStreakCount) {
        longestStreakCount = tempStreak;
      }
      
      // Generate the grid
      for (let w = 0; w < 52; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + (w * 7) + d);
          const dateStr = date.toISOString().split('T')[0];
          const count = contributionsByDay.get(dateStr) || 0;
          
          const level = getContributionLevel(count);
          week.push({ date: dateStr, count, level });
        }
        weeks.push(week);
      }
      
      setContributions(weeks);
      setTotalContributions(total);
      setLongestStreak(longestStreakCount);
      setCurrentStreak(currentStreakCount);
      setLoading(false);
      setError(false);
      
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      setError(true);
      generateSampleData();
    }
  };


  const fetchGitHubRestAPI = async () => {
    try {
      const username = 'Mr-Deee';
      // Using REST API as fallback
      const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`);
      const data = await response.json();
      
      const contributionsByDay = new Map();
      let total = 0;
      
      data.forEach((event: any) => {
        if (event.type === 'PushEvent') {
          const date = new Date(event.created_at).toISOString().split('T')[0];
          const commitCount = event.payload?.commits?.length || 1;
          contributionsByDay.set(date, (contributionsByDay.get(date) || 0) + commitCount);
          total += commitCount;
        }
      });
      
      // Generate last 52 weeks of contributions
      const weeks = [];
      const today = new Date();
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - (52 * 7));
      
      let currentStreakCount = 0;
      let longestStreakCount = 0;
      let tempStreak = 0;
      
      for (let w = 0; w < 52; w++) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + (w * 7) + d);
          const dateStr = date.toISOString().split('T')[0];
          const count = contributionsByDay.get(dateStr) || 0;
          
          // Update streak
          if (count > 0) {
            tempStreak++;
            if (dateStr === today.toISOString().split('T')[0]) {
              currentStreakCount = tempStreak;
            }
          } else {
            if (tempStreak > longestStreakCount) {
              longestStreakCount = tempStreak;
            }
            tempStreak = 0;
          }
          
          const level = getContributionLevel(count);
          week.push({ date: dateStr, count, level });
        }
        weeks.push(week);
      }
      
      if (tempStreak > longestStreakCount) {
        longestStreakCount = tempStreak;
      }
      
      setContributions(weeks);
      setTotalContributions(total);
      setLongestStreak(longestStreakCount);
      setCurrentStreak(currentStreakCount);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching GitHub REST API:', error);
      generateSampleData();
    }
  };

  const getContributionLevel = (count: number) => {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 9) return 3;
    return 4;
  };

  const generateSampleData = () => {
    const weeks = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (52 * 7));
    
    let total = 0;
    
    for (let w = 0; w < 52; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (w * 7) + d);
        const count = Math.floor(Math.random() * 15);
        total += count;
        
        const level = getContributionLevel(count);
        week.push({ date: date.toISOString().split('T')[0], count, level });
      }
      weeks.push(week);
    }
    
    setContributions(weeks);
    setTotalContributions(total);
    setLongestStreak(14);
    setCurrentStreak(5);
    setLoading(false);
    setError(true);
  };

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
            <img 
          src="/images/logo.PNG" 
          alt="Task Manager App Icon"
          className="tagline-prefix"
        />
            <span className="tagline-text">Mobile developer solving problems</span>
          </div>
          {/* <h1 className="hero-title">Unlock your full potential</h1> */}
        </div>
      </section>

    

      {/* Designer Intro Section */}
 {/* Designer Intro Section */}
<section className="designer-section">
  <div className="designer-content">
    <h2 className="designer-name">I&apos;m Daniel Narterh</h2>
    <p className="designer-desc">A full-stack developer passionate about building cross-platform experiences with <strong>Flutter</strong> & <strong>Dart</strong>.</p>
    <p className="designer-desc">I craft scalable backend solutions using <strong>Node.js</strong>, <strong>Firebase</strong>, and <strong>Supabase</strong>, with seamless <strong>RESTful API</strong> integration.</p>
    <p className="designer-desc">From <strong>payment gateways</strong> and <strong>Google Maps</strong> to <strong>push notifications</strong> and <strong>real-time features</strong> - I build complete, production-ready applications.</p>
  
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

<div className="hero-content">
  <a 
    href="https://github.com/Mr-Deee" 
    target="_blank" 
    rel="noopener noreferrer"
    className="hero-tagline-link"
  >
    <div className="hero-tagline">
      <img 
        src="/images/logo.PNG" 
        alt="GitHub Logo"
        className="tagline-prefix"
      />
      <span className="tagline-text">My GitHub</span>
    </div>
  </a>
  {/* <h1 className="hero-title">Unlock your full potential</h1> */}
</div>

      </section>


 

    </div>
  );
}