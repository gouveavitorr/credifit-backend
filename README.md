## Instalação e Execução

```bash
npm install
```

### 2. Rodar a aplicação

```bash
npm start
```

A aplicação será iniciada em modo de desenvolvimento na porta **3333**.

---

## Fluxo de Testagem Manual

Este fluxo de teste manual é projetado para verificar a funcionalidade de **criação de um novo empréstimo**, seguindo uma sequência de chamadas de API.

### Passo 1: Obter todos os usuários

Chame a rota para listar todos os usuários e obter seus IDs.

**Endpoint:**  
`GET /user`

**Exemplo de resposta:**

```json
[
  {
    "id": "e456c805-728b-497d-a1c6-681b9e28f244",
    "name": "Alice Ballice"
  },
  {
    "id": "f5c9a2c3-1d0e-4a6c-9c9e-5b23d9a8f4c7",
    "name": "Bobbie Goods"
  }
]
```

Selecione o `id` de um usuário para usar nas próximas etapas.

---

### Passo 2: Obter informações do funcionário pelo userId

Use o `id` do usuário obtido no passo anterior para chamar a rota.

**Endpoint:**  
`GET /employee/user/:userId`

**Exemplo de uso:**  
`GET /employee/user/f5c9a2c3-1d0e-4a6c-9c9e-5b23d9a8f4c7`

**Exemplo de resposta:**

```json
{
  "id": "c1f7a1b9-3d8c-4a1e-8e6f-7b5c3b9d0e2f",
  "salary": 2500,
  "companyId": "b1a1c9a1-d8c9-4a1e-8e6f-7b5c3b9d0e2f",
  "UserId": "f5c9a2c3-1d0e-4a6c-9c9e-5b23d9a8f4c7"
}
```

---

### Passo 3: Criar um novo empréstimo

Com o `employeeId` em mãos, crie um novo empréstimo.

**Endpoint:**  
`POST /loan`

**Exemplo de corpo da requisição:**

```json
{
  "amount": 1000,
  "parcelAmount": 2,
  "employeeId": "c1f7a1b9-3d8c-4a1e-8e6f-7b5c3b9d0e2f"
}
```

**Exemplo de resposta:**

```json
{
  "id": "a9d7b4c2-9e5d-4f8a-9c7b-6b0a1d9f8c5e",
  "amount": 1000,
  "dueDate": "2025-09-14T22:30:00.000Z",
  "parcelAmount": 2,
  "approved": true,
  "employeeId": "c1f7a1b9-3d8c-4a1e-8e6f-7b5c3b9d0e2f"
}
```

---

## Usuários de Testagem e seus Perfis

O banco de dados é populado com usuários que servem a diferentes propósitos de teste:

- **Alice Ballice** e **Bobbie Goods**  
  Funcionários da empresa **TechTechy**, com salários de `1500` e `2500`, respectivamente.  
  Ambos têm empréstimos aprovados e recusados, e um `companyId` associado.

- **Charlie Brown** e **Dionysus**  
  Funcionários da empresa **HealthHealthy**, com salários de `3800` e `8200`.  
  Também possuem empréstimos com diferentes status e um `companyId` associado.

- **Mellinöe** e **Frankie Ocean**  
  Funcionários da empresa **TimeTimey**, com salários de `12000` e `4000`.  
  Servem para testar diferentes cenários de empréstimo.

- **Hollow Knight** e **Silk Song**  
  Funcionários com salários de `5000` e `2200`, mas **sem `companyId` associado**.  
  Úteis para testar cenários em que o usuário não está vinculado a uma empresa.
