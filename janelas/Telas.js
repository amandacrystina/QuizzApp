import React, { useEffect, useRef } from 'react';
import { Animated, Image, Pressable, Text, TextInput, View } from 'react-native';
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
        style,
        { transform: [{ translateY }] },
      ]}
    />
  );
}

function Botao({ texto, acao, desabilitado = false, secundario = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: desabilitado }}
      disabled={desabilitado}
      onPress={acao}
      style={({ pressed }) => [
        estilos.botao,
        secundario && estilos.botaoSecundario,
        desabilitado && estilos.desabilitado,
        pressed && estilos.pressionado,
      ]}
    >
      <Text style={[estilos.textoBotao, secundario && estilos.textoSecundario]}>{texto}</Text>
    </Pressable>
  );
}

function Mascote() {
  return (
    <View style={estilos.areaMascote}>
      <View style={estilos.haloMascote} />
      <Image source={require('../css/img/resultado.png')} resizeMode="contain" style={estilos.mascote} />
    </View>
  );
}

export function Inicio({ jogar, abrirSobre }) {
  return (
    <View style={[estilos.painel, estilos.painelEntrada]}>
      <View style={estilos.cabecalhoInicio}>
        <Text accessibilityRole="header" style={estilos.tituloInicio}>TecQuiz</Text>
        <Text style={[estilos.descricao, estilos.centralizado]}>Teste seus conhecimentos em desenvolvimento web.</Text>
      </View>
      <View style={estilos.acoesInicio}>
        <Botao texto="Jogar" acao={jogar} />
        <Botao texto="Sobre" acao={abrirSobre} secundario />
      </View>
      <FloatingImage
                source={require('../css/img/nerd.png')}
                distance={14}
                duration={1100}
                delay={0}
                style={estilos.image2}
              />
    </View>
  );
}

export function Sobre({ voltar }) {
  return (
    <View style={[estilos.painel, estilos.painelEntrada]}>
      <Text accessibilityRole="header" style={estilos.titulo}>Sobre</Text>
      <Text style={estilos.descricao}>
        Essa é Cindy, ela está aqui para testar seus conhecimentos de desenvolvimento web.
      </Text>
      <Text style={estilos.descricao}>
        Responda as 10 perguntas que ela montou e veja o quão conhecido você é!
      </Text>
      <Botao texto="Voltar ao início" acao={voltar} secundario />
      <Image source={require('../css/img/duvida.png')} resizeMode="contain" style={estilos.image3} />
    </View>
  );
}

export function Identificacao({ nome, alterarNome, iniciar, voltar }) {
  return (
    <View style={[estilos.painel, estilos.painelEntrada]}>
      <View style={estilos.cabecalhoIdentificacao}>
        <Pressable accessibilityRole="button" onPress={voltar} style={estilos.voltar}>
          <Text style={estilos.textoVoltar}>← Voltar</Text>
        </Pressable>
        <Text accessibilityRole="header" style={estilos.titulo}>Identificação</Text>
      </View>
      <View style={estilos.campo}>
        <Text style={estilos.rotulo}>NOME</Text>
        <TextInput
          accessibilityLabel="Nome"
          autoCapitalize="words"
          autoComplete="name"
          maxLength={80}
          onChangeText={alterarNome}
          onSubmitEditing={iniciar}
          placeholder="Digite seu nome ou apelido"
          placeholderTextColor="#b7c5db"
          returnKeyType="go"
          style={estilos.entrada}
          value={nome}
        />
      </View>
      
      <Botao texto="PRÓXIMO" acao={iniciar} desabilitado={!nome.trim()} />
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
                style={estilos.image}
              />
    </View>
  );
}
