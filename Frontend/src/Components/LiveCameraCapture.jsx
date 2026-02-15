import React, { useRef, useState, useEffect } from "react";

const LiveCameraCapture = ({ label, name, setFormData }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [preview, setPreview] = useState(null);

  // ================= START CAMERA =================
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      streamRef.current = stream;

      setCameraOn(true);

      // Wait until video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);

    } catch (error) {
      alert("Camera access denied or not available");
      console.error(error);
    }
  };

  // ================= CAPTURE PHOTO =================
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], `${name}.jpg`, {
        type: "image/jpeg"
      });

      setFormData((prev) => ({
        ...prev,
        [name]: file
      }));

      setPreview(URL.createObjectURL(blob));
    }, "image/jpeg");

    stopCamera();
  };

  // ================= STOP CAMERA =================
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setCameraOn(false);
  };

  // Cleanup when component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="border p-4 rounded bg-gray-50">
      <label className="font-semibold block mb-2">{label}</label>

      {!cameraOn && (
        <button
          type="button"
          onClick={startCamera}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Open Camera
        </button>
      )}

      {cameraOn && (
        <div className="space-y-3">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded border"
          />
          <button
            type="button"
            onClick={capturePhoto}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Capture Photo
          </button>
        </div>
      )}

      {preview && (
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <img
            src={preview}
            alt="Captured"
            className="w-48 rounded border"
          />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default LiveCameraCapture;
