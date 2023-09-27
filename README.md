# MVP - Aplicação para Gerenciamento de Tarefas

Este é um projeto de uma aplicação web que permite ao usuário gerenciar suas tarefas, adicionando, editando e removendo informações sobre elas. Além disso na tela inicial é mostrado uma listagem com uma série de artigos relacionados a organização pessoal.

## Pré-requisitos

O back-end/endpoints devem estar disponíveis no endereço http://localhost:5000

## Funcionalidades

Com esta aplicação, o usuário pode:

* Adicionar uma nova tarefa, informando o nome e descrição.
* Editar as informações de uma tarefa existente.
* Remover uma tarefa.
* Visualizar as tarefas cadastradas.

## Como usar

1.  Instale as dependências necessárias e faça o build:

```
npm run build
```

3. Inicie a aplicação:

```
 npx serve -s build
```

4. Acesse a aplicação em seu navegador no endereço http://localhost:8080


É possível também utilizar o Docker já que a aplicação foi dockerizada. Para isso será  necessário construir e depois executar:

```
 docker build -t  task-frontend .
 docker run -p 3000:3000 task-frontend 
 ```



