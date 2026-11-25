import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { estilos } from '../css/estilos';

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
    <View style={estilos.painel}>
      <Text style={estilos.marca}>QUIZZZZ</Text>
      <Text accessibilityRole="header" style={estilos.titulo}>Resultado</Text>
      <View style={estilos.cartaoNota}>
        <Text style={estilos.descricao}>Pontuação</Text>
        <Text style={estilos.nota}>{acertos}/{total}</Text>
        <Text style={estilos.descricao}>{nome}, você acertou {acertos} de {total} perguntas.</Text>
      </View>
      <Botao texto="Jogar novamente" acao={reiniciar} />
    </View>
  );
}
