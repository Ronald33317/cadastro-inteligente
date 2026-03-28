const nome = document.getElementById('nome')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const confirmar = document.getElementById('confirmar')
const form = document.getElementById('cadastroForm')
const btn = document.getElementById('btnSubmit')
const sucesso = document.getElementById('sucesso')
const strength = document.getElementById('strength')

nome.addEventListener('blur', () => validarCampo(nome, validarNome))
email.addEventListener('blur', () => validarCampo(email, validarEmail))
senha.addEventListener('input', () => {
  validarCampo(senha, validarSenha)
  atualizarForca(senha.value)
})
confirmar.addEventListener('blur', () => validarCampo(confirmar, validarConfirmacao))

function validarCampo(input, func) {
  const erro = document.getElementById(input.id + '-error')
  const res = func(input.value)

  if (!res.valido) {
    input.classList.add('error')
    input.classList.remove('success')
    erro.textContent = res.mensagem
  } else {
    input.classList.remove('error')
    input.classList.add('success')
    erro.textContent = ''
  }
}

function validarNome(v) {
  if (!v.trim()) return { valido: false, mensagem: 'Nome obrigatório' }
  if (v.length < 3) return { valido: false, mensagem: 'Mínimo 3 caracteres' }
  return { valido: true }
}

function validarEmail(v) {
  const r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!v) return { valido: false, mensagem: 'Email obrigatório' }
  if (!r.test(v)) return { valido: false, mensagem: 'Email inválido' }
  return { valido: true }
}

function validarSenha(v) {
  if (v.length < 8) return { valido: false, mensagem: 'Mínimo 8 caracteres' }
  if (!/[A-Z]/.test(v)) return { valido: false, mensagem: 'Precisa de maiúscula' }
  if (!/[0-9]/.test(v)) return { valido: false, mensagem: 'Precisa de número' }
  return { valido: true }
}

function validarConfirmacao(v) {
  if (v !== senha.value) return { valido: false, mensagem: 'Senhas diferentes' }
  return { valido: true }
}

function atualizarForca(v) {
  let pontos = 0

  if (v.length >= 8) pontos++
  if (/[A-Z]/.test(v)) pontos++
  if (/[0-9]/.test(v)) pontos++
  if (/[^A-Za-z0-9]/.test(v)) pontos++

  const largura = pontos * 25
  strength.style.width = largura + '%'

  if (pontos === 1) strength.style.background = 'red'
  else if (pontos === 2) strength.style.background = 'orange'
  else if (pontos === 3) strength.style.background = 'yellow'
  else if (pontos === 4) strength.style.background = 'green'
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  validarCampo(nome, validarNome)
  validarCampo(email, validarEmail)
  validarCampo(senha, validarSenha)
  validarCampo(confirmar, validarConfirmacao)

  if (document.querySelectorAll('.error').length === 0) {
    btn.disabled = true
    btn.textContent = 'Enviando...'

    setTimeout(() => {
      sucesso.textContent = 'Cadastro realizado com sucesso!'
      form.reset()
      strength.style.width = '0%'
      btn.disabled = false
      btn.textContent = 'Criar Conta'
    }, 2000)
  }
})