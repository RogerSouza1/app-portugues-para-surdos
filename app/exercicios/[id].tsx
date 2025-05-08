import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import ImageExercicio from "../../components/ImageExercicio";
import NextButton from "../../components/NextButton";
import {
  buscarAlternativas,
  buscarExercicioPalavras,
  buscarExercicioPorId,
  buscarMidia,
} from "../../services/supabase-query";
import LoadingError from "@/components/LoadingError";

const Exercicios = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercicio, setExercicio] = useState<any>({});
  const [tipo_exercicio, setTipoExercicio] = useState<String>()
  const [alternativas, setAlternativas] = useState<any[]>([]);
  const [resposta_alternativa, setRespostaAlternativa] = useState<String>();
  const [resposta_palavra, setRespostaPalavra] = useState<any[]>([]);;
  const [palavra_selecionada, setPalavraSelecionada] = useState<String>();
  const [frase_selecionada, setFraseSelecionada] = useState<any[]>([]);
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function loadExercicio() {
          try {
            setError(false)
            setLoading(true);

            const dataExercicio = await buscarExercicioPorId(id);
            setExercicio(dataExercicio);

            const tipoExercicio = dataExercicio?.tipo || 'palavra';
            setTipoExercicio(tipoExercicio);

            if (tipoExercicio === 'alternativa') {
              const dataAlternativas = await buscarAlternativas(id);
              console.log("Alternativas:", dataAlternativas);
                setAlternativas(
                dataAlternativas.map((item: any) => ({
                  opcao: item.alternativa.opcao,
                }))
                );

                const resposta = dataAlternativas.filter(
                  (item: any) => item.is_correta === true
                );
                console.log("Resposta:", resposta);
                setRespostaAlternativa(resposta[0]?.alternativa?.opcao?.trim());

            } else if (tipoExercicio === "palavra") {
              const dataPalavras = await buscarExercicioPalavras(id);
              setAlternativas(dataPalavras);
              const resposta = dataPalavras.filter(
                (exercicio: any) => exercicio.is_correta === true
              );
                setRespostaPalavra(resposta.map((item: any) => item.palavra));
            }
          } catch (error) {
            console.error("Erro ao carregar exercício:", error);
            setError(true);
          } finally {
            setLoading(false);
          }
        }

        if (id) loadExercicio();
  }, [id]);




  return (
    <SafeAreaView style={styles.container}>

    {loading ? (
      <Text style={{ color: "#013974", fontSize: 20, marginTop: 40 }}>
          Carregando exercício...
      </Text> 
    ) : error ? (
      <LoadingError />
    ) : (
      <View>
        <View>
          <Text>Exercício: {exercicio?.nome || ""}</Text>
        </View>
        <View>
          <Text>Tipo de Exercício: {tipo_exercicio || ""}</Text>
        </View>

        {tipo_exercicio === "alternativa" && (
          <>
            <View>
              <Text>Resposta Correta: {resposta_alternativa || ""}</Text>
            </View>
            {alternativas.map((alt, idx) => (
              <View key={idx}>
          <Text>Alternativa {idx + 1}: {alt.opcao}</Text>
              </View>
            ))}
          </>
        )}

        {tipo_exercicio === "palavra" && (
          <>
            <View>
              <Text>Frase Correta: {resposta_palavra?.join(" ") || ""}</Text>
            </View>
            {alternativas.map((alt, idx) => (
              <View key={idx}>
          <Text>Alternativa {idx + 1}: {alt.palavra}</Text>
              </View>
            ))}
          </>
        )}
      </View>
    )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  phraseContainer: {
    marginVertical: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  phrase: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013974",
    textAlign: "center",
  },
  blankContainer: {
    marginHorizontal: 3,
  },
  blank: {
    borderBottomWidth: 2,
    borderColor: "#FFD600",
    color: "#013974",
    paddingHorizontal: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
  },
  wordButton: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E8EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 90,
    alignItems: "center",
    margin: 5,
  },
  wordText: {
    fontSize: 18,
    color: "#013974",
    fontWeight: "500",
  },
});

export default Exercicios;