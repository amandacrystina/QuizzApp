export const perguntas = [
  ['Qual linguagem estrutura o conteúdo de uma página web?', ['CSS', 'HTML', 'SQL', 'Python'], 1],
  ['Qual propriedade CSS altera a cor do texto?', ['background', 'font-size', 'color', 'opacity'], 2],
  ['Qual método adiciona um item ao final de um array em JavaScript?', ['push()', 'pop()', 'shift()', 'slice()'], 0],
  ['Qual hook do React guarda estado em um componente?', ['useEffect', 'useRef', 'useContext', 'useState'], 3],
  ['Qual elemento do React Native exibe texto?', ['View', 'Text', 'Image', 'ScrollView'], 1],
  ['Qual comando do Git mostra o estado dos arquivos no repositório?', ['git push', 'git log', 'git status', 'git clone'], 2],
  ['Qual método HTTP é normalmente usado para consultar um recurso?', ['DELETE', 'PATCH', 'POST', 'GET'], 3],
  ['Qual valor JSON representa a ausência de um valor?', ['null', 'undefined', 'NaN', 'void'], 0],
  ['Qual propriedade do Flexbox controla a direção dos itens?', ['alignItems', 'flexDirection', 'gap', 'justifyContent'], 1],
  ['Qual arquivo declara as dependências de um projeto npm?', ['app.json', 'index.js', 'package.json', '.gitignore'], 2],
];

export function calcularResultado(respostas) {
  const acertos = perguntas.filter(([, , correta], indice) => respostas[indice] === correta).length;
  return { acertos };
}
