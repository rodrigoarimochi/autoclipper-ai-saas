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

  async function handleLogin() {
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

      if (error) throw error;

      setSuccess("Login realizado com sucesso!");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 500);
    } catch (err: unknown) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "E-mail ou senha incorretos."
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

      if (error) throw error;

      if (data.session) {
        setSuccess("Conta criada com sucesso!");

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 500);
      } else {
        setSuccess(
          "Conta criada! Verifique seu e-mail para confirmar."
        );
      }
    } catch (err: unknown) {
      console.error(err);

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
          "linear-gradient(135deg, #09090b, #18181b, #27272a)",
        color: "#fff",
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
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontSize: "50px" }}>✂️</div>

          <h1
            style={{
              fontSize: "32px",
              margin: "10px 0",
            }}
          >
            AutoClipper AI
          </h1>

          <p style={{ color: "#a1a1aa" }}>
            Entre para criar seus cortes com IA.
          </p>
        </div>

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
          disabled={loading}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #52525b",
            background: "#09090b",
            color: "#fff",
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
          disabled={loading}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #52525b",
            background: "#09090b",
            color: "#fff",
            fontSize: "16px",
          }}
        />

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px",
            border: "none",
            borderRadius: "10px",
            background: loading ? "#52525b" : "#f97316",
            color: "#fff",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

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
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Aguarde..." : "Criar minha conta"}
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
