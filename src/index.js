// Aula 4.4 Organizando entradas e saídas

import fs from 'fs';

import chalk from 'chalk';

function extraiLinks(texto) {

    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
        
    const capturas = [... texto.matchAll(regex)];  

    const resultados = capturas.map(captura => ({ [captura[1]] : captura[2] }))

    return resultados.length !==0 ? resultados : "não há links no arquivo";

}

function trataErro(erro) {
    // console.log(erro);
    throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));
}

async function pegaArquivo(caminhoDoArquivo) {
    
    try {

        const encoding = 'utf-8';
        const texto = await fs.promises.readFile (caminhoDoArquivo, encoding);

        //console.log(extraiLinks(texto));

        return extraiLinks(texto);
            // Agora a função "pegaArquivo" não irá mais exibir o retorno
            // Essa função será passada para a função "processaTexto" do arquivo cli.js que irá receber as informações e retornar as informações

    } catch (erro) {

        trataErro(erro)

    }

}

export default pegaArquivo;




/* // Aula 4.2 Executando comandos

    // Fazendo com que a função "pegaArquivo" pegue o caminho do arquivo a partir do comando do terminal que é executado o arquivo 
    // Quando for digitado o caminho, será passado o caminho do arquivo

import fs from 'fs';

import chalk from 'chalk';

function extraiLinks(texto) {

    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
        
    const capturas = [... texto.matchAll(regex)];  

    const resultados = capturas.map(captura => ({ [captura[1]] : captura[2] }))

    return resultados;

}

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));
}

async function pegaArquivo(caminhoDoArquivo) {
    
    try {

        const encoding = 'utf-8';
        const texto = await fs.promises.readFile (caminhoDoArquivo, encoding);

        console.log(extraiLinks(texto));

    } catch (erro) {

        trataErro(erro)

    }

}

// pegaArquivo('./arquivos/texto.md');
    // Mudando a foram que o caminho é passado, pois ele está sendo passado de forma dura.
    // Da forma que está aí, o program irá funcionar apenas com esse caminho fixo
    // Não irá mais receber uma string, um valo fixo, para passar a receber o valor vindo da linha de comando

export default pegaArquivo;
    // Fazendo o export da função para que ela possa ser chamada no arquivo cli.js
*/







/* // 3.7 Libs focadas em validação de formulários

    1) Joi
        A Joi tem um ambiente de testes que ajudam a visualizar melhor como utilizar os métodos dessa lib.
        Link: https://joi.dev/

    2) Yup
        Link: https://www.npmjs.com/package/yup

*/






/* // Aula 3.6 Retornando os links

    import fs from 'fs';

    import chalk from 'chalk';

    const textoTeste = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).'

    // Criando uma função para lidar com as Expressões Regulares
    function extraiLinks(texto) {

        const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
        // const capturas = texto.matchAll(regex);
            // Não vai ser mais usado o método RegExp
            // Vai ser usado novamente o método de String, o .matchAll()
                // Documentação: .matchAll(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll
            
        //console.log(capturas);
            // Retornou um: Object [RegExp String Iterador] 
            
        const capturas = [... texto.matchAll(regex)];  
            // O .matchAll é um método iterável que retorna todos os resultados que deram match com a expressão regular
            // Esse método retorna um iterável
            // O método .matchAll() retorna um: Object [RegExp String Iterador] 
            // [... iteravel] As reticencias são usadas antes do que se quer expandir. Elas são um operador de expalhamento, o spread operator do JS
            // O spread operator permite que um objeto iterável se expanda
            // Elas estão sendo usadas para expalhar o retorno iterável do método .match()

        // console.log(capturas);
            // Depois de usar o spread operator, agora retornou um Array de Arrays.
            // Foi solicitado por meio do spread operator para que o objeto se expandisse dentro de um Array
            // Cada indíce do Array Global é uma ocorrência dos matchs inteiro, uma captura inteira.
            // Trás de cada ocorrência várias informações de cada match.

        const resultados = capturas.map(captura => ({ [captura[1]] : captura[2] }))
            // Dois detalhes sobre a sintaxe do JS:
            // [captura[1]]  -  Quando se tem a estrutura que se quer usar a posição de um Array como chave de um objeto, é preciso englobar ele por colchetes
            // ({ [captura[1]] : captura[2] })) - Quando se abre chaves para criar um objeto é a mesma forma que o JS usada para abrir um bloco de função, então para diferenciar é necessário englobar as chaves do objeto por parênteses.

        // console.log(resultados);
            // Retorna um Array com os objetos de cada ocorrência
            // Foram criados os objetocs com chave contendo o nome e como valor contendo o link.

        return resultados;
            // Retornando os resultados para a Array "resultados" possa sair da função "extraiLinks" e possa ser usado pela função "pegaArquivo"
    
    }

    // extraiLinks(textoTeste);
        // Será chamado pela função pegaArquivo
    

    function trataErro(erro) {
        console.log(erro);
        throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));
    }
    
    async function pegaArquivo(caminhoDoArquivo) {
        
        try {
    
            const encoding = 'utf-8';
            const texto = await fs.promises.readFile (caminhoDoArquivo, encoding);
        
            // console.log(chalk.green(texto))
            console.log(extraiLinks(texto));
                // Será chamada a função que irá levar como parâmetro o texto tradizo pelo .reagFile

        } catch (erro) {
    
            trataErro(erro)
    
        }
    
    }

    
    pegaArquivo('./arquivos/texto.md');

*/





/* // Aula 3.3 Capturando Grupos

    // Tratando o Regex

    // Tem várias formas de se trabalhar com Expressões Regulares
        // 1) Método RegExp, criando um novo RegExp e passa a expressão Regula 
        // 2) Métodos de String (o que será usado nessa aula), como matchAll(), replace(), split() e outros
        // Documentação: RegExp: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions

    // Regex para pegar a parte do texto que contêm os nomes e os links:
        //      \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

    // Foi separado por parênteses para criar os grupos
    // O grupo irá seperar parte da expressão, o grupo irá retonar exatemente o texto contendo o nome e o link
        //      1º grupo contendo o nome: ([^[\]]*?)
        //      2º grupo contendo o link: (https?:\/\/[^\s?#.].[^\s]*)

    import fs from 'fs';

    import chalk from 'chalk';

    const textoTeste = 'São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.).'

    // Criando uma função para lidar com as Expressões Regulares
    function extraiLinks(texto) {

        const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
            // Passando a expressão para dentro de uma variável
            // A expressão tem que está emglobada dentro de duas barras / /
            // Ao final da expressão e da última barra, é colocado "gm"
            // G de global
            // M de multilinha

        // Esse método .match trouxe apenas as expressões completas e com ele não é possível capturar os grupos que contêm os textos específicos
            // const capturas = texto.match(regex);
            //     // É criada a contante para receber a Array contendo os matchs contidos no texto
            //     // É usado o método de String, o .match
            //     // "texto" é a String com o texto, "match" é o método usado para encontrar as combinações e como parâmetro dele vai a Expressão

        // Será necessário trabalhar com o método do próprio RegExp, o .exec, para trabalhar com os grupos
        const capturas = regex.exec(texto);
            // É usado o método de Regex, o .exec
            // "regex" a expressão regular vem antes, depois vem o método .exec e como parâmetro vai a string com o texto            
            // Documentação: .exec: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec

        console.log(capturas);
    
    }

    // Chamando o a função "extraiLinks"
    extraiLinks(textoTeste);
    

    function trataErro(erro) {
        console.log(erro);
        throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));
    }
    
    async function pegaArquivo(caminhoDoArquivo) {
        
        try {
    
            const encoding = 'utf-8';
            const texto = await fs.promises.readFile (caminhoDoArquivo, encoding);
        
            console.log(chalk.green(texto))        
        } catch (erro) {
    
            trataErro(erro)
    
        }
    
    }

    
    // pegaArquivo('./arquivos/texto.md');
*/





/* // Aula 3.1 e 3.2 Expressões Regulares 

    import fs from 'fs';

    import chalk from 'chalk';
    
    function trataErro(erro) {
        console.log(erro);
        throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));
    }
    
    async function pegaArquivo(caminhoDoArquivo) {
        
        try {
    
            const encoding = 'utf-8';
            const texto = await fs.promises.readFile (caminhoDoArquivo, encoding);
        
            console.log(chalk.green(texto))        
        } catch (erro) {
    
            trataErro(erro)
    
        }
    
    }
    
    pegaArquivo('./arquivos/texto.md');
    
    pegaArquivo('./arquivos/');

    // Expressões regulares

        // Documentação: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions

        // Site para praticar Expressões regulares: https://regex101.com

    // Expressão Regular para encontrar o 
        //      \[[^[\]]*?\]

        //      \(https?:\/\/[^\s?#.].[^\s]*\)

        //      \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
            // Foi colocado parenteses para que pudesse criar grupos dentro da Expressão Regular
            // Esse grupo pegar exatemente os textos que ser quer usar

*/




/* // Aula 2.7 Promessas - async / await (forma mais nova)

    // Quado se fala em "promessas" em JS, estamos falando de código assíncrono
    // async / await é a forma mais de resolver promessas, códigos assíncronos 

import fs from 'fs';

import chalk from 'chalk';


function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));
}

    // Depois da refatoração para usad o Async / Await, a função trataErro deixou de funcionar
    // Será usado com o Async/Await o Try / Catch



// Código assíncrono é feito com o async / await

async function pegaArquivo(caminhoDoArquivo) {
    // "async" é o termo colocado antes da função para indicar que é uma função assíncrona
    // Informa que há um código assíncrono que tem que ser resolvido antes que retorne o resultado da função
    
    try {
        // Dentro do "try" é colocado tudo que se quer que aconteça com sucesso 

        const encoding = 'utf-8';
        const texto = await fs.promises.readFile (caminhoDoArquivo, encoding);
            // "await" é o termo que tem que ser adicionado em trodos os trechos de código onde se tem que aguardar a promosssa retornar
    
        console.log(chalk.green(texto))        
    } catch (erro) {
        // Dentro do "catch" é chamada a função trata erro
        // A função "catch" precisa de um parâmetro, que, no caso, é o "erro"

        trataErro(erro)

    }

}

    // Código assíncrono feito com o .then()

        // function pegaArquivo(caminhoDoArquivo) {
        //     const encoding = 'utf-8';
        //     fs.promises
        //         .readFile(caminhoDoArquivo, encoding)
        //         .then((texto) => console.log(chalk.green(texto)))
        //         .catch(trataErro);
        // }

pegaArquivo('./arquivos/texto.md');

pegaArquivo('./arquivos/');

*/


/* // Aula 2.3 Promessas - .then() é 1ª forma de trabalhar com Código Assíncrono
    
    // Código Assíncrono é um código que não espera a finalização de uma tarefa para iniciar a seguinte
    // A tarefa retonar o resultado quando ela é finalizada
    // A lib do NodeJS já está preparado para trabalhar com o código assíncrono
    // Quado se fala em "promessas" em JS, estamos falando de código assíncrono

import fs from 'fs';

import chalk from 'chalk';

function trataErro(erro) {

    console.log(erro);

    throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));

}

    // Código assíncrono = não precisa espera a finalização de uma tarefa para poder inicar a seguinte. Quando a tarefa é finalizada o código retorna o resultado.

function pegaArquivo(caminhoDoArquivo) {
    // Código refatorado da funçãoco com os métodos assíncronos do NodeJs

    const encoding = 'utf-8';

    fs.promises
        // ".promises" Método da biblioteca do NodeJS para trabalhar com código ASSÍNCRONO
        .readFile(caminhoDoArquivo, encoding)
            // Muda a forma que é processada a resposta do "readFile", não é passado mais a função callback no terceiro parâmetro
        .then((texto) => console.log(chalk.green(texto)))
            // "then()" é a forma em que o JS trabalha o códigos ASSÍNCRONOs em conjunto com o ".promises"
            // "then()" significa "então()", que serve para encadear códigos assíncronos
            // O "then()" irá executar algo quando o objeto promessa for resolvido
            // A função "then()" recebe como parâmetro outra função, a função callback
            // É pedido para ler o arquivo pelo "readFile" e "então()" ele faz alguma outra coisa depois de lido o arquivo
            // O objeto promessa é passado como parâmetro para dentro da função callback  ".then((texto) => console.log(chalk.green(texto)))"
            // 
        .catch(trataErro);
            //.catch(trataErro) É IGUAL a .catch(trataErro(erro));
            // É a função que trata o "erro"
            // Se encontrar algum erro, o ".catch" irá pegar
            // Essas duas formas de escrevar são iguais = .catch(trataErro) === .catch(trataErro(erro))
            // ".catch(trataErro)" Por baixo dos panos o JS irá passar o erro para dentro do parâmetro da função

        //.readFile, .then, .catch não estão uma dentro da outra, mas encadeadas
        //.readFile devolve uma promessa
        //.then recebe a promessa que será tratada e resolvida pelo .then()
        //.catch se tiver algum problema durante a resolução dentro do .then(), será lançado automaticamente para dentro do .catch()

}

// Código síncrono = executa em sequência, uma instrução após a outra

// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if (erro) {    
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

pegaArquivo('./arquivos/');
*/




/* // Aula 2.2 Tratamento de Erros - Código Síncrono

    // Documentação do NodeJS: Construtur de Erro
    // https://nodejs.org/api/errors.html#new-errormessage-options

import fs from 'fs';

import chalk from 'chalk';

function trataErro(erro) {
    // Função que será chamada quando ocorrer um Erro no readFile

    console.log(erro);
        // Console.log para ver o objeto Error inteiro criado pelo JavaScript

    // throw new Error(erro);
        // // É colocado no parâmetro da instância "Error" o "erro" que a função "trata erro" está recebendo do readFile
        // // "throw" signiga jogar. No caso, ele irá jogar o erro. Esse erro é jogado para fora do program para que possa ser tratado.
        // // "Error" é um objeto de JS. "new Error" instância um novo objeto Error.
        // // "throw new Error" lançar um novo objeto instanciado do erro.
        // // A informação que consta dentro da parâmetro "erro" é passada dentro do objeto "Error" do JS

    throw new Error(chalk.red(erro.code, ": não há arquivo no diretório"));
        // Refatorando o código do lançamento do Error
        // Usando o chalk.red() para que o erro venha em vermelho
        // Será passado 2 parâmetros:
        // 1) "erro.code" - É passada a propriedade do erro, o código do erro.
        // 2) ": não há arquivo no diretório" - texto para o usuário

}

function pegaArquivo(caminhoDoArquivo){

    const encoding = 'utf-8';

    fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
        // foi colicado no parâmetro da função anônima o termo "erro" que indica que o erro será tratado
        // o "readFile" está configurado para pegar o erro e jogar no parâmetro da função anônima

        if (erro) {
            // Condição para vericar se o erro ocorreu.
            // Se ocorrer o erro, irá dar "true", a condição será atendida e será executado o bloco de código
            
            trataErro(erro);
                // Será chamada a função "trataErro" 
                // A função levará como parâmetro "erro"
        }

        console.log(chalk.green(texto));

    })

}

pegaArquivo('./arquivos/');
*/




/* // Aula 2.1 Trabalhando com a Lib fs - Código Síncrono 

    // Código Síncrono é um código executado em sequência
    // É executado uma instrução após a outra

import fs from 'fs';
    // "fs" é o file system, sistema de arquivos.
    // Essa biblioteca permite que a linguagem de programação consiga interagir com o sistema de arquivos de computador
    // Não é necessário fazer o "npm install <nome>" devido essa biblioteca ser nativa do Node.js

    // https://nodejs.org/dist/latest-v6.x/docs/api/fs.html

import chalk from 'chalk';

function pegaArquivo(caminhoDoArquivo){

    const encoding = 'utf-8';

    fs.readFile(caminhoDoArquivo, encoding, (_, texto) => {
        // O método "readFile" recebe 3 parâmetros: o caminho, o encoding e a função callback que sera executada.
            // No método callback terá 2 parâmetros, o primeiro parâmetro é o ERRO e o segundo é o próprio retorno (no caso, o texto).
            // Como não está sendo usado o parâmetro de Erro, então é colocado o underline

        console.log(chalk.green(texto));

    })

}

pegaArquivo('./arquivos/texto.md');
    // Chama a função e passa como parâmetro o caminho do arquivo.
*/