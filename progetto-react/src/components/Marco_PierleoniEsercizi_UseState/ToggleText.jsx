

import React, { useState } from "react";

function ToggleText() {
  // Stato booleano: false → testo nascosto
  const [isVisible, setIsVisible] = useState(false);

  // Funzione per invertire lo stato (mostra/nascondi)
  const handleToggle = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* Bottone con testo dinamico */}
      <button onClick={handleToggle}>
        {isVisible ? "Nascondi" : "Mostra"}
      </button>

      {/* Rendering condizionale del paragrafo */}
      {isVisible && (
        <p style={{ marginTop: "10px" }}>
          Questo è un paragrafo di testo che puoi mostrare o nascondere
          cliccando sul bottone.
        </p>
      )}
    </div>
  );
}

export default ToggleText;
