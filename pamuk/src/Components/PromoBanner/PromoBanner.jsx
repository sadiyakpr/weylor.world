import React, { useEffect, useRef, useState } from "react";
import "./PromoBanner.css";
import fallbackImage from '../../Assets/hero_image.png';

const SALE_DURATION_MINUTES = 35;
const COOLDOWN_HOURS = 1;
const URGENCY_THRESHOLD = 10 * 60 * 1000;
const CAMPAIGN_VERSION = "v2";

const PromoBanner = ({ image, onClick }) => {
  /* ─────────── SERVER TIME ─────────── */
  const [serverTime, setServerTime] = useState(null);
  const [fetchTime, setFetchTime] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchServerTime = async () => {
      try {
        const res = await fetch("/api/time");
        const data = await res.json();
        if (cancelled) return;
        setServerTime(Number(data.serverTime) || Date.now());
        setFetchTime(Date.now());
      } catch {
        if (cancelled) return;
        const now = Date.now();
        setServerTime(now);
        setFetchTime(now);
      }
    };
    fetchServerTime();
    return () => (cancelled = true);
  }, []);

  const getNow = () => (serverTime && fetchTime ? serverTime + (Date.now() - fetchTime) : Date.now());

  /* ─────────── CAMPAIGN STATE ─────────── */
  const readSavedCampaign = () => {
    try {
      const raw = localStorage.getItem("promo-timer");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  };

  const createCampaign = () => {
    const start = getNow();
    const end = start + SALE_DURATION_MINUTES * 60 * 1000;
    const cooldownEnd = end + COOLDOWN_HOURS * 60 * 60 * 1000;
    const data = { start, end, cooldownEnd, version: CAMPAIGN_VERSION };
    localStorage.setItem("promo-timer", JSON.stringify(data));
    return data;
  };

  const initCampaign = () => {
    const saved = readSavedCampaign();
    if (saved && saved.version === CAMPAIGN_VERSION) return saved;
    return createCampaign();
  };

  const [campaign, setCampaign] = useState(initCampaign);
  const [now, setNow] = useState(() => getNow());
  const [phase, setPhase] = useState("sale");

  /* ─────────── TICK ─────────── */
  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000);
    return () => clearInterval(timer);
  }, [serverTime, fetchTime]);

  /* ─────────── PHASE CONTROL ─────────── */
  useEffect(() => {
    if (now < campaign.end) {
      setPhase("sale");
    } else if (now >= campaign.end && now < campaign.cooldownEnd) {
      setPhase("cooldown");
    } else if (now >= campaign.cooldownEnd) {
      localStorage.removeItem("promo-timer");
      const newCampaign = createCampaign();
      setCampaign(newCampaign);
      setPhase("sale");
    }
  }, [now, campaign]);

  /* ─────────── TIME LEFT ─────────── */
  const diff = campaign.end - now;
  const timeLeft =
    diff > 0
      ? {
          h: Math.floor(diff / 3600000),
          m: Math.floor((diff % 3600000) / 60000),
          s: Math.floor((diff % 60000) / 1000),
        }
      : { h: 0, m: 0, s: 0 };

  const isUrgent = diff > 0 && diff <= URGENCY_THRESHOLD;

  /* ─────────── ANIMATION ─────────── */
  const animateRef = useRef(null);
  useEffect(() => {
    const el = animateRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ─────────── TIMER RENDER ─────────── */
  const renderTimer = () => {
    const digits = `${String(timeLeft.h).padStart(2, "0")}${String(timeLeft.m).padStart(
      2,
      "0"
    )}${String(timeLeft.s).padStart(2, "0")}`.split("");
    return (
      <div className="flip-timer">
        {digits.map((digit, i) => (
          <div className="flip-card" key={i}>
            <div className="flip-card-inner">
              <div className="flip-card-front">{digit}</div>
              <div className="flip-card-back">{digit}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /* ─────────── FINAL RENDER ─────────── */
  const finalImage = image || fallbackImage;

  return (
    <div
      ref={animateRef}
      data-animate
      className={`promo-banner dark-mode ${phase === "cooldown" ? "image-only" : ""} ${
        isUrgent ? "urgent" : ""
      }`}
    >
      {phase === "sale" && (
        <div className="promo-content">
          <h2>FLAT 50% OFF</h2>
          {renderTimer()}
          <button onClick={onClick}>Explore now</button>
        </div>
      )}

      
      <div className="promo-image">
        <img src={finalImage} alt={phase === "sale" ? "Sale model" : "Promo ended"} />
      </div>
    </div>
  );
};

export default PromoBanner;