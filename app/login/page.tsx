```tsx
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function criarConta() {
    setMessage("");

    if (!email || !password) {
      setMessage("Digite seu e-mail e sua senha.");
      return;
    }

    if (password.length < 6) {
      setMessage("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("❌ " + error.message);
      return;
    }

    setMessage("✅ Conta criada! Verifique seu e-mail.");
  }

  async function entrar() {
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage("❌ " + error.message);
      return;
    }

    setMessage("✅ Login realizado!");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#09090b",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 30,
          background: "#18181b",
          borderRadius: 16,
        }}
      >
        <h1>AutoClipper AI</h1>

        <p>Login</p>

        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            marginBottom: 12,
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={entrar}
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
            marginBottom: 10,
          }}
        >
          Entrar
        </button>

        <button
          onClick={criarConta}
          disabled={loading}
          style={{
            width: "100%",
            padding: 14,
          }}
        >
          Criar minha conta
        </button>

        {message && (
          <p style={{ marginTop: 20 }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
```
