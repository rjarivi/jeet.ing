import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Trophy,
  TrendingUp,
  Lock,
  Compass,
  Loader2,
  ArrowDown
} from 'lucide-react';
import marketImg from './assets/market_intelligence.png';
import proGamingImg from './assets/pro_gaming.png';
import lifestyleImg from './assets/lifestyle.png';
import saasImg from './assets/saas.png';
import ventureImg from './assets/venture.png';

const App = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [activeTab, setActiveTab] = useState('buy');

  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const acquireRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Header opacity - hide when reaching acquisition section
  const { scrollYProgress: acquireProgress } = useScroll({
    target: acquireRef,
    offset: ["start end", "start start"]
  });
  const headerOpacity = useTransform(acquireProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Main story scroll
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"]
  });

  // Chapter 1: Introduction - JEET.ING appears (full opacity)
  const introOpacity = useTransform(storyProgress, [0, 0.05, 0.2, 0.25], [1, 1, 1, 0]);
  const introScale = useTransform(storyProgress, [0, 0.05, 0.2], [0.95, 1, 1.05]);

  // The dot in JEET.ING expands to become the portal
  const dotScale = useTransform(storyProgress, [0, 0.2, 0.35, 0.4], [1, 1, 80, 80]);

  // Chapter 2: Etymology reveals (Sanskrit)
  const etymologyOpacity = useTransform(storyProgress, [0.35, 0.4, 0.52, 0.57], [0, 1, 1, 0]);
  const etymologyY = useTransform(storyProgress, [0.35, 0.4], [30, 0]);

  // Chapter 3: Modern meaning (Crypto)
  const cryptoOpacity = useTransform(storyProgress, [0.52, 0.57, 0.69, 0.74], [0, 1, 1, 0]);
  const cryptoY = useTransform(storyProgress, [0.52, 0.57], [30, 0]);

  // Chapter 4: The Vision (One Domain) - Extended to end
  const visionOpacity = useTransform(storyProgress, [0.69, 0.74, 0.92, 1], [0, 1, 1, 0]);
  const visionY = useTransform(storyProgress, [0.69, 0.74], [30, 0]);

  // Transition to use cases - starts earlier
  const transitionOpacity = useTransform(storyProgress, [0.8, 1], [0, 1]);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      offer: formData.get('offer')
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzo9k25EkNhoSiqhtkV4xcGNwEkDpPnGXqLt4rzJ7onrua2_fEb0fYsWHRyvxu-Ivbp/exec', {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires this
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      // no-cors mode doesn't return response, so we assume success
      setFormStatus('success');
      e.target.reset(); // Clear the form
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('success'); // Still show success since no-cors doesn't give us feedback
    }
  };

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] text-[#e0e0e0] font-sans selection:bg-indigo-500 relative">
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[10000] flex items-center justify-center mix-blend-difference hidden md:flex"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        {isHovering && <div className="w-1 h-1 bg-black rounded-full" />}
      </motion.div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 mix-blend-difference flex justify-between items-center p-6 md:p-12 lg:px-16"
        style={{ opacity: headerOpacity }}
      >
        <motion.div
          className="text-lg md:text-xl font-bold tracking-tight cursor-pointer flex items-center gap-1 group"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span className="bg-white text-black px-2 py-0.5 rounded-sm" style={{ letterSpacing: '0.05em' }}>JEET</span>
          <span className="opacity-50">.ing</span>
        </motion.div>

        <div className="flex gap-6 md:gap-12 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-medium opacity-60 hover:opacity-100 transition-opacity hidden sm:flex">
          <a href="#vision" className="hover:text-white transition-colors">Origins</a>
          <a href="#market" className="hover:text-white transition-colors">Potential</a>
          <a href="#acquire" className="hover:text-white transition-colors">Acquire</a>
        </div>

        <motion.div
          className="text-[9px] md:text-[10px] font-mono opacity-50 bg-white/5 px-3 py-1 rounded-full border border-white/10"
          style={{ opacity: useTransform(smoothProgress, [0, 0.95], [0.5, 1]) }}
        >
          SIGNAL: <motion.span>{useTransform(smoothProgress, (v) => Math.round(v * 100))}</motion.span>%
        </motion.div>
      </motion.nav>

      <main className="relative">

        {/* THE STORY - Continuous narrative scroll */}
        <section ref={storyRef} className="relative h-[400vh]">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

            {/* Chapter 1: Introduction - The dot expands into portal */}
            <motion.div
              style={{ opacity: introOpacity, scale: introScale }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="mb-8 md:mb-12 flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">Premium Domain Available</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col items-center gap-2 mb-2 md:mb-4 text-indigo-400"
              >
                <span className="text-[10px] md:text-sm font-mono italic tracking-widest">This could be your domain</span>
                <ArrowDown size={14} className="animate-bounce" />
              </motion.div>

              <h1 className="text-[15vw] md:text-[18vw] font-black leading-none tracking-tight flex items-center justify-center" style={{ letterSpacing: '0.02em' }}>
                JEET
                <motion.span
                  className="text-indigo-500 inline-block relative"
                  style={{ scale: dotScale }}
                >
                  .
                </motion.span>
                <span className="opacity-30">ING</span>
              </h1>
              <p className="mt-8 text-[10px] md:text-sm tracking-[0.5em] uppercase opacity-40 font-light max-w-lg mx-auto leading-relaxed">
                The Science of Winning Continuous
              </p>

              <motion.a
                href="#acquire"
                className="mt-12 group flex items-center gap-3 border-b border-indigo-500 pb-1 text-indigo-400 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] hover:text-white hover:border-white transition-all z-20"
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                Acquire This Asset <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Chapter 3: Etymology - Sanskrit */}
            <motion.div
              style={{ opacity: etymologyOpacity, y: etymologyY }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16 text-center"
            >
              <div className="max-w-4xl">
                <span className="text-indigo-500 font-mono text-xs md:text-sm mb-6 flex items-center justify-center gap-3">
                  <div className="w-8 h-px bg-indigo-500" /> 01 // ETYMOLOGY
                </span>
                <h2 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-8">
                  In Sanskrit,<br />
                  <span className="text-white">Victory.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                  A name rooted in millennia of achievement, signifying the moment of triumph.
                </p>
              </div>
            </motion.div>

            {/* Chapter 4: Modern Meaning - Crypto */}
            <motion.div
              style={{ opacity: cryptoOpacity, y: cryptoY }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16 text-center"
            >
              <div className="max-w-4xl">
                <span className="text-indigo-500 font-mono text-xs md:text-sm mb-6 flex items-center justify-center gap-3">
                  <div className="w-8 h-px bg-indigo-500" /> 02 // WEB3_DIALECT
                </span>
                <h2 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-8">
                  In Crypto,<br />
                  <span className="text-indigo-400">The Exit.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                  Reclaiming the meme. Jeeting is no longer just selling; it's the art of realized gains.
                </p>
              </div>
            </motion.div>

            {/* Chapter 5: The Vision */}
            <motion.div
              style={{ opacity: visionOpacity, y: visionY }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16 text-center"
            >
              <div className="max-w-4xl">
                <span className="text-indigo-500 font-mono text-xs md:text-sm mb-6 flex items-center justify-center gap-3">
                  <div className="w-8 h-px bg-indigo-500" /> 03 // THE_FUTURE
                </span>
                <h2 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-8">
                  One Domain<br />
                  <span className="italic">Unlimited.</span>
                </h2>
                <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                  The ultimate action-oriented TLD for those who never stop winning.
                </p>
              </div>
            </motion.div>

            {/* Transition overlay */}
            <motion.div
              style={{ opacity: transitionOpacity }}
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none"
            />

          </div>
        </section>

        {/* Use Cases - Naturally flows from story */}
        <section className="relative min-h-screen bg-black py-40 px-4 md:px-16" id="vision">
          <div className="max-w-[1400px] mx-auto">

            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                Infinite Possibilities.
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto">
                From market intelligence to pro gaming, JEET.ING powers the next generation of winners.
              </p>
            </motion.div>

            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-12 lg:col-span-7 bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] hover:from-indigo-600 hover:to-indigo-700 border border-white/5 hover:border-indigo-500/30 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between min-h-[500px] md:min-h-[600px] group overflow-hidden relative transition-all duration-700"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center mb-8 md:mb-10 group-hover:bg-indigo-600 group-hover:border-transparent transition-all duration-500">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">Market <br />Intelligence.</h3>
                  <p className="max-w-md text-white/40 text-lg md:text-xl font-light leading-relaxed">The hub for professional traders. Track the "jeets" and the "whales" with surgical precision on a domain that defines the market.</p>
                </div>
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                  <img src={marketImg} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="absolute top-0 right-0 p-16 opacity-5 scale-[2] group-hover:scale-[2.5] group-hover:opacity-10 transition-all duration-[3s] text-indigo-500">
                  <TrendingUp size={350} />
                </div>
                <a href="#market" className="relative z-10 self-start mt-12 bg-white text-black px-8 md:px-10 py-3 md:py-4 rounded-full text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase hover:bg-indigo-500 hover:text-white transition-all inline-block">View Potential</a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-12 lg:col-span-5 bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] hover:from-indigo-600 hover:to-indigo-700 border border-white/5 hover:border-indigo-500/30 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between min-h-[500px] md:min-h-[600px] group relative overflow-hidden transition-all duration-700"
              >
                <div className="flex flex-col gap-10 relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500">
                    <Trophy size={28} />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter">Pro-Gaming <br />Arena.</h3>
                  <p className="text-white/80 text-base md:text-lg font-light max-w-xs">A matchmaking elite lobby where every win is a jeet. Build the next Twitch or FaceIt on jeet.ing.</p>
                </div>
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img src={proGamingImg} alt="" className="w-full h-full object-cover mix-blend-overlay" />
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity relative z-10">
                  VALUATION_INDEX: HIGH <ArrowRight size={14} />
                </div>
                <div className="absolute -bottom-20 -right-20 text-[15rem] md:text-[20rem] font-black text-black/10 select-none">GG</div>
              </motion.div>

              {[
                { title: "Lifestyle.", icon: Compass, hoverBg: "hover:from-indigo-600 hover:to-indigo-700", hoverText: "", hoverBorder: "hover:border-indigo-500/30", desc: "Performance brands and victory-driven content.", img: lifestyleImg },
                { title: "SaaS.", icon: Cpu, hoverBg: "hover:from-indigo-600 hover:to-indigo-700", hoverText: "", hoverBorder: "hover:border-indigo-500/30", desc: "Winning automation and scale-up tools.", img: saasImg },
                { title: "Venture.", icon: Lock, hoverBg: "hover:from-indigo-600 hover:to-indigo-700", hoverText: "", hoverBorder: "hover:border-indigo-500/30", desc: "Signaling the moment of exit and success.", img: ventureImg }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`col-span-12 md:col-span-4 bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 aspect-square flex flex-col justify-end group ${item.hoverBg} ${item.hoverBorder} transition-all duration-700 cursor-pointer relative overflow-hidden`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                    <img src={item.img} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-sm md:text-base opacity-40 group-hover:opacity-100 mb-8 font-light">{item.desc}</p>
                    <item.icon className="opacity-10 group-hover:opacity-100 group-hover:rotate-[360deg] transition-all duration-[2s]" size={40} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="relative h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6" id="market">
          <div className="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#4f46e511_0%,_transparent_70%)] pointer-events-none" />
          <div className="max-w-5xl text-center z-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-[9rem] font-black leading-none mb-16 italic tracking-tighter"
            >
              Strategic <br />Real Estate.
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: "Characters", val: "4" },
                { label: "Action TLD", val: ".ing" },
                { label: "Brand Grade", val: "AA" },
                { label: "Uniqueness", val: "1/1" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <span className="text-4xl md:text-5xl font-black text-indigo-500">{stat.val}</span>
                  <span className="text-[9px] md:text-[11px] uppercase tracking-[0.4em] opacity-30">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Acquisition - Sticky section with extended scroll */}
        <section ref={acquireRef} className="relative h-[200vh] bg-black" id="acquire">
          <div className="sticky top-0 min-h-screen py-32 flex flex-col items-center justify-center bg-black px-6">
            <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-20 md:gap-32 items-center">

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12 md:space-y-16"
              >
                <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.85]">Become <br />The Owner.</h2>
                <p className="text-white/40 text-xl md:text-2xl max-w-lg font-light leading-relaxed">
                  Jeet.ing is not a purchase; it is a strategic positioning. Command the narrative of victory in the digital age.
                </p>
                <div className="flex flex-col gap-6 md:gap-8 font-mono text-[10px] md:text-[11px] text-indigo-400 tracking-widest">
                  <div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" /> STATUS: OPEN_NEGOTIATION</div>
                  <div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full bg-white/20" /> LISTING: PREMIUM_4L_ACTION</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#0d0d0d] rounded-[3rem] md:rounded-[4rem] border border-white/5 relative shadow-2xl overflow-hidden group min-h-[600px] flex flex-col"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full" />

                {/* Tab Switcher */}
                <div className="flex border-b border-white/5 relative z-10">
                  <button
                    onClick={() => setActiveTab('buy')}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`flex-1 py-8 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 relative ${activeTab === 'buy' ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                  >
                    01 // Buy Now
                    {activeTab === 'buy' && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiry')}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className={`flex-1 py-8 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] transition-all duration-500 relative ${activeTab === 'inquiry' ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                  >
                    02 // Inquire
                    {activeTab === 'inquiry' && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500" />
                    )}
                  </button>
                </div>

                <div className="p-8 md:p-16 flex-1 flex flex-col justify-center relative z-10">
                  <AnimatePresence mode="wait">
                    {activeTab === 'buy' ? (
                      <motion.div
                        key="buy-tab"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-10"
                      >
                        <div className="space-y-6">
                          <h3 className="text-3xl md:text-4xl font-black tracking-tight">Instant Acquisition.</h3>
                          <p className="text-white/40 text-lg font-light leading-relaxed">
                            Secure JEET.ING immediately through our verified marketplace partner. All transfers are handled via secure escrow.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <a
                            href="https://www.spaceship.com/domain-search/?query=jeet.ing&beast=false&tab=domains"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="flex items-center justify-center gap-4 bg-white text-black py-6 md:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.5em] hover:bg-indigo-600 hover:text-white transition-all duration-500 group shadow-xl"
                          >
                            Buy Now ($1,500)
                            <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" />
                          </a>

                          <a
                            href="https://www.spaceship.com/domain-search/?query=jeet.ing&beast=false&tab=domains"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 text-white py-6 md:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.5em] hover:bg-white/10 transition-all duration-500"
                          >
                            Make Offer
                          </a>
                        </div>

                        <div className="flex items-center justify-center gap-6 opacity-20">
                          <div className="text-[10px] font-mono tracking-widest">SPACESHIP</div>
                          <div className="w-1 h-1 rounded-full bg-white" />
                          <div className="text-[10px] font-mono tracking-widest">AFTERNIC</div>
                          <div className="w-1 h-1 rounded-full bg-white" />
                          <div className="text-[10px] font-mono tracking-widest">ESCROW.COM</div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="w-full">
                        {formStatus === 'success' ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center space-y-6"
                          >
                            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(79,70,229,0.4)]">
                              <ShieldCheck size={48} />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black tracking-tight">Request Logged.</h3>
                            <p className="text-white/40 text-base md:text-lg">Our digital asset manager will respond via encrypted channel shortly.</p>
                            <button
                              onClick={() => setFormStatus('idle')}
                              className="text-[10px] text-indigo-400 underline tracking-[0.2em] uppercase hover:text-white transition-colors"
                            >
                              New Inquiry
                            </button>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            onSubmit={handleContact}
                            className="space-y-8"
                          >
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] opacity-30 ml-2 font-bold">Inquiry Email</label>
                              <input
                                required
                                type="email"
                                name="email"
                                placeholder="ceo@venture.capital"
                                className="w-full bg-transparent border-b border-white/10 px-4 py-4 md:py-6 focus:outline-none focus:border-indigo-500 transition-all text-lg md:text-xl font-light placeholder:text-white/30"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-[0.4em] opacity-30 ml-2 font-bold">Acquisition Offer (USD)</label>
                              <input
                                required
                                type="text"
                                name="offer"
                                placeholder="Minimum $5,000"
                                className="w-full bg-transparent border-b border-white/10 px-4 py-4 md:py-6 focus:outline-none focus:border-indigo-500 transition-all text-lg md:text-xl font-light placeholder:text-white/30"
                              />
                            </div>
                            <button
                              disabled={formStatus === 'sending'}
                              className="w-full bg-white text-black py-6 md:py-8 rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.5em] hover:bg-indigo-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-4 group shadow-xl disabled:opacity-50"
                              onMouseEnter={() => setIsHovering(true)}
                              onMouseLeave={() => setIsHovering(false)}
                            >
                              {formStatus === 'sending' ? (
                                <>
                                  <Loader2 className="animate-spin" size={18} />
                                  ESTABLISHING_LINK...
                                </>
                              ) : (
                                <>
                                  INITIATE_TRANSFER
                                  <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform duration-500" />
                                </>
                              )}
                            </button>
                            <p className="text-[8px] md:text-[10px] text-center opacity-20 uppercase tracking-[0.3em] leading-relaxed">Official purchase, escrow clearance via spaceship.com</p>
                          </motion.form>
                        )}
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <footer className="w-full max-w-7xl border-t border-white/5 mt-32 md:mt-40 py-12 md:py-16 flex flex-col md:flex-row justify-between items-center text-[9px] md:text-[10px] uppercase tracking-[0.4em] opacity-20 font-bold gap-8 md:gap-0">
              <div>&copy; 2026 JEET.ING ASSET MGMT</div>
              <div className="flex gap-8 md:gap-16">
                <a href="#" className="hover:text-white transition-colors">Portfolios</a>
                <a href="#" className="hover:text-white transition-colors">Compliance</a>
                <a href="#" className="hover:text-white transition-colors">Network</a>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* Background Kinetic Elements */}
      <div className="fixed -bottom-20 left-0 w-full overflow-hidden pointer-events-none opacity-[0.015] z-0">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="text-[40vh] font-black whitespace-nowrap leading-none select-none"
        >
          WINNING_ALWAYS_WINNING_ALWAYS_WINNING_ALWAYS
        </motion.div>
      </div>
    </div>
  );
};

export default App;