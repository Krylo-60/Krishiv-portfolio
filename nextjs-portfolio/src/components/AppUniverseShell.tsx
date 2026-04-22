"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const APPS = [
  { name: "Study Planner", href: "study-planner.html", tag: "Productivity", tier: "featured" },
  { name: "Quiz Zone", href: "quiz-zone.html", tag: "Learning" },
  { name: "Review App", href: "review-app.html", tag: "Feedback", tier: "featured" },
  { name: "Idea Lab AI", href: "idea-lab-ai.html", tag: "AI", tier: "featured" },
  { name: "Focus Timer", href: "focus-timer.html", tag: "Focus" },
  { name: "Games Hub", href: "games.html", tag: "Gaming" }
  // Truncated list for React Phase 2 speed, expands automatically later
];

export default function AppUniverseShell() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("default");
  
  // Handlers
  const toggleOverlay = () => setIsOpen((prev) => !prev);
  const closeOverlay = () => setIsOpen(false);
  const handleHomeBtn = () => { window.location.href = "/"; };
  
  const handleThemeToggle = () => {
    const nextTheme = theme === "default" ? "neon" : theme === "neon" ? "solar" : "default";
    setTheme(nextTheme);
    document.body.setAttribute("data-theme", nextTheme);
    localStorage.setItem("krishiv_theme_mode_v1", nextTheme);
  };

  useEffect(() => {
    // Component Mount Logic
    const savedTheme = localStorage.getItem("krishiv_theme_mode_v1") || "default";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleOverlay();
      }
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredApps = APPS.filter(app => 
    !searchTerm || 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="app-shell-dock">
        <button type="button" className="app-shell-btn" onClick={handleHomeBtn}>Home</button>
        <button type="button" className="app-shell-btn" onClick={toggleOverlay}>Apps</button>
        <button type="button" className="app-shell-btn" onClick={handleThemeToggle}>
          Theme: {theme}
        </button>
        <span className="app-shell-pill">Ctrl/Cmd + K</span>
      </div>

      {isOpen && (
        <div className="app-shell-overlay is-open" onClick={(e) => { if (e.target === e.currentTarget) closeOverlay(); }}>
          <section className="app-shell-panel" role="dialog" aria-modal="true">
            <header className="app-shell-head">
              <div className="app-shell-head-copy">
                <h2 className="app-shell-title">Apps Galaxy</h2>
                <p className="app-shell-subtitle">Your fastest route to favorites, AI tools, and live builds (React Mode).</p>
              </div>
              <input 
                className="app-shell-search" 
                type="search" 
                placeholder="Search app..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button type="button" className="app-shell-btn" onClick={closeOverlay}>Close</button>
            </header>
            
            <div className="app-shell-grid" id="shellGrid">
              <section className="app-shell-section">
                <p className="app-shell-section-label">All Active Apps</p>
                {filteredApps.map((app) => (
                  <article key={app.href} className="app-shell-link">
                    <div className="app-shell-link-row">
                      <a href={"/" + app.href} style={{ color: "inherit", textDecoration: "none", flex: 1 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                          <strong>{app.name}</strong>
                        </span>
                        <span>{app.tag}</span>
                      </a>
                    </div>
                  </article>
                ))}
              </section>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
