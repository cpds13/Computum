# Computum

Portal central do ecossistema Computum.

O Computum funciona como ponto único de acesso às ferramentas do ecossistema. Cada ferramenta permanece em seu próprio repositório e domínio.

## Estrutura

- `index.html` — autenticação.
- `painel.html` — dashboard protegido e catálogo das ferramentas.
- `js/supabase.js` — cliente Supabase.
- `js/auth.js` — login e recuperação de senha.
- `js/painel.js` — proteção do painel, catálogo e logout.
- `css/painel.css` — identidade visual e layout do dashboard.

## Ferramentas catalogadas

- `abono.computum.com.br` — Abono de Permanência.
- `diferencas.computum.com.br` — Diferenças.
- Auditoria de Planos de Saúde — em preparação.
- Informa-Laudo — em preparação.

Os endereços e estados das ferramentas são mantidos no catálogo em `js/painel.js`. Quando uma nova ferramenta estiver pronta, basta acrescentar o objeto correspondente e seu endereço.

## Arquitetura

```text
computum.com.br
      │
      ├── autenticação (Supabase Auth)
      │
      └── dashboard
            ├── Abono → abono.computum.com.br
            ├── Diferenças → diferencas.computum.com.br
            ├── Auditoria de Planos de Saúde → em preparação
            └── Informa-Laudo → em preparação
```

Este repositório é o portal. Ele não contém os motores de cálculo das aplicações.

## Autenticação

Supabase Auth com e-mail e senha.

A confirmação de e-mail está desabilitada nesta fase inicial e poderá ser ativada posteriormente no Supabase.

## Regra de segurança

A chave utilizada no frontend é uma Publishable Key. Secret Keys/Service Role Keys nunca devem ser colocadas no código do navegador.

## Regra de manutenção

Alterações no portal não devem modificar os motores das aplicações independentes. Para incluir uma ferramenta no dashboard, altere apenas o catálogo do portal e, quando necessário, a descrição visual.
