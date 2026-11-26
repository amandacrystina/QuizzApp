# Quizzzz

Quiz de múltipla escolha sobre desenvolvimento de software, feito em JavaScript com React Native e Expo. São 10 perguntas sobre temas como HTML, CSS, JavaScript, React, Git e HTTP.

Na tela inicial, você pode jogar ou abrir a tela **Sobre**. Para jogar, informe seu nome, selecione uma alternativa por pergunta e confirme para avançar. A última tela mostra o total de acertos e permite iniciar uma nova partida. As perguntas ficam no próprio projeto e as respostas são mantidas em memória durante a partida.

## Como rodar

Você precisa de Git, Node.js e npm. A exportação web foi verificada com Node.js 24.14.1 e npm 11.4.1.

```bash
git clone https://github.com/amandacrystina/QuizzApp.git
cd QuizzApp
npm ci
npx expo start
```

Com o servidor do Expo rodando, pressione **w** no terminal para abrir o quiz no navegador. Para encerrar o servidor, pressione **Ctrl+C**.

| Comando | O que faz |
| --- | --- |
| `npx expo start` | Inicia o servidor do Expo e exibe as opções de execução. |
| `npm run web` | Abre o quiz no navegador. |
| `npm run android` | Solicita a abertura no Android. Tenha um emulador configurado ou um dispositivo conectado. |
| `npm run ios` | Solicita a abertura no simulador de iOS. Requer macOS com Xcode e um simulador configurado. |
| `npx expo export --platform web` | Gera os arquivos estáticos da versão web em `dist/`. |

## Como o JavaScript funciona

- [index.js](index.js) registra o componente `App` como ponto de entrada do Expo.
- [App.js](App.js) usa `useState` para guardar o nome, a tela de entrada, as respostas confirmadas e a alternativa selecionada. O número de respostas confirmadas indica qual pergunta deve aparecer. Ao confirmar uma alternativa, o app registra seu índice e limpa a seleção. Depois da última pergunta, calcula e exibe o resultado.
- [janelas/Telas.js](janelas/Telas.js) reúne os componentes de início, sobre, identificação, pergunta e resultado. Eles recebem dados e funções por meio de props. Por exemplo, a tela de pergunta chama a função de seleção ao tocar em uma alternativa, e o botão de avanço fica desabilitado até haver uma escolha.
- [dados/perguntas.js](dados/perguntas.js) armazena as perguntas e exporta `calcularResultado(respostas)`. A função usa `filter` para comparar cada resposta com o gabarito e retorna `{ acertos }` com a contagem.
- [css/estilos.js](css/estilos.js) centraliza os estilos com `StyleSheet.create` do React Native. As imagens usadas pelas telas ficam em `css/img/`.

## Como adicionar perguntas

Adicione um item ao array `perguntas` em [dados/perguntas.js](dados/perguntas.js). Cada item tem o enunciado, um array de alternativas e o índice da alternativa correta, começando em zero.

```javascript
['Qual palavra-chave declara uma constante em JavaScript?', ['let', 'const', 'var', 'return'], 1],
```

Nesse exemplo, `1` aponta para `const`, a segunda alternativa. O total exibido e a barra de progresso se ajustam automaticamente ao tamanho do array.
