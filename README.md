# Tradutor Web

Um aplicativo de tradução de voz em tempo real que permite aos usuários traduzir entre diferentes idiomas usando reconhecimento de voz e síntese de fala.

## Funcionalidades

- Reconhecimento de voz instantâneo
- Tradução em tempo real
- Síntese de fala do texto traduzido
- Suporte para múltiplos idiomas:
  - Português
  - Inglês
  - Espanhol
  - Francês
- Interface simples e intuitiva

## Como usar

1. Selecione o idioma de entrada e saída nos menus
2. Pressione e segure a tecla de espaço para começar a falar
3. Solte a tecla de espaço quando terminar
4. Ouça a tradução automaticamente

## Tecnologias utilizadas

- React.js
- Web Speech API para reconhecimento de voz
- SpeechSynthesis API para síntese de fala
- MyMemory Translation API para tradução de texto

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/tradutor-web.git

# Entre no diretório
cd tradutor-web

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## Requisitos do sistema

- Navegador moderno com suporte à Web Speech API
- Conexão com a internet para tradução

## Limitações

- A API de tradução gratuita tem limites de uso
- O reconhecimento de voz requer um ambiente com pouco ruído de fundo
- Nem todos os navegadores oferecem suporte completo às APIs de fala
