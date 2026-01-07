
import React, { useState, useRef } from 'react';
import { SiteData } from '../types';
import { X, Save, Eye, EyeOff, Briefcase, User, Phone, Check, List, Upload, MessageSquareQuote, Info, Layout, MapPin } from 'lucide-react';

interface AdminPanelProps {
  data: SiteData;
  onSave: (newData: SiteData) => void;
  onClose: () => void;
}

type TabType = 'profile' | 'hero' | 'approach' | 'services' | 'contact';

const AdminPanel: React.FC<AdminPanelProps> = ({ data, onSave, onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [editData, setEditData] = useState<SiteData>(data);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'PSI2025') {
      setIsAuth(true);
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  const handleSave = () => {
    onSave(editData);
    setSavedSuccess(true);
    setTimeout(() => {
        setSavedSuccess(false);
        onClose();
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, heroImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateService = (index: number, value: string) => {
    const newServices = [...editData.services];
    newServices[index] = value;
    setEditData({ ...editData, services: newServices });
  };

  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-6">
        <div className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              PSICÓLOGA <span className="text-rose-500">JÉSSICA</span>
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="relative">
              <input 
                type={showPass ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha de Acesso"
                className={`w-full px-5 py-4 bg-slate-50 border ${error ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all`}
                autoFocus
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button type="submit" className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200">
              Acessar Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex overflow-hidden flex-col lg:flex-row text-slate-800">
      {/* Sidebar navigation */}
      <div className="lg:w-80 bg-white border-r border-slate-200 p-8 hidden lg:flex flex-col">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 uppercase">PSICÓLOGA <span className="text-rose-500">JÉSSICA</span></h2>
          <p className="text-xs text-slate-400 font-medium">CONFIGURAÇÕES DO SITE</p>
        </div>
        <nav className="space-y-2 flex-grow">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'profile' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}><User size={18} /> Perfil & Bio</button>
          <button onClick={() => setActiveTab('hero')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'hero' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}><Layout size={18} /> Início (Hero)</button>
          <button onClick={() => setActiveTab('approach')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'approach' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}><Briefcase size={18} /> Abordagem</button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'services' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}><List size={18} /> Serviços</button>
          <button onClick={() => setActiveTab('contact')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'contact' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}><Phone size={18} /> Contato & Redes</button>
        </nav>
        <div className="mt-auto pt-6 border-t border-slate-100">
           <button onClick={onClose} className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Sair</button>
        </div>
      </div>

      <div className="flex-grow flex flex-col h-full bg-slate-50 overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 md:px-8 py-4 flex justify-between items-center shrink-0">
          <h1 className="font-bold text-slate-800">Painel de Edição</h1>
          <div className="flex gap-2">
            <button onClick={onClose} className="lg:hidden p-2 text-slate-400"><X size={20} /></button>
            <button onClick={handleSave} disabled={savedSuccess} className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-full font-bold transition-all shadow-md ${savedSuccess ? 'bg-green-500 text-white' : 'bg-rose-500 text-white hover:bg-rose-600'}`}>
                {savedSuccess ? <><Check size={18} /> Salvo!</> : <><Save size={18} /> Salvar Alterações</>}
            </button>
          </div>
        </header>

        {/* Mobile Nav Tabs */}
        <div className="lg:hidden flex overflow-x-auto bg-white border-b border-slate-200 p-2 gap-2 shrink-0">
          {(['profile', 'hero', 'approach', 'services', 'contact'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-rose-500 text-white' : 'text-slate-500 bg-slate-100'}`}>
              {tab === 'profile' ? 'Perfil' : tab === 'hero' ? 'Início' : tab === 'approach' ? 'Abordagem' : tab === 'services' ? 'Serviços' : 'Contato'}
            </button>
          ))}
        </div>

        <main className="flex-grow overflow-y-auto p-4 md:p-12">
          <div className="max-w-3xl mx-auto space-y-8 pb-12">
            
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Identidade Profissional</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2">Seu Nome</label>
                      <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2">Especialidade / CRP</label>
                      <input type="text" value={editData.specialty} onChange={(e) => setEditData({...editData, specialty: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none" />
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Foto Profissional</h3>
                  <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
                    <div className="w-32 h-40 rounded-xl overflow-hidden shrink-0 bg-white shadow-md border border-slate-200 flex items-center justify-center">
                      {editData.heroImage ? <img src={editData.heroImage} className="w-full h-full object-cover" alt="Preview" /> : <div className="text-slate-300 text-xs">Sem foto</div>}
                    </div>
                    <div className="flex-grow w-full space-y-4">
                      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
                      <div className="flex gap-2">
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 shadow-sm"><Upload size={16} /> Subir Foto</button>
                        {editData.heroImage && <button onClick={() => setEditData({...editData, heroImage: ""})} className="px-4 py-2 text-sm font-bold text-red-500 hover:underline">Remover Foto</button>}
                      </div>
                      <p className="text-xs text-slate-400">Dica: Use fotos verticais para um melhor ajuste.</p>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-2"><MessageSquareQuote size={20} className="text-rose-400" /> Frase de Destaque</h3>
                  <textarea rows={2} value={editData.quote} onChange={(e) => setEditData({...editData, quote: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 italic" />
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Biografia Completa</h3>
                  <textarea rows={8} value={editData.bio} onChange={(e) => setEditData({...editData, bio: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500" />
                </section>
              </div>
            )}

            {activeTab === 'hero' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Textos da Seção Inicial (Início)</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Selo Superior (Ex: Psicoterapia Acolhedora)</label>
                    <input type="text" value={editData.heroBadge} onChange={(e) => setEditData({...editData, heroBadge: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Título Principal (Dica: Use ENTER para mudar a cor da segunda linha)</label>
                    <textarea rows={3} value={editData.heroTitle} onChange={(e) => setEditData({...editData, heroTitle: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-lg" />
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'approach' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Minha Abordagem</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Título da Seção</label>
                    <input type="text" value={editData.approachTitle} onChange={(e) => setEditData({...editData, approachTitle: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Descrição da Abordagem</label>
                    <textarea rows={6} value={editData.approachDescription} onChange={(e) => setEditData({...editData, approachDescription: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'services' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Serviços e Tags</h3>
                <p className="text-sm text-slate-400 mb-4">Estes textos aparecem como pequenas etiquetas na seção "Sobre Mim".</p>
                <div className="space-y-4">
                  {editData.services.map((service, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg text-slate-400 font-bold">{idx + 1}</span>
                      <input type="text" value={service} onChange={(e) => updateService(idx, e.target.value)} className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'contact' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Contato & Redes Sociais</h3>
                
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex gap-3 mb-6">
                  <Info className="text-rose-500 shrink-0" size={20} />
                  <div className="text-xs md:text-sm text-rose-700 leading-relaxed">
                    <strong>Link do WhatsApp:</strong> Insira o número completo: <strong>55</strong> + <strong>DDD</strong> + <strong>Número</strong>.
                    <br/>Ex: 5551991551261 (O sistema cuidará de manter todos os 13 dígitos).
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-500 mb-1">Número WhatsApp para Link (Apenas números)</label>
                    <input 
                      type="text" 
                      value={editData.contact.whatsapp} 
                      onChange={(e) => setEditData({...editData, contact: {...editData.contact, whatsapp: e.target.value.replace(/\D/g,'')}})} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-rose-600 font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Telefone Exibido (Texto)</label>
                    <input type="text" value={editData.contact.phone} onChange={(e) => setEditData({...editData, contact: {...editData.contact, phone: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="(51) 99155-1261" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Email</label>
                    <input type="email" value={editData.contact.email} onChange={(e) => setEditData({...editData, contact: {...editData.contact, email: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">Instagram (usuário)</label>
                    <input type="text" value={editData.contact.instagram} onChange={(e) => setEditData({...editData, contact: {...editData.contact, instagram: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="ex: jessica.psicologa" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">LinkedIn (perfil)</label>
                    <input type="text" value={editData.contact.linkedin} onChange={(e) => setEditData({...editData, contact: {...editData.contact, linkedin: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-500 mb-2 flex items-center gap-2"><MapPin size={16}/> Endereço Comercial (Opcional)</label>
                    <input type="text" value={editData.contact.address} onChange={(e) => setEditData({...editData, contact: {...editData.contact, address: e.target.value}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                </div>
              </section>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
