# 🚀 PErsonalização de Camisetas
## 📋 Descrição do Projeto

Este projeto é uma aplicação full-stack moderna que utiliza:
- Frontend: Next.js com Tailwind CSS
- Backend: NestJS
- Containerização: Docker
- Gerenciamento de Desenvolvimento: Makefile

## 🛠 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Docker
- Docker Compose
- Make
- Node.js (versão 18+ recomendada)

## 📦 Estrutura do Projeto

```
project-root/
│
├── frontend/           # Aplicação Next.js
│   ├── code
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── Makefile
│   └── ...
│
├── backend/            # Aplicação NestJS
│   ├── code
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── Makefile
│   └── ...
│
└── README.md
```

## 🚀 Inicialização Rápida

### Desenvolvimento Frontend

```bash
cd frontend
make dev
```

### Desenvolvimento Backend

```bash
cd backend
make dev
```

## 🐳 Configurações Docker

### Frontend Dockerfile (Next.js)
- Baseado em imagem Node.js oficial
- Copia package.json e instala dependências
- Copia código fonte
- Expõe porta 3000
- Comando de inicialização de desenvolvimento

### Backend Dockerfile (NestJS)
- Baseado em imagem Node.js oficial
- Copia package.json e instala dependências
- Copia código fonte
- Expõe porta 4000
- Comando de inicialização de desenvolvimento


## 🔧 Configurações Principais

### Next.js (Frontend)
- Typescript
- Tailwind CSS
- ESLint
- Prettier
- Jest para testes

### NestJS (Backend)
- Typescript
- ORM (TypeORM/Prisma)
- Swagger para documentação de API
- Jest para testes
- Validação com class-validator


## 🤝 Contribuição

1. Faça fork do projeto
2. Crie sua feature branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 🛡️ Segurança

- Sempre use variáveis de ambiente para configurações sensíveis
- Mantenha suas dependências atualizadas
- Use princípios de segurança no desenvolvimento

## 📞 Contato

Alexandre Souza dos Santos - alexandre.souza.office@gmail.com
