# cashflip

## 📌 Visão Geral
Frontend focado em UX, responsividade e performance para conversão de moedas.
Pontos que contratam:
- Vue 2.7 + TypeScript com tipagem forte (Currency, ConvertPayload, ConvertResult).
- Camada de serviço isolada com cache (TTL) e tratamento de erros (ExchangeError).
- SCSS com variáveis e mixins, mobile-first e background animado.
- BootstrapVue para UI consistente (formulário e tabela paginada/filtrável).
- Testes unitários.
- CI no GitHub Actions (build + testes).

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js v20.x
- npm v10.x

### 🔧 Instalação

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/Pedro-Gonsalo/cashFlip.git
    cd cashFlip

2. **Instale as dependências**:
    ```bash
    npm install

3. **Obtenha sua API key (ExchangeRate‑API)**
   - Acesse: https://www.exchangerate-api.com
   - Clique em **“Get Free Key”**, crie sua conta e gere a chave.
   - Crie um arquivo `.env` na raiz do projeto e adicione:
     ```
     VUE_APP_EXCHANGE_API_URL= // SUA CHAVE AQUI
     ```
4. **Rodar em dev** 
    ```bash
    npm run serve

5. **Build de produção**
    ```bash
    npm run build

6. Testes
    ```bash
    npm run test

## 🧩 Tecnologias & Decisões
- Vue 2.7 + TS: SFCs com lang="ts", tipagem do domínio (sem string solta pra moeda).
- BootstrapVue 2: <b-form>, <b-form-input>, <b-form-select>, <b-table>, <b-pagination>.
- SCSS: variables.scss e mixins.scss para consistência visual e performance.
- Service (exchangeService.ts):
    - fetchRate(from, to) com cache em memória (TTL 10 min).
    - convert(payload) retorna { amount, from, to, rate, converted } (apresentação formata).
    - ExchangeError para mensagens decentes e testes previsíveis.
- Utils (utils/format.ts):
    - formatMoney (Intl + fallback)
    - formatDate (Intl + fallback)

- CI: workflow valida arquivo, checa alias, instala, builda e roda testes.

## 🧪 Testes
Stack Jest 29 + @vue/vue2-jest 29 + @vue/test-utils 1.x + ts-jest 29.

    - Service: sucesso, erro HTTP, payload inválido, cache, amount negativo.
    - Utils: formatadores com Intl e fallbacks.
    - Componentes:
        - CurrencyForm.vue: v-model, required/min, emissão de convert com payload correto.