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
      alert("Não foi possível carregar os materiais. Verifique sua conexão.");
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
      alert("Não foi possível cadastrar o material. Tente novamente.");
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
    backgroundColor: "#F4F7FB",
    paddingTop: 50,
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
    color: "#1F2937",
  },

  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 15,
    color: "#111827",
  },

  botao: {
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  totalItens: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardCritico: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#DC2626",
  },

  nomeMaterial: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },

  botaoBaixar: {
    backgroundColor: "#16A34A",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  botaoExcluir: {
    backgroundColor: "#DC2626",
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
});
