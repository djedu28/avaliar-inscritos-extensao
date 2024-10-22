// Autor: Luis Eduardo Silva dos Santos
// repositório: https://github.com/djedu28/
// LICENSE: MIT
// Ultima atualização em: 21/10/2024

// Variáveis globais
var newTab = null;


// Função para encontrar o link "documentos"
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

// Função para encontrar o link "documentos"
function findDocumentLink() {
    // buscando link com xpath pelo aria-label
    var link = getElementByXpath(`//a[@aria-label="Documentos"]`);
    if (!link){
        // buscando link com xpath pelo modal id="overlay-scroll"
        link = getElementByXpath(`//*[@id="overlay-scroll"]/div[3]/div/div/div/div/div/a`);
    }
    // se link foi encontrado, então retorna endereço dele
    if (link){
        return link.href;
    }
    // se não foi encontrado por xpath, então buscamos todos os links em tela do modo tradicional
    const links = document.querySelectorAll('a');
    for (const link of links) {
        if (link.textContent.trim().toLowerCase() === 'documentos' || link.href.startsWith("https://drive.google.com")) {
            // console.log(link)
            return link.href;
        }
    }
    return null;
}

// função que gera o html com iframe
function html_iframe(url, nome=""){
    if (!!url && url.startsWith("https://drive.google.com/open?")){
        id = (new URL(url)).searchParams.get("id")
        if (!id) return;
        url = `https://drive.google.com/file/d/${id}/preview`
    }
    let title = "404 Documento não encontrado"
    let body = `
        <h2>Esperando um documento</h2>
        <div>
            <p>Navegue pela página até chegar onde tem o link do documento, e ele será exibido aqui automaticamente</p>
        </div>
        <div id="autor">
            <img src="https://avatars.githubusercontent.com/u/43933482?v=4" style="width: 150px;border: ;border-radius: 50%;">
            <h3>Extensão feira por <a href="https://github.com/djedu28">Eduardo Santos</a></h3>
        </div>
    `
    if (url){
        title = `Documento de ${nome}`
        body = `
            <h2>Conteúdo do Documento de ${nome}</h2>
            <iframe  width="100%" height="100%" src="${url}" allow="autoplay"></iframe>
        `
    }
    return `
    <html>
        <head>
            <title>${title}</title>
            <style>
                html { overflow: ${!!url ? "hidden;" : "auto" }; background: #1a1919;}
                a:visited { color: blue; }
                @media (prefers-color-scheme: light ) {
                    html { background: #FFF; }
                }
                body { font-family: Arial, sans-serif; margin: 0px; padding: 0px; color: orange; }
                h2 { color: orange; display: flex; justify-content: center; margin: 0; padding: 10px;}
                iframe { width: 100%; height: 90vh; border: none; }
                div { padding: 20px; }
                #autor {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    img {width: 150px; border: ; border-radius: 50%;}
                }
                p {
                    width: 300px;
                    padding: 10px;
                    font-weight: 900;
                }
            </style>
        </head>
        <body>
            ${body}
        </body>
    </html>
    `
}

// Função para abrir ou atualizar a nova aba
function abrir_documento(url, name) {
    // Se já temos uma aba aberta, atualize seu conteúdo
    if (newTab && !newTab.closed) {
        newTab.document.write(html_iframe(url, name));
        newTab.document.close(); // Fecha o stream de escrita
        newTab.lastUrl = url;
    } else {
        // Caso contrário, crie uma nova aba
        newTab = window.open('', '_blank');
        // Aguarde até que a nova aba esteja carregada
        setTimeout(
            () => {
                newTab.document.write(html_iframe(url, name));
                newTab.document.close(); // Fecha o stream de escrita
                newTab.lastUrl = url;
            }
        , 5000);
    }
}

// Função principal para verificar e executar ações
function checkAndExecute() {
    console.log("checkAndExecute")
    const currentUrl = findDocumentLink();
    const name_a = getElementByXpath(`//*[@id="overlay-scroll"]/div[1]/div/div/div/div/div[2]/div/div/h2`)?.textContent
    const name = name_a || "?"
    if ((newTab && newTab.closed) || currentUrl !== newTab?.lastUrl) {
        abrir_documento(currentUrl, name);
    } else if (!!currentUrl){
        setTimeout(checkAndExecute, 3000);
    }
}

function ativaEventos() {
    console.log("evento ativado")
    // Execute novamente apos 3 segundos do carregamento
    setTimeout(checkAndExecute, 3000);
    setTimeout(checkAndExecute, 6000);
    setTimeout(checkAndExecute, 10000);
    // E também em cada recarga subsequente
    window.addEventListener('click', ()=>setTimeout(checkAndExecute, 1000), true);
}

// Execute imediatamente após colar o script
// checkAndExecute();

// Adicione o listener ao evento load
ativaEventos();
// window.addEventListener('load', ativaEventos, true);

// // Adicione o listener ao evento popstate
// window.addEventListener('popstate', function (event) {
//     // Execute a verificação sxempre que o histórico mudar
//     checkAndExecute();
// },true);

// // Execute uma vez após o carregamento inicial da página
// document.addEventListener('DOMContentLoaded', function () {
//     checkAndExecute();
// },true);

// , { passive: false, capture: true }