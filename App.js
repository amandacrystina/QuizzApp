import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from './css/estilos';
import { calcularResultado, perguntas } from './dados/perguntas';
import { Identificacao, Inicio, Pergunta, Resultado, Sobre } from './janelas/Telas';

function EntradaAnimada({ children }) {
  const entrada = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacao = Animated.timing(entrada, {
      toValue: 1,
      duration: 240,
      useNativeDriver: true,
    });
    animacao.start();
    return () => animacao.stop();
  }, [entrada]);

  return <Animated.View style={[estilos.transicao, { opacity: entrada }]}>{children}</Animated.View>;
}

export default function App() {
  const [nome, definirNome] = useState('');
  const [telaEntrada, definirTelaEntrada] = useState('inicio');
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
    definirTelaEntrada('inicio');
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
    const voltar = () => definirTelaEntrada('inicio');

    if (telaEntrada === 'identificacao') {
      tela = <Identificacao nome={nome} alterarNome={definirNome} iniciar={iniciar} voltar={voltar} />;
    } else if (telaEntrada === 'sobre') {
      tela = <Sobre voltar={voltar} />;
    } else {
      tela = (
        <Inicio
          jogar={() => definirTelaEntrada('identificacao')}
          abrirSobre={() => definirTelaEntrada('sobre')}
        />
      );
    }
    tela = <EntradaAnimada>{tela}</EntradaAnimada>;
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
          key={respostas === null ? telaEntrada : indice}
          contentContainerStyle={estilos.pagina}
          keyboardShouldPersistTaps="handled"
        >
          {tela}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
