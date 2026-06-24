import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

// Função de validação de retirada
export function validarRetirada(estoqueAtual, quantidadeRetirada) {
  const estoque = Number(estoqueAtual);
  const retirada = Number(quantidadeRetirada);

  // Verifica se a retirada é maior que o estoque
  if (retirada <= 0) {
    return false;
  }

  if (retirada > estoque) {
    return false;
  }

  return true;
}

export default function App() {
  // Estados do formulário
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");

  // Estado da lista de materiais
  const [materiais, setMateriais] = useState([]);

  // Estado de carregamento
  const [loading, setLoading] = useState(false);

  // Estados de retiradas
  const [retiradas, setRetiradas] = useState({});

  // Estado de Busca
  const [busca, setBusca] = useState("");

  const API_URL = "https://6a18c32223c3626470abff91.mockapi.io/materiais"; // API de exemplo para fins de demonstração

  // --- Funções de Requisição e Efeitos (Os alunos implementarão aqui) ---

  // Requisição para buscar materiais
  const buscarMateriais = async () => {
    try {
      setLoading(true);
      //
      const response = await fetch(API_URL);
      const dados = await response.json();

      // Injeção dos dados na lista
      setMateriais(dados);
    } catch (error) {
      // Tratamento de erro
      console.log("Erro ao buscar materiais:", error);
    } finally {
      setLoading(false);
    }

    // --- Fim da Função de Requisição ---
  };

  // Requisição para cadastrar materiais
  const cadastrarMaterial = async () => {
    if (!nome || !quantidade) {
      alert("Preencha todos os campos.");
      return;
    }
    try {
      // Cria um novo material
      const novoMaterial = {
        nome: nome,
        quantidade: Number(quantidade),
      };
      // Envia o material para a API
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoMaterial),
      });

      // Limpa os campos
      setNome("");
      setQuantidade("");

      // Atualiza a lista
      buscarMateriais();
    } catch (error) {
      console.log("Erro ao cadastrar material:", error);
    }
  };
  // --- Fim da Função de Requisição ---

  // Requisição para excluir materiais
  const excluirMaterial = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      buscarMateriais();
    } catch (error) {
      console.log("Erro ao excluir material:", error);
    }
  };

  // Requisição para registrar retiradas
  const baixarEstoque = async (item) => {
    const quantidadeRetirada = retiradas[item.id];

    if (!validarRetirada(item.quantidade, quantidadeRetirada)) {
      alert("Retirada inválida. Verifique a quantidade em estoque.");
      return;
    }

    const novaQuantidade = Number(item.quantidade) - Number(quantidadeRetirada);

    try {
      await fetch(`${API_URL}/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          quantidade: novaQuantidade,
        }),
      });

      setRetiradas({
        ...retiradas,
        [item.id]: "",
      });

      buscarMateriais();
    } catch (error) {
      console.log("Erro ao baixar estoque:", error);
    }
  };

  // Efeito de atualização da lista de materiais
  useEffect(() => {
    buscarMateriais();
  }, []);

  const materiaisFiltrados = materiais.filter((item) =>
    item.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>
      {/* Breve descrição do projeto inserida abaixo */}
      {/* <Text style={styles.description}>
        Este template servirá para desenvolver o projeto responsável por
        modernizar o controle de insumos médicos do almoxarifado. Através desta
        interface conectada à API, é possível realizar o inventário em tempo
        real, cadastrar novos materiais e registrar baixas de estoque de forma
        ágil e segura.
      </Text> */}

      <TextInput
        testID="input-busca"
        style={styles.input}
        placeholder="Pesquisar material"
        value={busca}
        onChangeText={setBusca}
      />

      <Text testID="total-itens" style={styles.totalItens}>
        Total de itens listados: {materiaisFiltrados.length}
      </Text>

      <TextInput
        testID="input-nome"
        style={styles.input}
        placeholder="Nome do material"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        testID="input-quantidade"
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <TouchableOpacity
        testID="btn-cadastrar"
        style={styles.botao}
        onPress={cadastrarMaterial}
      >
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <FlatList
        testID="lista-materiais"
        data={materiaisFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              Number(item.quantidade) < 10 && styles.cardCritico,
            ]}
            accessibilityLabel={
              Number(item.quantidade) < 10 ? "estoque-critico" : undefined
            }
          >
            <Text style={styles.cardTitulo}>{item.nome}</Text>
            <Text style={styles.cardQuantidade}>
              Quantidade: {item.quantidade}
            </Text>
            <TextInput
              testID="input-retirada"
              style={styles.input}
              placeholder="Quantidade a retirar"
              keyboardType="numeric"
              value={retiradas[item.id] || ""}
              onChangeText={(valor) =>
                setRetiradas({
                  ...retiradas,
                  [item.id]: valor,
                })
              }
            />

            <TouchableOpacity
              testID="btn-baixar"
              style={styles.botaoBaixar}
              onPress={() => baixarEstoque(item)}
            >
              <Text style={styles.textoBotao}>Baixar estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="btn-excluir"
              style={styles.botaoExcluir}
              onPress={() => excluirMaterial(item.id)}
            >
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10, // Reduzido ligeiramente para aproximar o texto explicativo
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20, // Dá um espaçamento confortável entre as linhas do parágrafo
    marginBottom: 30, // Margem inferior para afastar o texto dos futuros inputs dos alunos
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  cardCritico: {
    backgroundColor: "#FFE5E5",
    borderWidth: 1,
    borderColor: "#C62828",
  },

  nomeMaterial: {
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#1976D2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },

  botaoBaixar: {
    backgroundColor: "#2E7D32",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },

  botaoExcluir: {
    backgroundColor: "#C62828",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
});
