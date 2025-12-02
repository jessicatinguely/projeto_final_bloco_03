# 🏥 Farmácia Viva Bem — Frontend  
Projeto desenvolvido por **Jéssica Ghirardelli Tinguely**

---

## 📌 Sobre o Projeto  
Este é o **frontend** da aplicação *Farmácia Viva Bem*, consumindo a API hospedada em:  
https://farmacia-jk1x.onrender.com/
a
O objetivo é oferecer uma interface moderna, responsiva e intuitiva para gerenciar **Produtos** e **Categorias** usando React, TypeScript e TailwindCSS.

---

## 🚀 Tecnologias Utilizadas

- **React + Vite**
- **TypeScript**
- **TailwindCSS**
- **React Router DOM**
- **Axios**
- **React Spinners**
- **Toastify**

---

## 🔗 Integração com o Backend

Base URL configurada no `.env`:

```
VITE_BASE_URL=https://farmacia-jk1x.onrender.com/
```

---

## 📡 Endpoints Consumidos

### 🧪 Produtos
```
GET    /produtos
GET    /produtos/{id}
POST   /produtos
PUT    /produtos
DELETE /produtos/{id}
```

### 🏷️ Categorias
```
GET    /categorias
GET    /categorias/{id}
POST   /categorias
PUT    /categorias
DELETE /categorias/{id}
```

---

## 🧩 Componentes Principais

### ✔️ Listagem de Produtos  
- Busca automática de produtos  
- Grid responsiva  
- Card individual com imagem + informações  

### ✔️ Formulário de Produto  
- Cadastrar e editar  
- Integração total com categorias  
- Validação e feedback com Toast  

### ✔️ Navbar e Footer  
- Navegação clara  
- Estilo responsivo  

---

## ▶️ Como Rodar o Projeto

```bash
# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

---

## 👩‍💻 Autora

**Jéssica Ghirardelli Tinguely**  
Desenvolvedora Frontend | Estudante ADS | Apaixonada por tecnologia 💙

---

## 📄 Licença

Este projeto é de uso educacional e não possui licença aberta no momento.
