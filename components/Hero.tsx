
import React from 'react';
import { SiteData } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  data: SiteData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-[#FDFCFB] to-[#F3F5F7]">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-[400px] h-[400px] bg-rose-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 left-[-5%] w-[300px] h-[300px] bg-sky-100 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-rose-500 uppercase bg-rose-50 rounded-full">
            Psicoterapia Acolhedora
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
            Equilíbrio e <br />
            <span className="text-rose-500">Bem-estar</span> Mental
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Olá, eu sou a {data.name}. {data.specialty}. <br />
            Ajudo pessoas a transformarem sua relação consigo mesmas e com o mundo através de um processo terapêutico ético e humano.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#contact" 
              className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Falar pelo WhatsApp <ArrowRight size={18} />
            </a>
            <a 
              href="#about" 
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all"
            >
              Conhecer Minha História
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center animate-in fade-in zoom-in duration-1000">
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose-200/40 rounded-3xl blur-2xl group-hover:bg-rose-300/50 transition-colors duration-500" />
            <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
              <img 
                src={data.heroImage} 
                alt={data.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
