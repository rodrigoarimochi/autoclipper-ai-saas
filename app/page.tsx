"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [numClips, setNumClips] = useState(2);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function generateClips() {
    setError("");
    setMessage("");

    if (!videoUrl.trim()) {
      setError("Cole o link do YouTube.");
      return;
    }

    if (!videoUrl.includes("youtube.com") && !videoUrl.includes("youtu.be")) {
      setError("Digite um link válido do YouTube.");
      return;
    }

    setLoading(true);
    setMessage("Criando seu processamento...");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Você precisa estar conectado para gerar cortes.");
        setLoading(false);
        return;
      }

      const { data, error: insertError } = await supabase
        .from("processing_jobs")
        .insert({
          user_id: user.id,
          video_url: videoUrl.trim(),
          status: "pending",
          requested_clips: numClips,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      setMessage(
        `✅ Pedido criado! ID do processamento: ${data.id}`
      );
      setVideoUrl("");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Não foi possível iniciar o processamento."
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
        color: "white",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "10px",
            }}
          >
            ✂️
          </div>

          <h1
            style={{
              fontSize: "42px",
              margin: "0 0 12px",
            }}
          >
            AutoClipper AI
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#a1a1aa",
            }}
          >
            Transforme vídeos longos em cortes virais com IA.
          </p>
        </div>

        <section
          style={{
            background: "#18181b",
            border: "1px solid #3f3f46",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 20px 50px rgba(0,0,0,.3)",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            🔗 Link do YouTube
          </label>

          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={loading}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #52525b",
              background: "#09090b",
              color: "white",
              fontSize: "16px",
              marginBottom: "25px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            ✂️ Quantidade de cortes
          </label>

          <select
            value={numClips}
            onChange={(e) => setNumClips(Number(e.target.value))}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #52525b",
              background: "#09090b",
              color: "white",
              fontSize: "16px",
              marginBottom: "25px",
            }}
          >
            <option value={1}>1 corte</option>
            <option value={2}>2 cortes</option>
            <option value={3}>3 cortes</option>
            <option value={4}>4 cortes</option>
            <option value={5}>5 cortes</option>
          </select>

          <button
            onClick={generateClips}
            disabled={loading}
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "12px",
              border: "none",
              background: loading ? "#52525b" : "#f97316",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading
              ? "🚀 Criando processamento..."
              : "🚀 Gerar Cortes com IA"}
          </button>

          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background: "#14532d",
                color: "#bbf7d0",
              }}
            >
              {message}
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background: "#450a0a",
                color: "#fecaca",
              }}
            >
              ❌ {error}
            </div>
          )}
        </section>

        <div
          style={{
            marginTop: "35px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "15px",
          }}
        >
          <Feature
            icon="🎙️"
            title="Transcrição"
            text="Whisper identifica tudo que foi falado."
          />

          <Feature
            icon="🧠"
            title="IA"
            text="Gemini encontra os melhores momentos."
          />

          <Feature
            icon="📱"
            title="Vertical"
            text="Cortes preparados para Shorts, Reels e TikTok."
          />
        </div>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        padding: "20px",
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: "15px",
      }}
    >
      <div style={{ fontSize: "30px" }}>{icon}</div>

      <h3>{title}</h3>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "14px",
          lineHeight: 1.5,
        }}
      >
        {text}
      </p>
    </div>
  );
}
