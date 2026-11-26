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

## Publicação no GitHub Pages

Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**. Para publicar manualmente, abra **Actions → Publicar no GitHub Pages → Run workflow** e selecione a branch `main`. Os próximos pushes para `main` também geram e publicam a versão web.

O endereço do projeto é [amandacrystina.github.io/QuizzApp/](https://amandacrystina.github.io/QuizzApp/). O `baseUrl` em `app.json` ajusta os caminhos dos arquivos gerados para o prefixo `/QuizzApp`.

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

## Telas
### Mobile
<img width="448" height="810" alt="{3E8DE954-F700-44BB-9B96-9106ACCBBB98}" src="https://github.com/user-attachments/assets/1dd2f1b8-a60c-44de-87d2-8b3fc7879aa0" />
<img width="408" height="805" alt="{4535A7A8-8AC2-4702-BAB7-E73FC4465986}" src="https://github.com/user-attachments/assets/37fcd1f4-32e6-42aa-ae7f-fe79868e1866" />
<img width="404" height="809" alt="{E4A58CB9-CF8A-44A2-A49A-8637E57DA9D5}" src="https://github.com/user-attachments/assets/b40cc989-fc02-4fd3-8b9d-970f99471f92" />
<img width="401" height="804" alt="{46586B3E-0BEC-4066-9556-6799EBB1A959}" src="https://github.com/user-attachments/assets/36136210-d14a-49cb-a5a8-01652712c98d" />
<img width="398" height="793" alt="{4E1E7A9C-864C-4CF8-8EA5-8EF0DEF7BCD5}" src="https://github.com/user-attachments/assets/9880d68b-6735-42dd-8913-9fa77303fe0c" />

### Pc
<img width="1493" height="964" alt="{D82AA491-AA68-444D-8571-12FD5E2BDB9D}" src="https://github.com/user-attachments/assets/9bcb312f-a4ea-4379-ba11-a6dbabbcbb0c" />
<img width="1453" height="961" alt="{916A8224-2B07-42A9-9D2C-32C535938D10}" src="https://github.com/user-attachments/assets/c3ab4e31-a18b-4f42-89c0-bd3b79576130" />
<img width="1469" height="968" alt="{78535C49-0A56-4CCD-98EB-139E96A36720}" src="https://github.com/user-attachments/assets/4073705a-204a-4f34-841b-d979f8bd794c" />
<img width="1444" height="953" alt="{5E181228-6F5F-4F79-8C64-D80DCABFB83F}" src="https://github.com/user-attachments/assets/137b5536-00e0-4c62-903e-94b852b4e5eb" />
<img width="1487" height="958" alt="{A1C86A1A-5A92-427A-A6B9-53B7C963DFD3}" src="https://github.com/user-attachments/assets/0a938ac9-4381-4d9d-8878-34c3ea7db196" />
