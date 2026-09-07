# Diretrizes Permanentes de Desenvolvimento e Segurança do Projeto

Este arquivo estabelece os padrões e regras obrigatórias que **devem ser seguidos em todos os deploys e modificações de código** deste projeto, sem exceções.

---

## 1. 🛡️ Segurança HTTP & Content Security Policy (Padrão Obrigatório)

### 1.1. Arquivo `vercel.json`
O arquivo `vercel.json` deve sempre conter as seguintes configurações para evitar falhas no Mozilla Observatory e em scanners de segurança:
- **Codificação**: Padrão RFC 8259 estrito (UTF-8 puro **sem Byte Order Mark / BOM**).
- **Mapeamento de Rotas**: O bloco de cabeçalhos deve cobrir explicitamente tanto a rota raiz quanto as sub-rotas:
  - `"source": "/(.*)"`
  - `"source": "/"`
- **Cabeçalhos Obrigatórios**:
  1. **Content-Security-Policy**:
     ```http
     default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; object-src 'none'; base-uri 'self'; frame-ancestors 'none';
     ```
     *(A diretiva `frame-ancestors 'none'` é obrigatória para prevenção contra clickjacking).*
  2. **Strict-Transport-Security**: `max-age=63072000; includeSubDomains; preload`
  3. **X-Content-Type-Options**: `nosniff`
  4. **X-Frame-Options**: `DENY`
  5. **Referrer-Policy**: `strict-origin-when-cross-origin`
  6. **Cross-Origin-Opener-Policy**: `same-origin-allow-popups`
  7. **Cross-Origin-Resource-Policy**: `cross-origin`
  8. **Permissions-Policy**: `camera=(), microphone=(), geolocation=()`

### 1.2. Zero Scripts Inline
- É **estritamente proibido** o uso de tags `<script>` inline ou atributos de eventos como `onclick`, `onsubmit`, `onload` no HTML.
- Todo código JavaScript deve residir exclusivamente em arquivos externos (ex: `js/app.js`), compatível com `script-src 'self'`.

---

## 2. 📖 Regras de Negócio e Conteúdo

### 2.1. Intervalo de Ciclos e Encontros
- O intervalo correto dos encontros e ciclos é de **30 em 30 dias** (mensal).
- Nunca utilizar intervalos de 15 dias ou quinzenais.

### 2.2. Formatação Numérica e Contatos
- Telefones e dados numéricos devem ser exibidos de forma agrupada e contínua, sem separadores desnecessários (exemplo: `(11) 945549000`).
- Botões de ação devem disparar links dinâmicos de WhatsApp utilizando `encodeURIComponent` com mensagem personalizada e o número oficial (`5511945549000`).

### 2.3. Seções Inteligentes
- Se não for fornecido endereço físico ou localização geográfica, omitir completamente blocos de mapas ou endereços, adaptando o design ao conteúdo disponível.

### 2.4. Identidade Visual e Ativos
- A logo oficial do cliente deve ser exibida no cabeçalho com proporções preservadas e sem cortes.
- A logo deve ser configurada como favicon do site.

---

## 3. 🖼️ Regras Obrigatórias para Uso e Geração de Imagens

### 3.1. Pesquisa Web Obrigatória
- Antes de definir ou gerar qualquer imagem, você **DEVE** realizar uma pesquisa na web para buscar fotos oficiais, logotipos e a identidade visual real da empresa.

### 3.2. Prioridade Absoluta para a Realidade
- Utilize preferencialmente links e assets reais encontrados na pesquisa que representem a empresa de forma autêntica.

### 3.3. Restrição de Geração por IA
- Evite gerar imagens com IA para representar elementos que exigem precisão do mundo real (como fachadas, produtos específicos, logotipos exatos ou a equipe da empresa).

### 3.4. Fidelidade em Imagens Geradas (Último Recurso)
- Se não houver imagens reais disponíveis e a geração por IA for estritamente necessária para compor o layout, a imagem gerada **DEVE** seguir à risca a identidade da empresa (paleta de cores, estilo de design, contexto do nicho). É expressamente proibido criar elementos fantasiosos, genéricos ou que contradigam as características reais do negócio.

---

## 4. 🚀 Etapa de Pré-Deploy: Auto-Auditoria de SEO e Estrutura (Estilo SEOptimer)

Antes de finalizar qualquer projeto ou emitir o build, você **DEVE** rodar uma auto-auditoria estrita no código-fonte e corrigir automaticamente qualquer pendência encontrada:

### 4.1. Metadados e `<head>`
- **Meta Description**: Obrigatória, persuasiva e calibrada estritamente entre **130 e 155 caracteres**.
- **Title Tag**: Obrigatória, contendo o nome da marca/serviço e palavra-chave, entre **40 e 60 caracteres**.
- **Tag Canônica**: `<link rel="canonical" href="URL_DO_DOMINIO">` presente e apontando para a raiz.
- **Favicon e Viewport**: Corretamente configurados para dispositivos móveis (`<meta name="viewport">` e `<link rel="icon">`).

### 4.2. Open Graph & Social Cards
- **Tags OG Completas**: `og:title`, `og:description`, `og:url`, `og:type`, `og:image`.
- **Twitter Cards**: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`.
- **Dimensões da Imagem**: A imagem apontada em `og:image` deve existir nos arquivos do projeto e ter dimensões mínimas recomendadas de **1200x630**.

### 4.3. Acessibilidade e SEO On-Page
- **Atributo ALT**: 100% das tags `<img>` devem conter o atributo `alt` preenchido e contextualizado.
- **Hierarquia de Cabeçalhos**: Exatamente **um único `<h1>`** na página; `<h2>` e `<h3>` estruturados logicamente sem pular níveis.
- **Idioma**: Atributo `lang="pt-BR"` declarado na tag `<html>`.

### 4.4. Arquivos Técnicos e Indexação
- Gerar sempre o arquivo `robots.txt` na raiz liberando acesso (`Allow: /`) e apontando para o sitemap.
- Gerar sempre o arquivo `sitemap.xml` estruturado e válido na raiz com a URL canônica.
- Inserir dados estruturados Schema.org (`JSON-LD`) para `LocalBusiness` ou `Organization` no `<head>`.

### 4.5. Links Sociais
- Garantir a presença de links reais (ou âncoras preparadas com `href`) no rodapé para redes sociais (Instagram, WhatsApp).

### 4.6. Regra de Exceção
- Ignore totalmente métricas de backlinks/links externos, focando **100% na conformidade técnica interna (SEO On-Page)**.

---

## 5. ✅ Checklist de Qualidade antes de Cada Commit
1. Verificar integridade do JSON de configuração (`JSON.parse`, sem caracteres BOM).
2. Auditar que nenhum script inline foi introduzido.
3. Garantir cumprimento das regras de imagens (busca prévia de fotos reais antes de qualquer geração por IA).
4. Executar e aprovar a auto-auditoria estrita de SEO e estrutura (Estilo SEOptimer).
5. Confirmar que todas as instruções do prompt foram integralmente contempladas.


