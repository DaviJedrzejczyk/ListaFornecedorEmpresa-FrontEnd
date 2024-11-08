# Frontend de Listagem de Fornecedores e Empresas 🌐

Este projeto é o frontend desenvolvido em Angular para consumir a [API de Listagem de Fornecedores e Empresas](https://github.com/DaviJedrzejczyk/ListaFornecedorEmpresa-FrontEnd/tree/71fb49bb85f849f2364df41d72cd59dbba9684d6). É o meu primeiro projeto solo consumindo uma API própria, onde apresento dados de fornecedores e empresas, bem como as relações entre eles. 

## 🔗 Link para a API

A API utilizada pode ser encontrada em: [API de Listagem de Fornecedores e Empresas](https://github.com/DaviJedrzejczyk/ListaFornecedorEmpresa)

## 📌 Funcionalidades do Frontend

- **Visualização de Listagens**: Exibe listas de fornecedores e empresas com suas informações.
- **Consulta de Relações**: Mostra as empresas associadas a cada fornecedor.
- **Interação com API**: Consome dados diretamente da API para garantir que as informações estejam sempre atualizadas.
- **Interface Responsiva**: Utiliza SCSS para estilização e adaptabilidade a diversos dispositivos.

## ⚙️ Tecnologias Utilizadas

- **Angular v17**: Framework para construção do frontend.
- **TypeScript**: Linguagem usada para tipagem e melhor controle do código.
- **SCSS**: Linguagem de estilização para maior flexibilidade e modularidade no design.
- **HTML5**: Estrutura básica do frontend.

## 📂 Estrutura do Projeto

- **Components**: Contém os componentes Angular que formam a interface de usuário.
- **Services**: Serviços para comunicação com a API e manipulação de dados.
- **Models**: Definições de modelos TypeScript para representar entidades como Fornecedores e Empresas.
- **Styles**: Arquivos SCSS para estilização de toda a aplicação.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js e npm instalados
- Angular CLI instalado globalmente

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/SeuUsuario/NomeDoRepositorio.git
   cd NomeDoRepositorio
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   ng serve
   ```
   Acesse o projeto em `http://localhost:4200`.

## 🖼️ Principais Componentes

- **FornecedorListComponent**: Exibe a lista de fornecedores obtidos da API.
- **EmpresaListComponent**: Lista as empresas e permite visualizá-las associadas a fornecedores.
- **FornecedorDetailComponent**: Exibe detalhes de um fornecedor específico e as empresas relacionadas.

## 🚀 Aprendizados

Este projeto representou uma grande oportunidade para entender o consumo de APIs no Angular, desde a criação de serviços para chamadas HTTP até a implementação de interfaces responsivas. Foi um marco importante na minha jornada de desenvolvimento front-end.

## 👤 Contato

Desenvolvido por [Davi Jedrzejczyk](https://www.linkedin.com/in/davi-jedrzejczyk-03b22a245/). Sinta-se à vontade para conectar-se no LinkedIn para trocarmos experiências sobre desenvolvimento front-end e Angular!

---

> **Frontend de Listagem de Fornecedores e Empresas**: Uma aplicação prática para entender a integração entre frontend e backend no desenvolvimento de sistemas de listagem.
