import { notFound } from 'next/navigation'
import Link from 'next/link' // ✅ Importe Link
import { buscartarefaPorIdAPI } from '@/services/api'

export default async function TarefaDetalhes({ params }) {
  const { id } = params

  let tarefa = null
  try {
    tarefa = await buscartarefaPorIdAPI(Number(id))
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error)
    notFound()
  }

  if (!tarefa) {
    notFound()
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      {/* ✅ Use Link em vez de <a> */}
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        ← Voltar às Tarefas
      </Link>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{tarefa.nome}</h1>
        <div className="bg-gray-50 rounded-lg p-5 mb-6">
          <p className="text-lg text-gray-700">
            <span className="font-medium">ID:</span> {tarefa.id}
          </p>
          <p className="mt-2 text-lg">
            <span className="font-medium">Status:</span>{' '}
            {tarefa.checked ? (
              <span className="text-green-600 font-bold">✅ Concluída</span>
            ) : (
              <span className="text-red-600 font-bold">❌ Pendente</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}