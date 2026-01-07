
import React from 'react';
import { SiteData } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  data: SiteData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  // Garantia absoluta de limpeza do número do WhatsApp
  const cleanWhatsapp = data.contact.whatsapp.replace(/\D/g, '');
  // Link universal do WhatsApp com o número codificado
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(cleanWhatsapp)}`;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#FDFCFB]">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 right-[-10%] w-[400px] h-[400px] bg-rose-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-[-5%] w-[300px] h-[300px] bg-rose-50/50 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
        <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left-8 duration-700">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-rose-500 uppercase bg-rose-50 rounded-full">
            {data.heroBadge || "Psicoterapia Acolhedora"}
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 leading-[1.2] md:leading-[1.1] mb-6">
            {data.heroTitle?.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                <span className={i === 0 ? "text-slate-900" : "text-rose-500"}>
                  {line}
                </span>
                {i === 0 && <br className="hidden md:block" />}
              </React.Fragment>
            )) || (
              <>
                Equilíbrio e<br className="hidden md:block" />
                <span className="text-rose-500">Bem-estar Mental</span>
              </>
            )}
          </h1>
          <p className="text-base md:text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Olá, eu sou a {data.name}. {data.specialty}. <br />
            Ajudo pessoas a transformarem sua relação consigo mesmas e com o mundo através de um processo terapêutico humano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-rose-500 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-rose-600 transition-all shadow-xl shadow-rose-100"
            >
              Falar pelo WhatsApp <ArrowRight size={18} />
            </a>
            <a 
              href="#about" 
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold flex items-center justify-center hover:bg-slate-50 transition-all"
            >
              Minha História
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center animate-in fade-in zoom-in duration-1000">
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-sm">
            <div className="absolute -inset-4 bg-rose-100/20 rounded-3xl blur-2xl" />
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl shadow-xl bg-white flex items-center justify-center border border-slate-100">
              {data.heroImage ? (
                <img 
                  src={data.heroImage} 
                  alt={data.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[#FDFCFB]">
                  {/* Espaço em branco limpo quando não há foto */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
