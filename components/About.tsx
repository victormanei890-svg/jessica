
import React from 'react';
import { SiteData } from '../types';
import { Quote } from 'lucide-react';

interface AboutProps {
  data: SiteData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <section id="about" className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="bg-rose-50 rounded-2xl p-8 pt-16 relative">
              <Quote className="absolute top-6 left-6 text-rose-200" size={48} fill="currentColor" />
              <p className="text-xl font-serif italic text-slate-700 leading-relaxed relative z-10">
                "{data.quote}"
              </p>
            </div>
            <div className="mt-8 flex gap-3 flex-wrap">
              {data.services.map((service, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-md text-xs font-medium text-slate-500">
                  {service}
                </span>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-7">
            <h2 className="text-4xl font-bold text-slate-900 mb-8">Sobre Mim</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
              {data.bio.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            
            <div className="mt-10 pt-10 border-t border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Especialidade</h3>
              <p className="text-2xl font-serif text-slate-800">{data.specialty}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
