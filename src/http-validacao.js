// Aula 5.8 Montando o objeto

    // Documentação NPM: https://docs.npmjs.com/cli/v7/commands/npm-run-script#description

import chalk from "chalk";

function extraiLinks(arrLinks) {

    return arrLinks.map((objetoArray) => Object.values(objetoArray).join());
}

async function chegaStatus (listaURLs) {
    // Será chamada a função "manejaErros" dentro da função "chegaStatus" devido ser dentro dela que o fetch está sendo executado e o erro tem que ser pego nesse momento

    const arrStatus = await Promise.all(

        listaURLs.map( async (url)  => {
            // É dentro o .map que tem que ser capturado e tratado o Erro, pois o erro será pega a cada varificação de um link,
            // então será colocado dentro do .map o "try...catch" 

            try {
                // É inserido dentro do "try{}" a caminho feliz do que se quer que seja executado
      
                const response = await fetch(url);

                // return response.status;
                return `${response.status} - ${response.statusText}`;      
                    // Não ocorendo erro, será retornado para dentro de "listaURLs" o código do status
                    // É possível retornar "response.status" e "response.statusText" devido serem propriedade do objeto "response", o retorno do fetch
            
            } catch (erro) {
                // "catch" irá pegar o erro que possa ocorrer na execução dentro "try", 

                return manejaErros(erro);
                    // Ocorrendo oe erro, o retorno serpa o retorno da função "manejaErros()"
                    // Se ocorrer um erro, será retornado para o .map, que está compondo a "litaURLs", a mensagem de erro da função "manejaErros"
                    // A mensagem da função "manejaErros" irá entrar como código de status na lista de "listaURLs"
            }
        })

        
        
    )
    return arrStatus;
}


function manejaErros(erro) {

   if (erro.cause.code === 'ENOTFOUND') {
        // Condição que irá verificar se a propriedade erro.cause.code é igual ao códgio de uma página nãp encontrada, 'ENOTFOUND'
       
        return 'Link não encontrado';
               // Será retornada essa mensagem se ocorrer o erro 'ENOTFOUND'

   } else {

        return 'Algo deu errado';
            // Se ocorrer outro erro irá, irá retronar a mensagem 
   }
    
}

export default async function listaValidada(listaDeLinks) {
    
    const links = extraiLinks(listaDeLinks);

    const status = await chegaStatus(links);

    // return status;
    return listaDeLinks.map((objeto, indice) => ({
        // Será retornado a lista de objetos os Links com os seus respectivos códigos de status que estão na constante "status"
        // Será usado o método .map() para fazer essa inserção
        // O callback irá criar um novo objeto contendo o objeto da listaDeLinks mais o código corresponte da lista da constante "status"
        // "objeto" parâmetro obrigatório do .map que representa da um dos elementos do Array
        // O .map e outro métodos de Array disponibilizam um parâmetro opcional, o número do índice que está sendo pecorrido no momento
        // "indice" ele irá guardar o valor numérico de cada loop o qual o indice do array pecorre

        // Criando o novo objeto:
        ...objeto,
            // Usando o Spred Operator, operador de espalhamento, para espalhar o conteúdo do objeto da listaDeLinks
            // A vírgula para separark os elementos internos do objeto

        status: status[indice]
            // Criando a estrutura do segundo elemento que contem o código do status
            // "status:" String que representa chave do objeto
            // "status[indice]" o elemento da constante que representa o valor do objeto
                // A cada iteração o indice irá pegar um elemento da lista "status" para colocar dentro da nova lista de objetos criada pelo .map()

    }))
}

// [gatinho salsicha](http://gatinhosalsicha.com.br/)
    // Se esse link estivesse dentro do arquivo texto,md ia explodir um erro na tela, pois o código antes não tinha tratamento de erro para páginas inexistentes.






/*// Aula 5.7 Para Saber Mais: Quando usar o método HTTP HEAD

    // Ele é usado para solicitar dados de um recurso especificado sem o corpo da resposta.

    //  Em outras palavras, o método HEAD retorna apenas o cabeçalho da resposta de uma requisição.
    // O método HTTP HEAD é uma das várias solicitações disponíveis no protocolo HTTP.
    // Existem várias situações em que é útil usar o método HEAD em vez do método GET (usado para retornar o corpo da resposta completa).
    // Aqui estão alguns exemplos:

    // 1) Verificação de disponibilidade
        // Caso queira identificar se um recurso está disponível ou não, pode usar o método HEAD em vez do método GET. Isso economiza recursos, já que você não precisa baixar todo o conteúdo, apenas verificar se o servidor está respondendo à solicitação.

    // 2) Verificação de cache
        // Ao solicitar um recurso, o servidor pode enviar um cabeçalho de resposta indicando que a resposta pode ser armazenada em cache por um período específico.
        // Usando o método HEAD, você pode verificar se a resposta em cache ainda está atualizada antes de baixar o conteúdo completo.
        
    // Verificação de autenticação
        // Quando um recurso estiver protegido por autenticação, você pode usar o método HEAD para verificar se o usuário tem permissão para acessar o recurso. 
        // Se a resposta do servidor indicar que o usuário não tem permissão, você evita o envio de uma requisição completa (GET) e melhora a performance da aplicação.
    
    // Verificação de tamanho do arquivo
        // Se você quiser saber o tamanho de um arquivo sem precisar baixá-lo inteiro, pode usar o método HEAD para recuperar o cabeçalho de resposta e obter informações sobre o tamanho do arquivo através do método Content-length sem que seja necessário baixar o conteúdo do body.

    // Em nosso código, para checar o status code de uma maneira mais performática, podemos seguir com o exemplo abaixo:

        // async function checaStatus(listaURLs) {
        //     const arrStatus = await Promise
        //       .all(
        //         listaURLs.map(async (url) => {
        //           try {
        //             const response = await fetch(url, { method: 'HEAD' })
        //             console.log(response)
        //             return response.status;
        //           } catch (erro) {
        //             return manejaErros(erro);
        //           }
        //         })
        //       )
        //     return arrStatus;
        //   }
          

        // Note que inserimos o { method: 'HEAD' } explicitamente no parâmetro da funçãofetch, pois se enviarmos apenas a url, fetch irá automaticamente utilizar o método GET. 
        // Dessa forma, garantimos que body virá com o valor null em nossa requisição.

    // Em resumo, o método HEAD é útil quando você precisa obter informações sobre um recurso sem precisar baixar todo o conteúdo. 

    // Isso pode melhorar o desempenho da sua aplicação e economizar recursos, especialmente quando se lida com grandes volumes de dados, 
    // rotas protegidas por autenticação ou quando precisamos de outros dados da resposta que não necessariamente o conteúdo do body.
*/        
    
    



/* // Aula 5.6 Para Saber Mais: requisições e respostas

    // requisição/resposta, são as duas pontas da comunicação cliente-servidor via HTTP.

    // HTTP, ou Hyper Text Transfer Protocol (protocolo de transferência de hipertexto) é um protocolo de comunicação entre computadores.

    // Artigo sobre HTTP: Desmistificando o protocolo da Web: https://www.alura.com.br/artigos/desmistificando-o-protocolo-http-parte-1?_gl=1*1aln7i0*_ga*ODE0OTAzMTc3LjE2ODkwMDM3NDE.*_ga_59FP0KYKSM*MTY5MTA5NTQ5Mi4xNi4xLjE2OTEwOTU1MzcuMC4wLjA.*_fplc*QkliTGQlMkZ3VjEzeXhQTks0SSUyQnE4ckRCVVNoUTZOeVJZSnhBd2ppUDJ5JTJCa0N6MU1HTW9VSFBCWENmJTJGV2w1S0pFQkZQWHNBTUF1TFEyJTJGRiUyRiUyQlpNaERXRzFkeEg5Rk1DNG5rYlpRJTJGV1QlMkZ2VTRqdUtaREtkQlQ5ZXJ5SjRxbVdRJTNEJTNE

    // URL - Uniform Resource Locator(localizador de recurso uniforme)
        // Ela representa um recurso específico na web. Recursos são coisas que eu quero interagir, como: imagens, páginas, arquivos, e videos. Neste caso, o recurso é a página inicial do site pomadasparabigode.com, normalmente um HTML.
        // URL Path (caminho da URL)

    // Números de porta
        // http://pomadasparabigode.com:80/listar-pomadas

        // Esse número 80 representa o número da porta que o servidor está usando para "ouvir" requisições HTTP. 
        // 80 é a padrão e é opcional no caso do uso do endereço em um navegador, então normalmente você não vê esse 80 nas URLs.
        // É mais comum especificarmos esta porta quando estamos testando a aplicação em ambiente de homologação/testes. O 443 aparece para o https.

    // Query strings
        //http://pomadasparabigode.com/busca?nome=pomadalegal

        //Tudo o que vem depois da ? é o que chamamos de query string. Nesse caso ?nome=pomadalegal
        // Geralmente colocamos na query string informações que serão interpretadas de alguma forma pela aplicação que é executada no servidor.
        // Não existe uma regra formal de como as query strings são montadas, mas a forma mais comum de utilização é através de pares chave-valor, separados por &,
        // como em ?nome=pomadalegal&tipo=2&categoria=bigodesruivos
        // http://pomadasparabigode.com/busca?nome=pomadalegal&tipo=2&categoria=bigodesruivos


    // Fragmento
        // http://pomadasparabigode.com/produto/pomada-especial#descricao

        // Esse #descricao na URL não é interpretado pelo servidor, mas sim pelo navegador do usuário.
        // Depois de carregar o recurso que é especificado através dessa URL, o navegador irá procurar um elemento com o id descricao na página
        // e irá posicionar a barra de rolagem a partir do início dele, ou seja, onde começa a descrição do produto.

    // RESUMO 

        // [esquema]://[servidor]:[porta]/[caminho]?[querystring]#[fragmento]

    // Media Types

        // Um recurso pode ser várias coisas diferentes: imagens, arquivos HTML, XML, videos e muitos mais. 
        // Pra que um servidor possa servir um recurso e para que o cliente possa consumi-lo apropriadamente, as partes envolvidas(cliente e servidor) têm de ser específicas e precisas quanto ao tipo do recurso.
        // Quando um servidor responde uma requisição HTTP, ele devolve o recurso e o seu tipo - chamado de Content-Type(também conhecido como media type). 
        // Para especificar tipos de recurso, o HTTP usa o MIME: Multipurpose Internet Mail Extensions.
        
        // MIME: Multipurpose Internet Mail Extensions.
            // Para especificar tipos de recurso, o HTTP usa um outro protocolo(que inicialmente foi feito para comunicação através de e-mail) chamado MIME: Multipurpose Internet Mail Extensions.

        // O content-type tem duas partes: tipo e subtipo.
        // Por exemplo:, um servidor pode devolver uma imagem no formato png. O content-type da resposta viria como image/png. Se fosse um jpg, o content-type seria image/jpg.
        // E se fosse um arquivo html? text/html. E um json? text/json. 
        // O navegador olha o Media Type para saber o que fazer com um arquivo.

    // Content Type Negotiation

        // 


    // O processo Request-Response

        // Um cliente precisa de um recurso que está em um outro computador.
        // Então, o cliente você faz uma requisição (request) para um servidor usando uma linguagem e vocabulário que espera que o servidor consiga entender.
        // Se o servidor conseguir entender sua requisição e tiver o recurso disponível, ele irá responder com uma resposta(response). 
        // Caso o servidor entenda a requisição mas não tenha o recurso, provavelmente ele vai responder que não tem. 
        // Caso ele não entenda a requisição, você pode não ter resposta.
        
        // Request e Response são dois tipos de mensagem diferentes quando falamos de HTTP.
        // A especificação HTTP diz exatamente o que podemos colocar dentro de cada um destes tipos de mensagem para que todos que "falem" o idioma HTTP consigam trocar infomações corretamente.

        // Resumidamente, o Http abre uma conexão com o servidor em questão e envia para ele um monte de texto seguindo regrinhas especificadas pelo protocolo.
        
*/ 





/*// Aula 5.5 Validando Links

function extraiLinks(arrLinks) {

    return arrLinks.map((objetoArray) => Object.values(objetoArray).join());
}

async function chegaStatus (listaURLs) {
    // Função que irá receber uma lista com os links para serem checados
    // A função "checaStatus" precisa ser assíncrona detido está executando dentro de si a função assíncrona "fetch()"

    // return await listaURLs.map( async (url)  => {
        // Como se trata de uma lista de promessas, então esse formato não é possível receber o retorno da lista de promessas
        // É preciso usar outro método para resolver toda lista de promessas

    const arrStatus = await Promise.all(
        // A constante "arrStatus" irá receber a lista com as promessas resolvidas 
        // Da forma que estava antes, a lista com as promessas pendentes não seria resolvida
        // Para resolver uma lista de promessas é necessário usar o método "Promise.all()"
        // Dentro do "Promise.all" será pasado todo o código do .map
        // Ao final, o "Promisse.all()" irá resolver essa lista com promessas pendentes recebida do .map() e irá retonar uma lista de promessas resolvidas.
        
        listaURLs.map( async (url)  => {
              // .map() será usado método que seria iteirado para que possa retornar uma lista com os Status Code
              // O ".map()" precisa de uma função callback para executar a cada iteração
              // (URL) É necessário passar para a função callback um parâmetro que representará cada elemento de dentro da lista
  
              const response = await fetch(url);
                  // A constante 'response' irá guardar o objeto "Response" de cada elemento/url, esse objeto tem várias propriedades que podem ser trabalhadas
                  // fetch() é uma função assíncrona e por isso é preciso que seja indicado o termo "await"
                  // A função "fetch()" precisa receber um link no formato de uma String como parâmetro
                  // "Response" é um retorno do "fetch()", que é um objeto promessa. Por isso que ela tem que ser trabalhada com o "async ... await"
                  // Documentação: https://developer.mozilla.org/en-US/docs/Web/API/Response 
  
              return response.status;
                  // ".status" é uma propriedade do objeto "Response". 
                  // ".status" é a propriedade que irá retornar, de cada elemento/url, o código de status para que o .map() possa compor a lista de status code.
                  // Documentação sobre Códigos de status de respostas HTTP: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
  
      })

    )

    return arrStatus;
      // Depois que é resolvida a lista com os códigos pende
      // Será retornado a lista com os códigos de status 

}

export default async function listaValidada(listaDeLinks) {
    // A função "chegaStatus" tem dentro dela um código assíncrono e, por isso, é necessário colocar o termo "async" antes da função "imprimeLista()" para indicar que é necessário aguardar o retorno da promessa

    // return geraLinks(listaDeLinks);
    const links = extraiLinks(listaDeLinks);
        // A contante "links" irá receber a lista com as URLs extraidas do objetos, que, por sua vez, estão dentro de uma Array

    const status = await chegaStatus(links);
        // A constante "status" irá receber a lista com os Códigos de Status vindos da função "checaStatus"
        // A função chegaStatus(Links) leva no seu parâmetro a lista contendo as URLs para serem validadas
        // Como a "chegaStatus()" espera um código assíncrono, então é necessário colocar o termo "await" para aguardar o retorno da promessa

    // console.log(status);
        // Console.log para visualizar a lista de códigos da constante "status"

    return status;
        // Será retornado a lista de códigos de status da constante "status" para quem chamar a função "listaValidade" 
        // A função "imprimeLista" do "cli.js" chama a função "listaValidade" e irá receber o retorno dela.

}

        // [gatinho salsicha](http://gatinhosalsicha.com.br/)


*/





/* // Aula 5.4 Gerando uma lista de URLs

function geraLinks(arrLinks) {
    // Criada a função para gerar uma Array apenas com os links 

    return arrLinks.map((objetoArray) => Object.values(objetoArray)); //.join());
        // Será usado o médoto "map()" para fazer um look em cada objeto, extrair apenas o valor de cada objeto e retornar uma lista apenas com esses valores
        // O Método "map()" precusa de um função callback "(objetoArray) => Object.values(objetoArray).join()"
        // (objetoArray) é o parâmetro da função que pega cada objeto do Array "arrLinks"
        // "Object.values(objetoArray).join()" O código do bloco da função callback 
        //  "Object.values(objetoArray)" é o método o objeto que pega apenas o valor do objeto dentro de um objeto. O médoto leva no seu parâmetro o objeto que será retirado o valor.
        // Se não tivesse o .join cada valor ia retonar dentro de um objeto: [ 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList' ],
        // ".join" transforma o objeto e uma string, retirando o formato do objeto: https://developer.mozilla.org/pt-BR/docs/Web/API/FileList',

}


export default function listaValidada(listaDeLinks) {

    return geraLinks(listaDeLinks);

}
*/





/* // Aula 5.2 Adicionando opções

    // Foi adiconado no package.json mais um novo script: 
    // "cli:valida": "node src/cli.js ./arquivos/texto.md --valida"

    // Agora tem 2 scripts, 1 com a validação e outro sem a validação

    // Documentação sobre padrões no guia de estilo para CLI: https://devcenter.heroku.com/articles/cli-style-guide
    // Artugo: https://blog.developer.atlassian.com/10-design-principles-for-delightful-clis/
    // CLI: https://youtu.be/8AgOxHOAV9Y
    // Por que aprender linha de comando: https://youtu.be/8f0CKHcf8vc
    // Como criar um CLI: https://youtu.be/0Eub-aQs-44
      
    // Fornecer para o JS uma forma dele identificar que deve validar a lista ou não 


export default function listaValidada(listaDeLinks) {

    return 'Entrou na função';

}
*/