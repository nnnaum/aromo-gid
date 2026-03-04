import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Star, 
  ShieldCheck, 
  Clock, 
  Tag,
  Menu,
  RotateCw
} from 'lucide-react';

// --- Types ---
interface Perfume {
  id: number;
  name: string;
  description: string;
  gender: string;
  volume: string;
}

// --- Data ---
const PERFUMES: Perfume[] = [
  { id: 1, name: "Episode 23", description: "парфюмерная вода", gender: "для него", volume: "55мл" },
  { id: 2, name: "Demi-Lune Terra", description: "парфюмерная вода", gender: "для него", volume: "90мл" },
  { id: 3, name: "White Flowers & Honey Intense", description: "парфюмерная вода", gender: "для неё", volume: "50мл" },
  { id: 4, name: "Golden Amber & Midnight Saffron", description: "парфюмерная вода", gender: "для неё", volume: "50мл, 20мл" },
  { id: 5, name: "Masala tea & Tobacco", description: "парфюмерная вода", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 6, name: "Demi-Lune Aqua", description: "парфюмерная вода", gender: "для него", volume: "90мл" },
  { id: 7, name: "Nuage Gardenia", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 8, name: "Episode 21", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 9, name: "Episode 28", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 10, name: "Demi-Lune № 04", description: "парфюмерная вода", gender: "для него", volume: "90мл" },
  { id: 11, name: "FLUIDES White Flowers & Cedarwood", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 12, name: "Arc-en-Ciel Ice Dance", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 13, name: "Arc-en-Ciel", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 14, name: "Pink Rose & Sea Salt", description: "парфюмерная вода", gender: "для неё", volume: "50мл, 20мл" },
  { id: 15, name: "Nuage Neroli", description: "парфюмерная вода", gender: "для неё, унисекс", volume: "55мл" },
  { id: 16, name: "White Rose & Musk", description: "парфюмерная вода", gender: "для неё", volume: "50мл, 20мл" },
  { id: 17, name: "L’essence d’Altai", description: "духи-концентрат", gender: "для неё", volume: "50мл, 20мл" },
  { id: 18, name: "Golden Violet & Amber Absolu", description: "парфюмерная вода", gender: "для неё", volume: "50мл" },
  { id: 19, name: "Episode 26", description: "парфюмерная вода", gender: "унисекс", volume: "55мл" },
  { id: 20, name: "Red Rose & Oud", description: "парфюмерная вода", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 21, name: "Silver Wood & Oakmoss", description: "парфюмерная вода", gender: "для него", volume: "50мл" },
  { id: 22, name: "Episode 25", description: "парфюмерная вода", gender: "унисекс", volume: "55мл" },
  { id: 23, name: "FLUIDES Black Cherry & Tonka Beans", description: "парфюмерная вода", gender: "для неё, унисекс", volume: "20мл" },
  { id: 24, name: "Episode 27", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 25, name: "Demi-Lune Ignis", description: "парфюмерная вода", gender: "для него", volume: "90мл" },
  { id: 26, name: "L’essence de Taiga", description: "духи-концентрат", gender: "для него, унисекс", volume: "50мл, 20мл" },
  { id: 27, name: "Demon du Ciel", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 28, name: "Neroli Tea & Bergamot", description: "парфюмерная вода", gender: "унисекс", volume: "50мл" },
  { id: 29, name: "White Tea & Mimosa", description: "парфюмерная вода", gender: "для неё", volume: "50мл" },
  { id: 30, name: "Lady Vogue Soul", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 31, name: "Orange Rose & Vanilla", description: "парфюмерная вода", gender: "для неё, унисекс", volume: "50мл, 20мл" },
  { id: 32, name: "Blue Matcha & Vetiver", description: "парфюмерная вода", gender: "для неё, унисекс", volume: "50мл" },
  { id: 33, name: "Nuage Peony", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 34, name: "Arc-en-Ciel White", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 35, name: "Demi-Lune Aer", description: "парфюмерная вода", gender: "для него", volume: "90мл" },
  { id: 36, name: "Episode 02", description: "парфюмерная вода", gender: "унисекс", volume: "55мл" },
  { id: 37, name: "Arc-en-Ciel Red", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 38, name: "Nuage Osmanthus", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 39, name: "Dark Vanilla & Cherry Blossom", description: "парфюмерная вода", gender: "для неё", volume: "50мл, 20мл" },
  { id: 40, name: "Arc-en-Ciel Pink", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 41, name: "Lady Vogue Dream", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 42, name: "Neon Rose & Davana", description: "парфюмерная вода", gender: "для неё, унисекс", volume: "50мл, 20мл" },
  { id: 43, name: "Nuage Freesia", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 44, name: "Tea Blossom & Candy", description: "парфюмерная вода", gender: "для неё", volume: "50мл" },
  { id: 45, name: "Wild Raspberry & Bitter Orange", description: "туалетная вода", gender: "для неё", volume: "50мл" },
  { id: 46, name: "Absolute Ego", description: "парфюмерная вода", gender: "для него", volume: "20мл" },
  { id: 47, name: "Nuage", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 48, name: "Arc-en-Ciel Emerald", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 49, name: "Arc-en-ciel Bloom", description: "парфюмерная вода", gender: "для неё", volume: "20мл" },
  { id: 50, name: "FLUIDES Glowing Citrus & Vetiver", description: "парфюмерная вода", gender: "для неё, унисекс", volume: "20мл" },
  { id: 51, name: "Episode 30", description: "парфюмерная вода", gender: "для неё", volume: "55мл" },
  { id: 52, name: "1 Primum", description: "духи-концентрат", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 53, name: "6 Sextum", description: "духи-концентрат", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 54, name: "9 Nonum", description: "духи-концентрат", gender: "унисекс", volume: "50мл, 20мл" },
];

const REVIEWS = [3, 1, 6, 4, 8, 2, 7, 5]; // Shuffled 1-8

// --- Components ---

const FastScrollHandle = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Обработка движения
  const updateScroll = (clientY: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Вычисляем позицию внутри контейнера (от 0 до 1)
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
    const progress = y / rect.height;
    
    setScrollProgress(progress);
    
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: progress * totalHeight,
      behavior: 'auto' // 'auto' важен для мгновенного отклика без задержек
    });
  };

  // 2. Глобальные слушатели при перетаскивании
  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      // Предотвращаем любые другие действия
      if (e.cancelable) e.preventDefault();
      updateScroll(e.clientY);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = ''; // Возвращаем возможность выделять текст
    };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [isDragging]);

  // 3. Синхронизация ползунка со скроллом (когда крутим просто пальцем по сайту)
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      setScrollProgress(window.scrollY / totalHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    document.body.style.userSelect = 'none'; // Чтобы не выделялся текст при скролле
    updateScroll(e.clientY);
  };

  return (
    <div 
      ref={containerRef}
      // touch-none — КЛЮЧЕВОЙ КЛАСС. Отключает системный скролл поверх этой области.
      className="fixed right-0 top-20 bottom-20 w-12 z-[100] md:hidden flex flex-col items-center touch-none select-none"
      onPointerDown={onPointerDown}
    >
      <div className="relative w-full h-full flex justify-center pointer-events-none">
        {/* Трек (линия) */}
        <div className="absolute w-0.5 h-full bg-stone-300/30 rounded-full" />
        
        {/* Ползунок */}
        <motion.div
          className="absolute w-2.5 h-20 bg-amber-500/90 backdrop-blur-md rounded-full pointer-events-auto shadow-xl border border-white/30"
          style={{ 
            top: `${scrollProgress * 100}%`,
            translateY: '-50%' 
          }}
          animate={{
            width: isDragging ? 12 : 8,
            backgroundColor: isDragging ? '#f59e0b' : '#d97706',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="h-10 w-10 rounded-full object-cover border border-stone-200 group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
          <span className="font-serif text-lg font-bold tracking-widest text-stone-800 hidden sm:block drop-shadow-sm">АРОМА ГИД</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['отзывы', 'заказ и доставка', 'контакты'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item === 'отзывы' ? 'reviews' : item === 'заказ и доставка' ? 'delivery' : 'contacts')}
              className="text-stone-600 hover:text-amber-600 transition-colors uppercase text-xs tracking-widest font-medium drop-shadow-sm"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-stone-800 drop-shadow-sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-4 left-4 right-4 bg-white/95 backdrop-blur-xl z-[70] shadow-2xl rounded-3xl p-6 flex flex-col gap-2 md:hidden border border-stone-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-2 px-2">
                <span className="font-serif font-bold tracking-widest text-stone-800 text-sm">МЕНЮ</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-stone-400 hover:text-stone-800">
                  <X size={20} />
                </button>
              </div>
              {['отзывы', 'заказ и доставка', 'контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item === 'отзывы' ? 'reviews' : item === 'заказ и доставка' ? 'delivery' : 'contacts')}
                  className="text-stone-600 hover:text-amber-600 transition-colors uppercase text-xs tracking-widest font-bold text-center py-4 rounded-xl hover:bg-stone-50"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          backgroundImage: `url("${import.meta.env.BASE_URL}background.jpg")`, 
          filter: 'blur(2px) brightness(1.15)' 
        }}
      />
      <div className="absolute inset-0 bg-stone-900/25" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        <h1 
          className="font-serif text-4xl md:text-7xl lg:text-8xl text-white font-black mb-8 tracking-tighter leading-[0.9]"
          style={{ 
            textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,1), -2px -2px 4px rgba(0,0,0,1), 2px -2px 4px rgba(0,0,0,1), -2px 2px 4px rgba(0,0,0,1)' 
          }}
        >
          МИР ИЗЫСКАННЫХ <br /> АРОМАТОВ <br /> 
          <span 
            className="text-amber-200 text-2xl md:text-5xl lg:text-6xl font-serif italic font-light tracking-normal block mt-4"
            style={{ textShadow: '0 0 15px rgba(0,0,0,0.9), 0 0 5px rgba(0,0,0,1), 1.5px 1.5px 3px rgba(0,0,0,1), -1.5px -1.5px 3px rgba(0,0,0,1), 1.5px -1.5px 3px rgba(0,0,0,1), -1.5px 1.5px 3px rgba(0,0,0,1)' }}
          >
            ОТ АРОМА ГИД
          </span>
        </h1>
        <p 
          className="text-white text-base md:text-2xl font-bold tracking-wide max-w-[280px] md:max-w-2xl mx-auto leading-relaxed"
          style={{ 
            textShadow: '0 0 12px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,1), 1.5px 1.5px 2px rgba(0,0,0,1), -1.5px -1.5px 2px rgba(0,0,0,1), 1.5px -1.5px 2px rgba(0,0,0,1), -1.5px 1.5px 2px rgba(0,0,0,1)' 
          }}
        >
          Вы любите качественный парфюм, но не готовы переплачивать? У нас — идеальное решение: премиальные ароматы по приятной цене.
        </p>
      </motion.div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Star className="text-amber-500" />,
      title: "Авторские формулы",
      text: "Ароматы созданы известными парфюмерами по мотивам известных брендов. Тот же характер, те же ноты, тот же шарм."
    },
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: "Качественный состав",
      text: "Используем проверенные парфюмерные компоненты, безопасные и стойкие. Имеются все сертификаты качества и \"честный знак\"."
    },
    {
      icon: <Clock className="text-blue-500" />,
      title: "Отличная стойкость",
      text: "Ароматы держат положенное время и более, не теряя глубины и шлейфа."
    },
    {
      icon: <Tag className="text-rose-500" />,
      title: "Доступная цена!",
      text: "Мы отказались от дорогостоящей коммерческой рекламы, для того чтобы Вы могли экономить до 90% по сравнению с ценами на люксовые бренды."
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto text-center">
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-800 mb-12 md:mb-20 leading-tight">Почему наши ароматы - <br className="hidden md:block" /> ваш лучший выбор?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 md:p-10 rounded-[40px] bg-white/95 shadow-xl hover:translate-y-[-8px] transition-all duration-500 border border-stone-200 flex flex-col items-center"
          >
            <div className="mb-6 flex justify-center scale-125 md:scale-150">{f.icon}</div>
            <h3 className="font-black text-3xl md:text-2xl lg:text-3xl mb-4 text-stone-900 leading-tight tracking-tight">{f.title}</h3>
            <p className="text-stone-800 text-xl md:text-xl lg:text-xl leading-relaxed font-bold">
              {f.text}
            </p>
          </motion.div>
        ))}
      </div>
      
      <p className="text-stone-800 italic font-black text-2xl md:text-3xl px-4 leading-tight">
        Отличный шанс обрести роскошный парфюм без переплат!
      </p>
      <div className="section-divider mt-16 md:mt-20" />
    </section>
  );
};

const Catalog = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedId === null) return;
    const currentIndex = PERFUMES.findIndex(p => p.id === selectedId);
    const nextIndex = (currentIndex + 1) % PERFUMES.length;
    setSelectedId(PERFUMES[nextIndex].id);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedId === null) return;
    const currentIndex = PERFUMES.findIndex(p => p.id === selectedId);
    const prevIndex = (currentIndex - 1 + PERFUMES.length) % PERFUMES.length;
    setSelectedId(PERFUMES[prevIndex].id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  return (
    <section id="catalog" className="py-16 md:py-24 bg-stone-50/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-6xl text-stone-800 mb-4 font-black">Наш каталог</h2>
        <div className="w-24 h-1.5 bg-amber-200 mx-auto mb-16 md:mb-24 rounded-full" />

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-12">
          {PERFUMES.map((p) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col bg-white rounded-2xl md:rounded-[32px] p-1.5 md:p-4 shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100"
            >
              <div 
                className="aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden mb-2 md:mb-6 cursor-pointer relative bg-stone-100"
                onClick={() => setSelectedId(p.id)}
              >
                <img 
                  src={`${import.meta.env.BASE_URL}${p.id}.jpg`} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>

              <div className="px-1 md:px-2 flex-grow flex flex-col text-left">
                {/* Gender Badge */}
                <div className="mb-1 md:mb-2">
                  <span className={`text-[9px] md:text-sm font-black uppercase tracking-widest px-2 py-0.5 md:py-1 rounded-md ${
                    p.gender.includes('него') ? 'bg-blue-50 text-blue-600' : 
                    p.gender.includes('неё') ? 'bg-rose-50 text-rose-600' : 
                    'bg-stone-100 text-stone-600'
                  }`}>
                    {p.gender}
                  </span>
                </div>

                <h4 className="font-black text-stone-900 text-lg md:text-xl leading-tight mb-1 truncate" title={p.name}>
                  {p.name}
                </h4>
                
                <div className="mb-2 md:mb-4">
                  <p className="text-stone-500 text-sm md:text-xl truncate font-medium">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 md:pt-4 border-t border-stone-50 mt-auto flex items-center justify-between">
                  <span className="text-[9px] md:text-sm font-black uppercase tracking-widest text-stone-400">Объем</span>
                  <div className="flex flex-wrap justify-end gap-1">
                    {p.volume.split(',').map((v, idx) => (
                      <span key={idx} className="text-[10px] md:text-lg font-black text-amber-700 bg-amber-50/50 border border-amber-100 px-1.5 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-lg">
                        {v.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-10 bg-amber-50 rounded-[40px] border border-amber-100 text-stone-900 text-xl md:text-3xl max-w-5xl mx-auto font-semibold leading-relaxed shadow-sm">
          <p>
            Со всем каталогом с полным описанием ароматов можете ознакомится в нашем телеграмм боте, ссылка на бота-каталог в разделе "контакты".
          </p>
        </div>
        <div className="section-divider mt-24" />
      </div>

      {/* Fullscreen Image Modal with Navigation */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedId(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-[110]">
              <X size={32} />
            </button>

            {/* Navigation Arrows (Desktop) */}
            <button 
              className="absolute left-4 md:left-8 text-white/50 hover:text-white p-4 transition-all hidden md:block z-[110]"
              onClick={handlePrev}
            >
              <ChevronLeft size={64} strokeWidth={1} />
            </button>
            <button 
              className="absolute right-4 md:right-8 text-white/50 hover:text-white p-4 transition-all hidden md:block z-[110]"
              onClick={handleNext}
            >
              <ChevronRight size={64} strokeWidth={1} />
            </button>

            {/* Image Container with Swipe Support */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) handlePrev();
                    else if (info.offset.x < -100) handleNext();
                  }}
                  className="w-full h-full flex flex-col items-center justify-center gap-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}${selectedId}.jpg`}
                    className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center">
                    <h3 className="text-white font-black text-2xl md:text-4xl mb-2">
                      {PERFUMES.find(p => p.id === selectedId)?.name}
                    </h3>
                    <p className="text-stone-400 text-sm md:text-lg uppercase tracking-[0.3em] font-bold">
                      {PERFUMES.find(p => p.id === selectedId)?.gender} • {PERFUMES.find(p => p.id === selectedId)?.volume}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const pinchState = useRef<{
    initialDistance: number;
    initialScale: number;
  } | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (fullscreenIndex === null) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length),
        5000
      );
    }
    return () => resetTimeout();
  }, [currentIndex, fullscreenIndex]);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  const nextFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex + 1) % REVIEWS.length);
    }
  };

  const prevFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex - 1 + REVIEWS.length) % REVIEWS.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (fullscreenIndex === null) return;
      if (e.key === 'ArrowRight') nextFullscreen();
      if (e.key === 'ArrowLeft') prevFullscreen();
      if (e.key === 'Escape') setFullscreenIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenIndex]);

  useEffect(() => {
    if (fullscreenIndex === null) {
      setZoomScale(1);
      setIsZoomed(false);
      pinchState.current = null;
    }
  }, [fullscreenIndex]);

  const handlePinchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 2) return;

    const [t1, t2] = [e.touches[0], e.touches[1]];
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    const distance = Math.hypot(dx, dy);

    pinchState.current = {
      initialDistance: distance,
      initialScale: zoomScale,
    };
  };

  const handlePinchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!pinchState.current || e.touches.length !== 2) return;

    e.preventDefault();

    const [t1, t2] = [e.touches[0], e.touches[1]];
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    const distance = Math.hypot(dx, dy);

    if (pinchState.current.initialDistance === 0) return;

    let nextScale =
      (distance / pinchState.current.initialDistance) *
      pinchState.current.initialScale;

    nextScale = Math.min(Math.max(nextScale, 1), 3);

    setZoomScale(nextScale);
    setIsZoomed(nextScale > 1.01);
  };

  const handlePinchEnd = () => {
    pinchState.current = null;
    if (zoomScale <= 1.01) {
      setZoomScale(1);
      setIsZoomed(false);
    }
  };

  return (
    <section id="reviews" className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-16">Отзывы наших клиентов</h2>
        
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl shadow-xl glass-card border-stone-200/30">
            <motion.div 
              className="flex cursor-pointer"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => setFullscreenIndex(currentIndex)}
            >
              {REVIEWS.map((id) => (
                <div key={id} className="min-w-full aspect-[10/4] bg-white flex items-center justify-center">
                  <img 
                    src={`${import.meta.env.BASE_URL}${id}otz.jpg`} 
                    alt={`Review ${id}`} 
                    className="w-full h-full object-contain md:object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls */}
          <button 
            onClick={prevReview}
            className="absolute left-[-10px] md:left-[-30px] top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg text-stone-800 hover:bg-white transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={nextReview}
            className="absolute right-[-10px] md:right-[-30px] top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg text-stone-800 hover:bg-white transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-amber-500 w-6' : 'bg-stone-300'}`}
              />
            ))}
          </div>
        </div>
        <div className="section-divider" />
      </div>

      {/* Fullscreen Review Modal */}
      <AnimatePresence>
        {fullscreenIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => {
              setFullscreenIndex(null);
              setZoomScale(1);     // Сбрасываем масштаб до обычного
              setIsZoomed(false);  // Выключаем режим зума
            }}
          >
            <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[120]">
              <X size={32} />
            </button>

            {/* Rotation Hint - Only visible on mobile in portrait mode */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/80 md:hidden portrait:flex landscape:hidden z-[120] pointer-events-none animate-pulse">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                <RotateCw size={24} className="animate-spin-slow" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-center bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                Поверните экран для удобства
              </p>
            </div>
            
            <button 
              onClick={prevFullscreen}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[120] hidden md:block"
            >
              <ChevronLeft size={64} strokeWidth={1} />
            </button>
            
            <button 
              onClick={nextFullscreen}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[120] hidden md:block"
            >
              <ChevronRight size={64} strokeWidth={1} />
            </button>

            <div className="w-full h-full flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={fullscreenIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  drag={isZoomed ? false : "x"}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 100) prevFullscreen();
                    else if (info.offset.x < -100) nextFullscreen();
                  }}
                  className="w-full h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="relative w-full h-full flex items-center justify-center touch-none"
                    onTouchStart={handlePinchStart}
                    onTouchMove={handlePinchMove}
                    onTouchEnd={handlePinchEnd}
                    onTouchCancel={handlePinchEnd}
                  >
                    <motion.img 
  src={`${import.meta.env.BASE_URL}${REVIEWS[fullscreenIndex]}otz.jpg`}
  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
  // Заменяем обычный transform на motion-scale
  animate={{ scale: zoomScale }} 
  // Включаем перетаскивание, только если картинка увеличена
  drag={isZoomed} 
  // Ограничиваем, чтобы картинка не улетала слишком далеко за экран
  dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
  dragElastic={0.1}
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  referrerPolicy="no-referrer"
/>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Delivery = () => {
  return (
    <section id="delivery" className="py-16 md:py-20 bg-stone-50/50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-stone-800 mb-12 md:mb-16 leading-tight">Заказ и доставка</h2>
        <div className="bg-white/90 backdrop-blur-md p-8 md:p-16 rounded-[40px] md:rounded-[60px] shadow-2xl border border-stone-200">
          <div className="mb-8 md:mb-12">
            <p className="text-stone-900 text-2xl md:text-3xl font-black leading-tight mb-6 md:mb-8">
              Уточнить наличие, стоимость ароматов и сделать заказ Вы можете по указанным ниже контактам.
            </p>
            <div className="w-20 md:w-24 h-1.5 bg-amber-200 mx-auto rounded-full" />
          </div>
          <p className="text-stone-800 leading-relaxed text-lg md:text-xl font-bold">
            Наша компания международная и охватывает почти все страны мира. Офисы компании присутствуют в большинстве городов России и во всех странах СНГ. Доставка от компании возможна почти по всей России (уточняйте у администраторов). По Москве, Санкт-Петербургу и другим крупным городам России возможна курьерская доставка день в день.
          </p>
        </div>
        <div className="section-divider mt-16 md:mt-20" />
      </div>
    </section>
  );
};

const Contacts = () => {
  return (
    <section id="contacts" className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-stone-800 text-center mb-16">Контакты</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left p-6 glass-card rounded-2xl">
              <div className="p-4 bg-emerald-100 text-emerald-600 rounded-xl scale-110"><Phone size={28} /></div>
              <div>
                <p className="text-sm text-stone-400 uppercase tracking-widest font-black mb-1">WhatsApp / Телефон</p>
                <a href="tel:+79936999339" className="text-xl md:text-2xl font-black text-stone-800 hover:text-emerald-600 transition-colors">+7 (993) 699-93-39</a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left p-6 glass-card rounded-2xl">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl scale-110"><Send size={28} /></div>
              <div className="flex flex-col items-center md:items-start">
                <p className="text-sm text-stone-400 uppercase tracking-widest font-black mb-3">Telegram Личный</p>
                <a href="https://t.me/Naum_SW" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-full transition-colors font-black text-lg">
                  <span>@Naum_SW</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left p-6 glass-card rounded-2xl">
              <div className="p-4 bg-stone-100 text-stone-600 rounded-xl scale-110"><MessageCircle size={28} /></div>
              <div>
                <p className="text-sm text-stone-400 uppercase tracking-widest font-black mb-1">Контакт в Max</p>
                <a href="tel:+79227485998" className="text-xl md:text-2xl font-black text-stone-800 hover:text-stone-600 transition-colors">+7 (922) 748-59-98</a>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 glass-card rounded-3xl border-amber-100">
              <h4 className="font-black text-xl text-stone-800 mb-6 flex flex-col lg:flex-row items-center gap-3 justify-center lg:justify-start text-center lg:text-left">
                <Send className="text-blue-500" size={24} />
                Наши ресурсы в Telegram
              </h4>
              <ul className="space-y-6 text-base md:text-lg text-stone-600 text-center lg:text-left font-medium">
                <li>
                  <p className="font-bold mb-2 text-stone-800">Бот-каталог с полным описанием ароматов</p>
                  <a href="https://aromo.pro/NNN14_88" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all font-bold">aromo.pro/NNN14_88</a>
                </li>
                <li>
                  <p className="font-bold mb-2 text-stone-800">Наш чат: отвечаем на ваши вопросы и рассказываем об интересном</p>
                  <a href="https://aromo.pro/chat/NNN14_88" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all font-bold">aromo.pro/chat/NNN14_88</a>
                </li>
              </ul>
            </div>

            <div className="p-8 glass-card rounded-3xl text-center lg:text-left">
              <p className="text-sm text-stone-400 uppercase tracking-widest mb-3 font-black">Сотрудничество</p>
              <p className="text-base md:text-lg text-stone-600 mb-6 font-medium">По вопросам сотрудничества обращайтесь в Telegram</p>
              <a href="https://t.me/Naum_SW" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-blue-50 text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-full transition-colors font-black text-lg">
                <Send size={20} />
                <span>@Naum_SW</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-stone-200/50 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="Logo" className="h-12 w-12 rounded-full opacity-50 grayscale object-cover" referrerPolicy="no-referrer" />
          <p className="text-stone-400 text-xs uppercase tracking-[0.2em] font-bold">
            © {new Date().getFullYear()} АРОМА ГИД • ВСЕ ПРАВА ЗАЩИЩЕНЫ
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="smooth-scroll">
      <FastScrollHandle />
      <Navbar />
      <Hero />
      <Features />
      <Catalog />
      <Reviews />
      <Delivery />
      <Contacts />
      <Footer />
    </div>
  );
}
