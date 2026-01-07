
import React from 'react';
import { SiteData } from '../types';
import { Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle } from 'lucide-react';

interface ContactProps {
  data: SiteData;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  // Garante que o número tenha apenas dígitos para o link
  const whatsappDigits = data.contact.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

  return (
    <section id="contact" className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Vamos dar o próximo passo juntos?</h2>
            <p className="text-slate-400 text-xl mb-12 max-w-lg">
              Estou à disposição para tirar suas dúvidas sobre o processo terapêutico e agendar sua primeira sessão.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="text-rose-400" size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Email</p>
                  <a href={`mailto:${data.contact.email}`} className="text-lg md:text-xl hover:text-rose-400 transition-colors break-all">{data.contact.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="text-rose-400" size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Telefone / WhatsApp</p>
                  <a href={`tel:${whatsappDigits}`} className="text-lg md:text-xl hover:text-rose-400 transition-colors">{data.contact.phone}</a>
                </div>
              </div>

              {data.contact.address && (
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-rose-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Localização</p>
                    <p className="text-lg md:text-xl text-slate-200">{data.contact.address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-10 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-8">Redes Sociais</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <a 
                href={`https://instagram.com/${data.contact.instagram}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-rose-500 transition-all group"
              >
                <Instagram size={24} />
                <span className="font-medium">Instagram</span>
              </a>
              <a 
                href={`https://linkedin.com/in/${data.contact.linkedin}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-blue-600 transition-all group"
              >
                <Linkedin size={24} />
                <span className="font-medium">LinkedIn</span>
              </a>
            </div>

            <h3 className="text-2xl font-bold mb-8">Deseja agendar agora?</h3>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-5 bg-rose-500 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20"
            >
              <MessageCircle size={24} />
              Enviar Mensagem WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
