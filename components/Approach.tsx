
import React from 'react';
import { SiteData } from '../types';
import { Target, Heart, Shield, Lightbulb } from 'lucide-react';

interface ApproachProps {
  data: SiteData;
}

const Approach: React.FC<ApproachProps> = ({ data }) => {
  const cards = [
    { icon: <Target className="text-rose-500" />, title: 'Foco no Presente', desc: 'Trabalhamos as demandas atuais que impactam seu dia a dia.' },
    { icon: <Heart className="text-rose-500" />, title: 'Acolhimento', desc: 'Espaço livre de julgamentos para sua total expressão.' },
    { icon: <Shield className="text-rose-500" />, title: 'Ética Profissional', desc: 'Sigilo absoluto e base científica em cada intervenção.' },
    { icon: <Lightbulb className="text-rose-500" />, title: 'Autonomia', desc: 'Ferramentas para você se tornar seu próprio terapeuta.' },
  ];

  return (
    <section id="approach" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">{data.approachTitle}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.approachDescription}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{card.title}</h3>
              <p className="text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
