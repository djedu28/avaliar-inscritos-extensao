// Autor: Luis Eduardo Silva dos Santos
// repositório: https://github.com/djedu28/
// LICENSE: MIT
// Ultima atualização em: 21/10/2024

// Variáveis globais
let lastUrl = null;
let documentWindow = null;

// Função para encontrar o link "documentos"
function findDocumentLink() {
    console.log("findDocumentLink")
    const links = document.querySelectorAll('a');
    for (const link of links) {
        if (link.textContent.trim().toLowerCase() === 'documentos') {
            return link.href;
        }
    }
    return null;
}

// Função para abrir ou atualizar o documento
function abrir_documento(url) {
  console.log("abrir_documento", url)
    // Se já temos uma janela aberta, atualize seu conteúdo
    if (documentWindow && !documentWindow.closed) {
        documentWindow.location.href = url;
    } else {
        // Caso contrário, crie uma nova janela
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const width = Math.floor(screenWidth / 2);
        const height = Math.floor(screenHeight / 2);

        documentWindow = window.open(
            url,
            '_blank',
            `width=${width},height=${height}`
        );
    }
}

// Função principal para verificar e executar ações
function checkAndExecute() {
    console.log("checkAndExecute")
    const currentUrl = findDocumentLink();
    
    if (currentUrl !== null && currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        abrir_documento(currentUrl);
    }
}

// Adicione o listener ao evento load
window.addEventListener('load', function() {
    console.log("addEventListener")
    // Execute imediatamente após o carregamento
    checkAndExecute();

    // E também em cada recarga subsequente
    window.addEventListener('load', checkAndExecute);
});
