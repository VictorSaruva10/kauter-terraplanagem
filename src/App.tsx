import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  HardHat, 
  Shovel, 
  Tractor, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Hammer, 
  Layers, 
  Sparkles,
  Mountain,
  MapPin,
  Clock,
  Camera,
  Maximize2
} from 'lucide-react';

// Images (Optimized high-speed WebP)
import heroBg from './assets/images/hero_opt.webp'; // Mantida do header conforme solicitado
import excavatorSite from './assets/images/excavator_opt.webp'; // Mantida da escavação conforme solicitado
import terraplanagemGeralImg from './assets/images/terraplanagem_geral_opt.webp'; // Foto enviada pelo cliente

// Fotos Reais da Frota e Maquinário Kauter
import galeria01 from './assets/images/galeria_01.webp';
import galeria02 from './assets/images/galeria_02.webp';
import galeria03 from './assets/images/galeria_03.webp';
import galeria04 from './assets/images/galeria_04.webp';
import galeria05 from './assets/images/galeria_05.webp';
import galeria06 from './assets/images/galeria_06.webp';
import galeria07 from './assets/images/galeria_07.webp';
import galeria08 from './assets/images/galeria_08.webp';
import galeria09 from './assets/images/galeria_09.webp';
import galeria10 from './assets/images/galeria_10.webp';

const WHATSAPP_NUMBER = "554196324837";
const WHATSAPP_DISPLAY = "+55 (41) 9632-4837";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Conheci a KAUTER pelo site e gostaria de solicitar um orçamento de terraplanagem.")}`;
const WHATSAPP_MATERIAIS_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Conheci a KAUTER pelo site e gostaria de solicitar uma cotação para compra de materiais (Saibro, Pedrisco ou Terra).")}`;

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  subtitle: string;
  category: 'frota' | 'obras' | 'materiais' | 'transporte';
  categoryLabel: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: galeria01,
    title: "Caminhão Ford Cargo 2623 & Escavadeira John Deere",
    subtitle: "Frota própria alinhada e pronta para obras em Curitiba e Região",
    category: "frota",
    categoryLabel: "Caminhões & Frota"
  },
  {
    id: 2,
    src: galeria02,
    title: "Carregamento de Pedras & Demolição",
    subtitle: "Escavadeira John Deere carregando caminhão basculante com rochas",
    category: "obras",
    categoryLabel: "Obras & Escavação"
  },
  {
    id: 3,
    src: galeria03,
    title: "Escavadeira John Deere em Corte de Solo",
    subtitle: "Movimentação técnica e conformação de talude de saibro e terra",
    category: "obras",
    categoryLabel: "Obras & Escavação"
  },
  {
    id: 4,
    src: galeria04,
    title: "Caminhão Prancha VW Transportando Escavadeira 130",
    subtitle: "Mobilização rápida e transporte próprio para qualquer canteiro",
    category: "transporte",
    categoryLabel: "Transporte de Máquinas"
  },
  {
    id: 5,
    src: galeria05,
    title: "Pá Carregadeira Volvo & Caminhão Ford Cargo",
    subtitle: "Carregamento de agregados selecionados para entrega direta na obra",
    category: "materiais",
    categoryLabel: "Venda de Materiais"
  },
  {
    id: 6,
    src: galeria06,
    title: "Ford Cargo 2623 6x4 em Operação de Aterro",
    subtitle: "Caminhão traçado pesado com escavadeira hidráulica em rampa",
    category: "frota",
    categoryLabel: "Caminhões & Frota"
  },
  {
    id: 7,
    src: galeria07,
    title: "Escavadeira Hidráulica John Deere 130",
    subtitle: "Equipamento moderno de alta precisão para fundações e valas",
    category: "obras",
    categoryLabel: "Obras & Escavação"
  },
  {
    id: 8,
    src: galeria08,
    title: "Terraplanagem & Regularização de Solo",
    subtitle: "Equipe e maquinário em atividade de conformação e aterro",
    category: "obras",
    categoryLabel: "Obras & Escavação"
  },
  {
    id: 9,
    src: terraplanagemGeralImg,
    title: "Escavadeira John Deere 130G em Terraplanagem Geral",
    subtitle: "Movimentação de terra, talude e conformação de solo em canteiro de obras",
    category: "obras",
    categoryLabel: "Obras & Escavação"
  },
  {
    id: 10,
    src: galeria10,
    title: "Pá Carregadeira Volvo Abastecendo Caçamba Basculante",
    subtitle: "Agilidade e pesagem confiável na venda de saibro, pedrisco e terra",
    category: "materiais",
    categoryLabel: "Venda de Materiais"
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const filteredGallery = selectedCategory === 'todas'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-amber-500 selection:text-white">
      {/* Accessibility Skip Link */}
      <a 
        href="#conteudo-principal" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-amber-500 focus:text-zinc-950 focus:px-4 focus:py-2 focus:font-bold focus:shadow-lg"
      >
        Pular para o conteúdo principal
      </a>

      {/* Header & Navigation */}
      <header className="fixed w-full z-50 bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800" role="banner">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navegação principal">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <a 
                href="#inicio" 
                onClick={(e) => handleScrollTo(e, 'inicio')}
                className="text-2xl sm:text-3xl font-black text-white tracking-tight cursor-pointer"
                title="KauterTerraPlanagem - Página Inicial"
              >
                Kauter<span className="text-amber-500">TerraPlanagem</span>
              </a>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              <a 
                href="#quem-somos" 
                onClick={(e) => handleScrollTo(e, 'quem-somos')}
                className="text-zinc-300 hover:text-amber-500 transition-colors font-medium text-sm uppercase tracking-wide cursor-pointer"
              >
                Quem somos
              </a>
              <a 
                href="#servicos" 
                onClick={(e) => handleScrollTo(e, 'servicos')}
                className="text-zinc-300 hover:text-amber-500 transition-colors font-medium text-sm uppercase tracking-wide cursor-pointer"
              >
                Serviços
              </a>
              <a 
                href="#materiais" 
                onClick={(e) => handleScrollTo(e, 'materiais')}
                className="text-zinc-300 hover:text-amber-500 transition-colors font-medium text-sm uppercase tracking-wide cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-amber-400" />
                Venda de Materiais
              </a>
              <a 
                href="#galeria" 
                onClick={(e) => handleScrollTo(e, 'galeria')}
                className="text-amber-400 hover:text-amber-300 transition-colors font-bold text-sm uppercase tracking-wide cursor-pointer flex items-center gap-1.5"
              >
                <Camera size={14} />
                Galeria de Fotos
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-6 py-2.5 font-bold uppercase tracking-wide text-sm transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                aria-label="Solicitar orçamento pelo WhatsApp com a KauterTerraPlanagem"
              >
                <MessageCircle size={18} />
                Solicitar Orçamento
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-zinc-300 hover:text-white p-2"
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-800">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a 
                href="#quem-somos" 
                onClick={(e) => handleScrollTo(e, 'quem-somos')} 
                className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-amber-500 hover:bg-zinc-900 rounded-md"
              >
                Quem somos
              </a>
              <a 
                href="#servicos" 
                onClick={(e) => handleScrollTo(e, 'servicos')} 
                className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-amber-500 hover:bg-zinc-900 rounded-md"
              >
                Serviços
              </a>
              <a 
                href="#materiais" 
                onClick={(e) => handleScrollTo(e, 'materiais')} 
                className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-amber-500 hover:bg-zinc-900 rounded-md"
              >
                Venda de Materiais (Saibro, Pedrisco, Terra)
              </a>
              <a 
                href="#galeria" 
                onClick={(e) => handleScrollTo(e, 'galeria')} 
                className="block px-3 py-2 text-base font-bold text-amber-400 hover:text-amber-300 hover:bg-zinc-900 rounded-md flex items-center gap-2"
              >
                <Camera size={16} />
                Galeria de Fotos (Nossa Frota)
              </a>
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)} 
                className="block px-3 py-2.5 mt-4 text-center bg-amber-500 text-zinc-950 font-bold uppercase rounded-md flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Solicitar Orçamento
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main id="conteudo-principal">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center pt-20 scroll-mt-20" id="inicio" aria-labelledby="hero-title">
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBg} 
              alt="Escavadeira realizando terraplanagem com caminhão basculante ao fundo em grande canteiro de obras" 
              className="w-full h-full object-cover" 
              width="1920" 
              height="1080"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-900/80 to-zinc-900/40"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              {/* Natural Location & Category Breadcrumb */}
              <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase tracking-wider mb-4 font-semibold">
                <span>Início</span>
                <span>/</span>
                <span>Terraplanagem & Obras</span>
                <span>/</span>
                <span className="text-amber-400 flex items-center gap-1">
                  <MapPin size={12} /> Curitiba & Região (PR)
                </span>
              </div>

              <div className="inline-block bg-amber-500 text-zinc-950 font-bold px-3 py-1 text-sm mb-6 uppercase tracking-wider">
                Qualidade & Precisão em Obras
              </div>

              <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                Terraplanagem & <span className="text-amber-500 drop-shadow-none">Máquinas Pesadas</span> em Curitiba e Região
              </h1>

              <p className="text-lg md:text-xl text-zinc-200 mb-10 max-w-xl font-light drop-shadow-md">
                Escavação, demolição, aterro, limpeza de terrenos e terraplanagem em geral. Venda e entrega rápida de saibro, pedrisco e terra direto na sua obra.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 px-8 py-4 text-center font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/20"
                >
                  <MessageCircle size={20} />
                  <span>Solicitar orçamento</span>
                  <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                <a 
                  href="#servicos" 
                  onClick={(e) => handleScrollTo(e, 'servicos')}
                  className="bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 px-8 py-4 text-center font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer"
                >
                  Nossos Serviços
                </a>
                <a 
                  href="#materiais" 
                  onClick={(e) => handleScrollTo(e, 'materiais')}
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 px-6 py-4 text-center font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Mountain size={18} />
                  Materiais
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Highlight Banner */}
        <section className="bg-zinc-900 border-b border-zinc-800 py-8 text-white relative z-20 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-14 h-14 bg-amber-500 text-zinc-950 flex items-center justify-center font-black flex-shrink-0 rounded-sm shadow-md">
                  <MapPin size={28} />
                </div>
                <div>
                  <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-1 block">Atendimento Regional Especializado</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Terraplanagem em Curitiba e região
                  </h2>
                  <p className="text-zinc-300 text-base sm:text-lg mt-1 font-normal max-w-3xl leading-relaxed">
                    A <strong>KAUTER</strong> atende projetos de terraplanagem, escavação, nivelamento e preparação de terrenos em Curitiba e municípios da Região Metropolitana.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full lg:w-auto">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center bg-amber-500 hover:bg-amber-400 text-zinc-950 px-6 py-3.5 font-bold uppercase text-xs tracking-wider transition-transform transform hover:-translate-y-0.5 whitespace-nowrap shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="quem-somos" className="py-24 bg-white scroll-mt-24" aria-labelledby="about-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-zinc-100 transform -skew-y-3 z-0"></div>
                <img 
                  src={galeria01} 
                  alt="Caminhão Ford Cargo 2623 azul e escavadeira John Deere da frota própria KauterTerraPlanagem" 
                  className="relative z-10 w-full h-[500px] object-cover shadow-2xl" 
                  width="800" 
                  height="500"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -right-6 bg-zinc-950 p-6 z-20 shadow-xl hidden lg:block border-l-4 border-amber-500 max-w-xs">
                  <p className="text-lg font-black text-white mb-1 flex items-center gap-2">
                    <MapPin size={20} className="text-amber-500" /> Curitiba e Região
                  </p>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    A KAUTER atende projetos em Curitiba e municípios da Região Metropolitana com agilidade e maquinário próprio.
                  </p>
                </div>
              </div>
              
              <div>
                <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2 block">Quem Somos</span>
                <h2 id="about-title" className="text-3xl md:text-5xl font-black text-zinc-950 mb-6 leading-tight">
                  Sobre a KauterTerraPlanagem: Estrutura sólida para sua obra.
                </h2>
                <p className="text-zinc-600 mb-6 text-lg leading-relaxed">
                  A <strong>KauterTerraPlanagem</strong> é especializada na execução de serviços de terraplanagem, escavação, demolição e preparação de solo. Atuamos com frota própria e equipe capacitada, garantindo precisão técnica, conformidade com o projeto e cumprimento rigoroso dos cronogramas.
                </p>
                <p className="text-zinc-600 mb-8 text-lg leading-relaxed">
                  Além dos serviços com maquinário pesado, comercializamos agregados indispensáveis para obras — incluindo <strong>saibro, pedrisco e terra</strong> —, entregues diretamente no canteiro com pontualidade e pesagem confiável.
                </p>
                
                <ul className="space-y-4">
                  <li className="flex items-center text-zinc-800 font-medium">
                    <CheckCircle2 className="text-amber-500 mr-3 flex-shrink-0" size={24} />
                    Operadores qualificados com uso obrigatório de EPIs e foco em segurança.
                  </li>
                  <li className="flex items-center text-zinc-800 font-medium">
                    <CheckCircle2 className="text-amber-500 mr-3 flex-shrink-0" size={24} />
                    Frota própria com caminhões e máquinas pesadas revisados.
                  </li>
                  <li className="flex items-center text-zinc-800 font-medium">
                    <CheckCircle2 className="text-amber-500 mr-3 flex-shrink-0" size={24} />
                    Atendimento ágil em Curitiba e Região Metropolitana com orçamento detalhado.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-24 bg-zinc-50 border-t border-zinc-200 scroll-mt-24" aria-labelledby="services-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2 block">Nossos Serviços</span>
              <h2 id="services-title" className="text-3xl md:text-4xl font-black text-zinc-950 mb-4">
                Serviços Especializados de Terraplanagem e Construção
              </h2>
              <p className="text-zinc-600 text-lg">
                Soluções completas com caminhões e máquinas pesadas para preparar seu terreno com segurança, precisão e eficiência.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 1. Escavação */}
              <article className="bg-white p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                <div className="w-14 h-14 bg-zinc-950 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <Shovel className="text-amber-500 group-hover:text-zinc-950 transition-colors" size={30} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 mb-3">Escavação</h3>
                <p className="text-zinc-600 mb-6 flex-grow">
                  Escavação precisa para fundações, baldrames, sapatas, blocos, piscinas, redes de esgoto/drenagem e subsolos com escavadeiras hidráulicas de médio e grande porte.
                </p>
                <div className="w-full h-52 overflow-hidden bg-zinc-100 mt-4 rounded-sm">
                  <img 
                    src={excavatorSite} 
                    alt="Escavadeira hidráulica em operação para escavação de solo e fundações" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    width="600" 
                    height="400"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </article>

              {/* 2. Demolição */}
              <article className="bg-white p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                <div className="w-14 h-14 bg-zinc-950 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <Hammer className="text-amber-500 group-hover:text-zinc-950 transition-colors" size={30} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 mb-3">Demolição</h3>
                <p className="text-zinc-600 mb-6 flex-grow">
                  Demolição técnica e controlada de casas, galpões, muros, pisos industriais e alvenaria em geral, com remoção e descarte responsável de todo o entulho.
                </p>
                <div className="w-full h-52 overflow-hidden bg-zinc-100 mt-4 rounded-sm">
                  <img 
                    src={galeria02} 
                    alt="Escavadeira John Deere carregando pedras e entulhos no caminhão Ford Cargo" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    width="600" 
                    height="400"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </article>

              {/* 3. Aterro */}
              <article className="bg-white p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                <div className="w-14 h-14 bg-zinc-950 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <Truck className="text-amber-500 group-hover:text-zinc-950 transition-colors" size={30} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 mb-3">Aterro</h3>
                <p className="text-zinc-600 mb-6 flex-grow">
                  Elevação e regularização de cotas, preenchimento de buracos e depressões, fornecimento de terra limpa selecionada e compactação de solo para evitar futuros recalques.
                </p>
                <div className="w-full h-52 overflow-hidden bg-zinc-100 mt-4 rounded-sm">
                  <img 
                    src={galeria08} 
                    alt="Caminhão basculante e escavadeira hidráulica em operação de aterro e movimentação de terra" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    width="600" 
                    height="400"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </article>

              {/* 4. Limpeza de Terrenos */}
              <article className="bg-white p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow group flex flex-col">
                <div className="w-14 h-14 bg-zinc-950 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                  <Tractor className="text-amber-500 group-hover:text-zinc-950 transition-colors" size={30} />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 mb-3">Limpeza de Terrenos</h3>
                <p className="text-zinc-600 mb-6 flex-grow">
                  Destocamento, raspagem de vegetação densa, retirada de tocos, raízes, lixos e entulhos acumulados, deixando a área totalmente desimpedida para as etapas seguintes.
                </p>
                <div className="w-full h-52 overflow-hidden bg-zinc-100 mt-4 rounded-sm">
                  <img 
                    src={galeria03} 
                    alt="Escavadeira John Deere executando limpeza e corte de solo em lote" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    width="600" 
                    height="400"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </article>

              {/* 5. Terraplanagem em Geral */}
              <article className="bg-white p-8 border border-zinc-200 shadow-sm hover:shadow-xl transition-shadow group flex flex-col lg:col-span-2">
                <div className="flex flex-col md:flex-row h-full gap-6">
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="w-14 h-14 bg-zinc-950 flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-colors">
                      <Layers className="text-amber-500 group-hover:text-zinc-950 transition-colors" size={30} />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-950 mb-3">Terraplanagem em Geral</h3>
                    <p className="text-zinc-600 mb-4">
                      Nivelamento completo, compensação equilibrada de cortes e aterros, abertura de platôs industriais e residenciais, garantindo caimento correto para escoamento de águas.
                    </p>
                    <p className="text-zinc-500 text-sm">
                      Execução rigorosa conforme o projeto topográfico e arquitetônico, garantindo a estabilidade necessária para fundações e pavimentações.
                    </p>
                  </div>
                  <div className="md:w-1/2 h-56 md:h-full min-h-[220px] overflow-hidden bg-zinc-100 rounded-sm">
                    <img 
                      src={terraplanagemGeralImg} 
                      alt="Escavadeira John Deere 130G operando em monte de terra e brita em serviço de terraplanagem em geral" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      width="600" 
                      height="400"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Materials Sales Section */}
        <section id="materiais" className="py-24 bg-zinc-900 text-white scroll-mt-24 border-t border-zinc-800" aria-labelledby="materials-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold px-3 py-1 text-xs mb-4 uppercase tracking-wider rounded-sm">
                  <Sparkles size={14} />
                  Comercialização & Entrega Direta
                </div>
                <h2 id="materials-title" className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                  Venda e Entrega de Saibro, Pedrisco e Terra
                </h2>
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                  Além de prestar serviços pesados de terraplanagem, a <strong>KauterTerraPlanagem</strong> fornece agregados selecionados para construção civil. Entregamos direto no canteiro por caminhão basculante fechado, com pontualidade e pesagem honesta.
                </p>
                <div className="flex flex-wrap gap-4 text-sm font-semibold text-zinc-300">
                  <span className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-sm flex items-center gap-2">
                    <Truck size={16} className="text-amber-500" /> Entrega Rápida com Caminhão Basculante
                  </span>
                  <span className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-sm flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-500" /> Atendimento para Pequenas e Grandes Obras
                  </span>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative">
                <div className="overflow-hidden rounded-md border-2 border-zinc-800 shadow-2xl">
                  <img 
                    src={galeria05} 
                    alt="Pá carregadeira Volvo abastecendo caminhão Ford Cargo com saibro e agregados" 
                    className="w-full h-80 object-cover" 
                    width="600" 
                    height="400"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-amber-500 text-zinc-950 p-4 font-black uppercase text-sm shadow-xl hidden sm:block">
                  Entrega Direta na Obra
                </div>
              </div>
            </div>

            {/* Cards of 3 materials */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Saibro */}
              <article className="bg-zinc-950 p-8 border border-zinc-800 rounded-sm relative group hover:border-amber-500 transition-colors">
                <div className="text-amber-500 font-black text-4xl mb-4">01.</div>
                <h3 className="text-2xl font-bold text-white mb-3">Saibro</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Material de excelente coesão e compactação. Indicado para base e sub-base de pisos industriais, aterros, estradas de terra, assentamentos e calçamentos firmes.
                </p>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6 border-t border-zinc-800/80 pt-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Alta densidade após compactação
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Ideal para pisos e pátios
                  </li>
                </ul>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Conheci a KAUTER pelo site e gostaria de cotar uma carga de Saibro.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-500 hover:text-amber-400 font-bold text-sm uppercase tracking-wide group-hover:translate-x-1 transition-all"
                >
                  Cotar Saibro <ChevronRight size={18} className="ml-1" />
                </a>
              </article>

              {/* Pedrisco */}
              <article className="bg-zinc-950 p-8 border border-zinc-800 rounded-sm relative group hover:border-amber-500 transition-colors">
                <div className="text-amber-500 font-black text-4xl mb-4">02.</div>
                <h3 className="text-2xl font-bold text-white mb-3">Pedrisco</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Agregado britado com granulometria uniforme e limpa. Essencial para concreto, contrapisos, canaletas de drenagem, filtros e acabamentos de pátios e estacionamentos.
                </p>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6 border-t border-zinc-800/80 pt-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Excelente para drenagem pluvial
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Uniformidade e limpeza do material
                  </li>
                </ul>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Conheci a KAUTER pelo site e gostaria de cotar uma carga de Pedrisco.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-500 hover:text-amber-400 font-bold text-sm uppercase tracking-wide group-hover:translate-x-1 transition-all"
                >
                  Cotar Pedrisco <ChevronRight size={18} className="ml-1" />
                </a>
              </article>

              {/* Terra */}
              <article className="bg-zinc-950 p-8 border border-zinc-800 rounded-sm relative group hover:border-amber-500 transition-colors">
                <div className="text-amber-500 font-black text-4xl mb-4">03.</div>
                <h3 className="text-2xl font-bold text-white mb-3">Terra</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  Disponibilizamos terra limpa e selecionada para aterros em geral e nivelamento de grandes áreas, além de terra vegetal para jardins, gramados e paisagismo.
                </p>
                <ul className="space-y-2 text-sm text-zinc-300 mb-6 border-t border-zinc-800/80 pt-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Terra limpa para aterro e regularização
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Terra vegetal para paisagismo
                  </li>
                </ul>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Conheci a KAUTER pelo site e gostaria de cotar uma carga de Terra.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-500 hover:text-amber-400 font-bold text-sm uppercase tracking-wide group-hover:translate-x-1 transition-all"
                >
                  Cotar Terra <ChevronRight size={18} className="ml-1" />
                </a>
              </article>
            </div>

            {/* CTA Box for Materials */}
            <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 p-8 rounded-sm text-zinc-950 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-black mb-1">Precisa de orçamento de material para sua obra?</h3>
                <p className="font-medium text-zinc-900">Informe a quantidade aproximada ou o tamanho da área e receba uma cotação rápida pelo WhatsApp.</p>
              </div>
              <a 
                href={WHATSAPP_MATERIAIS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-950 hover:bg-zinc-900 text-white font-bold uppercase tracking-wider px-8 py-4 text-sm whitespace-nowrap flex items-center gap-2 transition-transform transform hover:-translate-y-0.5"
              >
                <MessageCircle size={18} />
                Pedir Cotação de Materiais
              </a>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-24 bg-zinc-950 text-white scroll-mt-24 border-t border-zinc-800" aria-labelledby="gallery-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-2 flex items-center justify-center gap-2">
                <Camera size={18} />
                Fotos Reais do Nosso Trabalho
              </span>
              <h2 id="gallery-title" className="text-3xl md:text-5xl font-black text-white mb-4">
                Galeria de Fotos: Nossa Frota em Ação
              </h2>
              <p className="text-zinc-400 text-lg">
                Confira registros reais dos nossos caminhões Ford Cargo traçados, escavadeiras hidráulicas John Deere, pá carregadeira Volvo e obras executadas em Curitiba e Região Metropolitana.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
              {[
                { id: 'todas', label: 'Todas as Fotos' },
                { id: 'frota', label: 'Caminhões & Frota' },
                { id: 'obras', label: 'Obras & Escavação' },
                { id: 'materiais', label: 'Venda de Materiais' },
                { id: 'transporte', label: 'Transporte de Máquinas' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/25 scale-105'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => {
                const globalIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImageIndex(globalIndex)}
                    className="group relative h-80 rounded-sm overflow-hidden bg-zinc-900 border border-zinc-800/80 cursor-pointer shadow-lg hover:border-amber-500/60 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300"></div>

                    <div className="absolute top-4 left-4">
                      <span className="bg-amber-500/90 backdrop-blur-sm text-zinc-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-zinc-950/80 text-amber-400 flex items-center justify-center backdrop-blur-sm border border-zinc-700">
                        <Maximize2 size={18} />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-lg mb-1 leading-snug group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-300 text-xs line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Gallery Bottom CTA */}
            <div className="mt-14 p-8 bg-zinc-900/90 border border-zinc-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-1">
                  Precisa de máquinas pesadas e caminhões para sua obra?
                </h3>
                <p className="text-zinc-400 text-sm">
                  Atendemos Curitiba e toda a Região Metropolitana com frota própria e operadores experientes.
                </p>
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase tracking-wider px-8 py-3.5 text-xs sm:text-sm whitespace-nowrap flex items-center gap-2 transition-transform transform hover:-translate-y-0.5 shadow-lg shadow-amber-500/10"
              >
                <MessageCircle size={18} />
                Solicitar Orçamento no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex(null);
              }}
              className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-zinc-900/90 text-white hover:text-amber-400 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar visualização de imagem"
            >
              <X size={26} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length : null));
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-900/90 text-white hover:text-amber-400 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_ITEMS.length : null));
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-zinc-900/90 text-white hover:text-amber-400 hover:bg-zinc-800 border border-zinc-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight size={28} />
            </button>

            {/* Modal Content */}
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[72vh] flex items-center justify-center overflow-hidden rounded-md">
                <img
                  src={GALLERY_ITEMS[selectedImageIndex].src}
                  alt={GALLERY_ITEMS[selectedImageIndex].title}
                  className="max-h-[72vh] max-w-full object-contain rounded-md shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full mt-4 bg-zinc-900/90 border border-zinc-800 rounded-md p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="bg-amber-500 text-zinc-950 font-black text-xs uppercase px-2.5 py-0.5 rounded-sm">
                      {GALLERY_ITEMS[selectedImageIndex].categoryLabel}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      Foto {selectedImageIndex + 1} de {GALLERY_ITEMS.length}
                    </span>
                  </div>
                  <h4 className="text-white font-bold text-lg sm:text-xl">
                    {GALLERY_ITEMS[selectedImageIndex].title}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
                    {GALLERY_ITEMS[selectedImageIndex].subtitle}
                  </p>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Vi a foto "${GALLERY_ITEMS[selectedImageIndex].title}" na galeria do site e gostaria de solicitar um orçamento para minha obra.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold uppercase tracking-wider px-6 py-3 text-xs whitespace-nowrap flex items-center gap-2 rounded-sm transition-transform transform hover:-translate-y-0.5"
                >
                  <MessageCircle size={16} />
                  Cotar Este Serviço
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Why Choose Us */}
        <section className="py-24 bg-amber-500" aria-labelledby="why-us-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 id="why-us-title" className="text-zinc-950 font-black text-3xl md:text-5xl mb-6 leading-tight">
                  Por que escolher a KauterTerraPlanagem para sua obra?
                </h2>
                <p className="text-zinc-800 text-xl font-medium mb-8">
                  Na construção civil, prazo e precisão são fundamentais. Nosso compromisso é entregar seu terreno pronto para construir, com segurança e sem retrabalhos.
                </p>
                
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-zinc-950" size={28} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-zinc-950">Frota Própria de Caminhões e Máquinas Pesadas</h3>
                      <p className="text-zinc-800 mt-1">Não dependemos de terceiros. Nossos caminhões e máquinas pesadas estão sempre prontos e com manutenção em dia, assegurando agilidade e sem atrasos por terceirização.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-zinc-950" size={28} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-zinc-950">Orçamento Transparente</h3>
                      <p className="text-zinc-800 mt-1">Analisamos previamente o terreno e o escopo da obra, detalhando claramente os custos e prazos de execução para o cliente.</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="text-zinc-950" size={28} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-zinc-950">Operadores Qualificados</h3>
                      <p className="text-zinc-800 mt-1">Profissionais experientes no manuseio de máquinas pesadas, garantindo precisão nos cortes, segurança do canteiro e eficiência produtiva.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative hidden md:block">
                <div className="border-8 border-zinc-950 p-2 bg-white">
                  <img 
                    src={galeria04} 
                    alt="Transporte de máquinas pesadas e escavadeira da KauterTerraPlanagem" 
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                    width="600" 
                    height="450"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-52 h-44 bg-zinc-950 flex flex-col justify-center items-center text-center p-6 text-white shadow-2xl">
                  <span className="text-amber-500 font-black text-2xl mb-1 flex items-center gap-1">
                    <CheckCircle2 size={24} /> Confiabilidade
                  </span>
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-300">Compromisso com o Prazo</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact / Footer */}
      <footer id="contato" className="bg-zinc-950 text-white pt-24 pb-12 border-t-8 border-amber-500 scroll-mt-24" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 mb-16 pb-16 border-b border-zinc-800">
            <div>
              <span className="text-3xl sm:text-4xl font-black tracking-tight block mb-6">
                Kauter<span className="text-amber-500">TerraPlanagem</span>
              </span>
              <p className="text-zinc-400 text-lg mb-8 max-w-md">
                A base forte que sua obra precisa. Especialistas em escavação, demolição, aterro, limpeza de terrenos, terraplanagem e venda de saibro, pedrisco e terra.
              </p>
              
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 px-8 py-4 font-bold uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-amber-500/20"
              >
                <MessageCircle size={22} />
                <span>Solicitar Orçamento no WhatsApp</span>
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Navegação</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#inicio" 
                      onClick={(e) => handleScrollTo(e, 'inicio')}
                      className="text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
                    >
                      Início
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#quem-somos" 
                      onClick={(e) => handleScrollTo(e, 'quem-somos')}
                      className="text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
                    >
                      Quem Somos
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#servicos" 
                      onClick={(e) => handleScrollTo(e, 'servicos')}
                      className="text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
                    >
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#materiais" 
                      onClick={(e) => handleScrollTo(e, 'materiais')}
                      className="text-zinc-400 hover:text-amber-500 font-medium transition-colors cursor-pointer"
                    >
                      Venda de Materiais
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#galeria" 
                      onClick={(e) => handleScrollTo(e, 'galeria')}
                      className="text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera size={14} />
                      Galeria de Fotos
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Contato</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="mailto:contato@kauterterraplanagem.com.br"
                      className="text-zinc-400 hover:text-amber-500 transition-colors"
                    >
                      contato@kauterterraplanagem.com.br
                    </a>
                  </li>
                  <li>
                    <a 
                      href={WHATSAPP_LINK} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-zinc-300 hover:text-amber-500 transition-colors flex items-center gap-2 font-medium"
                    >
                      <Phone size={16} className="text-amber-500" />
                      {WHATSAPP_DISPLAY}
                    </a>
                  </li>
                  <li className="text-zinc-400 flex items-center gap-2 pt-2">
                    <MapPin size={16} className="text-amber-500 flex-shrink-0" />
                    <span>Curitiba, Região Metropolitana e PR</span>
                  </li>
                  <li className="text-zinc-400 flex items-center gap-2 pt-1 border-t border-zinc-800 text-sm">
                    <Clock size={16} className="text-amber-500 flex-shrink-0" />
                    <span>Seg. a Sex. das 07:00 às 18:00</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm">
            <p>&copy; {new Date().getFullYear()} KauterTerraPlanagem. Todos os direitos reservados.</p>
            <p className="mt-2 md:mt-0">Escavação, Demolição, Aterro, Limpeza, Terraplanagem & Materiais.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a KauterTerraPlanagem no WhatsApp"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
      >
        <MessageCircle size={28} className="fill-current" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 group-hover:pr-1 transition-all duration-300 font-bold text-sm">
          Falar no WhatsApp
        </span>
      </a>
    </div>
  );
}
