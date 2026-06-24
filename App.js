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

  const totalCadastrados = materiais.length;

  const totalEstoqueBaixo = materiais.filter(
    (item) => Number(item.quantidade) > 0 && Number(item.quantidade) < 10,
  ).length;

  const totalSemEstoque = materiais.filter(
    (item) => Number(item.quantidade) === 0,
  ).length;

 return (
  <View style={styles.container}>
    <Text style={styles.title}>Almoxarifado</Text>
    <Text style={styles.subtitle}>Controle de insumos - Enfermagem</Text>

    <View style={styles.dashboard}>
      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardNumber}>{totalCadastrados}</Text>
        <Text style={styles.dashboardLabel}>Itens cadastrados</Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardNumber}>{totalEstoqueBaixo}</Text>
        <Text style={styles.dashboardLabel}>Estoque baixo</Text>
      </View>

      <View style={styles.dashboardCard}>
        <Text style={styles.dashboardNumber}>{totalSemEstoque}</Text>
        <Text style={styles.dashboardLabel}>Sem estoque</Text>
      </View>
    </View>

    <View style={styles.formCard}>
      <Text style={styles.sectionTitle}>Cadastrar material</Text>

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
    </View>

    <View style={styles.searchArea}>
      <TextInput
        testID="input-busca"
        style={styles.inputBusca}
        placeholder="Pesquisar material..."
        value={busca}
        onChangeText={setBusca}
      />

      <Text testID="total-itens" style={styles.totalItens}>
        Exibindo {materiaisFiltrados.length} item(ns)
      </Text>
    </View>

    {loading && <ActivityIndicator size="large" />}

    <FlatList
      testID="lista-materiais"
      data={materiaisFiltrados}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={[
            styles.card,
            Number(item.quantidade) < 10 && styles.cardCritico,
            Number(item.quantidade) === 0 && styles.cardSemEstoque,
          ]}
          accessibilityLabel={
            Number(item.quantidade) < 10 ? "estoque-critico" : undefined
          }
        >
          <View style={styles.cardHeader}>
            <Text style={styles.nomeMaterial}>{item.nome}</Text>

            <Text
              style={[
                styles.badge,
                Number(item.quantidade) < 10 && styles.badgeCritico,
                Number(item.quantidade) === 0 && styles.badgeSemEstoque,
              ]}
            >
              {Number(item.quantidade) === 0
                ? "Sem estoque"
                : Number(item.quantidade) < 10
                ? "Crítico"
                : "Disponível"}
            </Text>
          </View>

          <Text style={styles.quantidade}>
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

          <View style={styles.botoesLinha}>
            <TouchableOpacity
              testID="btn-baixar"
              style={styles.botaoBaixar}
              onPress={() => baixarEstoque(item)}
            >
              <Text style={styles.textoBotao}>Baixar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              testID="btn-excluir"
              style={styles.botaoExcluir}
              onPress={() => excluirMaterial(item.id)}
            >
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF2F7",
    paddingTop: 50,
    paddingHorizontal: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 18,
  },

  dashboard: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },

  dashboardCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  dashboardNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB",
  },

  dashboardLabel: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 10,
    fontSize: 14,
    color: "#111827",
  },

  botao: {
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },

  searchArea: {
    marginBottom: 12,
  },

  inputBusca: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
  },

  totalItens: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    marginTop: 8,
    textAlign: "right",
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardCritico: {
    backgroundColor: "#FFF1F2",
    borderColor: "#FB7185",
  },

  cardSemEstoque: {
    backgroundColor: "#FEE2E2",
    borderColor: "#DC2626",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  nomeMaterial: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },

  quantidade: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 10,
  },

  badge: {
    backgroundColor: "#DCFCE7",
    color: "#166534",
    fontSize: 11,
    fontWeight: "bold",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
  },

  badgeCritico: {
    backgroundColor: "#FFE4E6",
    color: "#BE123C",
  },

  badgeSemEstoque: {
    backgroundColor: "#FECACA",
    color: "#991B1B",
  },

  botoesLinha: {
    flexDirection: "row",
    gap: 10,
  },

  botaoBaixar: {
    flex: 1,
    backgroundColor: "#16A34A",
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: "center",
  },

  botaoExcluir: {
    flex: 1,
    backgroundColor: "#DC2626",
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: "center",
  },
});