import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { SiteData, INITIAL_DATA } from './types';
import Hero from './components/Hero';
import About from './components/About';
import Approach from './components/Approach';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import AdminPanel from './components/AdminPanel';

const firebaseConfig = {
  apiKey: "AIzaSyBF3VGyHpXyPLp5wavxxl_6M-F4O3R9DZ4",
  authDomain: "jessica-psicologa.firebaseapp.com",
  projectId: "jessica-psicologa",
  storageBucket: "jessica-psicologa.firebasestorage.app",
  messagingSenderId: "1062828767112",
  appId: "1:1062828767112:web:645e996d7a585360d42c3d"
};

const App: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteData>(INITIAL_DATA);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar dados - agora separada e com segurança total
  const startConnection = async () => {
    try {
      // 1. Tenta carregar o que está salvo no computador primeiro (Instantâneo)
      const local = localStorage.getItem('psychologist_site_data');
      if (local) setSiteData(JSON.parse(local));
      
      // Libera a tela para o usuário não ver branco
      setIsLoading(false);

      // 2. Só agora tenta conectar ao Google (Firebase)
      if (getApps().length === 0) initializeApp(firebaseConfig);
      const db = getFirestore();
      
      const docRef = doc(db, "configuracoes", "perfil");
      const snap = await getDoc(docRef);
      
      if (snap.exists()) {
        const remoteData = snap.data() as SiteData;
        setSiteData(remoteData);
        localStorage.setItem('psychologist_site_data', JSON.stringify(remoteData));
      }
    } catch (e) {
      console.warn("Firebase bloqueado pelo editor. O site continuará funcionando localmente.");
    }
  };

  useEffect(() => {
    startConnection();
  }, []);

  const handleUpdateData = async (newData: SiteData) => {
    setSiteData(newData);
    localStorage.setItem('psychologist_site_data', JSON.stringify(newData));
    
    try {
      const db = getFirestore();
      await setDoc(doc(db, "configuracoes", "perfil"), newData);
      alert("✅ Sincronizado com a nuvem!");
    } catch (e) {
      alert("💾 Salvo no navegador! (O editor impediu a conexão com o servidor)");
    }
  };

  if (isLoading) return <div style={{padding: '50px', textAlign: 'center'}}>Iniciando...</div>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero data={siteData} />
        <About data={siteData} />
        <Approach data={siteData} />
        <Contact data={siteData} />
      </main>
      <footer className="p-8 text-center border-t bg-slate-50">
        <button onClick={() => setIsAdminOpen(true)} className="text-slate-400 text-xs hover:underline">
          © {new Date().getFullYear()} {siteData.name} • Administração
        </button>
      </footer>
      {isAdminOpen && (
        <AdminPanel data={siteData} onSave={handleUpdateData} onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
};

export default App;