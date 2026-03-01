import { useState, useEffect, useRef } from 'react';
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
  Menu
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
  { id: 1, name: "Episode 23", description: "парфюмерная вода - Коллекция ароматов Ciel / Creed Aventus", gender: "для него", volume: "55мл" },
  { id: 2, name: "Demi-Lune Terra", description: "парфюмерная вода для мужчин - Коллекция ароматов Ciel / Terre d'Hermes Hermès", gender: "для него", volume: "90мл" },
  { id: 3, name: "White Flowers & Honey Intense", description: "парфюмерная вода - Aromapolis Olfactive Studio / Chanel Chance Eau Tendre", gender: "для неё", volume: "50мл" },
  { id: 4, name: "Golden Amber & Midnight Saffron", description: "парфюмерная вода - Aromapolis Olfactive Studio / Maison Francis Kurkdjian Baccarat Rouge 540", gender: "для неё", volume: "50мл, 20мл" },
  { id: 5, name: "Masala tea & Tobacco", description: "парфюмерная вода (Чай масала и Табак), Aromapolis Olfactive Studio / Tom Ford Tobacco Vanille", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 6, name: "Demi-Lune Aqua", description: "парфюмерная вода для мужчин - Коллекция ароматов Ciel / Acqua di Gio Giorgio Armani", gender: "для него", volume: "90мл" },
  { id: 7, name: "Nuage Gardenia", description: "парфюмерная вода - Коллекция ароматов Ciel / Gucci Bloom", gender: "для неё", volume: "55мл" },
  { id: 8, name: "Episode 21", description: "парфюмерная вода - Коллекция ароматов Ciel / Delina от Parfums de Marly", gender: "для неё", volume: "55мл" },
  { id: 9, name: "Episode 28", description: "парфюмерная вода - Коллекция ароматов Ciel / Musc Noir For Her Narciso Rodriguez", gender: "для неё", volume: "55мл" },
  { id: 10, name: "Demi-Lune № 04", description: "парфюмерная вода для мужчин - Коллекция ароматов Ciel / Egoiste Platinum от Chanel", gender: "для него", volume: "90мл" },
  { id: 11, name: "FLUIDES White Flowers & Cedarwood", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Christian Dior J'adore Infinissime", gender: "для неё", volume: "20мл" },
  { id: 12, name: "Arc-en-Ciel Ice Dance", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Dolce & Gabbana Light Blue", gender: "для неё", volume: "20мл" },
  { id: 13, name: "Arc-en-Ciel", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / L’Imperatrice от Dolce & Gabbana", gender: "для неё", volume: "20мл" },
  { id: 14, name: "Pink Rose & Sea Salt", description: "парфюмерная вода, Aromapolis Olfactive Studio / Jo Malone Wood Sage & Sea Salt", gender: "для неё", volume: "50мл, 20мл" },
  { id: 15, name: "Nuage Neroli", description: "парфюмерная вода - Коллекция ароматов Ciel / Neroli Portofino Tom Ford", gender: "для неё, унисекс", volume: "55мл" },
  { id: 16, name: "White Rose & Musk", description: "парфюмерная вода, Aromapolis Olfactive Studio / Chloe Eau De Parfum", gender: "для неё", volume: "50мл, 20мл" },
  { id: 17, name: "L’essence d’Altai", description: "духи-концентрат - Aromapolis Olfactive Studio / Amouage Love Tuberose", gender: "для неё", volume: "50мл, 20мл" },
  { id: 18, name: "Golden Violet & Amber Absolu", description: "парфюмерная вода - Aromapolis Olfactive Studio / Guerlain Insolence Eau De Parfum", gender: "для неё", volume: "50мл" },
  { id: 19, name: "Episode 26", description: "парфюмерная вода - Коллекция ароматов Ciel / Gypsy Water Byredo", gender: "унисекс", volume: "55мл" },
  { id: 20, name: "Red Rose & Oud", description: "парфюмерная вода, Aromapolis Olfactive Studio / Maison Francis Kurkdjian Oud Satin Mood", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 21, name: "Silver Wood & Oakmoss", description: "парфюмерная вода - Aromapolis Olfactive Studio / Hermes Terre D'Hermes Eau Intense Vetiver", gender: "для него", volume: "50мл" },
  { id: 22, name: "Episode 25", description: "парфюмерная вода - Коллекция ароматов Ciel / Ganymede by Marc-Antoine Barrois", gender: "унисекс", volume: "55мл" },
  { id: 23, name: "FLUIDES Black Cherry & Tonka Beans", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Yves Saint Laurent Manifesto", gender: "для неё, унисекс", volume: "20мл" },
  { id: 24, name: "Episode 27", description: "парфюмерная вода - Коллекция ароматов Ciel / A La Rose Maison Francis Kurkdjian", gender: "для неё", volume: "55мл" },
  { id: 25, name: "Demi-Lune Ignis", description: "парфюмерная вода для мужчин - Коллекция ароматов Ciel / Boss Bottled от Hugo Boss", gender: "для него", volume: "90мл" },
  { id: 26, name: "L’essence de Taiga", description: "духи-концентрат - Aromapolis Olfactive Studio / Christian Dior Sauvage Elixir", gender: "для него, унисекс", volume: "50мл, 20мл" },
  { id: 27, name: "Demon du Ciel", description: "парфюмерная вода для женщин, 20 мл - Коллекция ароматов Ciel / Givenchy Ange Ou Demon", gender: "для неё", volume: "20мл" },
  { id: 28, name: "Neroli Tea & Bergamot", description: "парфюмерная вода (Чай нероли и Бергамот), Aromapolis Olfactive Studio / Guerlain Aqua Allegoria Forte Nerolia Vetiver", gender: "унисекс", volume: "50мл" },
  { id: 29, name: "White Tea & Mimosa", description: "парфюмерная вода (Белый чай и Мимоза), Aromapolis Olfactive Studio / Elizabeth Arden White Tea", gender: "для неё", volume: "50мл" },
  { id: 30, name: "Lady Vogue Soul", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Ex Nihilo Fleur Narcotique", gender: "для неё", volume: "20мл" },
  { id: 31, name: "Orange Rose & Vanilla", description: "парфюмерная вода, - Aromapolis Olfactive Studio / Lancome Idole Nectar", gender: "для неё, унисекс", volume: "50мл, 20мл" },
  { id: 32, name: "Blue Matcha & Vetiver", description: "парфюмерная вода (Голубая матча и Ветивер), Aromapolis Olfactive Studio / Acqua di Parma Yuzu", gender: "для неё, унисекс", volume: "50мл" },
  { id: 33, name: "Nuage Peony", description: "парфюмерная вода - Коллекция ароматов Ciel / Miss Dior Blooming Bouquet", gender: "для неё", volume: "55мл" },
  { id: 34, name: "Arc-en-Ciel White", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Mojave Ghost от Byredo", gender: "для неё", volume: "20мл" },
  { id: 35, name: "Demi-Lune Aer", description: "парфюмерная вода для мужчин - Коллекция ароматов Ciel / H24 Hermès", gender: "для него", volume: "90мл" },
  { id: 36, name: "Episode 02", description: "парфюмерная вода - Коллекция ароматов Ciel / Molecule 02 от Escentric Molecules", gender: "унисекс", volume: "55мл" },
  { id: 37, name: "Arc-en-Ciel Red", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Good Girl Midnight Carolina Herrera", gender: "для неё", volume: "20мл" },
  { id: 38, name: "Nuage Osmanthus", description: "парфюмерная вода - Коллекция ароматов Ciel / Good Girl Gone Bad By Kilian", gender: "для неё", volume: "55мл" },
  { id: 39, name: "Dark Vanilla & Cherry Blossom", description: "парфюмерная вода - Aromapolis Olfactive Studio / HUDA BEAUTY KAYALI Vanilla 28", gender: "для неё", volume: "50мл, 20мл" },
  { id: 40, name: "Arc-en-Ciel Pink", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Pink Roses от Mancera", gender: "для неё", volume: "20мл" },
  { id: 41, name: "Lady Vogue Dream", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Zadig & Voltaire This Is Love! For Her", gender: "для неё", volume: "20мл" },
  { id: 42, name: "Neon Rose & Davana", description: "парфюмерная вода, Aromapolis Olfactive Studio / Byredo La Tulipe", gender: "для неё, унисекс", volume: "50мл, 20мл" },
  { id: 43, name: "Nuage Freesia", description: "парфюмерная вода - Коллекция ароматов Ciel / Nomade Chloé", gender: "для неё", volume: "55мл" },
  { id: 44, name: "Tea Blossom & Candy", description: "парфюмерная вода (Цветущий чай и леденцы), Aromapolis Olfactive Studio / Lolita Lempicka Le Parfum", gender: "для неё", volume: "50мл" },
  { id: 45, name: "Wild Raspberry & Bitter Orange", description: "туалетная вода - Aromapolis Olfactive Studio / Woody Raspberry Dossier", gender: "для неё", volume: "50мл" },
  { id: 46, name: "Absolute Ego", description: "парфюмерная вода для мужчин, 20 мл - Коллекция ароматов Ciel / Lacoste L.12.12. Blanc", gender: "для него", volume: "20мл" },
  { id: 47, name: "Nuage", description: "парфюмерная вода - Коллекция ароматов Ciel / Laсoste for femme от Laсoste", gender: "для неё", volume: "55мл" },
  { id: 48, name: "Arc-en-Ciel Emerald", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / A Kiss From A Rose Kilian", gender: "для неё", volume: "20мл" },
  { id: 49, name: "Arc-en-ciel Bloom", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Eclat D'Arpege от Lanvin", gender: "для неё", volume: "20мл" },
  { id: 50, name: "FLUIDES Glowing Citrus & Vetiver", description: "парфюмерная вода, 20 мл - Коллекция ароматов Ciel / Aqua Celestia Maison Francis Kurkdjian", gender: "для неё, унисекс", volume: "20мл" },
  { id: 51, name: "Episode 30", description: "парфюмерная вода - Коллекция ароматов Ciel / PINK MOLÉCULE 090.09 by Zarkoperfume", gender: "для неё", volume: "55мл" },
  { id: 52, name: "1 Primum", description: "духи-концентрат - Aromapolis Olfactive Studio", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 53, name: "6 Sextum", description: "духи-концентрат - Aromapolis Olfactive Studio", gender: "унисекс", volume: "50мл, 20мл" },
  { id: 54, name: "9 Nonum", description: "духи-концентрат - Aromapolis Olfactive Studio", gender: "унисекс", volume: "50мл, 20мл" },
];

const REVIEWS = [3, 1, 6, 4, 8, 2, 7, 5]; // Shuffled 1-8

// --- Components ---

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
          <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover border border-stone-200 group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
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
        style={{ backgroundImage: 'url("/background.jpg")', filter: 'blur(2px)' }}
      />
      <div className="absolute inset-0 bg-stone-900/40" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        <h1 
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-black mb-8 tracking-tighter leading-[0.9]"
          style={{ 
            textShadow: '0 0 20px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,1), -2px -2px 4px rgba(0,0,0,1), 2px -2px 4px rgba(0,0,0,1), -2px 2px 4px rgba(0,0,0,1)' 
          }}
        >
          МИР ИЗЫСКАННЫХ <br /> АРОМАТОВ <br /> 
          <span 
            className="text-amber-200 text-3xl md:text-5xl lg:text-6xl font-serif italic font-light tracking-normal block mt-4"
            style={{ textShadow: '0 0 15px rgba(0,0,0,0.9), 0 0 5px rgba(0,0,0,1), 1.5px 1.5px 3px rgba(0,0,0,1), -1.5px -1.5px 3px rgba(0,0,0,1), 1.5px -1.5px 3px rgba(0,0,0,1), -1.5px 1.5px 3px rgba(0,0,0,1)' }}
          >
            ОТ АРОМА ГИД
          </span>
        </h1>
        <p 
          className="text-white text-lg md:text-2xl font-bold tracking-wide max-w-2xl mx-auto leading-relaxed"
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
    <section className="py-12 px-4 max-w-7xl mx-auto text-center">
      <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-12">Почему наши ароматы - ваш лучший выбор?</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl glass-card hover:translate-y-[-5px] transition-all duration-300"
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="font-bold text-lg mb-3 text-stone-900">{f.title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{f.text}</p>
          </motion.div>
        ))}
      </div>
      
      <p className="text-stone-500 italic font-medium">Отличный шанс обрести роскошный парфюм без переплат!</p>
      <div className="section-divider" />
    </section>
  );
};

const Catalog = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="catalog" className="py-12 bg-stone-50/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">Наш каталог</h2>
        <div className="w-20 h-1 bg-amber-200 mx-auto mb-12 rounded-full" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {PERFUMES.map((p) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group flex flex-col"
            >
              <div 
                className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 cursor-pointer relative bg-stone-200"
                onClick={() => setSelectedImg(`/${p.id}.jpg`)}
              >
                <img 
                  src={`/${p.id}.jpg`} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="px-1 flex-grow flex flex-col">
                <h4 className="font-bold text-stone-900 text-sm md:text-base leading-tight mb-1 line-clamp-2">{p.name}</h4>
                
                <div className="relative mb-2">
                  <motion.p 
                    initial={false}
                    animate={{ height: expandedId === p.id ? 'auto' : '1.5rem' }}
                    className={`text-stone-500 text-[10px] md:text-xs text-center overflow-hidden pr-4`}
                  >
                    {p.description}
                  </motion.p>
                  <button 
                    onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                    className="absolute right-0 top-0 text-stone-400 hover:text-amber-600 transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: expandedId === p.id ? 180 : 0 }}
                    >
                      <ChevronRight size={14} className="rotate-90" />
                    </motion.div>
                  </button>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{p.gender}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{p.volume}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-stone-500 text-sm max-w-2xl mx-auto">
          <p>
            Со всем каталогом с полным описанием ароматов можете ознакомится в нашем телеграмм боте, ссылка на бота-каталог в разделе "контакты".
          </p>
        </div>
        <div className="section-divider" />
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={selectedImg} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
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

  const nextFullscreen = (e: any) => {
    e.stopPropagation();
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex + 1) % REVIEWS.length);
    }
  };

  const prevFullscreen = (e: any) => {
    e.stopPropagation();
    if (fullscreenIndex !== null) {
      setFullscreenIndex((fullscreenIndex - 1 + REVIEWS.length) % REVIEWS.length);
    }
  };

  return (
    <section id="reviews" className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-12">Отзывы наших клиентов</h2>
        
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
                    src={`/${id}otz.jpg`} 
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
            className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setFullscreenIndex(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[120]">
              <X size={32} />
            </button>
            
            <button 
              onClick={prevFullscreen}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[120]"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button 
              onClick={nextFullscreen}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-4 text-white/50 hover:text-white transition-colors z-[120]"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={fullscreenIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-full max-h-full flex items-center justify-center"
            >
              <img 
                src={`/${REVIEWS[fullscreenIndex]}otz.jpg`} 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Delivery = () => {
  return (
    <section id="delivery" className="py-12 bg-stone-50/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-8">Заказ и доставка</h2>
        <div className="glass-card p-8 md:p-12 rounded-[40px] shadow-sm border-stone-200/50">
          <p className="text-stone-700 text-lg leading-relaxed mb-8">
            Уточнить наличие, стоимость ароматов и сделать заказ Вы можете по указанным ниже контактам.
          </p>
          <p className="text-stone-600 leading-relaxed text-sm md:text-base">
            Наша компания международная и охватывает почти все страны мира. Офисы компании присутствуют в большинстве городов России и во всех странах СНГ. Доставка от компании возможна почти по всей России (уточняйте у администраторов). По Москве, Санкт-Петербургу и другим крупным городам России возможна курьерская доставка день в день.
          </p>
        </div>
        <div className="section-divider" />
      </div>
    </section>
  );
};

const Contacts = () => {
  return (
    <section id="contacts" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 text-center mb-12">Контакты</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left p-4 glass-card rounded-2xl">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl"><Phone size={24} /></div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">WhatsApp / Телефон</p>
                <a href="tel:+79936999339" className="text-lg font-bold text-stone-800 hover:text-emerald-600 transition-colors">+7 (993) 699-93-39</a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left p-4 glass-card rounded-2xl">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><Send size={24} /></div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Telegram Личный</p>
                <a href="https://t.me/Naum_SW" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-stone-800 hover:text-blue-600 transition-colors">@Naum_SW</a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left p-4 glass-card rounded-2xl">
              <div className="p-3 bg-stone-100 text-stone-600 rounded-xl"><MessageCircle size={24} /></div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Контакт в Max</p>
                <a href="tel:+79227485998" className="text-lg font-bold text-stone-800 hover:text-stone-600 transition-colors">+7 (922) 748-59-98</a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 glass-card rounded-3xl border-amber-100">
              <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <Send className="text-blue-500" size={20} />
                Наши ресурсы в Telegram
              </h4>
              <ul className="space-y-4 text-sm text-stone-600 text-center lg:text-left">
                <li>
                  <p className="font-medium mb-1">Бот-каталог с полным описанием ароматов:</p>
                  <a href="https://aromo.pro/NNN14_88" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">aromo.pro/NNN14_88</a>
                </li>
                <li>
                  <p className="font-medium mb-1">Наш чат: отвечаем на ваши вопросы и рассказываем об интересном:</p>
                  <a href="https://aromo.pro/chat/NNN14_88" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">aromo.pro/chat/NNN14_88</a>
                </li>
              </ul>
            </div>

            <div className="p-6 glass-card rounded-3xl text-center lg:text-left">
              <p className="text-xs text-stone-400 uppercase tracking-widest mb-2 font-bold">Сотрудничество</p>
              <p className="text-sm text-stone-600 mb-4">По вопросам сотрудничества обращайтесь в Telegram:</p>
              <a href="https://t.me/Naum_SW" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors font-medium">
                <Send size={16} />
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
          <img src="/logo.jpg" alt="Logo" className="h-12 w-12 rounded-full opacity-50 grayscale object-cover" referrerPolicy="no-referrer" />
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.2em]">
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
