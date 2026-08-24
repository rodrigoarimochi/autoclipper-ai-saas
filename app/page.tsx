export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>
          ✂️
        </div>

        <h1
          style={{
            fontSize: "48px",
            margin: "0 0 15px",
          }}
        >
          AutoClipper AI
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#a1a1aa",
            marginBottom: "40px",
          }}
        >
          Transforme vídeos longos em cortes virais com inteligência artificial.
        </p>

        <div
          style={{
            background: "#18181f",
            border: "1px solid #27272a",
            borderRadius: "16px",
            padding: "30px",
            textAlign: "left",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            Link do YouTube
          </label>

          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "10px",
              border: "1px solid #3f3f46",
              background: "#09090b",
              color: "white",
              fontSize: "16px",
              marginBottom: "15px",
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "10px",
              border: "none",
              background: "#ff5a1f",
              color: "white",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🚀 Gerar meus cortes
          </button>
        </div>

        <p
          style={{
            marginTop: "25px",
            color: "#71717a",
            fontSize: "14px",
          }}
        >
          IA para encontrar os melhores momentos, criar cortes 9:16 e gerar
          conteúdo para Shorts, Reels e TikTok.
        </p>
      </div>
    </main>
  );
}
