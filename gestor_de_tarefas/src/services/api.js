// @/services/api.js

// Buscar todas as tarefas
export async function buscartarefaAPI() {
  const res = await fetch('/api/tarefas')
  if (!res.ok) throw new Error('Erro ao carregar tarefas')
  return res.json()
}

// Buscar tarefa por ID
export async function buscartarefaPorIdAPI(id) {
  const res = await fetch(`/api/tarefas/${id}`)
  if (!res.ok) throw new Error('Erro ao carregar tarefa')
  return res.json()
}

// Adicionar nova tarefa
export async function adicionarTarefaAPI(dados) {
  const res = await fetch('/api/tarefas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  if (!res.ok) throw new Error('Erro ao adicionar tarefa')
  return res.json()
}

// Atualizar tarefa
export async function atualizarTarefaAPI(id, dados) {
  const res = await fetch(`/api/tarefas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
  if (!res.ok) throw new Error('Erro ao atualizar tarefa')
  return res.json()
}

// Eliminar tarefa ✅ (agora consistente!)
export async function eliminarTarefaAPI(id) {
  const res = await fetch(`/api/tarefas/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao eliminar tarefa')
  return true
}