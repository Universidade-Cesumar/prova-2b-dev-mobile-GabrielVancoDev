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

export default function App() {
  // Estados do formulário
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");

  // Estado da lista de materiais
  const [materiais, setMateriais] = useState([]);

  // Estado de carregamento
  const [loading, setLoading] = useState(false);

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

  // Efeito de atualização da lista de materiais
  useEffect(() => {
    buscarMateriais();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Almoxarifado - Enfermagem</Text>

      {/* Breve descrição do projeto inserida abaixo */}
      <Text style={styles.description}>
        Este template servirá para desenvolver o projeto responsável por
        modernizar o controle de insumos médicos do almoxarifado. Através desta
        interface conectada à API, é possível realizar o inventário em tempo
        real, cadastrar novos materiais e registrar baixas de estoque de forma
        ágil e segura.
      </Text>

      <Text>Quantidade de materiais: {materiais.length}</Text>

      {/* Os alunos vão construir os componentes visuais das Sprints aqui dentro */}
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
});
