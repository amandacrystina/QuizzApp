import React, { useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from './css/estilos';
import { calcularResultado, perguntas } from './dados/perguntas';
import { Inicio, Pergunta, Resultado } from './janelas/Telas';

export default function App() {
  const [nome, definirNome] = useState('');
  const [respostas, definirRespostas] = useState(null);
  const [selecao, definirSelecao] = useState(null);
  const indice = respostas?.length ?? 0;

  function iniciar() {
    if (!nome.trim()) return;
    definirNome(nome.trim());
    definirRespostas([]);
    definirSelecao(null);
  }

  function reiniciar() {
    definirNome('');
    definirRespostas(null);
    definirSelecao(null);
  }

  function confirmar() {
    if (selecao === null) return;
    definirRespostas(anteriores => anteriores.length === indice ? [...anteriores, selecao] : anteriores);
    definirSelecao(null);
  }

  let tela;
  if (respostas === null) {
    tela = <Inicio total={perguntas.length} nome={nome} alterarNome={definirNome} iniciar={iniciar} />;
  } else if (indice === perguntas.length) {
    tela = <Resultado {...calcularResultado(respostas)} nome={nome} total={perguntas.length} reiniciar={reiniciar} />;
  } else {
    tela = (
      <Pergunta
        pergunta={perguntas[indice]}
        indice={indice}
        total={perguntas.length}
        selecao={selecao}
        selecionar={definirSelecao}
        confirmar={confirmar}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.fundo}>
        <StatusBar barStyle="light-content" />
        <ScrollView
          key={respostas === null ? 'inicio' : indice}
          contentContainerStyle={estilos.pagina}
          keyboardShouldPersistTaps="handled"
        >
          {tela}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
