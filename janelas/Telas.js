import React, { useEffect, useRef } from 'react';
import { Pressable, Text, TextInput, View, Animated } from 'react-native';
import { estilos } from '../css/estilos';

function FloatingImage({ source, style, distance = 12, duration = 1200, delay = 0 }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: -distance, // sobe
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0, // volta ao centro
            duration,
            useNativeDriver: true,
          }),
        ])
      ),
    ]);

    animation.start();

    return () => animation.stop();
  }, [translateY, distance, duration, delay]);

  return (
    <Animated.Image
      source={source}
      resizeMode="contain"
      style={[
        estilos.image,
        style,
        { transform: [{ translateY }] },
      ]}
    />
  );
}

function Botao({ texto, acao, desabilitado = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: desabilitado }}
      disabled={desabilitado}
      onPress={acao}
      style={({ pressed }) => [estilos.botao, desabilitado && estilos.desabilitado, pressed && estilos.pressionado]}
    >
      <Text style={estilos.textoBotao}>{texto}</Text>
    </Pressable>
  );
}

export function Inicio({ total, nome, alterarNome, iniciar }) {
  return (
    <View style={estilos.painel}>
      <Text style={estilos.marca}>QUIZZZZ</Text>
      <Text accessibilityRole="header" style={estilos.titulo}>Quiz de desenvolvimento web</Text>
      <Text style={estilos.descricao}>{total} perguntas de múltipla escolha. Cada acerto vale 1 ponto.</Text>
      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>Seu nome</Text>
        <TextInput
          accessibilityLabel="Seu nome"
          autoCapitalize="words"
          autoComplete="name"
          maxLength={80}
          onChangeText={alterarNome}
          onSubmitEditing={iniciar}
          placeholder="Digite seu nome"
          placeholderTextColor="#b7c5db"
          returnKeyType="go"
          style={estilos.entrada}
          value={nome}
        />
      </View>
      <Botao texto="Começar quiz" acao={iniciar} desabilitado={!nome.trim()} />
    </View>
  );
}

export function Pergunta({ pergunta, indice, total, selecao, selecionar, confirmar }) {
  const [enunciado, opcoes] = pergunta;
  return (
    <View style={estilos.painel}>
      <Text style={estilos.marca}>PERGUNTA {indice + 1} DE {total}</Text>
      <View accessible={false} style={estilos.trilho}>
        <View style={[estilos.progresso, { width: `${((indice + 1) / total) * 100}%` }]} />
      </View>
      <Text accessibilityRole="header" style={estilos.enunciado}>{enunciado}</Text>
      <View style={estilos.opcoes}>
        {opcoes.map((opcao, numero) => {
          const ativa = selecao === numero;
          return (
            <Pressable
              key={opcao}
              accessibilityRole="radio"
              accessibilityState={{ checked: ativa }}
              onPress={() => selecionar(numero)}
              style={[estilos.opcao, ativa && estilos.opcaoAtiva]}
            >
              <Text style={[estilos.letra, ativa && estilos.letraAtiva]}>{'ABCD'[numero]}</Text>
              <Text style={estilos.textoOpcao}>{opcao}</Text>
            </Pressable>
          );
        })}
      </View>
      <Botao
        texto={indice + 1 === total ? 'Ver resultado' : 'Próxima pergunta'}
        acao={confirmar}
        desabilitado={selecao === null}
      />
    </View>
  );
}

export function Resultado({ acertos, nome, total, reiniciar }) {
  return (
    <View>
        <View style={estilos.painel}>
          <Text accessibilityRole="header" style={estilos.titulo}>Resultado</Text>
          <View style={estilos.cartaoNota}>
            <Text style={estilos.descricao}>Pontuação</Text>
            <Text style={estilos.nota}>{acertos}/{total}</Text>
            <Text style={estilos.descricao}>{nome}, você acertou {acertos} de {total} perguntas.</Text>
          </View>
          <Botao texto="Jogar novamente" acao={reiniciar} />
        </View>
        <View>
          <Text>{"\n"}{"\n"}{"\n"}{"\n"}</Text>
        </View>
        <FloatingImage
                source={require('../css/img/resultado.png')}
                distance={14}
                duration={1100}
                delay={0}
              />
    </View>
  );
}
