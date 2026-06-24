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

## Objetivos da Sprint 2

Implementar funcionalidades de movimentação de estoque e gerenciamento de materiais, permitindo registrar saídas de itens e remover registros do sistema.

---

## Funcionalidades Implementadas na Sprint 2

### Baixa de Estoque

Permite registrar a retirada de materiais diretamente pela lista de estoque.

O sistema:

* Recebe a quantidade a ser retirada.
* Valida se existe saldo disponível.
* Atualiza o estoque automaticamente.
* Envia a atualização para a MockAPI utilizando requisição PUT.

### Exclusão de Materiais

Permite remover materiais cadastrados do estoque.

O sistema:

* Exclui o registro da MockAPI utilizando requisição DELETE.
* Atualiza automaticamente a interface após a remoção.

### Validação de Retirada

Foi implementada a função pura:

```javascript
export function validarRetirada(estoqueAtual, quantidadeRetirada)
```

Responsável por validar se uma retirada é permitida.

Regras aplicadas:

* Não permite retirada igual a zero.
* Não permite retirada negativa.
* Não permite retirada superior ao estoque disponível.
* Retorna `true` para operações válidas.
* Retorna `false` para operações inválidas.

---

## Estrutura Atual dos Dados

```json
{
  "id": "1",
  "nome": "Seringa 10ml",
  "quantidade": 150
}
```

---

## Requisitos Obrigatórios Atendidos na Sprint 2

* TextInput de retirada com `testID="input-retirada"`
* Botão de baixa com `testID="btn-baixar"`
* Botão de exclusão com `testID="btn-excluir"`
* Implementação da função `validarRetirada()`
* Atualização de estoque utilizando requisição PUT
* Exclusão de materiais utilizando requisição DELETE
* Bloqueio de retiradas inválidas
* Atualização automática da interface após alterações

---

## Resultados da Sprint 2

Ao final desta Sprint foi possível:

* Registrar saídas de materiais diretamente pelo aplicativo.
* Garantir que o estoque nunca fique negativo.
* Atualizar quantidades em tempo real através da API.
* Excluir materiais cadastrados.
* Aplicar regras de negócio para validação de movimentações.
* Evoluir o sistema de um simples cadastro para um controle básico de estoque.

---

## Objetivos da Sprint 3

Concluir o sistema de almoxarifado implementando funcionalidades de monitoramento, pesquisa e usabilidade, proporcionando uma experiência mais profissional ao usuário e permitindo uma visualização rápida da situação do estoque.

---

## Funcionalidades Implementadas na Sprint 3

### Dashboard de Estoque

Foi implementado um painel de indicadores responsável por apresentar informações resumidas sobre o estoque em tempo real.

Indicadores disponíveis:

* Total de materiais cadastrados.
* Quantidade de materiais com estoque crítico.
* Quantidade de materiais sem estoque.

Benefícios:

* Visualização rápida da situação do almoxarifado.
* Apoio na tomada de decisão para reposição de materiais.
* Melhor experiência para o usuário.

---

### Pesquisa de Materiais em Tempo Real

Foi desenvolvido um sistema de busca dinâmica que permite localizar materiais instantaneamente conforme o usuário digita.

Características:

* Pesquisa sem necessidade de botão.
* Atualização automática da lista.
* Busca por nome do material.
* Integração com o totalizador de itens.

Componente obrigatório implementado:

```jsx
testID="input-busca"
```

---

### Totalizador Dinâmico

Foi implementado um componente responsável por exibir a quantidade de materiais atualmente visíveis na tela.

O totalizador considera:

* Todos os materiais cadastrados.
* Os filtros aplicados pelo campo de pesquisa.

Componente obrigatório implementado:

```jsx
testID="total-itens"
```

Exemplo:

```text
Exibindo 8 item(ns)
```

---

### Indicador Visual de Estoque Crítico

Materiais com quantidade inferior a 10 unidades recebem destaque visual automático para facilitar a identificação de possíveis problemas de abastecimento.

Critério utilizado:

```javascript
quantidade < 10
```

Características:

* Cor diferenciada para itens críticos.
* Destaque visual para facilitar a identificação.
* Compatibilidade com testes automatizados.

Implementação obrigatória:

```jsx
accessibilityLabel="estoque-critico"
```

---

### Indicador de Material Sem Estoque

Materiais com quantidade igual a zero recebem destaque especial no painel.

Características:

* Cor diferenciada.
* Identificação visual imediata.
* Facilita o controle de reposição.

Critério utilizado:

```javascript
quantidade === 0
```

---

### Tratamento de Erros de Rede

Todas as operações de comunicação com a API foram protegidas utilizando blocos `try/catch`.

Operações protegidas:

* Buscar materiais (GET)
* Cadastrar materiais (POST)
* Atualizar estoque (PUT)
* Excluir materiais (DELETE)

Benefícios:

* Evita travamentos da aplicação.
* Exibe mensagens amigáveis ao usuário.
* Melhora a robustez do sistema.

Exemplo:

```javascript
try {
  // operação
} catch (error) {
  alert("Ocorreu um erro de conexão.");
}
```

---

### Refinamento da Interface

A interface foi completamente reformulada para proporcionar uma experiência mais moderna e intuitiva.

Melhorias realizadas:

* Dashboard com indicadores de estoque.
* Cartões visuais para materiais.
* Badges de status.
* Paleta de cores padronizada.
* Campos de busca e cadastro aprimorados.
* Organização visual dos botões de ação.
* Destaques automáticos para materiais críticos.

---

## Requisitos Obrigatórios Atendidos

* Campo de pesquisa com `testID="input-busca"`
* Totalizador com `testID="total-itens"`
* Filtro em tempo real
* Dashboard de indicadores
* Destaque visual para estoque crítico
* Utilização de `accessibilityLabel="estoque-critico"`
* Tratamento de erros utilizando `try/catch`
* README atualizado
* Projeto publicado no GitHub

---

## Resultados da Sprint 3

Ao final desta Sprint foi possível:

* Implementar um dashboard de acompanhamento do estoque.
* Pesquisar materiais em tempo real.
* Identificar rapidamente materiais críticos.
* Identificar materiais sem estoque.
* Melhorar significativamente a experiência do usuário.
* Tornar o sistema mais resiliente contra falhas de rede.
* Finalizar a primeira versão completa do sistema de almoxarifado.

---

## Capturas de Tela

Adicionar imagens do sistema em funcionamento:

### Dashboard Principal

<img width="1601" height="913" alt="image" src="https://github.com/user-attachments/assets/a3280687-4d7e-4395-96c9-41fcf7191810" />

### Cadastro de Materiais

<img width="1602" height="915" alt="image" src="https://github.com/user-attachments/assets/ebd39295-127b-4b21-859b-e5d0e2062686" />

### Pesquisa de Materiais

<img width="1596" height="911" alt="image" src="https://github.com/user-attachments/assets/40b23028-adbd-4080-b0f6-f2079ff747dc" />

### Estoque Crítico

Inserir screenshot destacando materiais com quantidade inferior a 10 unidades.

### Baixa de Estoque

<img width="1601" height="913" alt="image" src="https://github.com/user-attachments/assets/12b1cd21-bb92-431f-b7b4-39cbf7447102" />


---

## Conclusão do Projeto

O desenvolvimento deste projeto permitiu aplicar conceitos fundamentais de desenvolvimento mobile utilizando React Native e Expo, além de consolidar conhecimentos relacionados ao consumo de APIs REST, gerenciamento de estado, manipulação de listas, validações de negócio, tratamento de erros e experiência do usuário.

Ao longo das três Sprints, o sistema evoluiu de uma simples listagem de materiais para uma aplicação funcional de controle de estoque, capaz de cadastrar, consultar, atualizar, excluir, pesquisar e monitorar materiais em tempo real.

Além da implementação técnica, o projeto proporcionou experiência prática com Git, GitHub, documentação de software, integração contínua e desenvolvimento incremental de funcionalidades utilizando uma abordagem baseada em Sprints.

