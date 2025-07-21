// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABdWdjdSTf33W6zaInDznc8HUWZE2KZ6w",
  authDomain: "spottrack-888de.firebaseapp.com",
  projectId: "spottrack-888de",
  storageBucket: "spottrack-888de.appspot.com",
  messagingSenderId: "641511662246",
  appId: "1:641511662246:web:c4c3225daae5edf4ea4a67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registro
document.getElementById("registrarBtn").addEventListener("click", async () => {
  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensajeRegistro");

  mensaje.textContent = "";
  mensaje.style.color = "white";

  if (!nombre || !email || !password) {
    mensaje.textContent = "Por favor completa todos los campos.";
    return;
  }

  // Verifica reCAPTCHA
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    mensaje.textContent = "Por favor, completa el reCAPTCHA.";
    return;
  }

  try {
    // Validar nombre no duplicado
    const nombreDocRef = doc(db, "nombresUsados", nombre.toLowerCase());
    const nombreSnapshot = await getDoc(nombreDocRef);

    if (nombreSnapshot.exists()) {
      mensaje.textContent = "Este nombre ya está en uso. Elige otro.";
      return;
    }

    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Enviar correo de verificación
    await sendEmailVerification(user);

    // Guardar en la colección "usuarios" con el UID
    const usuarioDocRef = doc(db, "usuarios", user.uid);
    await setDoc(usuarioDocRef, {
      uid: user.uid,
      nombre: nombre,
      email: email,
      premium: false,
      verificado: false,
      registrado: new Date().toISOString()
    });

    // Marcar el nombre como utilizado
    await setDoc(nombreDocRef, { uid: user.uid });

    mensaje.textContent = "Registro exitoso. Verifica tu correo antes de iniciar sesión.";
    mensaje.style.color = "lime";

  } catch (error) {
    console.error(error);
    if (error.code === "auth/email-already-in-use") {
      mensaje.textContent = "Este correo ya está registrado.";
    } else if (error.code === "auth/invalid-email") {
      mensaje.textContent = "Correo inválido.";
    } else if (error.code === "auth/weak-password") {
      mensaje.textContent = "La contraseña es muy débil (mínimo 6 caracteres).";
    } else {
      mensaje.textContent = "Error al registrar. Intenta de nuevo.";
    }
    mensaje.style.color = "red";
  }
});
