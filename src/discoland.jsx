import { useState, useEffect } from "react";
import logo from './assets/logo.jpg';
import DLPhoto1  from './assets/DLPhoto1.jpeg';
import DLPhoto2  from './assets/DLPhoto2.jpeg';
import DLPhoto3  from './assets/DLPhoto3.jpeg';
import DLPhoto4  from './assets/DLPhoto4.jpeg';
import DLPhoto5  from './assets/DLPhoto5.jpeg';
import DLPhoto6  from './assets/DLPhoto6.jpeg';
import DLPhoto7  from './assets/DLPhoto7.jpeg';
import DLPhoto8  from './assets/DLPhoto8.jpeg';
import DLPhoto9  from './assets/DLPhoto9.jpeg';
import DLPhoto10 from './assets/DLPhoto10.jpeg';
import IreenPhoto  from './assets/Ireen.jpg';
import RachelPhoto from './assets/Rachel.jpg';
import RuudPhoto   from './assets/Ruud.jpg';
import EmrePhoto   from './assets/Emre.jfif';
import TanselPhoto from './assets/Tansel.jfif';
import LukasPhoto  from './assets/Lukas.jfif';

// ── Fonts ──────────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syncopate:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap";
document.head.appendChild(fontLink);

// ── Global styles ──────────────────────────────────────────────────────────
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
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 9999; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
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

  section { padding: 100px 0; }

  .section-label {
    font-family: 'Syncopate', sans-serif;
    font-size: 10px; letter-spacing: 0.4em;
    text-transform: uppercase; color: var(--pink); margin-bottom: 12px;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 8vw, 96px);
    line-height: 0.9; letter-spacing: 0.02em;
    background: linear-gradient(135deg, #fff 30%, var(--gold) 70%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .glass-card {
    background: var(--glass); border: 1px solid var(--glass-border);
    backdrop-filter: blur(12px); border-radius: 16px;
  }
  .neon-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; font-family: 'Syncopate', sans-serif;
    font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
    text-transform: uppercase; border-radius: 4px; cursor: pointer;
    transition: all 0.3s ease; text-decoration: none;
  }
  .neon-btn-primary {
    background: var(--pink); color: #fff; border: 2px solid var(--pink);
    box-shadow: 0 0 20px rgba(255,45,120,0.4);
  }
  .neon-btn-primary:hover {
    background: transparent; color: var(--pink);
    box-shadow: 0 0 40px rgba(255,45,120,0.6); transform: translateY(-2px);
  }
  .neon-btn-outline {
    background: transparent; color: var(--text);
    border: 2px solid rgba(255,255,255,0.2);
  }
  .neon-btn-outline:hover {
    border-color: var(--cyan); color: var(--cyan);
    box-shadow: 0 0 20px rgba(0,245,255,0.3); transform: translateY(-2px);
  }
  .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

  /* Nav */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; transition: all 0.4s ease; }
  .nav.scrolled {
    background: rgba(8,8,16,0.95); backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,45,120,0.2);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 40px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 12px;
    cursor: pointer; transition: transform 0.3s ease;
  }
  .nav-logo:hover { transform: scale(1.05); }
  .nav-logo img {
    height: 40px; width: auto;
    filter: drop-shadow(0 0 8px rgba(255,45,120,0.4));
  }
  .nav-logo-text {
    font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.1em;
    background: linear-gradient(90deg, var(--gold), var(--pink));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: flicker 8s infinite;
  }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-family: 'Syncopate', sans-serif; font-size: 10px; letter-spacing: 0.2em;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .nav-links a:hover, .nav-links a.active { color: var(--cyan); }
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
    display: flex; align-items: center; justify-content: center; overflow: hidden;
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
    transform: perspective(500px) rotateX(20deg); transform-origin: center bottom;
  }
  .disco-ball {
    position: absolute; top: 15%; right: 8%;
    width: 140px; height: 140px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%,
      #fff 5%, #e0e0ff 15%, #9B30FF 35%, #FF2D78 55%, #00F5FF 75%, #0a0a2a 100%);
    box-shadow: 0 0 40px rgba(155,48,255,0.6), 0 0 80px rgba(255,45,120,0.3), inset 0 0 30px rgba(0,0,0,0.5);
    animation: float 4s ease-in-out infinite, spin-slow 20s linear infinite;
  }
  .disco-ball::after {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: repeating-conic-gradient(
      rgba(255,255,255,0.1) 0deg, transparent 5deg, transparent 10deg, rgba(255,255,255,0.05) 15deg
    );
  }
  .scan-line {
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent);
    animation: scan 6s linear infinite; pointer-events: none;
  }
  .hero-content {
    position: relative; z-index: 2; text-align: center; padding: 0 24px; max-width: 900px;
  }
  .hero-eyebrow {
    font-family: 'Syncopate', sans-serif; font-size: 11px; letter-spacing: 0.5em;
    color: var(--gold); margin-bottom: 24px; animation: fadeUp 0.6s ease forwards;
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(80px, 16vw, 180px); line-height: 0.85; letter-spacing: 0.03em;
    background: linear-gradient(90deg, var(--gold) 0%, #fff 25%, var(--pink) 50%, var(--cyan) 75%, var(--gold) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: shimmer 4s linear infinite, fadeUp 0.7s 0.1s ease both;
  }
  .hero-tagline {
    font-family: 'DM Sans', sans-serif; font-size: clamp(16px, 2.5vw, 22px);
    font-weight: 300; letter-spacing: 0.1em; color: var(--muted); margin: 20px 0 48px;
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
    color: var(--muted); animation: float 2s ease-in-out infinite; cursor: pointer; text-decoration: none;
  }
  .hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--pink), transparent); }

  /* Ticker */
  .ticker {
    background: var(--pink); padding: 10px 0; overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.2); border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .ticker-inner { display: flex; white-space: nowrap; animation: marquee 25s linear infinite; }
  .ticker-text { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.1em; padding: 0 40px; color: #fff; }
  .ticker-dot { color: var(--gold); }

  /* Music — setlist only */
  .track-list {
    display: flex; flex-direction: column; gap: 8px;
    max-height: 600px; overflow-y: auto;
    padding-right: 6px;
    scrollbar-width: thin; scrollbar-color: var(--pink) transparent;
  }
  .track-list::-webkit-scrollbar { width: 4px; }
  .track-list::-webkit-scrollbar-track { background: transparent; }
  .track-list::-webkit-scrollbar-thumb { background: var(--pink); border-radius: 2px; }
  .track-item {
    display: flex; align-items: center; gap: 16px; padding: 14px 20px; border-radius: 12px;
    background: var(--glass); border: 1px solid var(--glass-border); transition: background 0.2s;
  }
  .track-item:hover { background: rgba(255,45,120,0.06); }
  .track-num { font-family: 'Syncopate', sans-serif; font-size: 10px; color: var(--muted); width: 24px; flex-shrink: 0; }
  .track-info { flex: 1; }
  .track-name { font-weight: 500; font-size: 15px; }
  .track-meta { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .track-duration { font-family: 'Syncopate', sans-serif; font-size: 11px; color: var(--muted); }

  .hero-logo {
    width: 220px; height: auto; margin-bottom: 36px;
    filter: drop-shadow(0 0 24px rgba(255,45,120,0.8)) drop-shadow(0 0 48px rgba(255,215,0,0.25));
    animation: float 4s ease-in-out infinite, fadeUp 0.5s ease both;
  }

  .lang-toggle { display: flex; gap: 8px; align-items: center; }
  .lang-btn {
    width: 42px; height: 28px; border-radius: 4px; padding: 0;
    border: 2px solid transparent; cursor: pointer; opacity: 0.5;
    transition: all 0.2s; background-size: cover; background-position: center;
    overflow: hidden; flex-shrink: 0;
  }
  .lang-btn.active  { opacity: 1; border-color: var(--gold); box-shadow: 0 0 10px rgba(255,215,0,0.5); }
  .lang-btn:hover:not(.active) { opacity: 0.8; }
  .lang-btn-en {
    background-color: #012169;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect width='60' height='30' fill='%23012169'/%3E%3Cline x1='0' y1='0' x2='60' y2='30' stroke='white' stroke-width='8'/%3E%3Cline x1='60' y1='0' x2='0' y2='30' stroke='white' stroke-width='8'/%3E%3Cpolygon points='0,0 10,0 60,25 60,30 50,30 0,5' fill='%23C8102E'/%3E%3Cpolygon points='60,0 50,0 0,25 0,30 10,30 60,5' fill='%23C8102E'/%3E%3Crect x='24' y='0' width='12' height='30' fill='white'/%3E%3Crect x='0' y='12' width='60' height='6' fill='white'/%3E%3Crect x='26' y='0' width='8' height='30' fill='%23C8102E'/%3E%3Crect x='0' y='13' width='60' height='4' fill='%23C8102E'/%3E%3C/svg%3E");
    background-size: cover;
  }
  .lang-btn-nl {
    background-color: #21468B;
    background-image: linear-gradient(to bottom, #AE1C28 0% 33.33%, #fff 33.33% 66.67%, transparent 66.67% 100%);
    background-size: 100% 100%;
  }

  /* Videos */
  .videos-section { background: var(--dark2); }
  .video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin-top: 60px; }
  .video-card {
    border-radius: 12px; overflow: hidden; border: 1px solid var(--glass-border);
    cursor: pointer; transition: all 0.3s ease;
  }
  .video-card:hover { transform: translateY(-6px); border-color: var(--pink); }
  .video-card:hover .video-overlay { opacity: 1; }
  .video-thumb {
    aspect-ratio: 16/9; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center; font-size: 60px;
  }
  .video-overlay {
    position: absolute; inset: 0; background: rgba(255,45,120,0.2);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s;
  }
  .play-icon {
    width: 64px; height: 64px; border-radius: 50%; background: rgba(255,45,120,0.9);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; color: #fff; box-shadow: 0 0 30px rgba(255,45,120,0.6);
  }
  .video-info { padding: 16px; background: var(--glass); }
  .video-title { font-weight: 500; font-size: 15px; margin-bottom: 4px; }
  .video-sub { font-size: 12px; color: var(--muted); }
  .video-modal {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.9); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .video-modal-inner { width: 100%; max-width: 900px; position: relative; }
  .modal-close {
    position: absolute; top: -48px; right: 0; background: none; border: none;
    color: #fff; font-size: 32px; cursor: pointer; opacity: 0.7; transition: opacity 0.2s;
  }
  .modal-close:hover { opacity: 1; }

  /* Tour */
  .tour-table { margin-top: 60px; }
  .tour-row {
    display: grid; grid-template-columns: 120px 1fr 1fr auto;
    align-items: center; gap: 24px; padding: 24px 28px; margin-bottom: 8px;
    border-radius: 12px; background: var(--glass); border: 1px solid var(--glass-border); transition: all 0.3s;
  }
  .tour-row:hover { background: rgba(255,45,120,0.06); border-color: rgba(255,45,120,0.3); transform: translateX(4px); }
  @media (max-width: 600px) {
    .tour-row { grid-template-columns: 1fr 1fr; grid-template-rows: auto auto; }
    .tour-row > *:last-child { grid-column: 1 / -1; }
  }
  .tour-date { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--gold); }
  .tour-city { font-weight: 600; font-size: 17px; }
  .tour-venue { color: var(--muted); font-size: 14px; margin-top: 2px; }
  .tour-btn {
    padding: 10px 24px; background: transparent; border: 1px solid var(--pink);
    color: var(--pink); border-radius: 6px; font-family: 'Syncopate', sans-serif;
    font-size: 10px; letter-spacing: 0.15em; cursor: pointer; transition: all 0.3s;
    white-space: nowrap; text-decoration: none;
  }
  .tour-btn:hover { background: var(--pink); color: #fff; box-shadow: 0 0 20px rgba(255,45,120,0.4); }
  .sold-out { color: var(--muted); border-color: var(--muted); cursor: default; pointer-events: none; }

  /* Gallery */
  .gallery-section { background: var(--dark2); }
  .gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 60px; }
  @media (max-width: 768px) {
    .gallery-grid { grid-template-columns: repeat(2, 1fr); }
    .gallery-featured { grid-column: span 2 !important; grid-row: span 1 !important; }
  }
  .gallery-item { border-radius: 8px; overflow: hidden; cursor: pointer; position: relative; transition: transform 0.3s ease; }
  .gallery-item:hover { transform: scale(1.02); z-index: 2; }
  .gallery-item:hover .gallery-item-overlay { opacity: 1; }
  .gallery-featured { grid-column: span 2; grid-row: span 2; }
  .gallery-item-inner {
    width: 100%; height: 100%; min-height: 200px;
    display: flex; align-items: center; justify-content: center; font-size: 48px; position: relative;
    overflow: hidden;
  }
  .gallery-item-inner img {
    width: 100%; height: 100%; object-fit: cover;
    position: absolute; inset: 0;
    transition: transform 0.4s ease;
  }
  .gallery-item:hover .gallery-item-inner img { transform: scale(1.06); }
  .gallery-item-overlay {
    position: absolute; inset: 0; background: rgba(255,45,120,0.3);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s; font-size: 28px;
  }
  .lightbox {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.95); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .lightbox-img {
    max-width: 90vw; max-height: 80vh;
    border-radius: 8px; object-fit: contain;
    border: 1px solid var(--glass-border);
    box-shadow: 0 0 60px rgba(255,45,120,0.2);
  }
  .lightbox-close {
    position: absolute; top: 24px; right: 32px; font-size: 40px; cursor: pointer;
    color: var(--muted); background: none; border: none; transition: color 0.2s;
  }
  .lightbox-close:hover { color: var(--pink); }

  /* Reviews */
  .reviews-section { overflow: hidden; }
  .reviews-track {
    display: flex; gap: 24px; margin-top: 60px;
    overflow-x: auto; padding-bottom: 16px;
    scroll-snap-type: x mandatory; scrollbar-width: none;
  }
  .reviews-track::-webkit-scrollbar { display: none; }
  .review-card {
    min-width: 340px; padding: 32px; border-radius: 16px; scroll-snap-align: start;
    background: var(--glass); border: 1px solid var(--glass-border);
    position: relative; overflow: hidden; transition: border-color 0.3s;
  }
  .review-card:hover { border-color: rgba(255,215,0,0.3); }
  .review-card::before {
    content: '"'; position: absolute; top: -20px; left: 20px;
    font-family: 'Bebas Neue', sans-serif; font-size: 120px; color: rgba(255,215,0,0.08); line-height: 1;
  }
  .review-stars { color: var(--gold); font-size: 16px; margin-bottom: 16px; }
  .review-text { font-size: 15px; line-height: 1.7; color: rgba(240,238,248,0.8); margin-bottom: 24px; font-style: italic; }
  .review-author { font-weight: 600; font-size: 14px; }
  .review-source { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .review-badge {
    display: inline-block; margin-top: 8px; padding: 3px 10px; border-radius: 20px;
    font-family: 'Syncopate', sans-serif; font-size: 9px; letter-spacing: 0.1em;
    background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.3); color: var(--gold);
  }

  /* About */
  .about-section { background: var(--dark2); }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin-top: 60px; align-items: start; }
  @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }
  .about-bio { font-size: 16px; line-height: 1.9; color: rgba(240,238,248,0.75); }
  .about-bio p { margin-bottom: 20px; }
  .about-bio strong { color: var(--cyan); font-weight: 600; }
  .about-highlight-box {
    background: var(--glass); border: 1px solid var(--glass-border);
    border-radius: 16px; padding: 24px; margin-top: 20px;
  }
  .about-highlight-box ul { list-style: none; padding: 0; margin-top: 12px; }
  .about-highlight-box li {
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 14px; line-height: 1.6;
  }
  .about-highlight-box li:last-child { border-bottom: none; }
  .about-highlight-box li strong { color: var(--pink); font-weight: 600; }

  /* Social */
  .social-section {
    background: linear-gradient(135deg, rgba(155,48,255,0.15), rgba(255,45,120,0.15));
    border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);
    text-align: center; padding: 80px 0;
  }
  .social-icons { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 48px; }
  .social-icon-btn {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    padding: 24px 32px; border-radius: 16px;
    background: var(--glass); border: 1px solid var(--glass-border);
    color: var(--muted); text-decoration: none; transition: all 0.3s;
    font-family: 'Syncopate', sans-serif; font-size: 9px; letter-spacing: 0.15em;
  }
  .social-icon-btn:hover { transform: translateY(-8px); background: rgba(255,255,255,0.08); }
  .social-icon-btn.instagram:hover { border-color: #E1306C; color: #E1306C; box-shadow: 0 0 24px rgba(225,48,108,0.3); }
  .social-icon-btn.youtube:hover  { border-color: #FF0000; color: #FF0000; box-shadow: 0 0 24px rgba(255,0,0,0.3); }
  .social-icon-btn.tiktok:hover   { border-color: #69C9D0; color: #69C9D0; box-shadow: 0 0 24px rgba(105,201,208,0.3); }
  .social-icon-svg { font-size: 32px; }

  /* Newsletter */
  .newsletter {
    margin-top: 60px; padding: 40px; border-radius: 20px;
    background: linear-gradient(135deg, rgba(255,45,120,0.1), rgba(155,48,255,0.1));
    border: 1px solid rgba(255,45,120,0.2); text-align: center;
  }
  .newsletter h3 { font-family: 'Bebas Neue', sans-serif; font-size: 36px; margin-bottom: 8px; }
  .newsletter p { color: var(--muted); margin-bottom: 24px; }
  .newsletter-form { display: flex; gap: 12px; max-width: 480px; margin: 0 auto; flex-wrap: wrap; justify-content: center; }
  .newsletter-input {
    flex: 1; min-width: 200px; padding: 14px 20px; border-radius: 8px;
    background: var(--glass); border: 1px solid var(--glass-border);
    color: var(--text); font-size: 15px; outline: none; transition: border-color 0.3s;
  }
  .newsletter-input:focus { border-color: var(--pink); }
  .newsletter-input::placeholder { color: var(--muted); }

  /* Contact */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; margin-top: 60px; }
  @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
  .contact-info { display: flex; flex-direction: column; gap: 24px; }
  .contact-info-item { display: flex; flex-direction: column; gap: 4px; }
  .contact-info-label { font-family: 'Syncopate', sans-serif; font-size: 9px; letter-spacing: 0.3em; color: var(--pink); }
  .contact-info-value { font-size: 15px; color: var(--muted); }
  .contact-form { display: flex; flex-direction: column; gap: 16px; }
  .form-input, .form-textarea {
    padding: 16px 20px; border-radius: 10px; background: var(--glass); border: 1px solid var(--glass-border);
    color: var(--text); font-size: 15px; font-family: 'DM Sans', sans-serif;
    outline: none; transition: border-color 0.3s; resize: none;
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
  .footer { padding: 48px 0 32px; border-top: 1px solid var(--glass-border); text-align: center; }
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
    color: var(--muted); text-decoration: none; transition: color 0.2s; cursor: pointer;
  }
  .footer-links a:hover { color: var(--cyan); }
  .footer-copy { margin-top: 32px; font-size: 12px; color: rgba(240,238,248,0.2); }

  /* Members page */
  .members-page { padding-top: 120px; min-height: 100vh; }
  .members-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 60px;
  }
  @media (max-width: 900px) { .members-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .members-grid { grid-template-columns: 1fr; } }
  .member-card {
    background: var(--glass); border: 1px solid var(--glass-border);
    border-radius: 20px; overflow: hidden; transition: all 0.3s ease;
  }
  .member-card:hover { border-color: rgba(255,45,120,0.4); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(255,45,120,0.1); }
  .member-photo {
    width: 100%; aspect-ratio: 3/4; position: relative; overflow: hidden;
    background: linear-gradient(135deg, rgba(155,48,255,0.2) 0%, rgba(255,45,120,0.15) 50%, rgba(0,245,255,0.1) 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
  }
  .member-photo img {
    width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0;
  }
  .member-photo-placeholder {
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;
    position: relative; z-index: 1;
  }
  .member-photo-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(255,255,255,0.06); border: 2px dashed rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 36px;
  }
  .member-photo-label {
    font-family: 'Syncopate', sans-serif; font-size: 8px; letter-spacing: 0.3em;
    color: rgba(255,255,255,0.2); text-transform: uppercase;
  }
  .member-body { padding: 24px; }
  .member-role {
    font-family: 'Syncopate', sans-serif; font-size: 9px; letter-spacing: 0.35em;
    color: var(--pink); text-transform: uppercase; margin-bottom: 8px;
  }
  .member-name {
    font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 0.05em;
    line-height: 1; margin-bottom: 12px;
    background: linear-gradient(135deg, #fff 40%, var(--gold) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .member-bio {
    font-size: 14px; line-height: 1.7; color: rgba(240,238,248,0.6);
  }

  /* Scroll reveal */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(globalStyle);

// ── Data ──────────────────────────────────────────────────────────────────────
const TRACKS = [
  { id:  1, name: "Car Wash",                     artist: "Rose Royce",                      duration: "3:52", emoji: "🚗" },
  { id:  2, name: "Bad Girls",                    artist: "Donna Summer",                    duration: "4:01", emoji: "💃" },
  { id:  3, name: "Don't Start Now",              artist: "Dua Lipa",                        duration: "3:03", emoji: "✨" },
  { id:  4, name: "Get Lucky",                    artist: "Daft Punk ft. Pharrell Williams", duration: "4:08", emoji: "🍀" },
  { id:  5, name: "Boogie Nights",                artist: "Heatwave",                        duration: "3:45", emoji: "🌙" },
  { id:  6, name: "Disco Inferno",                artist: "The Trammps",                     duration: "3:39", emoji: "🔥" },
  { id:  7, name: "Gimme! Gimme! Gimme!",         artist: "ABBA",                            duration: "4:50", emoji: "💫" },
  { id:  8, name: "Le Freak",                     artist: "CHIC",                            duration: "3:32", emoji: "🎸" },
  { id:  9, name: "I Will Survive",               artist: "Gloria Gaynor",                   duration: "3:15", emoji: "✊" },
  { id: 10, name: "Murder On The Dancefloor",     artist: "Sophie Ellis-Bextor",             duration: "3:46", emoji: "🪩" },
  { id: 11, name: "September",                    artist: "Earth, Wind & Fire",              duration: "3:35", emoji: "🌟" },
  { id: 12, name: "Uptown Funk",                  artist: "Mark Ronson ft. Bruno Mars",      duration: "4:30", emoji: "🔥" },
  { id: 13, name: "Voulez-Vous",                  artist: "ABBA",                            duration: "5:09", emoji: "🌈" },
  { id: 14, name: "It's Raining Men",             artist: "The Weather Girls",               duration: "4:05", emoji: "⛈️" },
  { id: 15, name: "Can't Get You Out of My Head", artist: "Kylie Minogue",                   duration: "3:49", emoji: "💿" },
  { id: 16, name: "Billie Jean",                  artist: "Michael Jackson",                 duration: "4:54", emoji: "🎩" },
  { id: 17, name: "Levitating",                   artist: "Dua Lipa",                        duration: "3:23", emoji: "🚀" },
  { id: 18, name: "About Damn Time",              artist: "Lizzo",                           duration: "3:13", emoji: "⏰" },
  { id: 19, name: "Cosmic Girl",                  artist: "Jamiroquai",                      duration: "5:01", emoji: "🌌" },
  { id: 20, name: "We Are Family",                artist: "Sister Sledge",                   duration: "3:28", emoji: "👨‍👩‍👧‍👦" },
  { id: 21, name: "Espresso",                     artist: "Sabrina Carpenter",               duration: "2:55", emoji: "☕" },
  { id: 22, name: "Hot Stuff",                    artist: "Donna Summer",                    duration: "3:48", emoji: "🌶️" },
  { id: 23, name: "Play That Funky Music",        artist: "Wild Cherry",                     duration: "4:27", emoji: "🎵" },
  { id: 24, name: "Relight My Fire",              artist: "Dan Hartman",                     duration: "4:11", emoji: "🕯️" },
  { id: 25, name: "Blue Monday '88",              artist: "New Order",                       duration: "4:46", emoji: "📅" },
  { id: 26, name: "Canned Heat",                  artist: "Jamiroquai",                      duration: "4:37", emoji: "🥫" },
  { id: 27, name: "In The Dark",                  artist: "Purple Disco Machine",            duration: "4:38", emoji: "🔮" },
  { id: 28, name: "Sing It Back",                 artist: "Moloko",                          duration: "7:11", emoji: "🎤" },
  { id: 29, name: "Venus",                        artist: "Bananarama",                      duration: "3:51", emoji: "♀️" },
  { id: 30, name: "I Was Made For Lovin' You",    artist: "KISS",                            duration: "4:32", emoji: "💋" },
  { id: 31, name: "I Wanna Be Your Lover",        artist: "Prince",                          duration: "3:56", emoji: "🎸" },
  { id: 32, name: "Funkytown",                    artist: "Lipps Inc.",                      duration: "3:47", emoji: "🏙️" },
  { id: 33, name: "Stayin' Alive",                artist: "Bee Gees",                        duration: "4:45", emoji: "🕺" },
];

const VIDEOS = [
  { id: 1, title: "Discoland Promo",         sub: "Official Promo Video", youtubeId: "J70XtMp2lV8" },
  { id: 2, title: "Discoland Promo 2",       sub: "Official Promo Video", youtubeId: "gn9SxkdTYfY" },
  { id: 3, title: "Discoland Wedding Party", sub: "Live at a Wedding",    youtubeId: "eHhIshWbhlc" },
];

const TOUR_DATES = [
  { date: "JUN 11", city: "Deventer",           venue: "Wedding",  sold: true,  private: true,  ticketUrl: null },
  { date: "JUN 20", city: "Broek op Langedijk", venue: "Broekpop", sold: false, private: false, ticketUrl: "https://instagram.com/discoland.music" },
  { date: "JUL 31", city: "Amsterdam",          venue: "De Kring", sold: false, private: false, ticketUrl: "https://instagram.com/discoland.music" },
];

const GALLERY_ITEMS = [
  { src: DLPhoto1,  feat: true  },
  { src: DLPhoto2,  feat: false },
  { src: DLPhoto3,  feat: false },
  { src: DLPhoto4,  feat: false },
  { src: DLPhoto5,  feat: false },
  { src: DLPhoto6,  feat: false },
  { src: DLPhoto7,  feat: false },
  { src: DLPhoto8,  feat: false },
  { src: DLPhoto9,  feat: false },
  { src: DLPhoto10, feat: false },
];

const REVIEWS = [
  {
    text: "DISCOLAND brought incredible energy to our corporate year-end event, delivering amazing music and an outstanding performance. The crowd absolutely loved them, dancing the night away!",
    author: "Corporate Event Client",
    source: "Event Review",
    badge: "Client",
  },
  {
    text: "What an incredibly good band!!! Not normally into parties but super nice people. If you guys don't choose this band you are crazy!!!",
    author: "Saskia & Menko",
    source: "Wedding Review",
    badge: "Wedding",
  },
  {
    text: "What a fantastic performance you guys put on! You really made our day even more unforgettable. We have received many compliments — everyone is really lyrical about your performance!",
    author: "Jan & Dore",
    source: "Wedding Review",
    badge: "Wedding",
  },
];

const MEMBERS = [
  { id: 1, role: "Vocals",    name: "Ireen",  bio: "Add a short bio here — background, musical journey, favourite disco artists, and what makes performing with Discoland so special.", photo: IreenPhoto  },
  { id: 2, role: "Vocals",    name: "Rachel", bio: "Add a short bio here — background, musical journey, favourite disco artists, and what makes performing with Discoland so special.", photo: RachelPhoto, photoPosition: "20% center" },
  { id: 3, role: "Guitar",    name: "Emre",   bio: "Add a short bio here — background, musical journey, favourite disco artists, and what makes performing with Discoland so special.", photo: EmrePhoto   },
  { id: 4, role: "Bass",      name: "Ruud",   bio: "Add a short bio here — background, musical journey, favourite disco artists, and what makes performing with Discoland so special.", photo: RuudPhoto   },
  { id: 5, role: "Keyboards", name: "Lukas",  bio: "Add a short bio here — background, musical journey, favourite disco artists, and what makes performing with Discoland so special.", photo: LukasPhoto  },
  { id: 6, role: "Drums",     name: "Tansel", bio: "Add a short bio here — background, musical journey, favourite disco artists, and what makes performing with Discoland so special.", photo: TanselPhoto },
];

// ── Scroll reveal hook ────────────────────────────────────────────────────────
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

// ── Translations ─────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    navMusic:"Music", navVideos:"Videos", navTour:"Tour", navGallery:"Gallery", navAbout:"About", navContact:"Contact", navMembers:"Members",
    heroEyebrow:"Amsterdam · High-Energy Disco · Live",
    heroTagline:"where the dance floor explodes with non-stop disco magic",
    heroCta1:"Our Setlist", heroCta2:"Watch Videos", heroCta3:"Book Us",
    tickerExtra:"LIVE DISCO COVERS ✦ DANCE FLOOR EXPLOSION ✦ BOOK US FOR YOUR EVENT ✦",
    musicLabel:"Setlist", musicTitle:"The Music",
    videosLabel:"Visual", videosTitle:"Videos",
    tourLabel:"Live", tourTitle:"Upcoming Shows", tourTickets:"Tickets →", tourSoldOut:"Sold Out", tourPrivate:"Private",
    galleryLabel:"Photos", galleryTitle:"Gallery",
    reviewsLabel:"Reviews", reviewsTitle:"What They Say",
    aboutLabel:"The Band", aboutTitle:"About",
    aboutBio1:"High-energy party disco band for all your dancing needs. Based in Amsterdam, we are Discoland — an international live disco band ready to make your event unforgettable.",
    aboutBio2:"Are you ready to go all out and make the dance floor explode? Look no further! We play all the bangers — from disco classics by Donna Summer and Chic to modern hits by Dua Lipa, all played and sung live.",
    aboutBoxTitle:"✦ What We Bring to the Party ✦",
    aboutItem1T:"Live Disco Power:", aboutItem1:"Everything is played and sung live! Drums, bass, keyboards, guitar and two amazing vocalists — a guaranteed dance floor explosion!",
    aboutItem2T:"Non-stop Bangers:", aboutItem2:"Two sets of disco deliciousness, each lasting about 45 minutes. We can also partner with a DJ to keep the party going all night.",
    aboutItem3T:"Full Disco Experience:", aboutItem3:"We take care of everything: sound, lights (disco balls!) and an experienced technician. All you have to do is come and dance!",
    aboutBio3:"Make your party an unforgettable disco experience, whether it's a wedding, birthday, or any event.",
    aboutCardTitle:"READY TO PARTY?",
    aboutCardSub:"Book us for your next event and let's create an unforgettable night of non-stop disco magic.",
    aboutCardBtn:"Book Discoland →", aboutCardTag:"✦ Making every dance floor a disco inferno ✦",
    membersLabel:"The People", membersTitle:"Meet The Band",
    socialLabel:"Follow Along", socialTitle:"Stay Connected", socialSub:"Join our universe across every platform",
    newsletterTitle:"JOIN THE INNER CIRCLE",
    newsletterSub:"First access to bookings, exclusive content, and behind-the-scenes passes.",
    newsletterPh:"your@email.com", newsletterBtn:"Subscribe",
    contactLabel:"Get In Touch", contactTitle:"Contact",
    contactBookingsLabel:"Bookings & Management", contactIgLabel:"Instagram",
    contactBasedLabel:"Based In", contactBasedValue:"Amsterdam, Netherlands",
    contactInfo:"For booking enquiries please include your proposed dates, event type, venue capacity, and details. We typically respond within 24–48 hours.",
    contactNamePh:"Your Name", contactEmailPh:"Your Email", contactMsgPh:"Tell us about your event...",
    contactSendBtn:"Send Message →",
    contactSuccess:"✦ MESSAGE RECEIVED · WE'LL BE IN TOUCH SOON ✦",
    footerSub:"High-energy live disco for events that explode with dance.",
    footerCopy:"© 2025 Discoland · Amsterdam, NL · @discoland.music",
    footerHome:"Home", footerMusic:"Music", footerVideos:"Videos", footerTour:"Tour",
    footerGallery:"Gallery", footerAbout:"About", footerContact:"Contact", footerMembers:"Members",
  },
  nl: {
    navMusic:"Muziek", navVideos:"Video's", navTour:"Tour", navGallery:"Galerij", navAbout:"Over Ons", navContact:"Contact", navMembers:"Leden",
    heroEyebrow:"Amsterdam · High-Energy Disco · Live",
    heroTagline:"waar de dansvloer explodeert met non-stop discomagie",
    heroCta1:"Onze Setlist", heroCta2:"Bekijk Video's", heroCta3:"Boek Ons",
    tickerExtra:"LIVE DISCO COVERS ✦ DANSVLOER EXPLOSIE ✦ BOEK ONS VOOR UW EVENEMENT ✦",
    musicLabel:"Setlist", musicTitle:"De Muziek",
    videosLabel:"Visueel", videosTitle:"Video's",
    tourLabel:"Live", tourTitle:"Aankomende Shows", tourTickets:"Tickets →", tourSoldOut:"Uitverkocht", tourPrivate:"Besloten",
    galleryLabel:"Foto's", galleryTitle:"Galerij",
    reviewsLabel:"Recensies", reviewsTitle:"Wat Ze Zeggen",
    aboutLabel:"De Band", aboutTitle:"Over Ons",
    aboutBio1:"Een energieke feest-discoband voor al uw dansnoden. Gevestigd in Amsterdam zijn wij Discoland — een internationale live-discoband die van uw evenement een onvergetelijke ervaring maakt.",
    aboutBio2:"Klaar om er helemaal voor te gaan en de dansvloer te laten exploderen? Zoek niet verder! Wij spelen alle hits — van discoklassiekers van Donna Summer en Chic tot moderne hits van Dua Lipa, allemaal live gespeeld en gezongen.",
    aboutBoxTitle:"✦ Wat Wij Meebrengen naar het Feest ✦",
    aboutItem1T:"Live Disco Power:", aboutItem1:"Alles wordt live gespeeld en gezongen! Drums, bas, keyboard, gitaar en twee geweldige zangeressen — een gegarandeerde dansvloerexplosie!",
    aboutItem2T:"Non-stop Bangers:", aboutItem2:"Twee sets disco-heerlijkheid, elk circa 45 minuten. We kunnen ook samenwerken met een dj om het feest de hele nacht gaande te houden.",
    aboutItem3T:"Volledige Disco-ervaring:", aboutItem3:"Wij regelen alles: geluid, lichten (discoballen!) en een ervaren technicus. U hoeft alleen maar te komen dansen!",
    aboutBio3:"Maak van uw feest een onvergetelijke disco-ervaring, of het nu een bruiloft, verjaardag of een ander evenement is.",
    aboutCardTitle:"KLAAR VOOR HET FEEST?",
    aboutCardSub:"Boek ons voor uw volgende evenement en laten we samen een onvergetelijke avond vol non-stop discomagie creëren.",
    aboutCardBtn:"Boek Discoland →", aboutCardTag:"✦ Van elke dansvloer een disco-inferno ✦",
    membersLabel:"De Mensen", membersTitle:"Ontmoet De Band",
    socialLabel:"Volg Ons", socialTitle:"Blijf Verbonden", socialSub:"Sluit je aan bij ons universum op elk platform",
    newsletterTitle:"WORD LID VAN DE INNER CIRCLE",
    newsletterSub:"Eerste toegang tot boekingen, exclusieve content en backstage-passen.",
    newsletterPh:"jouw@email.com", newsletterBtn:"Inschrijven",
    contactLabel:"Neem Contact Op", contactTitle:"Contact",
    contactBookingsLabel:"Boekingen & Management", contactIgLabel:"Instagram",
    contactBasedLabel:"Gevestigd In", contactBasedValue:"Amsterdam, Nederland",
    contactInfo:"Vermeld bij boekingsaanvragen uw gewenste data, type evenement, zaalbezetting en details. Wij reageren doorgaans binnen 24–48 uur.",
    contactNamePh:"Uw Naam", contactEmailPh:"Uw E-mailadres", contactMsgPh:"Vertel ons over uw evenement...",
    contactSendBtn:"Verstuur Bericht →",
    contactSuccess:"✦ BERICHT ONTVANGEN · WE NEMEN SNEL CONTACT MET U OP ✦",
    footerSub:"Energieke live-disco voor evenementen die van de dansvloer een feest maken.",
    footerCopy:"© 2025 Discoland · Amsterdam, NL · @discoland.music",
    footerHome:"Home", footerMusic:"Muziek", footerVideos:"Video's", footerTour:"Tour",
    footerGallery:"Galerij", footerAbout:"Over Ons", footerContact:"Contact", footerMembers:"Leden",
  },
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function DiscolandWebsite() {
  const [navScrolled,  setNavScrolled]  = useState(false);
  const [navOpen,      setNavOpen]      = useState(false);
  const [currentPage,  setCurrentPage]  = useState("home");
  const [videoModal,   setVideoModal]   = useState(null);
  const [lightbox,     setLightbox]     = useState(null);
  const [contactForm,  setContactForm]  = useState({ name: "", email: "", message: "" });
  const [formSent,     setFormSent]     = useState(false);
  const [newsletter,   setNewsletter]   = useState("");
  const [lang,         setLang]         = useState("en");
  const T = TRANSLATIONS[lang];
  useScrollReveal();

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setNavOpen(false);
  };

  const goToMembers = () => {
    setCurrentPage("members");
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>

      {/* ── NAV ── */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={goHome}>
            <img src={logo} alt="Discoland" />
            <span className="nav-logo-text">DISCOLAND</span>
          </div>
          <ul className={`nav-links${navOpen ? " open" : ""}`}>
            {[["music",T.navMusic],["videos",T.navVideos],["tour",T.navTour],["gallery",T.navGallery],["about",T.navAbout],["contact",T.navContact]].map(([id, label]) => (
              <li key={id}><a href="#" onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a></li>
            ))}
            <li>
              <a
                href="#"
                className={currentPage === "members" ? "active" : ""}
                onClick={e => { e.preventDefault(); goToMembers(); }}
              >
                {T.navMembers}
              </a>
            </li>
          </ul>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div className="lang-toggle">
              <button className={`lang-btn lang-btn-en${lang==="en"?" active":""}`} onClick={() => setLang("en")} title="English" />
              <button className={`lang-btn lang-btn-nl${lang==="nl"?" active":""}`} onClick={() => setLang("nl")} title="Nederlands" />
            </div>
            <button className="nav-mobile-toggle" onClick={() => setNavOpen(o => !o)}>
              {navOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {currentPage === "members" ? (

        /* ── MEMBERS PAGE ── */
        <div className="members-page">
          <div className="container">
            <div className="reveal">
              <div className="section-label">{T.membersLabel}</div>
              <h2 className="section-title">{T.membersTitle}</h2>
            </div>
            <div className="members-grid">
              {MEMBERS.map(m => (
                <div key={m.id} className="member-card reveal">
                  <div className="member-photo">
                    {m.photo
                      ? <img src={m.photo} alt={m.name} style={m.photoPosition ? { objectPosition: m.photoPosition } : undefined} />
                      : (
                        <div className="member-photo-placeholder">
                          <div className="member-photo-icon">🎵</div>
                          <span className="member-photo-label">Photo</span>
                        </div>
                      )
                    }
                  </div>
                  <div className="member-body">
                    <div className="member-role">{m.role}</div>
                    <div className="member-name">{m.name}</div>
                    <p className="member-bio">{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:80, textAlign:"center" }}>
              <a
                href="#"
                className="neon-btn neon-btn-primary"
                onClick={e => { e.preventDefault(); scrollTo("contact"); }}
              >
                ◈ {T.heroCta3}
              </a>
            </div>
          </div>

          {/* ── FOOTER (members page) ── */}
          <footer className="footer" style={{ marginTop:80 }}>
            <div className="container">
              <div className="footer-logo">DISCOLAND</div>
              <p className="footer-sub">{T.footerSub}</p>
              <div className="footer-links">
                <a onClick={goHome}>{T.footerHome}</a>
                {[["music",T.footerMusic],["videos",T.footerVideos],["tour",T.footerTour],["gallery",T.footerGallery],["about",T.footerAbout],["contact",T.footerContact]].map(([id, label]) => (
                  <a key={id} onClick={() => scrollTo(id)}>{label}</a>
                ))}
                <a onClick={goToMembers}>{T.footerMembers}</a>
              </div>
              <p className="footer-copy">{T.footerCopy}</p>
            </div>
          </footer>
        </div>

      ) : (

        /* ── HOME PAGE ── */
        <>

          {/* ── HERO ── */}
          <section id="hero" className="hero">
            <div className="hero-bg" />
            <div className="hero-grid" />
            <div className="disco-ball" />
            <div className="scan-line" />
            <div className="hero-content">
              <img src={logo} alt="Discoland" className="hero-logo" />
              <div className="hero-eyebrow">{T.heroEyebrow}</div>
              <h1 className="hero-title">DISCOLAND</h1>
              <p className="hero-tagline">
                <span>Bangers All The Time</span> — {T.heroTagline}
              </p>
              <div className="hero-ctas">
                <a href="#" className="neon-btn neon-btn-primary" onClick={e => { e.preventDefault(); scrollTo("music"); }}>
                  ▶ {T.heroCta1}
                </a>
                <a href="#" className="neon-btn neon-btn-outline" onClick={e => { e.preventDefault(); scrollTo("videos"); }}>
                  ◉ {T.heroCta2}
                </a>
                <a href="#" className="neon-btn neon-btn-outline" onClick={e => { e.preventDefault(); scrollTo("contact"); }}>
                  ◈ {T.heroCta3}
                </a>
              </div>
            </div>
            <a href="#" className="hero-scroll" onClick={e => { e.preventDefault(); scrollTo("music"); }}>
              <span>SCROLL</span>
              <div className="hero-scroll-line" />
            </a>
          </section>

          {/* ── TICKER ── */}
          <div className="ticker">
            <div className="ticker-inner">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="ticker-text">
                  DISCOLAND <span className="ticker-dot">✦</span> BANGERS ALL THE TIME <span className="ticker-dot">✦</span> {T.tickerExtra}
                </span>
              ))}
            </div>
          </div>

          {/* ── MUSIC ── */}
          <section id="music">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.musicLabel}</div>
                <h2 className="section-title">{T.musicTitle}</h2>
              </div>
              <div className="track-list reveal" style={{ marginTop:60 }}>
                {TRACKS.map((t, i) => (
                  <div key={t.id} className="track-item">
                    <div className="track-num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="track-info">
                      <div className="track-name">{t.emoji} {t.name}</div>
                      <div className="track-meta">{t.artist}</div>
                    </div>
                    <div className="track-duration">{t.duration}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── VIDEOS ── */}
          <section id="videos" className="videos-section">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.videosLabel}</div>
                <h2 className="section-title">{T.videosTitle}</h2>
              </div>
              <div className="video-grid">
                {VIDEOS.map(v => (
                  <div key={v.id} className="video-card reveal" onClick={() => setVideoModal(v)}>
                    <div className="video-thumb" style={{ background: "#000", padding: 0 }}>
                      <img
                        src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                        alt={v.title}
                        style={{ width:"100%", height:"100%", objectFit:"cover", position:"absolute", inset:0 }}
                      />
                      <div className="video-overlay"><div className="play-icon">▶</div></div>
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

          {/* Video modal */}
          {videoModal && (
            <div className="video-modal" onClick={() => setVideoModal(null)}>
              <div className="video-modal-inner" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setVideoModal(null)}>✕</button>
                <iframe
                  width="100%" style={{ aspectRatio:"16/9", borderRadius:12, border:"none", display:"block" }}
                  src={`https://www.youtube.com/embed/${videoModal.youtubeId}?autoplay=1`}
                  allow="autoplay; encrypted-media" allowFullScreen
                />
              </div>
            </div>
          )}

          {/* ── TOUR ── */}
          <section id="tour">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.tourLabel}</div>
                <h2 className="section-title">{T.tourTitle}</h2>
              </div>
              <div className="tour-table">
                {TOUR_DATES.map((show, i) => (
                  <div key={i} className="tour-row reveal">
                    <div className="tour-date">{show.date}</div>
                    <div><div className="tour-city">{show.city}</div></div>
                    <div className="tour-venue">{show.venue}</div>
                    <a
                      href={show.private ? "#" : (show.ticketUrl || "#")}
                      target={(!show.private && show.ticketUrl) ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`tour-btn${show.private ? " sold-out" : ""}`}
                      onClick={e => { if (show.private || !show.ticketUrl) e.preventDefault(); }}
                    >
                      {show.private ? T.tourPrivate : T.tourTickets}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── GALLERY ── */}
          <section id="gallery" className="gallery-section">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.galleryLabel}</div>
                <h2 className="section-title">{T.galleryTitle}</h2>
              </div>
              <div className="gallery-grid reveal">
                {GALLERY_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className={`gallery-item${item.feat ? " gallery-featured" : ""}`}
                    onClick={() => setLightbox(item)}
                  >
                    <div className="gallery-item-inner">
                      <img src={item.src} alt={`Discoland photo ${i + 1}`} />
                      <div className="gallery-item-overlay">🔍</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {lightbox && (
            <div className="lightbox" onClick={() => setLightbox(null)}>
              <button className="lightbox-close">✕</button>
              <img src={lightbox.src} alt="Discoland" className="lightbox-img" />
            </div>
          )}

          {/* ── REVIEWS ── */}
          <section className="reviews-section">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.reviewsLabel}</div>
                <h2 className="section-title">{T.reviewsTitle}</h2>
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

          {/* ── ABOUT ── */}
          <section id="about" className="about-section">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.aboutLabel}</div>
                <h2 className="section-title">{T.aboutTitle}</h2>
              </div>
              <div className="about-grid">
                <div className="about-bio reveal">
                  <p><strong>{T.aboutBio1}</strong></p>
                  <p>{T.aboutBio2}</p>
                  <div className="about-highlight-box">
                    <p style={{ fontWeight:600, color:"var(--pink)", marginBottom:8 }}>{T.aboutBoxTitle}</p>
                    <ul>
                      <li><strong>{T.aboutItem1T}</strong> {T.aboutItem1}</li>
                      <li><strong>{T.aboutItem2T}</strong> {T.aboutItem2}</li>
                      <li><strong>{T.aboutItem3T}</strong> {T.aboutItem3}</li>
                    </ul>
                  </div>
                  <p style={{ marginTop:20 }}>{T.aboutBio3}</p>
                </div>
                <div className="reveal">
                  <div className="glass-card" style={{ padding:32 }}>
                    <div style={{ fontSize:64, textAlign:"center", marginBottom:24 }}>🪩</div>
                    <h3 style={{ textAlign:"center", color:"var(--pink)", marginBottom:16, fontFamily:"Bebas Neue", fontSize:28 }}>
                      {T.aboutCardTitle}
                    </h3>
                    <p style={{ textAlign:"center", color:"var(--muted)", marginBottom:24, fontSize:15 }}>
                      {T.aboutCardSub}
                    </p>
                    <a
                      href="#"
                      className="neon-btn neon-btn-primary"
                      style={{ width:"100%", justifyContent:"center", marginBottom:16 }}
                      onClick={e => { e.preventDefault(); scrollTo("contact"); }}
                    >
                      {T.aboutCardBtn}
                    </a>
                    <div style={{ marginTop:24, paddingTop:24, borderTop:"1px solid var(--glass-border)" }}>
                      <p style={{ fontSize:14, color:"var(--cyan)", textAlign:"center" }}>{T.aboutCardTag}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── SOCIAL ── */}
          <section className="social-section">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.socialLabel}</div>
                <h2 className="section-title" style={{ fontSize:"clamp(40px,6vw,80px)" }}>{T.socialTitle}</h2>
                <p style={{ color:"var(--muted)", marginTop:16, fontSize:16 }}>{T.socialSub}</p>
              </div>
              <div className="social-icons reveal">
                <a href="https://instagram.com/discoland.music" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram">
                  <span className="social-icon-svg">📸</span><span>Instagram</span>
                </a>
                <a href="#" className="social-icon-btn youtube" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon-svg">▶</span><span>YouTube</span>
                </a>
                <a href="#" className="social-icon-btn tiktok" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon-svg">🎵</span><span>TikTok</span>
                </a>
              </div>

              <div className="newsletter reveal">
                <h3>{T.newsletterTitle}</h3>
                <p>{T.newsletterSub}</p>
                <div className="newsletter-form">
                  <input
                    type="email" className="newsletter-input" placeholder={T.newsletterPh}
                    value={newsletter} onChange={e => setNewsletter(e.target.value)}
                  />
                  <button
                    className="neon-btn neon-btn-primary"
                    onClick={() => { if (newsletter) { alert("You're on the list! 🪩"); setNewsletter(""); } }}
                  >
                    {T.newsletterBtn}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact">
            <div className="container">
              <div className="reveal">
                <div className="section-label">{T.contactLabel}</div>
                <h2 className="section-title">{T.contactTitle}</h2>
              </div>
              <div className="contact-grid">
                <div className="contact-info reveal">
                  <div className="contact-info-item">
                    <div className="contact-info-label">{T.contactBookingsLabel}</div>
                    <div className="contact-info-value">booking@discoland.nl</div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-label">{T.contactIgLabel}</div>
                    <div className="contact-info-value">@discoland.music</div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-label">{T.contactBasedLabel}</div>
                    <div className="contact-info-value">{T.contactBasedValue}</div>
                  </div>
                  <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.7 }}>{T.contactInfo}</p>
                </div>
                <div className="reveal">
                  {formSent
                    ? <div className="form-success">{T.contactSuccess}</div>
                    : <form className="contact-form" onSubmit={e => { e.preventDefault(); setFormSent(true); }}>
                        <input className="form-input" placeholder={T.contactNamePh} value={contactForm.name}
                          onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} required />
                        <input type="email" className="form-input" placeholder={T.contactEmailPh} value={contactForm.email}
                          onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} required />
                        <textarea className="form-textarea" placeholder={T.contactMsgPh}
                          value={contactForm.message}
                          onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} required />
                        <button type="submit" className="neon-btn neon-btn-primary" style={{ alignSelf:"flex-start" }}>
                          {T.contactSendBtn}
                        </button>
                      </form>
                  }
                </div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="footer">
            <div className="container">
              <div className="footer-logo">DISCOLAND</div>
              <p className="footer-sub">{T.footerSub}</p>
              <div className="footer-links">
                {[["hero",T.footerHome],["music",T.footerMusic],["videos",T.footerVideos],["tour",T.footerTour],["gallery",T.footerGallery],["about",T.footerAbout],["contact",T.footerContact]].map(([id, label]) => (
                  <a key={id} onClick={() => scrollTo(id)}>{label}</a>
                ))}
                <a onClick={goToMembers}>{T.footerMembers}</a>
              </div>
              <p className="footer-copy">{T.footerCopy}</p>
            </div>
          </footer>

        </>
      )}

    </div>
  );
}
