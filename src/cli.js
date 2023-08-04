#!/usr/bin/env node
    // Esta linha, que sempre inicia com os caracteres #!, é o que chamamos de shebang.
    // Quando adicionamos esta linha a um arquivo que será executado através do terminal, 
    // estamos instruindo o sistema operacional sobre qual é o tipo de arquivo que será executado e de qual forma (no caso, estamos falando do Node.js).

// Aula 5.15 Publicação no NPM

    // Sobre versionameno semântico: https://semver.org/lang/pt-BR/

    import fs from 'fs';
    import chalk from 'chalk';
    import pegaArquivo from './index.js';
    import listaValidada from './http-validacao.js';

    const caminho = process.argv;

    async function imprimeLista(valida, resultado, identificador = '') {
        if (valida) {

            console.log(
                chalk.yellow('Lista validada'),
                chalk.black.bgGreen(identificador),
                await listaValidada(resultado)
            );

        } else {

            console.log(
                chalk.yellow('Lista de Links'),
                chalk.black.bgGreen(identificador),
                resultado
            );
        }
    }


    async function processaTexto(argumentos){

        const caminho = argumentos[2];

        const valida = argumentos[3] === '--valida';

        try {

            fs.lstatSync(caminho);

        } catch (erro) {

            if (erro.code === 'ENOENT') {
                console.log ('Arquivo ou diretório não existe');

                return;
            } 
        }

        if (fs.lstatSync(caminho).isFile()) {
            const resultado = await pegaArquivo(caminho);
    
            imprimeLista(valida, resultado);

        } else if (fs.lstatSync(caminho).isDirectory()) {

            const arquivos = await fs.promises.readdir(caminho);

            arquivos.forEach( async (nomeDeArquivo) => {

                const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);

                imprimeLista(valida, lista, nomeDeArquivo);

            });


        }
        
    }

    processaTexto(caminho);
        // Essa função inicia o processamento do texto e leva dentro do seu parâmetro o comando digitad no terminal





/* // Aula 5.5 Validando Links

    import fs from 'fs';
    import chalk from 'chalk';
    import pegaArquivo from './index.js';
    import listaValidada from './http-validacao.js';

    const caminho = process.argv;
        // É capturado o comandoo digitado no terminal para que possam ser extraídos os caminhos

    async function imprimeLista(valida, resultado, identificador = '') {
        // A função "listaValidade" tem dentro dela um código assíncrono e, por isso, é necessário colocar o termo "async" antes da função "listaValidada()" para indicar que é necessário aguardar o retorno da promessa

        if (valida) {

            console.log(
                chalk.yellow('Lista validada'),
                chalk.black.bgGreen(identificador),
                await listaValidada(resultado)
                    // Como a "listaValidade()" espera um código assíncrono, então é necessário colocar o termo "await" para aguardar o retorno da promessa
            );

        } else {

            console.log(
                chalk.yellow('Lista de Links'),
                chalk.black.bgGreen(identificador),
                resultado
            );
        }
    }


    async function processaTexto(argumentos){

        const caminho = argumentos[2];

        const valida = argumentos[3] === '--valida';

        try {

            fs.lstatSync(caminho);

        } catch (erro) {

            if (erro.code === 'ENOENT') {
                console.log ('Arquivo ou diretório não existe');

                return;
            } 
        }

        if (fs.lstatSync(caminho).isFile()) {
            const resultado = await pegaArquivo(caminho);
    
            imprimeLista(valida, resultado);

        } else if (fs.lstatSync(caminho).isDirectory()) {

            const arquivos = await fs.promises.readdir(caminho);

            arquivos.forEach( async (nomeDeArquivo) => {

                const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);

                imprimeLista(valida, lista, nomeDeArquivo);

            });


        }
        
    }

    processaTexto(caminho);
        // Essa função inicia o processamento do texto e leva dentro do seu parâmetro o comando digitad no terminal
 */


    


/* // Aula 5.2 Adicionando opções

    import fs from 'fs';
    import chalk from 'chalk';
    import pegaArquivo from './index.js';
    import listaValidada from './http-validacao.js';

    const caminho = process.argv;

    // function imprimeLista(resultado, identificador = '') {
    function imprimeLista(valida, resultado, identificador = '') {
        // Foi adicionado mais um parâmetro para a função "imprimeLista"

        if (valida) {
            // É feita e essa condição para verificar que está sendo solicitado a validação da lista
            // Se parâmetro "valida" vier 'true', trazido da função "processaTexto", irá entre no IF e será feita a validação e o processamento

            console.log(
                chalk.yellow('Lista validada'),
                chalk.black.bgGreen(identificador),
                listaValidada(resultado)
            );

        } else {
            // Se parâmetro "valida" vier 'false', irá entre no ELSE e irá fazer o processamento sem a validação

            console.log(
                chalk.yellow('Lista de Links'),
                chalk.black.bgGreen(identificador),
                resultado
            );
        }
    }


    async function processaTexto(argumentos){

        const caminho = argumentos[2];

        const valida = argumentos[3] === '--valida';
            // A constante irá receber o quarto argumento do Array trazido pelo "process.argv", o "--valida"
            // === '--valida' Determina que a contante 'valida' será true or false, 
            // pois irá checar o valor que está vindo do 4º argumento para verificar se é igual ou não a string "--valida" 

        // console.log(valida);
            // Retorna: --valida

        try {

            fs.lstatSync(caminho);

        } catch (erro) {

            if (erro.code === 'ENOENT') {
                console.log ('Arquivo ou diretório não existe');

                return;
            } 
        }

        if (fs.lstatSync(caminho).isFile()) {
            const resultado = await pegaArquivo(caminho);
    
            //imprimeLista(resultado);
            imprimeLista(valida, resultado);
                // O código foi refatorado para que a função "imprimeLista()" passe a validar, então é necessário atualizar a chamada da função adionando outro parâmetro

        } else if (fs.lstatSync(caminho).isDirectory()) {

            const arquivos = await fs.promises.readdir(caminho);

            arquivos.forEach( async (nomeDeArquivo) => {

                const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);

                //imprimeLista(lista, nomeDeArquivo);
                imprimeLista(valida, lista, nomeDeArquivo);
                // O código foi refatorado para que a função "imprimeLista()" passe a validar, então é necessário atualizar a chamada da função adionando outro parâmetro

            });


        }
        
    }

    processaTexto(caminho);
*/





/* // Aula 4.7

ENOTFOUND - Error: not found - Retorna quando o Node.js tenta estabelecer uma conexão com um servidor e a tentativa falha no DNS lookup; 
ou seja, ou o host não existe ou há algum erro no endereço fornecido, que não consegue ser resolvido pelo DNS.

ENOENT - Error: no entity - Quando o caminho especificado, de um diretório ou arquivo, não existe no sistema de arquivos.
    Importante: algumas operações com fs requerem o uso do caminho absoluto de um arquivo ou diretório. Para “montar” a string com estes caminhos, você pode utilizar uma das libs mais comuns do Node.js, a path.
    
    lib path: https://nodejs.org/api/path.html

EISDIR - Error: is a directory - O caminho fornecido é um diretório

ENOTDIR - Error: not a directory - é o contrário do erro anterior, quando o programa espera receber o caminho de um diretório, mas acaba recebendo o caminho de um arquivo.

EADDRINUSE - Error: address already in use - Esse erro acontece quando está sendo iniciado ou reiniciado um servidor. Infica que o servidor está tentando se conectar a uma porta lógica que já está sendo ocupada por outro programa.
    // HTTP: entenddo a web por baixo dos panos: https://cursos.alura.com.br/course/http-entendendo-web-por-baixo-dos-panos

ECONNREFUSED - Error: connection refused - Houve uma tentativa de envio de requisição a um endpoint, porém a conexão foi recusada. Normalmente é causada por inatividade do serviço que está sendo requisitado.

ECONNRESET -rror: connection reset - Uma conexão em andamento foi fechada durante o processo de requisição-resposta, antes que a resposta fosse recebida. Pode ser causada por um timeout ou reinício do servidor.

Lista completa de erros
    Documentação: https://nodejs.org/api/errors.html


*/





/* // Aula 4.6 Tratando novos erros

    import fs from 'fs';

    import chalk from "chalk";

    import pegaArquivo from "./index.js";

    const caminho = process.argv;

    function imprimeLista(resultado, identificador = '') {
        // identificador = ''
        // O parâmetro irá receber um valor inicial e ele será iniciado como String vazia
        // Se não for passado o segundo parâmetro, será incializado com String vazia
        // se for passado um valor pelo segundo parâmetro, será substituido o valor da string vazia pelo valor que vier do parâmetro

        // console.log(chalk.yellow('Lista de Links'), resultado);

        console.log(
            chalk.yellow('Lista de Links'),
            chalk.black.bgGreen(identificador),
                // Agora poderá imprimir o segundo parâmetro, que é o nome do Arquivo
            resultado);

    }


    async function processaTexto(argumentos){

        const caminho = argumentos[2];

        // Código que irá pegar o Erro e irá tratar o erro de uma forma que fique melhor para o usuário

        try {
            // 'try' = tente fazer isso
            // 'try' faz uma verificação

            fs.lstatSync(caminho);
                // Qualquer caminho incorreto que for recebido pelo parâmetro dentro do método "lstatSync()" irá gerar automaticamente um ERRO
                // O ERRO gerado denttro do 'try" é passado para ser tratado no "catch"

        } catch (erro) {
            // E esse ERRO será pegado pelo "catch" para ser tratado
            // O erro vai dentro do parâmetro "catch" para poder ser trabalho

            if (erro.code === 'ENOENT') {
                console.log ('Arquivo ou diretório não existe');

                return;
                    // É adicionado apenas o return para que não seja exibido as demais informações do objeto do erro
            } 
        }

        if (fs.lstatSync(caminho).isFile()) {
            const resultado = await pegaArquivo(caminho);
    
            imprimeLista(resultado);
                // Não foi passado o segundo parâmetro, então o segundo parâmetro será inicializado como uma string vazia, como foi definido na função "imprimiLista"

        } else if (fs.lstatSync(caminho).isDirectory()) {

            const arquivos = await fs.promises.readdir(caminho);

            arquivos.forEach( async (nomeDeArquivo) => {

                const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);

                imprimeLista(lista, nomeDeArquivo);
                // Foi passado o segundo parâmetro, então o segundo parâmetro será inicializado com o valor passado por esse parâmetro, substituindo a string vazia definida na função "imprimiLista"

            });


        }
        
    }

    processaTexto(caminho);
*/





/* // Aula 4.5 Processando diretórios
    
    // Refatoradno o código para que não seja necessário passar um arquivo por vez, mas informar o diretório onde estão todos os arquivos
    // O código irá itentificar se está sendo passa um arquivo ou um diretório
    // Caso seja um diretório, será feita a análise de todos os arquivos de dentro do ditetório

    import fs from 'fs';
        // A lib do Node 'fs' tem um método que verifica se é um caminho de um arquivo ou de um diretório 

    import chalk from "chalk";

    import pegaArquivo from "./index.js";

    const caminho = process.argv;

    function imprimeLista(resultado, identificador = '') {
        // identificador = ''
        // Esse parâmetro será iniciado com uma String vazia
        // Se não for passado o segundo parâmetro, será incializado com String vazia
        // se for passado um valor pelo segundo parâmetro, será substituido o valor da string vazia pelo valor que vier do parâmetro

        console.log(
            chalk.yellow('Lista de Links'),
            chalk.black.bgGreen(identificador),
            resultado);

    }

    //async function processaTexto(caminho){
    async function processaTexto(argumentos){
        // Foi trocado o nome "caminho" para "argumentos", pois o nome é mais apropriado para o que esse parâmetro recebe

        const caminho = argumentos[2];

        if (fs.lstatSync(caminho).isFile()) {
            // .fs é a lib que trás o método que irá ajudar verificar se é um arquivo ou um diretório
            // .lstatSync(caminho) é o método que irá possibilidar verificar ser é um diretório ou um arquivo
            // Obs:  "caminho" leva apenas o nome do diretório ou o nome do arquivo
            // .isFile() é usado em conjunto com o ".lstatSync()" para verificar se é um Arquivo
            // Só irá cair nesse "if" se o caminho passado no terminal for de um diretório

            //const resultado = await pegaArquivo(argumentos[2]);
            const resultado = await pegaArquivo(caminho);
    
            imprimeLista(resultado);
                // Função criada para imprimir o resultado do retorno do arquivo

        } else if (fs.lstatSync(caminho).isDirectory()) {
            // isDirectory() é usado em conjunto com o ".lstatSync()" para verificar se é um Diretório
            // Só irá cair nesse "else if" se o caminho passado no terminal for de um diretório
            
            // Se é um diretório, então é necessário pegar cada um dos arquivos para conseguir processar com o "pegaArquivo"

            const arquivos = await fs.promises.readdir(caminho);
                // É necessário indicar o "away" onde há um código assíncrono
                // A constante "arquivos" irá receber um Array com os nomes dos Arquivos
                // .readdir ler o diretório 
            
            // console.log(arquivos);
                // Retorna um Array com os nomes dos arquivos

            arquivos.forEach( async (nomeDeArquivo) => {
                // Como o forEach necessita de uma função callback e dentro dela é executada uma funçao assíncrona,
                // então é necessário que a função callback também seja assíncrona e informe o "assync ... await"

                const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
                    // É necessário colocar um "await", pois é necessário espear o processamento da função assíncrona 'pegaArquivo' 

                // console.log(`${caminho}/${nomeDeArquivo}`);
                    // Irá compor o caminho de cada arquivo
                    // ${caminho} o caminho informado no terminal 
                    //   /   A barra separando o diretório e o nome do arquivo
                    // ${nomeDeArquivo} o nome do arquivo

                    // Pode ser colocado no terminal: arquivos ou arquivos/
                    // Será reconhecido os 2 meios
                    // Se for colocado no terminal 'arquivo/', o nome do diretório e a barra
                    // O resultado será: "arquivo//texto.md"
                    // Terá duas barras // , mas não tem problema pois o sistema operacional resolve isso por debaixo dos panos as duas barras e achará o caminho do arquivo

                // console.log(lista);
                    // Irá imprimir a lista contendo processamento de cada arquivo de dentro do diretório

                imprimeLista(lista, nomeDeArquivo);
                    // Função criada para imprimir o resultado do retorno dos arquivos do diretório

            });


        }
        
    }

    processaTexto(caminho);
*/





/* // Aula 4.4 Organizando entradas e saídas

    import chalk from "chalk";

    import pegaArquivo from "./index.js";

    const caminho = process.argv;

    // function processaTexto(caminho) {
        // Essa função irá receber o caminho e irá mostrar o resultado
        // Devido essa função receber um retorno de uma função assíncrona, 
        // ela ire retornar uma promise {pending}

    async function processaTexto(caminho){
        // Devido a função "processaTexto" receber um retorno de uma função assíncrona, 
        // é necessário que a função "processaTexto" também seja assíncrona, indicando o "async ... await"
        // Ela deve esperar o resultado assíncrono da função "pegaArquivo"
        
        const resultado = await pegaArquivo(caminho[2]);
            // Informa que o retorno da função "pegaArquivo" tem código assíncrono envolvido

        console.log(chalk.yellow('lista de links'), resultado);
    }

    processaTexto(caminho);
*/





/* // Aula 4.3 Caminho absoluto VS Caminho Relativo

    import pegaArquivo from "./index.js";

    const caminho = process.argv;

    pegaArquivo(caminho[2]);

    // Caminho absoluto
        // A localização de um arquivo ou pasta é especificado a partir do diretório-raiz do sistema operacional.

    // Caminho Relativo
        // É definido a partir de sua relação com o PWD, ou seja, o present working directory (diretório de trabalho atual).

    // Caminho absoluto: /home/juliana/Desktop/curso-js/arquivos/texto1.md
    // Caminho relativo: ./arquivos/texto1.md

        // Na estrutura de diretórios, o "." representa "aqui".
        // Quando queremos sair do diretório atual e "voltar" um nível, utilizamos ".."
*/    





/* // Aula 4.2 Executando comandos

    // Será dento desse arquivo que será criado o código que fará a manipulação das informações que será passada pela linha de comando/terminal e que será jogado na aplicação

    // "objeto process" é o objeto do node que lida com argumentos da linha de comando 
        // Mas ele não é bom quando quando se quer adicionar argumentos e flags para funcionalidades adicionais. 
        // Fazer o gerenciamento dessas informações direto pelo array do process.argv começa a não parecer tão prático.

    // "Yargs" é outra biblioteca que também lida com argumentos da linha de comando, mas já lida melhor com argumetnos e flags
        // Sua funcionalidade básica é capturar os comandos do CLI e convertê-los em um objeto, 
        // assim os argumentos não dependem mais de estarem na posição correta de um array para funcionar.
        // Documentação: https://www.npmjs.com/package/yargs

    import pegaArquivo from "./index.js";
        // Import da função pegaArquivo do index.js

    const caminho = process.argv;
        //"argv" singnifica valores de argumento
        // "process.argv" irá guardar na constante "caminho" o caminho dos dois comandos informados no terminal

    // console.log(caminho);
        // process.argv retornou um Array com 2 strings dentro 
        // 1º é um caminho absoluto até o /bin/node, o pasta dos binários, onde estão os arguivos executáveis do node
        // 2º é um caminho absoluto até o arquivo cli.js
        // O objeto process retorna o caminho dos dois comandos passados na linha de comando do terminal, o caminho do "node" para localizar os executáveis e caminho do arquivo para conseguir compreender e executar os executáveis.

    pegaArquivo(caminho[2]);
        // Se for digitado no terminal:
        //      node src/cli.js ./arquivos/texto.md
        // O objeto process retornará 3 strings dentro, 1ª caminho do node, 2º caminho do arquivo e 3º) será o 3º termo digitado na linha do terminal "./arquivos/texto.md"
        // Foi chamada a função passando como parâmetro a 3ª posição do Array "caminho"
 */