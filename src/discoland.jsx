import { useState, useEffect, useRef } from "react";

// ── Fonts via Google Fonts (injected in head) ──────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syncopate:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

// ── Global styles ───────────────────────────────────────────────────────────
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #FFD700;
    --pink: #FF2D78;
    --cyan: #00F5FF;
    --purple: #9B30FF;
    --dark: #080810;
    --dark2: #0D0D1A;
    --glass: rgba(255,255,255,0.04);
    --glass-border: rgba(255,255,255,0.1);
    --text: #F0EEF8;
    --muted: rgba(240,238,248,0.5);
  }
  html { scroll-behavior: smooth; }
  body {
    background: var(--dark);
    color: var(--text);
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--dark2); }
  ::-webkit-scrollbar-thumb { background: var(--pink); border-radius: 2px; }

  /* Grain overlay */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
    opacity: 0.35;
  }

  @keyframes pulse-glow {
    0%,100% { box-shadow: 0 0 20px var(--pink), 0 0 60px rgba(255,45,120,0.3); }
    50% { box-shadow: 0 0 40px var(--pink), 0 0 100px rgba(255,45,120,0.5); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes flicker {
    0%,19%,21%,23%,25%,54%,56%,100% { opacity: 1; }
    20%,24%,55% { opacity: 0.4; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-up-delay-1 { animation: fadeUp 0.7s 0.1s ease both; }
  .fade-up-delay-2 { animation: fadeUp 0.7s 0.2s ease both; }
  .fade-up-delay-3 { animation: fadeUp 0.7s 0.3s ease both; }

  section { padding: 100px 0; }

  .section-label {
    font-family: 'Syncopate', sans-serif;
    font-size: 10px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--pink);
    margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 8vw, 96px);
    line-height: 0.9;
    letter-spacing: 0.02em;
    background: linear-gradient(135deg, #fff 30%, var(--gold) 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass-card {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(12px);
    border-radius: 16px;
  }

  .neon-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px;
    font-family: 'Syncopate', sans-serif;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    border-radius: 4px; cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .neon-btn-primary {
    background: var(--pink);
    color: #fff;
    border: 2px solid var(--pink);
    box-shadow: 0 0 20px rgba(255,45,120,0.4);
  }
  .neon-btn-primary:hover {
    background: transparent;
    color: var(--pink);
    box-shadow: 0 0 40px rgba(255,45,120,0.6);
    transform: translateY(-2px);
  }
  .neon-btn-outline {
    background: transparent;
    color: var(--text);
    border: 2px solid rgba(255,255,255,0.2);
  }
  .neon-btn-outline:hover {
    border-color: var(--cyan);
    color: var(--cyan);
    box-shadow: 0 0 20px rgba(0,245,255,0.3);
    transform: translateY(-2px);
  }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  /* Nav */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    transition: all 0.4s ease;
  }
  .nav.scrolled {
    background: rgba(8,8,16,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,45,120,0.2);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px;
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px; letter-spacing: 0.1em;
    background: linear-gradient(90deg, var(--gold), var(--pink));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: flicker 8s infinite;
    cursor: pointer;
  }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-family: 'Syncopate', sans-serif;
    font-size: 10px; letter-spacing: 0.2em;
    color: var(--muted); text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--cyan); }
  .nav-mobile-toggle {
    display: none; background: none; border: none;
    cursor: pointer; color: var(--text); font-size: 24px;
  }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-links.open {
      display: flex; flex-direction: column; gap: 20px;
      position: absolute; top: 70px; left: 0; right: 0;
      background: rgba(8,8,16,0.98); padding: 30px 40px;
      border-bottom: 1px solid var(--glass-border);
    }
    .nav-mobile-toggle { display: block; }
    .nav-inner { padding: 16px 24px; }
  }

  /* Hero */
  .hero {
    min-height: 100vh; position: relative;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 50%, rgba(155,48,255,0.25) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 30%, rgba(255,45,120,0.2) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 50% 80%, rgba(0,245,255,0.1) 0%, transparent 50%),
      linear-gradient(180deg, #080810 0%, #0D0814 50%, #080810 100%);
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.07;
    background-image:
      linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px);
    background-size: 60px 60px;
    transform: perspective(500px) rotateX(20deg);
    transform-origin: center bottom;
  }
  .disco-ball {
    position: absolute; top: 15%; right: 8%;
    width: 140px; height: 140px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%,
      #fff 5%, #e0e0ff 15%, #9B30FF 35%, #FF2D78 55%, #00F5FF 75%, #0a0a2a 100%);
    box-shadow:
      0 0 40px rgba(155,48,255,0.6),
      0 0 80px rgba(255,45,120,0.3),
      inset 0 0 30px rgba(0,0,0,0.5);
    animation: float 4s ease-in-out infinite, spin-slow 20s linear infinite;
  }
  .disco-ball::after {
    content: '';
    position: absolute; inset: 0;
    border-radius: 50%;
    background: repeating-conic-gradient(
      rgba(255,255,255,0.1) 0deg, transparent 5deg,
      transparent 10deg, rgba(255,255,255,0.05) 15deg
    );
  }
  .scan-line {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent);
    animation: scan 6s linear infinite;
    pointer-events: none;
  }
  .hero-content {
    position: relative; z-index: 2;
    text-align: center; padding: 0 24px;
    max-width: 900px;
  }
  .hero-eyebrow {
    font-family: 'Syncopate', sans-serif;
    font-size: 11px; letter-spacing: 0.5em;
    color: var(--gold); margin-bottom: 24px;
    animation: fadeUp 0.6s ease forwards;
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(100px, 20vw, 220px);
    line-height: 0.85; letter-spacing: 0.03em;
    background: linear-gradient(
      90deg,
      var(--gold) 0%, #fff 25%, var(--pink) 50%, var(--cyan) 75%, var(--gold) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: shimmer 4s linear infinite, fadeUp 0.7s 0.1s ease both;
    text-shadow: none;
  }
  .hero-tagline {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(16px, 2.5vw, 22px);
    font-weight: 300; letter-spacing: 0.1em;
    color: var(--muted); margin: 20px 0 48px;
    animation: fadeUp 0.7s 0.2s ease both;
  }
  .hero-tagline span { color: var(--cyan); font-weight: 500; }
  .hero-ctas {
    display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
    animation: fadeUp 0.7s 0.3s ease both;
  }
  .hero-scroll {
    position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    font-family: 'Syncopate', sans-serif; font-size: 9px; letter-spacing: 0.3em;
    color: var(--muted); animation: float 2s ease-in-out infinite;
    cursor: pointer; text-decoration: none;
  }
  .hero-scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, var(--pink), transparent);
  }

  /* Marquee ticker */
  .ticker {
    background: var(--pink); padding: 10px 0; overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.2);
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .ticker-inner {
    display: flex; white-space: nowrap;
    animation: marquee 25s linear infinite;
  }
  .ticker-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 0.1em;
    padding: 0 40px; color: #fff;
  }
  .ticker-dot { color: var(--gold); }

  /* Music */
  .music-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 32px; margin-top: 60px;
  }
  @media (max-width: 768px) { .music-grid { grid-template-columns: 1fr; } }
  .track-list { display: flex; flex-direction: column; gap: 8px; }
  .track-item {
    display: flex; align-items: center; gap: 16px;
    padding: 16px 20px; border-radius: 12px;
    background: var(--glass); border: 1px solid var(--glass-border);
    cursor: pointer; transition: all 0.3s ease;
  }
  .track-item:hover, .track-item.active {
    background: rgba(255,45,120,0.08);
    border-color: var(--pink);
  }
  .track-num {
    font-family: 'Syncopate', sans-serif;
    font-size: 10px; color: var(--muted); width: 20px;
  }
  .track-item.active .track-num { color: var(--pink); }
  .track-info { flex: 1; }
  .track-name { font-weight: 500; font-size: 15px; }
  .track-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .track-duration { font-family: 'Syncopate', sans-serif; font-size: 11px; color: var(--muted); }
  .track-bars {
    display: flex; align-items: flex-end; gap: 3px; height: 24px;
  }
  .track-bar {
    width: 3px; background: var(--pink);
    border-radius: 2px; animation: trackBar 0.8s ease-in-out infinite alternate;
  }
  .track-bar:nth-child(2) { animation-delay: 0.15s; }
  .track-bar:nth-child(3) { animation-delay: 0.3s; }
  .track-bar:nth-child(4) { animation-delay: 0.45s; }
  @keyframes trackBar {
    from { height: 4px; }
    to { height: 20px; }
  }
  .player-panel {
    padding: 32px;
    display: flex; flex-direction: column; gap: 24px;
  }
  .player-art {
    width: 100%; aspect-ratio: 1;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--purple), var(--pink), var(--gold));
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-size: 80px; animation: spin-slow 15s linear infinite;
  }
  .player-art::after {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at center, rgba(0,0,0,0.5), transparent);
  }
  .player-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; }
  .player-artist { color: var(--muted); font-size: 14px; }
  .progress-bar {
    height: 4px; background: var(--glass-border);
    border-radius: 2px; cursor: pointer; position: relative;
  }
  .progress-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, var(--pink), var(--gold));
    position: relative; transition: width 0.1s linear;
  }
  .progress-fill::after {
    content: ''; position: absolute; right: -6px; top: -4px;
    width: 12px; height: 12px; border-radius: 50%;
    background: #fff; box-shadow: 0 0 8px var(--pink);
  }
  .player-controls {
    display: flex; align-items: center; justify-content: center; gap: 24px;
  }
  .ctrl-btn {
    background: none; border: none; cursor: pointer;
    color: var(--muted); font-size: 20px; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: 50%;
  }
  .ctrl-btn:hover { color: var(--text); }
  .ctrl-btn.play {
    width: 56px; height: 56px; font-size: 24px;
    background: var(--pink); color: #fff;
    box-shadow: 0 0 24px rgba(255,45,120,0.5);
    animation: pulse-glow 2s infinite;
  }
  .ctrl-btn.play:hover { transform: scale(1.08); }
  .streaming-links {
    display: flex; gap: 12px;
  }
  .stream-btn {
    flex: 1; padding: 10px 8px; border-radius: 8px;
    background: var(--glass); border: 1px solid var(--glass-border);
    color: var(--muted); font-family: 'Syncopate', sans-serif;
    font-size: 9px; letter-spacing: 0.1em;
    cursor: pointer; transition: all 0.3s; text-align: center;
    text-decoration: none; display: block;
  }
  .stream-btn:hover { border-color: var(--gold); color: var(--gold); }

  /* Videos */
  .videos-section { background: var(--dark2); }
  .video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px; margin-top: 60px;
  }
  .video-card {
    border-radius: 12px; overflow: hidden;
    border: 1px solid var(--glass-border);
    cursor: pointer; transition: all 0.3s ease;
    position: relative;
  }
  .video-card:hover { transform: translateY(-6px); border-color: var(--pink); }
  .video-card:hover .video-overlay { opacity: 1; }
  .video-thumb {
    aspect-ratio: 16/9; position: relative; overflow: hidden;
    background: linear-gradient(135deg, #1a0030, #300030, #001a30);
    display: flex; align-items: center; justify-content: center;
    font-size: 60px;
  }
  .video-thumb-bg {
    position: absolute; inset: 0;
    background: radial-gradient(circle at var(--px, 50%) var(--py, 50%), rgba(155,48,255,0.4), transparent 60%);
  }
  .video-overlay {
    position: absolute; inset: 0;
    background: rgba(255,45,120,0.2);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s;
  }
  .play-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: rgba(255,45,120,0.9);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; color: #fff;
    box-shadow: 0 0 30px rgba(255,45,120,0.6);
  }
  .video-info { padding: 16px; background: var(--glass); }
  .video-title { font-weight: 500; font-size: 15px; margin-bottom: 4px; }
  .video-sub { font-size: 12px; color: var(--muted); }
  .video-modal {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.9); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }
  .video-modal-inner {
    width: 100%; max-width: 900px; position: relative;
  }
  .modal-close {
    position: absolute; top: -48px; right: 0;
    background: none; border: none; color: #fff;
    font-size: 32px; cursor: pointer; opacity: 0.7;
    transition: opacity 0.2s;
  }
  .modal-close:hover { opacity: 1; }
  .video-embed {
    width: 100%; aspect-ratio: 16/9;
    background: #000; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syncopate', sans-serif;
    font-size: 12px; letter-spacing: 0.2em;
    color: var(--muted); flex-direction: column; gap: 16px;
    border: 1px solid var(--glass-border);
  }
  .video-embed-icon { font-size: 48px; }

  /* Tour Dates */
  .tour-table { margin-top: 60px; }
  .tour-row {
    display: grid;
    grid-template-columns: 120px 1fr 1fr auto;
    align-items: center; gap: 24px;
    padding: 24px 28px; margin-bottom: 8px;
    border-radius: 12px;
    background: var(--glass); border: 1px solid var(--glass-border);
    transition: all 0.3s;
  }
  .tour-row:hover {
    background: rgba(255,45,120,0.06);
    border-color: rgba(255,45,120,0.3);
    transform: translateX(4px);
  }
  @media (max-width: 600px) {
    .tour-row {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
    }
    .tour-row > *:last-child { grid-column: 1 / -1; }
  }
  .tour-date {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px; color: var(--gold);
  }
  .tour-city { font-weight: 600; font-size: 17px; }
  .tour-venue { color: var(--muted); font-size: 14px; margin-top: 2px; }
  .tour-btn {
    padding: 10px 24px;
    background: transparent; border: 1px solid var(--pink);
    color: var(--pink); border-radius: 6px;
    font-family: 'Syncopate', sans-serif; font-size: 10px;
    letter-spacing: 0.15em; cursor: pointer;
    transition: all 0.3s; white-space: nowrap;
    text-decoration: none;
  }
  .tour-btn:hover {
    background: var(--pink); color: #fff;
    box-shadow: 0 0 20px rgba(255,45,120,0.4);
  }
  .sold-out {
    color: var(--muted); border-color: var(--muted);
    cursor: default; pointer-events: none;
  }

  /* Gallery */
  .gallery-section { background: var(--dark2); }
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    gap: 12px; margin-top: 60px;
  }
  @media (max-width: 768px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .gallery-featured { grid-column: span 2 !important; grid-row: span 1 !important; }
  }
  .gallery-item {
    border-radius: 8px; overflow: hidden;
    cursor: pointer; position: relative;
    transition: transform 0.3s ease;
  }
  .gallery-item:hover { transform: scale(1.02); z-index: 2; }
  .gallery-item:hover .gallery-item-overlay { opacity: 1; }
  .gallery-featured { grid-column: span 2; grid-row: span 2; }
  .gallery-item-inner {
    width: 100%; height: 100%; min-height: 200px;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px; position: relative;
  }
  .gallery-item-overlay {
    position: absolute; inset: 0;
    background: rgba(255,45,120,0.3);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s;
    font-size: 28px;
  }
  .lightbox {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.95); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
  }
  .lightbox-img {
    max-width: 90vw; max-height: 80vh;
    border-radius: 8px; font-size: 120px;
    display: flex; align-items: center; justify-content: center;
    min-width: 300px; min-height: 300px;
    background: linear-gradient(135deg, rgba(155,48,255,0.2), rgba(255,45,120,0.2));
    border: 1px solid var(--glass-border);
  }
  .lightbox-close {
    position: absolute; top: 24px; right: 32px;
    font-size: 40px; cursor: pointer; color: var(--muted);
    background: none; border: none; transition: color 0.2s;
  }
  .lightbox-close:hover { color: var(--pink); }

  /* Reviews */
  .reviews-section { overflow: hidden; }
  .reviews-track {
    display: flex; gap: 24px; margin-top: 60px;
    overflow-x: auto; padding-bottom: 16px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }
  .reviews-track::-webkit-scrollbar { display: none; }
  .review-card {
    min-width: 340px; padding: 32px;
    border-radius: 16px; scroll-snap-align: start;
    background: var(--glass); border: 1px solid var(--glass-border);
    position: relative; overflow: hidden;
    transition: border-color 0.3s;
  }
  .review-card:hover { border-color: rgba(255,215,0,0.3); }
  .review-card::before {
    content: '"';
    position: absolute; top: -20px; left: 20px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 120px; color: rgba(255,215,0,0.08);
    line-height: 1;
  }
  .review-stars { color: var(--gold); font-size: 16px; margin-bottom: 16px; }
  .review-text {
    font-size: 15px; line-height: 1.7; color: rgba(240,238,248,0.8);
    margin-bottom: 24px; font-style: italic;
  }
  .review-author { font-weight: 600; font-size: 14px; }
  .review-source { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .review-badge {
    display: inline-block; margin-top: 8px;
    padding: 3px 10px; border-radius: 20px;
    font-family: 'Syncopate', sans-serif; font-size: 9px;
    letter-spacing: 0.1em;
    background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3);
    color: var(--gold);
  }

  /* About */
  .about-section { background: var(--dark2); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 60px; margin-top: 60px; align-items: start;
  }
  @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }
  .about-bio { font-size: 16px; line-height: 1.9; color: rgba(240,238,248,0.75); }
  .about-bio p { margin-bottom: 20px; }
  .about-bio strong { color: var(--cyan); font-weight: 600; }
  .about-highlight-box {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 24px;
    margin-top: 20px;
  }
  .about-highlight-box ul {
    list-style: none;
    padding: 0;
    margin-top: 12px;
  }
  .about-highlight-box li {
    padding: 12px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 14px;
    line-height: 1.6;
  }
  .about-highlight-box li:last-child {
    border-bottom: none;
  }
  .about-highlight-box li strong {
    color: var(--pink);
    font-weight: 600;
  }
  .members-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .member-card {
    padding: 20px; border-radius: 12px;
    background: var(--glass); border: 1px solid var(--glass-border);
    transition: all 0.3s; text-align: center;
  }
  .member-card:hover {
    border-color: var(--cyan);
    box-shadow: 0 0 20px rgba(0,245,255,0.1);
    transform: translateY(-4px);
  }
  .member-avatar {
    width: 64px; height: 64px; border-radius: 50%;
    background: linear-gradient(135deg, var(--purple), var(--pink));
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; margin: 0 auto 12px;
    border: 2px solid var(--glass-border);
  }
  .member-name { font-weight: 600; font-size: 15px; }
  .member-role { font-size: 12px; color: var(--cyan); margin-top: 4px;
    font-family: 'Syncopate', sans-serif; letter-spacing: 0.1em; font-size: 9px; }

  /* Social */
  .social-section {
    background: linear-gradient(135deg, rgba(155,48,255,0.15), rgba(255,45,120,0.15));
    border-top: 1px solid var(--glass-border);
    border-bottom: 1px solid var(--glass-border);
    text-align: center; padding: 80px 0;
  }
  .social-icons {
    display: flex; gap: 20px; justify-content: center;
    flex-wrap: wrap; margin-top: 48px;
  }
  .social-icon-btn {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    padding: 24px 32px; border-radius: 16px;
    background: var(--glass); border: 1px solid var(--glass-border);
    color: var(--muted); text-decoration: none;
    transition: all 0.3s; cursor: pointer;
    font-family: 'Syncopate', sans-serif;
    font-size: 9px; letter-spacing: 0.15em;
  }
  .social-icon-btn:hover {
    transform: translateY(-8px);
    background: rgba(255,255,255,0.08);
  }
  .social-icon-btn:nth-child(1):hover { border-color: #E1306C; color: #E1306C; box-shadow: 0 0 24px rgba(225,48,108,0.3); }
  .social-icon-btn:nth-child(2):hover { border-color: #000; color: #fff; box-shadow: 0 0 24px rgba(255,255,255,0.2); }
  .social-icon-btn:nth-child(3):hover { border-color: #FF0000; color: #FF0000; box-shadow: 0 0 24px rgba(255,0,0,0.3); }
  .social-icon-btn:nth-child(4):hover { border-color: #1DB954; color: #1DB954; box-shadow: 0 0 24px rgba(29,185,84,0.3); }
  .social-icon-svg { font-size: 32px; }

  /* Newsletter */
  .newsletter {
    margin-top: 60px; padding: 40px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255,45,120,0.1), rgba(155,48,255,0.1));
    border: 1px solid rgba(255,45,120,0.2);
    text-align: center;
  }
  .newsletter h3 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px; margin-bottom: 8px;
  }
  .newsletter p { color: var(--muted); margin-bottom: 24px; }
  .newsletter-form {
    display: flex; gap: 12px; max-width: 480px; margin: 0 auto;
    flex-wrap: wrap; justify-content: center;
  }
  .newsletter-input {
    flex: 1; min-width: 200px;
    padding: 14px 20px; border-radius: 8px;
    background: var(--glass); border: 1px solid var(--glass-border);
    color: var(--text); font-size: 15px;
    outline: none; transition: border-color 0.3s;
  }
  .newsletter-input:focus { border-color: var(--pink); }
  .newsletter-input::placeholder { color: var(--muted); }

  /* Contact */
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1.5fr;
    gap: 60px; margin-top: 60px;
  }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
  .contact-info { display: flex; flex-direction: column; gap: 24px; }
  .contact-info-item { display: flex; flex-direction: column; gap: 4px; }
  .contact-info-label {
    font-family: 'Syncopate', sans-serif;
    font-size: 9px; letter-spacing: 0.3em; color: var(--pink);
  }
  .contact-info-value { font-size: 15px; color: var(--muted); }
  .contact-form { display: flex; flex-direction: column; gap: 16px; }
  .form-input, .form-textarea {
    padding: 16px 20px; border-radius: 10px;
    background: var(--glass); border: 1px solid var(--glass-border);
    color: var(--text); font-size: 15px; font-family: 'DM Sans', sans-serif;
    outline: none; transition: border-color 0.3s;
    resize: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--pink); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
  .form-textarea { height: 140px; }
  .form-success {
    padding: 20px; border-radius: 10px;
    background: rgba(0,245,255,0.08); border: 1px solid rgba(0,245,255,0.3);
    color: var(--cyan); text-align: center;
    font-family: 'Syncopate', sans-serif; font-size: 11px; letter-spacing: 0.2em;
  }

  /* Footer */
  .footer {
    padding: 48px 0 32px; border-top: 1px solid var(--glass-border);
    text-align: center;
  }
  .footer-logo {
    font-family: 'Bebas Neue', sans-serif; font-size: 48px;
    background: linear-gradient(90deg, var(--gold), var(--pink));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 12px;
  }
  .footer-sub { font-size: 13px; color: var(--muted); margin-bottom: 32px; }
  .footer-links { display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; }
  .footer-links a {
    font-family: 'Syncopate', sans-serif; font-size: 9px; letter-spacing: 0.2em;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--cyan); }
  .footer-copy { margin-top: 32px; font-size: 12px; color: rgba(240,238,248,0.2); }

  /* Spotify embed placeholder */
  .spotify-embed {
    margin-top: 40px; border-radius: 16px; overflow: hidden;
    background: var(--glass); border: 1px solid var(--glass-border);
    padding: 24px; display: flex; align-items: center; gap: 20px;
  }
  .spotify-icon { font-size: 48px; color: #1DB954; }
  .spotify-text h4 { font-weight: 600; margin-bottom: 4px; }
  .spotify-text p { font-size: 13px; color: var(--muted); }

  /* Scroll animations */
  .reveal {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.visible {
    opacity: 1; transform: translateY(0);
  }
`;
document.head.appendChild(globalStyle);

// ── Data ────────────────────────────────────────────────────────────
const TRACKS = [
  { id: 1, name: "Neon Fever Dream", album: "Mirror Ball (2024)", duration: "3:47", emoji: "🌙" },
  { id: 2, name: "Ultraviolet Love", album: "Mirror Ball (2024)", duration: "4:12", emoji: "💜" },
  { id: 3, name: "Saturday Forever", album: "Mirror Ball (2024)", duration: "3:58", emoji: "✨" },
  { id: 4, name: "Studio 54 Ghost", album: "Discoland EP (2023)", duration: "5:01", emoji: "👻" },
  { id: 5, name: "Glitterball Prophecy", album: "Discoland EP (2023)", duration: "4:33", emoji: "🔮" },
  { id: 6, name: "Midnight Transmission", album: "Discoland EP (2023)", duration: "6:14", emoji: "📻" },
];

const VIDEOS = [
  { id: 1, title: "Neon Fever Dream", sub: "Official Music Video · 2024", emoji: "🎬", bg: "linear-gradient(135deg, #1a0030, #ff2d78)" },
  { id: 2, title: "Saturday Forever", sub: "Live at Paradiso Amsterdam", emoji: "🎤", bg: "linear-gradient(135deg, #001a30, #9b30ff)" },
  { id: 3, title: "Ultraviolet Love", sub: "Behind the Scenes", emoji: "🎥", bg: "linear-gradient(135deg, #301a00, #ffd700)" },
  { id: 4, title: "Glitterball Prophecy", sub: "Lyric Video", emoji: "✨", bg: "linear-gradient(135deg, #003020, #00f5ff)" },
  { id: 5, title: "Discoland Live 2024", sub: "Full Concert · ADE Special", emoji: "🎶", bg: "linear-gradient(135deg, #200030, #ff2d78)" },
  { id: 6, title: "Studio 54 Ghost", sub: "Visualizer", emoji: "👻", bg: "linear-gradient(135deg, #0a0a2a, #9b30ff)" },
];

const TOUR_DATES = [
  { date: "JUN 11", city: "Deventer", venue: "Wedding", sold: true },
  { date: "JUN 20", city: "Broek op Langedijk", venue: "Broekpop", sold: false },
  { date: "JUL 31", city: "Amsterdam", venue: "De Kring", sold: false },
];

const GALLERY_ITEMS = [
  { emoji: "🪩", bg: "linear-gradient(135deg,#1a0030,#9b30ff)", feat: true },
  { emoji: "🎸", bg: "linear-gradient(135deg,#300030,#ff2d78)", feat: false },
  { emoji: "🎤", bg: "linear-gradient(135deg,#001a30,#00f5ff)", feat: false },
  { emoji: "💡", bg: "linear-gradient(135deg,#301a00,#ffd700)", feat: false },
  { emoji: "🥁", bg: "linear-gradient(135deg,#003020,#00f5ff)", feat: false },
  { emoji: "🎹", bg: "linear-gradient(135deg,#200030,#ff2d78)", feat: false },
  { emoji: "🌈", bg: "linear-gradient(135deg,#1a1a00,#ffd700)", feat: false },
];

const REVIEWS = [
  { text: "DISCOLAND brought incredible energy to our corporate year-end event, delivering amazing music and outstanding performance. The crowd absolutely loved them, dancing the night away to the best disco beats.", author: "Corporate Events Team", source: "Direct Booking", badge: "Verified" },
  { text: "What an incredibly good band!!! Not normally good party and super nice people. If you guys don't choose this band you are crazy!!!", author: "Saskia & Menko", source: "Resident Advisor" },
  { text: "What a fantastic performance you guys put on! You really made our day even more unforgettable. We have received many compliments, everyone is really lyrical about your performance!", author: "Wedding Clients", source: "Direct Feedback", badge: "5 Stars" },
];

// ── Hooks ───────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ── App ──────────────────────────────────────────────────────────────
export default function DiscolandWebsite() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(1);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);
  const [videoModal, setVideoModal] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const progressRef = useRef(null);
  useScrollReveal();

  // Nav scroll
  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Simulate progress
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 0.2), 100);
    return () => clearInterval(id);
  }, [playing]);

  const track = TRACKS.find(t => t.id === activeTrack);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  };

  const submitContact = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div>
      {/* NAV */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => scrollTo("hero")}>DISCOLAND</div>
          <ul className={`nav-links${navOpen ? " open" : ""}`}>
            {[["music","Music"],["videos","Videos"],["tour","Tour"],["gallery","Gallery"],["about","About"],["contact","Contact"]].map(([id,label]) => (
              <li key={id}><a href="#" onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
            ))}
          </ul>
          <button className="nav-mobile-toggle" onClick={() => setNavOpen(o => !o)}>
            {navOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="disco-ball" />
        <div className="scan-line" />
        <div className="hero-content">
          <div className="hero-eyebrow">Rotterdam · Amsterdam · The World</div>
          <h1 className="hero-title">DISCOLAND</h1>
          <p className="hero-tagline">
            Where the <span>neon never fades</span> and the beat goes on forever
          </p>
          <div className="hero-ctas">
            <a href="#" className="neon-btn neon-btn-primary" onClick={e => { e.preventDefault(); scrollTo("music"); }}>
              ▶ Listen Now
            </a>
            <a href="#" className="neon-btn neon-btn-outline" onClick={e => { e.preventDefault(); scrollTo("videos"); }}>
              ◉ Watch Videos
            </a>
            <a href="#" className="neon-btn neon-btn-outline" onClick={e => { e.preventDefault(); scrollTo("tour"); }}>
              ◈ Tour Dates
            </a>
          </div>
        </div>
        <a href="#" className="hero-scroll" onClick={e => { e.preventDefault(); scrollTo("music"); }}>
          <span>SCROLL</span>
          <div className="hero-scroll-line" />
        </a>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="ticker-text">
              BANGERS ALL THE TIME <span className="ticker-dot">✦</span> LIVE DISCO POWER <span className="ticker-dot">✦</span> DANCE FLOOR EXPLOSION <span className="ticker-dot">✦</span> BOOK US NOW
            </span>
          ))}
        </div>
      </div>

      {/* MUSIC */}
      <section id="music">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Discography</div>
            <h2 className="section-title">The Music</h2>
          </div>
          <div className="music-grid reveal">
            {/* Track list */}
            <div className="track-list">
              {TRACKS.map((t, i) => (
                <div
                  key={t.id}
                  className={`track-item${activeTrack === t.id ? " active" : ""}`}
                  onClick={() => { setActiveTrack(t.id); setPlaying(true); setProgress(0); }}
                >
                  <div className="track-num">
                    {activeTrack === t.id && playing
                      ? <div className="track-bars">
                          {[14,10,18,12].map((h, j) => <div key={j} className="track-bar" style={{height: `${h}px`}} />)}
                        </div>
                      : String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="track-info">
                    <div className="track-name">{t.name}</div>
                    <div className="track-meta">{t.album}</div>
                  </div>
                  <div className="track-duration">{t.duration}</div>
                </div>
              ))}
            </div>

            {/* Player */}
            <div className="glass-card player-panel">
              <div className="player-art">{track?.emoji}</div>
              <div>
                <div className="player-title">{track?.name}</div>
                <div className="player-artist">Discoland · {track?.album}</div>
              </div>
              <div>
                <div
                  className="progress-bar"
                  onClick={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setProgress(((e.clientX - rect.left) / rect.width) * 100);
                  }}
                >
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--muted)", fontFamily: "Syncopate" }}>
                  <span>{Math.floor(progress * 0.035)}:{String(Math.floor((progress * 0.035 % 1) * 60)).padStart(2, "0")}</span>
                  <span>{track?.duration}</span>
                </div>
              </div>
              <div className="player-controls">
                <button className="ctrl-btn" onClick={() => setActiveTrack(t => t > 1 ? t - 1 : TRACKS.length)}>⏮</button>
                <button className="ctrl-btn play" onClick={() => setPlaying(p => !p)}>
                  {playing ? "⏸" : "▶"}
                </button>
                <button className="ctrl-btn" onClick={() => setActiveTrack(t => t < TRACKS.length ? t + 1 : 1)}>⏭</button>
              </div>
              <div className="streaming-links">
                <a href="#" className="stream-btn">🎵 Spotify</a>
                <a href="#" className="stream-btn">🍎 Apple Music</a>
                <a href="#" className="stream-btn">▶ YouTube</a>
              </div>
            </div>
          </div>

          {/* Spotify placeholder */}
          <div className="spotify-embed reveal" style={{ marginTop: 40 }}>
            <div className="spotify-icon">🎧</div>
            <div className="spotify-text">
              <h4>Listen on Spotify</h4>
              <p>Follow Discoland and stream our full discography and curated playlists</p>
            </div>
            <a href="#" className="neon-btn neon-btn-primary" style={{ marginLeft: "auto", flexShrink: 0 }}>Follow</a>
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="videos-section">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Visual</div>
            <h2 className="section-title">Videos</h2>
          </div>
          <div className="video-grid">
            {VIDEOS.map(v => (
              <div key={v.id} className="video-card reveal" onClick={() => setVideoModal(v)}>
                <div className="video-thumb" style={{ background: v.bg }}>
                  <span style={{ position: "relative", zIndex: 1, fontSize: 64 }}>{v.emoji}</span>
                  <div className="video-overlay">
                    <div className="play-icon">▶</div>
                  </div>
                </div>
                <div className="video-info">
                  <div className="video-title">{v.title}</div>
                  <div className="video-sub">{v.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModal && (
        <div className="video-modal" onClick={() => setVideoModal(null)}>
          <div className="video-modal-inner" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setVideoModal(null)}>✕</button>
            <div className="video-embed" style={{ background: videoModal.bg }}>
              <div className="video-embed-icon">{videoModal.emoji}</div>
              <span>YouTube / Vimeo embed placeholder</span>
              <span style={{ fontSize: 11, opacity: 0.5 }}>{videoModal.title}</span>
            </div>
          </div>
        </div>
      )}

      {/* TOUR */}
      <section id="tour">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Live</div>
            <h2 className="section-title">Tour Dates</h2>
          </div>
          <div className="tour-table">
            {TOUR_DATES.map((show, i) => (
              <div key={i} className="tour-row reveal">
                <div className="tour-date">{show.date}</div>
                <div>
                  <div className="tour-city">{show.city}</div>
                </div>
                <div className="tour-venue">{show.venue}</div>
                <a
                  href="#"
                  className={`tour-btn${show.sold ? " sold-out" : ""}`}
                  onClick={e => e.preventDefault()}
                >
                  {show.sold ? "Sold Out" : "Tickets →"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Photos</div>
            <h2 className="section-title">Gallery</h2>
          </div>
          <div className="gallery-grid reveal">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`gallery-item${item.feat ? " gallery-featured" : ""}`}
                onClick={() => setLightbox(item)}
              >
                <div className="gallery-item-inner" style={{ background: item.bg }}>
                  <span style={{ position: "relative", zIndex: 1 }}>{item.emoji}</span>
                  <div className="gallery-item-overlay">🔍</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close">✕</button>
          <div className="lightbox-img" style={{ background: lightbox.bg }}>
            {lightbox.emoji}
          </div>
        </div>
      )}

      {/* REVIEWS */}
      <section className="reviews-section">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Reviews</div>
            <h2 className="section-title">What They Say</h2>
          </div>
        </div>
        <div style={{ paddingLeft: 24 }}>
          <div className="reviews-track reveal">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">{r.text}</p>
                <div className="review-author">{r.author}</div>
                <div className="review-source">{r.source}</div>
                {r.badge && <span className="review-badge">{r.badge}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="reveal">
            <div className="section-label">The Band</div>
            <h2 className="section-title">About</h2>
          </div>
          <div className="about-grid">
            <div className="about-bio reveal">
              <p>
                <strong>High-energy party disco band for all your dancing needs.</strong> We are <strong>"Bangers All The Time"</strong> — an international team of talented musicians united by our love for all things disco!
              </p>
              <p>
                Are you ready to go all out and make the dance floor explode? Look no further! We play all the bangers — from disco classics by Donna Summer and Chic to modern hits by Dua Lipa and Daft Punk. We have what it takes to get you dancing.
              </p>
              <div className="about-highlight-box">
                <p style={{ fontWeight: 600, color: "var(--pink)", marginBottom: 8 }}>✦ What We Bring to the Party ✦</p>
                <ul>
                  <li><strong>Live Disco Power:</strong> Everything is played and sung live! Drums, bass, keyboards, guitar and two amazing vocalists — a guaranteed dance floor explosion!</li>
                  <li><strong>Non-stop Bangers:</strong> We play two sets of disco deliciousness, each lasting about 45 minutes. Want to keep the party going all night long? We can partner with a DJ to extend the fun!</li>
                  <li><strong>Full Disco Experience:</strong> We take care of everything: sound, lights (disco balls!) and an experienced technician. All you have to do is come and dance!</li>
                </ul>
              </div>
              <p style={{ marginTop: 20 }}>
                Make your party an unforgettable disco experience, whether it's a wedding, birthday or other event.
              </p>
            </div>
            <div className="reveal">
              <div className="glass-card" style={{ padding: 32 }}>
                <div style={{ fontSize: 64, textAlign: "center", marginBottom: 24 }}>🪩</div>
                <h3 style={{ textAlign: "center", color: "var(--pink)", marginBottom: 16, fontFamily: "Bebas Neue", fontSize: 28 }}>READY TO PARTY?</h3>
                <p style={{ textAlign: "center", color: "var(--muted)", marginBottom: 24, fontSize: 15 }}>Book us for your next event and let's create an unforgettable night of non-stop disco magic!</p>
                <a href="#contact" className="neon-btn neon-btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: 16 }} onClick={e => { e.preventDefault(); scrollTo("contact"); }}>
                  Book Discoland →
                </a>
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--glass-border)" }}>
                  <p style={{ fontSize: 14, color: "var(--cyan)", textAlign: "center" }}>✦ Making every dance floor a disco inferno ✦</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="social-section">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Follow Along</div>
            <h2 className="section-title" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Stay Connected</h2>
            <p style={{ color: "var(--muted)", marginTop: 16, fontSize: 16 }}>
              Join our universe across every platform
            </p>
          </div>
          <div className="social-icons reveal">
            {[
              { icon: "📸", label: "Instagram", href: "#" },
              { icon: "🎵", label: "TikTok", href: "#" },
              { icon: "▶", label: "YouTube", href: "#" },
              { icon: "🎧", label: "Spotify", href: "#" },
            ].map((s, i) => (
              <a key={i} href={s.href} className="social-icon-btn" target="_blank" rel="noopener noreferrer" onClick={e => e.preventDefault()}>
                <span className="social-icon-svg">{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div className="newsletter reveal">
            <h3>JOIN THE INNER CIRCLE</h3>
            <p>First access to bookings, exclusive content, and behind-the-scenes passes.</p>
            <div className="newsletter-form">
              <input
                type="email"
                className="newsletter-input"
                placeholder="your@email.com"
                value={newsletter}
                onChange={e => setNewsletter(e.target.value)}
              />
              <button
                className="neon-btn neon-btn-primary"
                onClick={() => { if(newsletter) { alert("You're on the list! 🪩"); setNewsletter(""); } }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Contact</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <div className="contact-info-item">
                <div className="contact-info-label">Bookings & Management</div>
                <div className="contact-info-value">booking@discoland.nl</div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">General Inquiries</div>
                <div className="contact-info-value">hello@discoland.nl</div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-label">Based In</div>
                <div className="contact-info-value">Rotterdam, Netherlands</div>
              </div>
              <div style={{ marginTop: 8 }}>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7 }}>
                  For booking enquiries, please include your proposed dates, event type, venue capacity, and details. We typically respond within 24-48 hours.
                </p>
              </div>
            </div>
            <div className="reveal">
              {formSent ? (
                <div className="form-success">
                  ✦ MESSAGE RECEIVED · WE'LL BE IN TOUCH SOON ✦
                </div>
              ) : (
                <form className="contact-form" onSubmit={submitContact}>
                  <input
                    className="form-input"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                  <textarea
                    className="form-textarea"
                    placeholder="Tell us about your event..."
                    value={contactForm.message}
                    onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                    required
                  />
                  <button type="submit" className="neon-btn neon-btn-primary" style={{ alignSelf: "flex-start" }}>
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-logo">BANGERS ALL THE TIME</div>
          <p className="footer-sub">High-energy live disco for events that explode with dance.</p>
          <div className="footer-links">
            {[["hero","Home"],["music","Music"],["videos","Videos"],["tour","Tour"],["gallery","Gallery"],["about","About"],["contact","Contact"]].map(([id,label]) => (
              <a key={id} href="#" onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a>
            ))}
          </div>
          <p className="footer-copy">© 2025 Bangers All The Time · All Rights Reserved · Rotterdam, NL</p>
        </div>
      </footer>
    </div>
  );
}
