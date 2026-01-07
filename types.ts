
export interface SiteData {
  name: string;
  specialty: string;
  heroBadge: string;
  heroTitle: string;
  heroImage: string;
  bio: string;
  quote: string;
  approachTitle: string;
  approachDescription: string;
  services: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
  };
}

export const INITIAL_DATA: SiteData = {
  name: "Psicóloga Jéssica Moura",
  specialty: "Sua Especialidade • CRP 00/000000",
  heroBadge: "Psicoterapia Acolhedora",
  heroTitle: "Equilíbrio e Bem-estar Mental",
  heroImage: "", // Iniciando vazio como solicitado
  bio: "Espaço reservado para sua apresentação pessoal e profissional. Aqui você pode contar um pouco sobre sua trajetória, formação e o que te motiva a trabalhar com a psicologia. Este texto é totalmente editável através do painel de configurações.",
  quote: "A psicoterapia é um encontro onde a cura acontece através da autenticidade e do acolhimento mútuo.",
  approachTitle: "Sugestão de Abordagem Terapêutica",
  approachDescription: "Sugestão de informação: Descreva aqui sua linha de atuação (Ex: TCC, Psicanálise, Fenomenologia, etc). Explique como as sessões funcionam e qual o foco principal do seu trabalho com os pacientes.",
  services: [
    "Sugestão de Serviço 1",
    "Sugestão de Serviço 2",
    "Sugestão de Serviço 3",
    "Sugestão de Serviço 4"
  ],
  contact: {
    email: "seuemail@exemplo.com",
    phone: "(51) 99999-9999",
    address: "Rua Exemplo, 123 - Bairro, Cidade - Estado",
    instagram: "seu_usuario",
    linkedin: "seu_perfil",
    whatsapp: "5551999999999"
  }
};
