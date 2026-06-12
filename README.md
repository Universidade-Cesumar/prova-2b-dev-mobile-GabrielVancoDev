# Sistema de Almoxarifado - Enfermagem

## Descrição do Projeto

O Sistema de Almoxarifado - Enfermagem tem como objetivo modernizar o controle de insumos médicos utilizados em aulas práticas e atividades acadêmicas. A aplicação permite consultar os materiais disponíveis em estoque e realizar o cadastro de novos itens através de uma interface conectada a uma API.

Nesta primeira Sprint foi desenvolvida a base do sistema, contemplando a listagem de materiais e o cadastro de novos insumos utilizando React Native e MockAPI.

---

## Tecnologias Utilizadas

- React Native
- JavaScript
- Expo
- MockAPI
- Git
- GitHub

---

## Objetivos da Sprint 1

Implementar a estrutura inicial do aplicativo contendo:

- Cadastro de materiais.
- Consulta de materiais cadastrados.
- Integração com API REST.
- Atualização automática da lista após novos cadastros.
- Interface inicial para gerenciamento de estoque.

---

## Funcionalidades Implementadas

### Cadastro de Materiais

Permite registrar novos materiais informando:

- Nome do material
- Quantidade disponível

### Listagem de Materiais

Os materiais cadastrados são exibidos em uma lista dinâmica utilizando FlatList.

### Integração com API

A aplicação realiza:

- Requisição GET para listar materiais.
- Requisição POST para cadastrar materiais.

### Validação Básica

O sistema realiza validações para evitar o envio de campos vazios.

### Indicador de Carregamento

Exibe um indicador visual enquanto os dados estão sendo carregados da API.

---

## Estrutura do Projeto

```text
sysalmoxarifado
│
├── App.js
├── package.json
├── app.json
├── assets
└── node_modules
```

---

## Estrutura dos Dados

Os materiais são armazenados na MockAPI utilizando a seguinte estrutura:

```json
{
  "id": "1",
  "nome": "Seringa 10ml",
  "quantidade": 150
}
```

---

## Requisitos Obrigatórios Atendidos

- TextInput do Nome do Material com `testID="input-nome"`
- TextInput da Quantidade com `testID="input-quantidade"`
- Campo Quantidade configurado com `keyboardType="numeric"`
- Botão de Cadastro com `testID="btn-cadastrar"`
- FlatList com `testID="lista-materiais"`
- Consumo da MockAPI utilizando Fetch API
- Cadastro de novos materiais via requisição POST
- Exibição dos materiais através de FlatList

---

## Como Executar o Projeto

### Instalar dependências

```bash
npm install
```

### Executar o projeto

```bash
npx expo start
```

### Executar no dispositivo móvel

1. Instale o aplicativo Expo Go.
2. Execute o projeto com o comando acima.
3. Escaneie o QR Code gerado pelo Expo.

---

## Resultados da Sprint 1

Ao final desta Sprint foi possível:

- Construir a estrutura inicial da aplicação.
- Integrar o aplicativo com uma API REST.
- Implementar o cadastro de materiais.
- Exibir os materiais cadastrados em uma lista dinâmica.
- Preparar a base para futuras funcionalidades de controle de estoque.

---


