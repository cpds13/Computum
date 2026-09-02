# Computum

Portal central do Computum.

## Arquitetura

- `index.html` — autenticação.
- `painel.html` — painel protegido.
- `js/supabase.js` — cliente Supabase.
- `js/auth.js` — login e recuperação de senha.
- `js/painel.js` — proteção do painel e logout.
- `abono.computum.com.br` — sistema independente no repositório `cpds13/abono`.
- `diferencas.computum.com.br` — sistema independente no repositório `cpds13/diferencas`.

## Autenticação

Supabase Auth com e-mail e senha.

A confirmação de e-mail está desabilitada nesta fase inicial e poderá ser ativada posteriormente no Supabase.

## Regra de segurança

A chave utilizada no frontend é uma Publishable Key. Secret Keys/Service Role Keys nunca devem ser colocadas no código do navegador.

## Regra de manutenção

Este repositório não contém os motores de cálculo de Abono ou Diferenças. Alterações no portal não devem modificar esses motores.
