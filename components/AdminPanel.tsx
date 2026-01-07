
import React, { useState, useRef } from 'react';
import { SiteData } from '../types';
import { X, Save, Eye, EyeOff, Briefcase, User, Phone, Check, List, Upload, MessageSquareQuote, Info } from 'lucide-react';

interface AdminPanelProps {
  data: SiteData;
  onSave: (newData: SiteData) => void;
  onClose: () => void;
}

type TabType = 'profile' | 'approach' | 'services' | 'contact';

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
    // Senha atualizada conforme solicitado: PSI2025
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
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Área Restrita</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <p className="text-slate-500 mb-8">
            Para editar as informações do seu site, insira a senha de acesso configurada.
          </p>

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
              <button 
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            
            <button 
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
            >
              Acessar Configurações
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex overflow-hidden">
      {/* Sidebar navigation */}
      <div className="w-80 bg-white border-r border-slate-200 p-8 flex flex-col hidden lg:flex">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800">Editor de Site</h2>
          <p className="text-sm text-slate-400">Personalize sua apresentação</p>
        </div>
        
        <nav className="space-y-2 flex-grow">
          <button 
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'profile' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <User size={18} /> Perfil & Foto
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('approach')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'approach' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Briefcase size={18} /> Abordagem
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'services' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <List size={18} /> Serviços
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${activeTab === 'contact' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Phone size={18} /> Contato & Redes
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
           <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            Sair sem Salvar
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow flex flex-col h-full bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-500">
                <User size={20} />
            </div>
            <h1 className="font-bold text-slate-800">Editando: {activeTab === 'profile' ? 'Perfil' : activeTab === 'approach' ? 'Abordagem' : activeTab === 'services' ? 'Serviços' : 'Contato'}</h1>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={savedSuccess}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-md ${savedSuccess ? 'bg-green-500 text-white' : 'bg-rose-500 text-white hover:bg-rose-600'}`}
          >
            {savedSuccess ? (
                <><Check size={18} /> Salvo!</>
            ) : (
                <><Save size={18} /> Salvar Alterações</>
            )}
          </button>
        </header>

        {/* Mobile Tab Selector */}
        <div className="lg:hidden flex overflow-x-auto bg-white border-b border-slate-200 p-2 gap-2 shrink-0">
            {(['profile', 'approach', 'services', 'contact'] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-rose-500 text-white' : 'text-slate-500 bg-slate-100'}`}
                >
                    {tab === 'profile' ? 'Perfil' : tab === 'approach' ? 'Abordagem' : tab === 'services' ? 'Serviços' : 'Contato'}
                </button>
            ))}
        </div>

        <main className="flex-grow overflow-y-auto p-6 lg:p-12">
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Seção: Perfil e Foto */}
            {activeTab === 'profile' && (
                <div className="space-y-8">
                    <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Identidade Profissional</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-2">Nome Completo</label>
                                <input 
                                    type="text" 
                                    value={editData.name}
                                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-2">Especialidade / CRP</label>
                                <input 
                                    type="text" 
                                    value={editData.specialty}
                                    onChange={(e) => setEditData({...editData, specialty: e.target.value})}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Foto de Perfil</h3>
                        <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300">
                            <div className="w-32 h-40 rounded-xl overflow-hidden shrink-0 bg-white shadow-md border border-slate-200">
                                <img src={editData.heroImage} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                            <div className="flex-grow w-full space-y-4">
                                <div>
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    <button 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors shadow-sm"
                                    >
                                        <Upload size={16} /> Subir Foto do Computador
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400">Tamanho recomendado: 800x1000px (Vertical).</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-2">
                           <MessageSquareQuote size={20} className="text-rose-400" /> Frase de Destaque (Citação)
                        </h3>
                        <textarea 
                            rows={3}
                            value={editData.quote}
                            onChange={(e) => setEditData({...editData, quote: e.target.value})}
                            placeholder="Frase que aparece em destaque na seção Sobre Mim"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none italic"
                        />
                    </section>

                    <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Biografia Completa</h3>
                        <textarea 
                            rows={8}
                            value={editData.bio}
                            onChange={(e) => setEditData({...editData, bio: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                    </section>
                </div>
            )}

            {/* Seção: Abordagem */}
            {activeTab === 'approach' && (
                <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Abordagem Terapêutica</h3>
                    <div className="space-y-6">
                        <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">Título da Abordagem</label>
                        <input 
                            type="text" 
                            value={editData.approachTitle}
                            onChange={(e) => setEditData({...editData, approachTitle: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">Descrição Detalhada</label>
                        <textarea 
                            rows={8}
                            value={editData.approachDescription}
                            onChange={(e) => setEditData({...editData, approachDescription: e.target.value})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                        </div>
                    </div>
                </section>
            )}

            {/* Seção: Serviços */}
            {activeTab === 'services' && (
                <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Lista de Serviços/Tags</h3>
                    <p className="text-sm text-slate-500 mb-4">Estas informações aparecem como pequenas etiquetas logo abaixo da sua frase de destaque.</p>
                    <div className="space-y-4">
                        {editData.services.map((service, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span className="flex items-center justify-center w-10 h-10 bg-slate-100 rounded-lg text-slate-400 font-bold">{idx + 1}</span>
                                <input 
                                    type="text" 
                                    value={service}
                                    onChange={(e) => updateService(idx, e.target.value)}
                                    className="flex-grow px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Seção: Contato & Redes */}
            {activeTab === 'contact' && (
                <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Canais de Contato & Redes Sociais</h3>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 mb-6">
                        <Info className="text-blue-500 shrink-0" size={20} />
                        <p className="text-sm text-blue-700 leading-relaxed">
                            <strong>Atenção ao WhatsApp:</strong> Para que o link de conversa funcione, insira o número <strong>completo com DDI e DDD</strong> (apenas números). <br/>
                            <em>Exemplo para Brasil (DDI 55) e Rio Grande do Sul (DDD 51): <strong>5551999999999</strong></em>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                            <h4 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">WhatsApp do Link de Botão</h4>
                            <div>
                                <label className="block text-sm font-bold text-slate-500 mb-1">WhatsApp (DDI + DDD + Número)</label>
                                <input 
                                    type="text" 
                                    value={editData.contact.whatsapp}
                                    onChange={(e) => setEditData({...editData, contact: {...editData.contact, whatsapp: e.target.value.replace(/\D/g,'')}})}
                                    placeholder="Ex: 5551999999999"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-500 mb-2">Telefone Visível (Ex: (51) 99999-9999)</label>
                            <input 
                                type="text" 
                                value={editData.contact.phone}
                                onChange={(e) => setEditData({...editData, contact: {...editData.contact, phone: e.target.value}})}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            />
                        </div>

                        <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">Email Profissional</label>
                        <input 
                            type="email" 
                            value={editData.contact.email}
                            onChange={(e) => setEditData({...editData, contact: {...editData.contact, email: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                        </div>
                        
                        <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">Instagram (ex: seu_usuario)</label>
                        <input 
                            type="text" 
                            value={editData.contact.instagram}
                            onChange={(e) => setEditData({...editData, contact: {...editData.contact, instagram: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                        </div>
                        <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">LinkedIn (ex: seu_perfil)</label>
                        <input 
                            type="text" 
                            value={editData.contact.linkedin}
                            onChange={(e) => setEditData({...editData, contact: {...editData.contact, linkedin: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
                        </div>
                        <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-500 mb-2">Endereço Físico (se houver)</label>
                        <input 
                            type="text" 
                            value={editData.contact.address}
                            onChange={(e) => setEditData({...editData, contact: {...editData.contact, address: e.target.value}})}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                        />
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
