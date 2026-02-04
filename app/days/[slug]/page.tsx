// ... existing code ...
  // Mini-Game for Day 8 (Valentine's Day)
  const ValentineGame = () => {
    const [launched, setLaunched] = useState(false);
    const launchFireworks = () => {
      setLaunched(true);
      setGameScore(10);
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    };
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <motion.div animate={launched ? { scale: [1, 1.5, 1] } : {}} className="text-7xl">💝</motion.div>
        <button 
          onClick={launchFireworks}
          className="px-10 py-4 bg-gradient-to-r from-rose-600 to-pink-500 text-white rounded-full font-black shadow-xl hover:scale-105 transition-all"
        >
          {launched ? "Happy Valentine's Day! ❤️" : "Launch Celebration"}
        </button>
      </div>
    );
  };

  // Mini-Game for Day 9 (Slap Day)
  const SlapGame = () => {
    const [slaps, setSlaps] = useState(0);
    const [pos, setPos] = useState({ x: 50, y: 50 });
    const handleSlap = () => {
      setSlaps(s => s + 1);
      setPos({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
      if (slaps + 1 === 10) { setGameScore(10); toast.success('Bad vibes slapped away! ✋'); }
    };
    return (
      <div className="relative w-full h-48 bg-white/5 rounded-2xl overflow-hidden">
        <motion.button
          animate={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          onClick={handleSlap}
          className="absolute p-3 bg-white/10 rounded-xl text-2xl hover:bg-white/20 transition-colors"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          💢
        </motion.button>
        <p className="absolute bottom-4 left-0 w-full text-center text-[10px] uppercase tracking-widest text-rose-400">Slap the bad vibes 10 times ({slaps}/10)</p>
      </div>
    );
  };

  // Mini-Game for Day 10 (Kick Day)
  const KickGame = () => {
    const [kicks, setKicks] = useState(0);
    const handleKick = () => {
      setKicks(k => k + 1);
      if (kicks + 1 === 10) { setGameScore(10); toast.success('Stress kicked out! 🦶'); }
    };
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <motion.div 
          whileTap={{ y: -50, rotate: 20 }}
          onClick={handleKick}
          className="text-7xl cursor-pointer select-none"
        >
          ⚽
        </motion.div>
        <p className="text-rose-300 text-xs uppercase tracking-widest">Kick the stress ball 10 times ({kicks}/10)</p>
      </div>
    );
  };

  // Mini-Game for Day 11 (Perfume Day)
  const PerfumeGame = () => {
    const [mixed, setMixed] = useState<string[]>([]);
    const colors = ['🌸', '🍋', '🌿', '🍯'];
    const mix = (c: string) => {
      if (mixed.length < 3) {
        const next = [...mixed, c];
        setMixed(next);
        if (next.length === 3) { setGameScore(10); toast.success('Signature scent created! ✨'); }
      }
    };
    return (
      <div className="flex flex-col items-center gap-6 p-4">
        <div className="flex gap-4">
          {colors.map(c => (
            <button key={c} onClick={() => mix(c)} className="text-3xl p-3 bg-white/5 rounded-xl hover:bg-white/10">{c}</button>
          ))}
        </div>
        <div className="flex gap-2 h-12 items-center">
          {mixed.map((c, i) => <span key={i} className="text-2xl">{c}</span>)}
          {mixed.length === 0 && <span className="text-rose-300/50 italic text-sm">Select 3 notes...</span>}
        </div>
        {mixed.length === 3 && <button onClick={() => setMixed([])} className="text-[10px] uppercase tracking-widest text-rose-400">Reset</button>}
      </div>
    );
  };

  // Mini-Game for Day 12 (Flirting Day)
  const FlirtingGame = () => {
    const compliments = ["You're breathtaking", "Your smile lights up my world", "I'm so lucky to have you", "You're my favorite person"];
    const [comp, setComp] = useState("");
    const spin = () => {
      const random = compliments[Math.floor(Math.random() * compliments.length)];
      setComp(random);
      setGameScore(10);
    };
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <AnimatePresence mode="wait">
          {comp && (
            <motion.p 
              key={comp}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl font-serif italic text-rose-200 text-center"
            >
              "{comp}"
            </motion.p>
          )}
        </AnimatePresence>
        <button onClick={spin} className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all">
          Spin for a Compliment
        </button>
      </div>
    );
  };

  // Mini-Game for Day 13 (Confession Day)
  const ConfessionGame = () => {
    const [revealed, setRevealed] = useState(false);
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <div 
          onClick={() => { setRevealed(true); setGameScore(10); }}
          className="w-full h-32 bg-rose-800 rounded-2xl flex items-center justify-center cursor-pointer border-2 border-dashed border-rose-600 relative overflow-hidden"
        >
          {revealed ? (
            <p className="text-rose-100 font-serif italic p-4 text-center">"I've loved you since the very first moment we met."</p>
          ) : (
            <p className="text-rose-400 uppercase tracking-widest text-xs font-bold">Tap to reveal my secret</p>
          )}
        </div>
      </div>
    );
  };

  // Mini-Game for Day 14 (Missing Day)
  const MissingGame = () => {
    const [sent, setSent] = useState(false);
    return (
      <div className="flex flex-col items-center gap-6 p-8">
        <motion.div 
          animate={sent ? { scale: [1, 1.5, 1], opacity: [1, 0] } : {}}
          transition={{ duration: 1 }}
          className="text-7xl"
        >
          💓
        </motion.div>
        <button 
          onClick={() => { setSent(true); setGameScore(10); toast.success('Heartbeat sent! 💓'); setTimeout(() => setSent(false), 1000); }}
          className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold hover:bg-rose-600 transition-all"
        >
          Send a Heartbeat
        </button>
      </div>
    );
  };

  const renderGame = () => {
    console.log(`[Game Render] Game rendered for dayId: ${day.id} name: ${day.name}`);
    switch (day.id) {
      case 1: return <RoseGame />;
      case 2: return <ProposeGame />;
      case 3: return <ChocolateGame />;
      case 4: return <TeddyGame />;
      case 5: return <PromiseGame />;
      case 6: return <HugGame />;
      case 7: return <KissGame />;
      case 8: return <ValentineGame />;
      case 9: return <SlapGame />;
      case 10: return <KickGame />;
      case 11: return <PerfumeGame />;
      case 12: return <FlirtingGame />;
      case 13: return <ConfessionGame />;
      case 14: return <MissingGame />;
      default: return null;
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!day) return;
    const file = acceptedFiles[0];
    if (!file) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('Please log in to upload photos!');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${day.id}-${Math.random()}.${fileExt}`;
      const filePath = `memories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('valentine-memories')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('valentine-memories')
        .getPublicUrl(filePath);

      setPhotoUrl(publicUrl);
      await updateMemory(day.id, { photoUrl: publicUrl });
      toast.success('Photo uploaded successfully!');
    } catch (error: any) {
      toast.error('Upload failed: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  }, [day, supabase, updateMemory]);
// ... existing code ...
