import { StyleSheet } from 'react-native';

const destaque = '#f8d470';
const texto = '#f0f5ff';
const textoSecundario = '#b7c5db';

export const estilos = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#0d1424' },
  pagina: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  painel: {
    width: '100%', maxWidth: 540, padding: 22, gap: 18, borderRadius: 24,
    backgroundColor: '#172238', borderWidth: 1, borderColor: '#2c3a55',
  },
  transicao: { width: '100%', maxWidth: 540 },
  painelEntrada: { paddingVertical: 28, gap: 24 },
  cabecalhoInicio: { alignItems: 'center', gap: 8 },

  tituloInicio: { 
    color: destaque, 
    fontSize: 48, 
    fontWeight: '900', 
    letterSpacing: -2, 
    textAlign: 'center',
  },

  centralizado: { textAlign: 'center' },
  acoesInicio: { gap: 12 },
  cabecalhoIdentificacao: { gap: 8 },
  voltar: { alignSelf: 'flex-start', justifyContent: 'center', minHeight: 44 },
  textoVoltar: { color: destaque, fontSize: 15, fontWeight: '700' },
  areaMascote: { minHeight: 208, alignItems: 'center', justifyContent: 'center' },
  haloMascote: {
    position: 'absolute', width: 162, height: 162, borderRadius: 81,
    
  },
  mascote: { width: '100%', maxWidth: 220, height: 208 },
  marca: { color: destaque, fontSize: 13, fontWeight: '800', letterSpacing: 2 },
  titulo: { color: texto, fontSize: 34, fontWeight: '800' },
  enunciado: { color: texto, fontSize: 24, fontWeight: '700' },
  descricao: { color: textoSecundario, fontSize: 16, lineHeight: 24 },
  campo: { gap: 8 },
  rotulo: { color: texto, fontSize: 15, fontWeight: '700' },
  entrada: {
    minHeight: 52, paddingHorizontal: 12, borderWidth: 1, borderColor: '#60718e',
    borderRadius: 12, backgroundColor: '#0d1424', color: texto, fontSize: 16,
  },
  trilho: { height: 6, borderRadius: 3, backgroundColor: '#344461', overflow: 'hidden' },
  progresso: { height: '100%', backgroundColor: destaque },
  opcoes: { gap: 10 },
  opcao: {
    flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 52,
    padding: 10, borderWidth: 1, borderColor: '#384963', borderRadius: 12,
  },
  opcaoAtiva: { borderColor: destaque, backgroundColor: '#25382e' },
  letra: {
    color: texto, width: 28, lineHeight: 28, textAlign: 'center',
    fontWeight: '800', borderRadius: 7, backgroundColor: '#344461', overflow: 'hidden',
  },
  letraAtiva: { color: '#142010', backgroundColor: destaque },
  textoOpcao: { flex: 1, color: texto, fontSize: 16 },
  botao: { backgroundColor: destaque, alignItems: 'center', padding: 15, borderRadius: 12 },
  textoBotao: { color: '#142010', fontSize: 16, fontWeight: '800', textAlign: 'center' },
  botaoSecundario: { backgroundColor: '#0d1424', borderWidth: 1, borderColor: '#60718e' },
  textoSecundario: { color: texto },
  desabilitado: { backgroundColor: '#7f8ca0' },
  pressionado: { opacity: 0.82 },
  cartaoNota: { backgroundColor: '#0d1424', padding: 20, borderRadius: 14, gap: 7 },
  nota: { color: destaque, fontSize: 40, fontWeight: '800' },
    
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16, // espaçamento entre as duas imagens
  },
  image: {
    position: 'absolute',
    right: 0,
    bottom: -300,
    width: 380,
    height: 380,
  },
  image2: {
    position: 'absolute',
    bottom: -370,
    width: 380,
    height: 380,

  },
  image3: {
    position: 'absolute',
    bottom: -370,
    width: 430,
    height: 430,
    right:-45,
  },
});
