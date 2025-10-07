import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bem-vindo à Nossa Aplicação de Gestão de Tarefas!
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Gestão de tarefas simples e eficiente com Next.js e Tailwind CSS.
      </p>
      
      <div className="space-x-4">
        <Link href="/tarefas" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Ver Tarefas
        </Link>
        <Link href="/api/tarefas" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors" target="_blank">
          API de Tarefas
        </Link>
      </div>
    </div>
  );
}