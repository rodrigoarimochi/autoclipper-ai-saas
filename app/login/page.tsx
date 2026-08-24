```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Digite seu e-mail e sua senha.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
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
    } catch (err: unknown) {
      console.error("Erro no login:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível realizar o login."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Digite seu e-mail.");
      return;
    }

    if (!password) {
      setError("Digite sua senha.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Cadastro Supabase:", data);

      if (data.session) {
        setSuccess("Conta criada com sucesso!");

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 700);
      } else {
        setSuccess(
          "Cadastro realizado! Verifique seu e-mail para confirmar a conta."
        );
      }
    } catch (err: unknown) {
      console.error("Erro no cadastro:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível criar a conta."
      );
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
        color: "#ffffff",
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
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "50px",
              marginBottom: "10px",
            }}
          >
            ✂️
          </div>

          <h1
            style={{
              fontSize: "32px",
              margin: "10px 0",
            }}
          >
            AutoClipper AI
          </h1>

          <p
            style={{
              color: "#a1a1aa",
              margin: 0,
            }}
          >
            Entre para criar seus cortes com IA.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            E-mail
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            autoComplete="email"
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
              color: "#ffffff",
              fontSize: "16px",
            }}
          />

          <label
            htmlFor="password"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Senha
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            autoComplete="current-password"
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
              color: "#ffffff",
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
              color: "#ffffff",
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
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Aguarde..." : "Criar minha conta"}
        </button>

        {error && (
          <div
            role="alert"
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "10px",
              background: "#450a0a",
              color: "#fecaca",
              lineHeight: "1.5",
              wordBreak: "break-word",
            }}
          >
            ❌ {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            style={{
              marginTop: "20px",
              padding: "14px",
              borderRadius: "10px",
              background: "#14532d",
              color: "#bbf7d0",
              lineHeight: "1.5",
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
