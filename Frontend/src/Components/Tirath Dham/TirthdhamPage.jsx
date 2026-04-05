import React, { useState } from 'react';
import { MapPin, ArrowRight, Sparkles, Sun, Mountain, Wind } from 'lucide-react';

// --- Custom Components ---

// High-quality Custom Om SVG to avoid import errors
const OmIcon = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 11c1.5-1 3-1 3.5 1s-1.5 3.5-3.5 4.5" />
    <path d="M12 11c-1.5-1-3-1-3.5 1s1.5 3.5 3.5 4.5" />
    <path d="M12 16.5c0 2.5-1.5 4.5-4 4.5s-4-2-4-4.5 2-4.5 4-4.5" />
    <path d="M15 13.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5" />
    <path d="M12 6.5c2-2 4.5-2 6 0" />
    <circle cx="12" cy="3" r="1" fill="currentColor" />
  </svg>
);

// --- Data ---

const featuredDhams = [
  {
    id: 1,
    title: "Kedarnath Dham",
    subtitle: "Himalaya ki God mein Mahadev",
    location: "Rudraprayag, Uttarakhand",
    mainImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop",
    shlok: "Yogiram Gunjitama... Mahadeva Shambho",
    tags: ["Jyotirlinga", "Himalaya", "Shiv"],
    color: "from-orange-500 to-red-700"
  },
  {
    id: 2,
    title: "Varanasi Ghats",
    subtitle: "Moksha ki Pavitra Nagri",
    location: "Uttar Pradesh",
    mainImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop",
    shlok: "Kashyam Hi Kashate Kashi... ",
    tags: ["Ancient", "Ganga", "Spiritual"],
    color: "from-yellow-500 to-orange-700"
  }
];

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1590761619623-01389335c026?q=80&w=600", title: "Ganga Aarti" },
  { url: "https://images.unsplash.com/photo-1582613914801-447a164c925d?q=80&w=600", title: "Himalayan Peak" },
  { url: "https://images.unsplash.com/photo-1620766324021-e3770f3f2113?q=80&w=600", title: "Temple Carvings" },
  { url: "https://images.unsplash.com/photo-1601639019253-e5d038317316?q=80&w=600", title: "Pilgrim Journey" }
];

// --- Main Page Component ---

export default function TirthDhamPage() {
  const [hoveredDham, setHoveredDham] = useState(null);

  return (
    <div className="min-h-screen bg-[#FCF9F5] text-gray-900 selection:bg-orange-200">
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1545167622-3a6ac756aff4?q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCF9F5] via-transparent to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
          <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20">
            <OmIcon className="w-12 h-12 text-orange-400 animate-pulse" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
            दिव्य <span className="text-orange-500">तीर्थ</span> धाम
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto font-light italic">
            "Atmanubhuti ki yatra, jahan har kadam par bhagwan ka vaas hai."
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl">
              Yatra Shuru Karein
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
              Video Dekhein
            </button>
          </div>
        </div>
      </section>

      {/* Featured Dhams Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">Explore Sacred Sites</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900">Pramukh Tirth Sthan</h3>
          </div>
          <p className="text-gray-500 max-w-md text-right">Bharat ke prachin mandir aur unki pavitra urja ko mehsoos karein.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {featuredDhams.map((dham) => (
            <div 
              key={dham.id}
              className="group relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer"
              onMouseEnter={() => setHoveredDham(dham.id)}
              onMouseLeave={() => setHoveredDham(null)}
            >
              {/* Background Image */}
              <img 
                src={dham.mainImage} 
                alt={dham.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="flex gap-2 mb-4">
                  {dham.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-orange-400 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm font-medium">{dham.location}</span>
                </div>

                <h4 className="text-4xl font-bold text-white mb-2">{dham.title}</h4>
                <p className="text-lg text-gray-300 mb-6 font-light">{dham.subtitle}</p>

                {/* Animated Shlok Reveal */}
                <div className={`overflow-hidden transition-all duration-500 ${hoveredDham === dham.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-orange-200 italic border-l-2 border-orange-500 pl-4 mb-6">
                    {dham.shlok}
                  </p>
                </div>

                <button className={`w-full py-4 rounded-xl font-bold text-white transition-all bg-gradient-to-r ${dham.color} hover:brightness-110 flex items-center justify-center gap-2`}>
                  Darshan Karein <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="bg-orange-600 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <Sun className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-4xl font-bold mb-1">51+</div>
            <div className="text-orange-100 uppercase tracking-widest text-sm">Shakti Peeth</div>
          </div>
          <div className="flex flex-col items-center">
            <Mountain className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-4xl font-bold mb-1">12</div>
            <div className="text-orange-100 uppercase tracking-widest text-sm">Jyotirlinga</div>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-4xl font-bold mb-1">4</div>
            <div className="text-orange-100 uppercase tracking-widest text-sm">Dham Yatra</div>
          </div>
        </div>
      </section>

      {/* Modern Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h3 className="text-3xl font-bold mb-12 text-center">Yatra ki Jhalak</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
              <img src={img.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={img.title} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm font-medium">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <div className="text-2xl font-bold text-orange-500 mb-2">Sanatan Tirth</div>
            <p className="text-gray-400 text-sm">Adhyatmik yatra ka apka sacha sathi.</p>
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-orange-500">Dham List</a>
            <a href="#" className="hover:text-orange-500">Contact</a>
            <a href="#" className="hover:text-orange-500">About Us</a>
          </div>
          <p className="text-gray-500 text-xs">© 2026 Tirth Dham Portal. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}