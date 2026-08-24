```tsx
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSuccess("Login realizado com sucesso!");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (err: any) {
      setError(err?.message || "E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Digite seu e-mail e sua senha.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSuccess(
        "Cadastro realizado! Verifique seu e-mail para confirmar a conta."
      );
    } catch (err: any) {
      setError(err?.message || "Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#18181b",
          border: "1px solid #3f3f46",
          borderRadius: "20px",
          padding: "35px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "50px" }}>✂️</div>

          <h1 style={{ fontSize: "32px", margin: "10px 0" }}>
            AutoClipper AI
          </h1>

          <p style={{ color: "#a1a1aa" }}>
            Entre para criar seus cortes com IA.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            E-mail
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            disabled={loading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #52525b",
              background: "#09090b",
              color: "white",
              fontSize: "16px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Senha
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            required
            disabled={loading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "10px",
              border: "1px solid #52525b",
              background: "#09090b",
              color: "white",
              fontSize: "16px",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "10px",
              background: loading ? "#52525b" : "#f97316",
              color: "white",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          style={{
            width: "100%",
            marginTop: "12px",
            padding: "16px",
            border: "1px solid #52525b",
            borderRadius: "10px",
            background: "transparent",
            color: "white",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Criar minha conta
        </button>

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "10px",
              background: "#450a0a",
              color: "#fecaca",
            }}
          >
            ❌ {error}
          </div>
        )}

        {success && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "10px",
              background: "#14532d",
              color: "#bbf7d0",
            }}
          >
            ✅ {success}
          </div>
        )}
      </div>
    </main>
  );
}
```
