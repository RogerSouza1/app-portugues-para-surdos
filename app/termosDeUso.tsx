import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermosDeUso: React.FC = () => {
  const ConteudoPrincipal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {children}
      </View>
    </ScrollView>
  );

  const Secao: React.FC<{ titulo: string; children: React.ReactNode }> = ({ titulo, children }) => (
    <View style={styles.secao}>
      <Text style={styles.tituloSecao}>{titulo}</Text>
      {children}
    </View>
  );

  const Subsecao: React.FC<{ titulo: string; children: React.ReactNode }> = ({ titulo, children }) => (
    <View style={styles.subsecao}>
      <Text style={styles.tituloSubsecao}>{titulo}</Text>
      <View style={styles.bordaSubsecao} />
      {children}
    </View>
  );

  const Lista: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View style={styles.lista}>
      {React.Children.map(children, (child, index) => (
        <View key={index} style={styles.itemLista}>
          {child}
          <View style={styles.bordaLista} />
        </View>
      ))}
    </View>
  );

  const ItemLista: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Text style={styles.itemListaTexto}>{children}</Text>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ConteudoPrincipal>
        <Secao titulo="1. Termos de Uso">
          <Subsecao titulo="1.1 Funcionalidades do Aplicativo">
            <Lista>
              <ItemLista>
                Banco de dados remoto: Exercícios interativos, imagens
                ilustrativas e vídeos com instruções em Libras, acessíveis via
                internet.
              </ItemLista>
              <ItemLista>
                Personalização local: Inserção de nome e foto de perfil para
                criação de identidade visual no ambiente de aprendizado.
              </ItemLista>
              <ItemLista>
                Progresso offline: Histórico de atividades salvo no dispositivo,
                sem monitoramento externo.
              </ItemLista>
            </Lista>
          </Subsecao>

          <Subsecao titulo="1.2 Responsabilidades do Usuário">
            <Lista>
              <ItemLista>
                Não utilizar conteúdo educativo para fins comerciais: Todos os
                textos, imagens e vídeos são protegidos por direitos autorais e
                destinados exclusivamente ao uso individual.
              </ItemLista>
              <ItemLista>
                Manter integridade dos dados: Alterações não autorizadas no
                banco de dados local ou tentativas de acesso ao código-fonte
                podem resultar em bloqueio permanente do aplicativo.
              </ItemLista>
            </Lista>
          </Subsecao>

          <Subsecao titulo="1.3 Limitações Técnicas">
            <Lista>
              <ItemLista>
                Dependência de internet: A falta de conexão impedirá o acesso a
                aos exercícios e atualizações.
              </ItemLista>
              <ItemLista>
                Compatibilidade: O aplicativo pode não funcionar adequadamente
                em dispositivos com sistemas operacionais desatualizados ou
                modificados (ex.: root ou jailbreak).
              </ItemLista>
            </Lista>
          </Subsecao>

          <Subsecao titulo="1.4 Acessibilidade">
            <Lista>
              <ItemLista>
                Interface em Libras: Todos os menus e instruções são
                apresentados por meio de vídeos em Língua Brasileira de Sinais.
              </ItemLista>
              <ItemLista>
                Design inclusivo: Elementos visuais ampliados, contrastes
                elevados e ausência de dependência de alertas sonoros.
              </ItemLista>
            </Lista>
          </Subsecao>
        </Secao>

        <Secao titulo="2. Política de Privacidade">
          <Subsecao titulo="2.1 Coleta e Uso de Dados">
            <Text style={styles.paragrafo}>
              O aplicativo Português para Surdos foi projetado para respeitar
              integralmente a privacidade do usuário. Conforme a Lei Geral de
              Proteção de Dados (LGPD – Lei 13.709/2018), nenhum dado pessoal é
              coletado, compartilhado ou transmitido a terceiros. As informações
              inseridas pelo usuário, como nome e foto de perfil, são
              armazenadas exclusivamente no dispositivo móvel, utilizando
              tecnologias de armazenamento local. Esses dados não são sincronizados com
              servidores externos, nem acessados pela equipe de desenvolvimento.
            </Text>
            <Text style={styles.paragrafo}>
              A conexão com a internet é necessária apenas para baixar
              exercícios, imagens e atualizações do banco de dados.
              Mesmo nesses casos, não há identificação do usuário ou registro de
              atividades.
            </Text>
          </Subsecao>

          <Subsecao titulo="2.2 Direitos do Usuário">
            <Lista>
              <ItemLista>
                Exclusão de dados: A remoção do aplicativo ou a limpeza do cache
                do dispositivo apagará permanentemente o nome e a foto de
                perfil.
              </ItemLista>
              <ItemLista>
                Acesso offline: Todos os recursos armazenados localmente
                permanecem disponíveis sem conexão com a internet, exceto
                atualizações do banco de dados.
              </ItemLista>
            </Lista>
          </Subsecao>

          <Subsecao titulo="2.3 Segurança">
            <Text style={styles.paragrafo}>
              A equipe de desenvolvimento não assume responsabilidade por perdas decorrentes
              de acesso não autorizado ao dispositivo físico (ex.: roubo ou
              compartilhamento indevido do aparelho).
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="3. Disposições Finais">
          <Subsecao titulo="3.1 Atualizações">
            <Text style={styles.paragrafo}>
              Modificações nos Termos de Uso ou Política de Privacidade serão
              comunicadas dentro do aplicativo. A continuação do uso após
              ajustes implica em aceitação das novas condições.
            </Text>
          </Subsecao>

          <Subsecao titulo="3.3 Jurisdição">
            <Text style={styles.paragrafo}>
              Casos não previstos nestes termos serão resolvidos com base na
              legislação brasileira, especialmente no Estatuto da Pessoa com
              Deficiência (Lei 13.146/2015) e na LGPD.
            </Text>
          </Subsecao>
        </Secao>
      </ConteudoPrincipal>
    </SafeAreaView>
  );
};

const styles = View && (
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    scrollView: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    container: {
      padding: 20,
      flex: 1,
    },
    tituloPrincipal: {
      fontSize: 24,
      fontWeight: "600",
      color: "#333",
      textAlign: "center",
      marginBottom: 30,
    },
    secao: {
      marginBottom: 25,
    },
    tituloSecao: {
      fontSize: 20,
      fontWeight: "600",
      color: "#2E6DA4",
      marginBottom: 15,
    },
    subsecao: {
      marginBottom: 20,
    },
    tituloSubsecao: {
      fontSize: 18,
      fontWeight: "600",
      color: "#333",
      marginBottom: 10,
    },
    bordaSubsecao: {
      height: 2,
      backgroundColor: "#E0E0E0",
      marginBottom: 15,
    },
    paragrafo: {
      fontSize: 16,
      color: "#666",
      lineHeight: 24,
      marginBottom: 15,
    },
    lista: {
      marginLeft: 30,
    },
    itemLista: {
      marginBottom: 10,
    },
    itemListaTexto: {
      fontSize: 16,
      color: "#666",
      lineHeight: 24,
    },
    bordaLista: {
      height: 1,
      backgroundColor: "#E0E0E0",
      marginTop: 8,
    },
  })
);

export default TermosDeUso;