# EXTENSÃO PARA O AVALIADOR

A função desta extensão é carregar o documento anexado em uma nova aba, que pode ser colocada em uma nova tela ou dividida (duas abas na mesma tela)

* Autor: Luis Eduardo Silva dos Santos
* repositório: <https://github.com/djedu28/>
* LICENSE: MIT
* Ultima atualização em: 21/10/2024

## Como funciona

* o script vai abrir uma nova aba

* Enquanto vc navega pela página, o script vai rastrear quando aparecer o link do Documento e atualizar a nova aba com esse conteúdo

* Sempre que recarregar a página de avaliação, será necessário colar o script do `passo 1` de **como usar**

## Como usar

1. Copie o conteúdo de [/dj-script-documentos-iframe](dj-script-documentos-iframe.js)
2. cole no console do navegador com a página de avaliação aberta aberta

### Uma alternativa de importação é colar o comando

```js
var imported = document.createElement('script');
imported.src = 'https://djedu28.github.io/avaliar-inscritos-extensao/dj-script-documentos-iframe.js';
document.head.appendChild(imported); 

```

## Recomendação

Para quem sabe programar, é recomendado ler o script antes de colar, para se certificar da segurança do mesmo antes de executar.

## Se foi util, deixa a 🌟 (agradeço)

🌟 <https://github.com/djedu28/avaliar-inscritos-extensao>
