# frist-lib
Creating the frist library

Aluno: Diógenes Bahia Bezerra
Curso: Node.js: criando sua primeira biblioteca
Carga horária: 12h
Instituição: Alura
Link do curso: https://cursos.alura.com.br/course/nodejs-criando-primeira-biblioteca
Certificado do curso: https://cursos.alura.com.br/certificate/d2b-diogenes/nodejs-criando-primeira-biblioteca

Descrição da Aula:
    Aprenda a importar e utilizar código de repositórios de código aberto
    Entenda o que são as promessas e como trabalhar com código assíncrono em Node.js
    Escreva suas primeiras expressões regulares e veja como utilizá-las para resolver problemas
    Crie seus próprios comandos para serem executados no terminal
    Use as bibliotecas mais recentes do Node.js para fazer requisições HTTP e manejar respostas

Aula 1:
    Que para criar um projeto em Node.js utilizamos o comando npm init;
    Que o arquivo package.json é utilizado pelo Node.js para listar as dependências instaladas, além de informações sobre versão do programa, autoria e scripts;
    Que as dependências (também chamadas de libs ou bibliotecas) são pacotes de código pronto que outras pessoas da comunidade disponibilizam, e nós as utilizamos para executar tarefas específicas no código sem termos que reescrever do zero;
    Que para deixar o código mais organizado podemos usar ferramentas de linting, além da importância delas para reforçar estilo e também para prever possíveis bugs.

Aula 2:
    Que podemos utilizar a lib fs (File System, ou sistema de arquivos) nativa do JavaScript para que o programa consiga acessar e ler arquivos do computador;
    Que conseguimos capturar mensagens de erro enviadas pelo Node.js quando algo no programa não sai como o esperado utilizando a palavra-chave throw, ou lançar;
    Que as “promessas” são a forma que o JavaScript utiliza para trabalhar com código assíncrono e que podemos resolvê-las utilizando em conjunto as palavras-chave async e await ou o método .then().


Aula 3:
    Como utilizar expressões regulares, uma sintaxe feita para reconhecer padrões de texto, para capturar links e URLs;
    Como utilizamos classes e grupos de expressões regulares para refinar a busca por estes padrões, além dos métodos que o JavaScript tem (por exemplo match e exec) para trazer os resultados e trabalhar com eles;
    Manipular os resultados extraídos do texto através de expressões regulares e montar um objeto de retorno utilizando a sintaxe do JavaScript e desestruturação de objetos com o spread operator ....

Aula 4:
    A utilizar a interface de linha de comando e como aplicamos a lib process do Node.js para capturar e utilizar os dados informados no terminal em nosso código;
    A organizar o código separando em arquivos as funções que lidam com entrada e saída de dados das funções que processam os links;
    Como fazer estes diversos arquivos conversarem entre si através da exportação e importação de módulos com import e export;
    Que scripts são instruções que usamos para automatizar tarefas e como escrever nossos próprios scripts, incluí-los no arquivo de configuração package.json e utilizá-los para executar comandos no terminal.

Aula 5:
    Como utilizar acessar URLs com a API fetch e manipular os dados devolvidos, como o código de status HTTP;
    Utilizar o método Promise.all para acessar de forma assíncrona um array de URLs e receber o resultado;
    Que a API fetch é baseada no conceito de promessas em JavaScript, e nessa aula vimos como utiliza o async/await para resolver as promessas e garantir que o código seja executado de forma assíncrona, retornando os resultados.
