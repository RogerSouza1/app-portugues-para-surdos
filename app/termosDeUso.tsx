import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermosDeUso: React.FC = () => {
  const ConteudoPrincipal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.tituloPrincipal}>TERMOS DE USO DO APLICATIVO ENTRE LÍNGUAS</Text>
        <Text style={styles.dataAtualizacao}>Última atualização: 20 de maio de 2025</Text>
        <Text style={styles.boasVindas}>Bem-vindo(a) ao Entre Línguas!</Text>
        <Text style={styles.paragrafo}>
          Estes Termos de Uso (&quot;Termos&quot;) regem o uso do aplicativo móvel Entre Línguas (&quot;Aplicativo&quot;), 
          desenvolvido para auxiliar deficientes auditivos com proficiência em Libras no aprendizado da língua 
          portuguesa escrita de forma gamificada. Ao acessar ou utilizar o Aplicativo, você concorda em cumprir 
          e estar vinculado(a) a estes Termos. Se você não concordar com qualquer parte destes Termos, não 
          utilize o Aplicativo.
        </Text>
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

  const Subsecao: React.FC<{ titulo?: string; children: React.ReactNode }> = ({ titulo, children }) => (
    <View style={styles.subsecao}>
      {titulo && <Text style={styles.tituloSubsecao}>{titulo}</Text>}
      {titulo && <View style={styles.bordaSubsecao} />}
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
        <Secao titulo="1. ACEITAÇÃO DOS TERMOS">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Ao baixar, instalar, acessar ou usar o Aplicativo, você declara que leu, compreendeu e concorda em 
              estar vinculado(a) a estes Termos, bem como à nossa Política de Privacidade. Estes Termos podem ser 
              atualizados periodicamente, e o uso continuado do Aplicativo após quaisquer alterações constitui sua 
              aceitação dessas alterações.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="2. O SERVIÇO">
          <Subsecao>
            <Text style={styles.paragrafo}>
              O Aplicativo Entre Línguas oferece uma plataforma de aprendizado gamificada da língua portuguesa escrita, 
              com foco na associação de sinais em Libras, imagens e situações do mundo real com a palavra escrita. 
              O serviço inclui:
            </Text>
            <Lista>
              <ItemLista>Módulos de ensino progressivos.</ItemLista>
              <ItemLista>Exercícios interativos e gamificados.</ItemLista>
              <ItemLista>Acompanhamento de progresso.</ItemLista>
              <ItemLista>Recursos visuais e vídeos em Libras.</ItemLista>
            </Lista>
            <Text style={styles.paragrafo}>
              O objetivo é promover a inclusão digital e social de deficientes auditivos, facilitando o acesso à 
              comunicação em português escrito.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="3. USO DO APLICATIVO">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Você concorda em usar o Aplicativo de forma responsável e em conformidade com todas as leis e 
              regulamentos aplicáveis. Você não deve:
            </Text>
            <Lista>
              <ItemLista>Utilizar o Aplicativo para qualquer finalidade ilegal ou não autorizada.</ItemLista>
              <ItemLista>Interferir ou interromper a integridade ou o desempenho do Aplicativo.</ItemLista>
              <ItemLista>
                Tentar obter acesso não autorizado a qualquer parte do Aplicativo ou a seus sistemas ou redes.
              </ItemLista>
              <ItemLista>
                Copiar, modificar, distribuir, vender ou alugar qualquer parte do Aplicativo ou seu conteúdo 
                sem autorização expressa.
              </ItemLista>
              <ItemLista>
                Utilizar robôs, spiders, scrapers ou outros meios automatizados para acessar o Aplicativo para 
                qualquer finalidade sem nossa permissão expressa por escrito.
              </ItemLista>
            </Lista>
          </Subsecao>
        </Secao>

        <Secao titulo="4. PROPRIEDADE INTELECTUAL">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Todo o conteúdo presente no Aplicativo, incluindo, mas não se limitando a textos, gráficos, imagens, 
              vídeos em Libras, logotipos, ícones, software e a compilação de todo o conteúdo, é de propriedade do 
              Entre Línguas ou de seus licenciadores e é protegido pelas leis brasileiras e internacionais de direitos 
              autorais e propriedade intelectual.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="5. ISENÇÃO DE GARANTIAS">
          <Subsecao>
            <Text style={styles.paragrafo}>
                O Aplicativo é fornecido &quot;no estado em que se encontra&quot; e &quot;conforme disponível&quot;, sem garantias de 
              qualquer tipo, expressas ou implícitas. O Entre Línguas não garante que o Aplicativo será ininterrupto, 
              livre de erros, seguro ou que atenderá a todas as suas expectativas de aprendizado. O sucesso no 
              aprendizado da língua portuguesa escrita depende do esforço e dedicação individual do usuário.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="6. LIMITAÇÃO DE RESPONSABILIDADE">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Na extensão máxima permitida pela lei aplicável, o Entre Línguas não será responsável por quaisquer 
              danos diretos, indiretos, incidentais, especiais, consequenciais ou exemplares, incluindo, mas não se 
              limitando a danos por perda de lucros, boa vontade, uso, dados ou outras perdas intangíveis, resultantes 
              do uso ou da incapacidade de usar o Aplicativo.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="7. MODIFICAÇÕES DOS TERMOS">
          <Subsecao>
            <Text style={styles.paragrafo}>
              O Entre Línguas reserva-se o direito de modificar estes Termos a qualquer momento. As alterações 
              entrarão em vigor imediatamente após a publicação no Aplicativo. É sua responsabilidade revisar estes 
              Termos periodicamente para estar ciente de quaisquer modificações. O uso continuado do Aplicativo após 
              a publicação de Termos revisados constitui sua aceitação das alterações.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="8. RESCISÃO">
          <Subsecao>
            <Text style={styles.paragrafo}>
              O Entre Línguas pode suspender ou encerrar seu acesso ao Aplicativo, total ou parcialmente, a qualquer 
              momento e por qualquer motivo, sem aviso prévio, incluindo, mas não se limitando a violação destes Termos.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="9. LEI APLICÁVEL E FORO">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Estes Termos serão regidos e interpretados de acordo com as leis da República Federativa do Brasil. 
              Qualquer disputa decorrente ou relacionada a estes Termos será submetida ao foro da comarca de 
              São Paulo - SP, Brasil, com renúncia a qualquer outro, por mais privilegiado que seja.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="11. INFORMAÇÕES DE CONTATO">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através do e-mail: 
              contato@entrelinguas.com
            </Text>
          </Subsecao>
        </Secao>

        <Text style={styles.tituloPrincipal}>POLÍTICA DE PRIVACIDADE DO APLICATIVO ENTRE LÍNGUAS</Text>
        <Text style={styles.dataAtualizacao}>Última atualização: 20 de maio de 2025</Text>
        <Text style={styles.paragrafo}>
          A sua privacidade é muito importante para nós do Entre Línguas. Esta Política de Privacidade descreve 
          como coletamos, usamos, armazenamos e protegemos suas informações pessoais ao utilizar nosso aplicativo 
          móvel (&quot;Aplicativo&quot;). Ao usar o Aplicativo, você concorda com as práticas descritas nesta Política de 
          Privacidade, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD) 
          e demais legislações aplicáveis.
        </Text>

        <Secao titulo="1. QUAIS DADOS COLETAMOS?">
          <Subsecao>
            <Text style={styles.paragrafo}>Coletamos os seguintes tipos de dados pessoais:</Text>
            <Text style={styles.paragrafo}>Dados de Uso do Aplicativo:</Text>
            <Lista>
              <ItemLista>Progresso nos módulos e exercícios.</ItemLista>
              <ItemLista>Respostas a exercícios e pontuações.</ItemLista>
              <ItemLista>Módulos e exercícios concluídos.</ItemLista>
            </Lista>
            <Text style={styles.paragrafo}>Dados do Dispositivo:</Text>
            <Lista>
              <ItemLista>Tipo de dispositivo, sistema operacional e versão.</ItemLista>
              <ItemLista>Endereço IP.</ItemLista>
              <ItemLista>Identificadores únicos de dispositivo.</ItemLista>
              <ItemLista>Dados de falha e desempenho do Aplicativo.</ItemLista>
            </Lista>
          </Subsecao>
        </Secao>

        <Secao titulo="2. COMO COLETAMOS SEUS DADOS?">
          <Subsecao>
            <Text style={styles.paragrafo}>Coletamos seus dados das seguintes formas:</Text>
            <Lista>
              <ItemLista>
                Diretamente de você: Quando você se cadastra, preenche seu perfil ou interage com as 
                funcionalidades do Aplicativo.
              </ItemLista>
              <ItemLista>
                Automaticamente: Através do uso do Aplicativo, coletamos dados de uso e do dispositivo para entender 
                como você interage com o serviço e para fins de melhoria. Utilizamos o Supabase para gerenciar nosso 
                banco de dados e autenticação, que pode coletar dados de log e telemetria de forma automatizada.
              </ItemLista>
            </Lista>
          </Subsecao>
        </Secao>

        <Secao titulo="3. PARA QUE USAMOS SEUS DADOS?">
          <Subsecao>
            <Text style={styles.paragrafo}>Utilizamos seus dados pessoais para as seguintes finalidades:</Text>
            <Text style={styles.paragrafo}>Fornecer e Gerenciar o Serviço:</Text>
            <Lista>
              <ItemLista>Permitir o acesso e uso das funcionalidades do Aplicativo.</ItemLista>
              <ItemLista>
                Personalizar sua experiência de aprendizado, adaptando o conteúdo ao seu progresso e necessidades.
              </ItemLista>
              <ItemLista>Acompanhar seu desempenho e progresso nos exercícios.</ItemLista>
              <ItemLista>Fornecer feedback sobre suas respostas.</ItemLista>
            </Lista>
            <Text style={styles.paragrafo}>Melhorar o Aplicativo:</Text>
            <Lista>
              <ItemLista>Analisar o uso do Aplicativo para identificar áreas de melhoria.</ItemLista>
              <ItemLista>Desenvolver novas funcionalidades e aprimorar as existentes.</ItemLista>
              <ItemLista>Garantir a estabilidade e segurança do Aplicativo.</ItemLista>
            </Lista>
            <Text style={styles.paragrafo}>Segurança e Conformidade Legal:</Text>
            <Lista>
              <ItemLista>Proteger o Aplicativo e seus usuários contra fraudes e atividades não autorizadas.</ItemLista>
              <ItemLista>Cumprir obrigações legais e regulatórias.</ItemLista>
            </Lista>
          </Subsecao>
        </Secao>

        <Secao titulo="4. COMO ARMAZENAMOS E PROTEGEMOS SEUS DADOS?">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Seus dados são armazenados de forma segura em servidores gerenciados pelo Supabase, que adota padrões 
              de segurança reconhecidos no mercado para proteção de dados. Implementamos medidas técnicas e 
              organizacionais para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação 
              ou destruição.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="5. COMPARTILHAMENTO DE DADOS">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Não compartilhamos seus dados pessoais com terceiros, exceto nas seguintes situações:
            </Text>
            <Lista>
              <ItemLista>
                Provedores de Serviços: Com parceiros que nos auxiliam na operação do Aplicativo (ex: serviços de 
                hospedagem de banco de dados como Supabase, serviços de análise de dados), sempre sob rigorosos 
                acordos de confidencialidade e apenas na medida necessária para a prestação dos serviços.
              </ItemLista>
              <ItemLista>
                Obrigação Legal: Quando exigido por lei, ordem judicial ou solicitação de autoridades governamentais.
              </ItemLista>
              <ItemLista>
                Proteção de Direitos: Para proteger os direitos, propriedade ou segurança do Entre Línguas, de nossos 
                usuários ou de terceiros.
              </ItemLista>
              <ItemLista>
                Com seu Consentimento: Em outras situações, mediante seu consentimento prévio e expresso.
              </ItemLista>
            </Lista>
          </Subsecao>
        </Secao>

        <Secao titulo="6. SEUS DIREITOS COMO TITULAR DOS DADOS (LGPD)">
          <Subsecao>
            <Text style={styles.paragrafo}>
              De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
            </Text>
            <Lista>
              <ItemLista>Confirmação e Acesso: Confirmar a existência de tratamento e acessar seus dados.</ItemLista>
              <ItemLista>Retificação: Corrigir dados incompletos, inexatos ou desatualizados.</ItemLista>
              <ItemLista>
                Anonimização, Bloqueio ou Eliminação: Solicitar a anonimização, bloqueio ou eliminação de dados 
                desnecessários, excessivos ou tratados em desconformidade com a LGPD.
              </ItemLista>
              <ItemLista>
                Portabilidade: Solicitar a portabilidade de seus dados a outro fornecedor de serviço ou produto.
              </ItemLista>
              <ItemLista>
                Eliminação: Solicitar a eliminação dos dados pessoais tratados com base no seu consentimento.
              </ItemLista>
              <ItemLista>
                Informação sobre Compartilhamento: Obter informações sobre as entidades públicas e privadas com as 
                quais seus dados foram compartilhados.
              </ItemLista>
              <ItemLista>
                Informação sobre a Possibilidade de Não Fornecer Consentimento: Ser informado sobre as consequências 
                de não fornecer consentimento.
              </ItemLista>
              <ItemLista>Revogação do Consentimento: Revogar o consentimento a qualquer momento.</ItemLista>
              <ItemLista>
                Oposição: Opor-se a tratamento realizado com fundamento em outras bases legais, em caso de 
                descumprimento da LGPD.
              </ItemLista>
              <ItemLista>
                Revisão de Decisões Automatizadas: Solicitar a revisão de decisões tomadas unicamente com base em 
                tratamento automatizado de dados pessoais que afetem seus interesses.
              </ItemLista>
            </Lista>
            <Text style={styles.paragrafo}>
              Para exercer qualquer um desses direitos, entre em contato conosco através do e-mail: 
              contato@entrelinguas.com
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="7. RETENÇÃO DE DADOS">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Seus dados pessoais serão retidos pelo tempo necessário para cumprir as finalidades para as quais foram 
              coletados, incluindo a prestação do serviço, cumprimento de obrigações legais, resolução de disputas e 
              aplicação de nossos acordos.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="8. ALTERAÇÕES NESTA POLÍTICA DE PRIVACIDADE">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas 
              de dados ou na legislação. Notificaremos você sobre quaisquer alterações significativas através do 
              Aplicativo ou por outros meios apropriados. O uso continuado do Aplicativo após a publicação de uma 
              Política de Privacidade revisada constitui sua aceitação das alterações.
            </Text>
          </Subsecao>
        </Secao>

        <Secao titulo="9. CONTATO">
          <Subsecao>
            <Text style={styles.paragrafo}>
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre nossas práticas de 
              privacidade, entre em contato conosco através do e-mail: contato@entrelinguas.com
            </Text>
          </Subsecao>
        </Secao>
      </ConteudoPrincipal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 15,
  },
  dataAtualizacao: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  boasVindas: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
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
    marginLeft: 20,
    marginBottom: 15,
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
});

export default TermosDeUso;
