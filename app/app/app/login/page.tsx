"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function login() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/dashboard";
    }

    setLoading(false);
  }

  async function signup() {
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Conta criada! Verifique seu e-mail para confirmar o cadastro."
      );
    }

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#18181f",
          padding: "35px",
          borderRadius: "18px",
          border: "1px solid #27272a",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "48px" }}>✂️</div>

          <h1 style={{ marginBottom: "8px" }}>
            AutoClipper AI
          </h1>

          <p style={{ color: "#a1a1aa" }}>
            Entre na sua conta
          </p>
        </div>

        <label>E-mail</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: "8px",
            marginBottom: "20px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #3f3f46",
            background: "#09090b",
            color: "white",
          }}
        />

        <label>Senha</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
          style={{
            width: "100%",
            boxSizing: "border-box",
            marginTop: "8px",
            marginBottom: "20px",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #3f3f46",
            background: "#09090b",
            color: "white",
          }}
        />

        {message && (
          <div
            style={{
              background: "#27272a",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "15px",
              color: "#d4d4d8",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <button
          onClick={login}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "#ff5a1f",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          {loading ? "Processando..." : "Entrar"}
        </button>

        <button
          onClick={signup}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #3f3f46",
            background: "transparent",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Criar minha conta
        </button>
      </div>
    </main>
  );
}
