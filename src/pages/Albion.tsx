import { useEffect, useRef } from "react";
import "./Albion.css";

export default function Albion() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Intenta poner el video en pantalla completa apenas el componente se monte
    if (videoRef.current && document.fullscreenEnabled) {
      videoRef.current
        .requestFullscreen()
        .catch((error) =>
          console.error("Error al intentar pantalla completa:", error)
        );
    }
  }, []);

  return (
    <div className="albion-container">
      <video ref={videoRef} className="albion-video" controls autoPlay>
        <source src="/videos/albion.mp4" type="video/mp4" />
      </video>
    </div>
  );
}