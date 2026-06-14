import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const { useState, useEffect } = React;

// --- FIREBASE INIT ---
const firebaseConfig = {
  apiKey: "AIzaSyAyf8ROPQy9IUJhDanOVg3PQpFRAXRgmQ8",
  authDomain: "zanama-fb506.firebaseapp.com",
  projectId: "zanama-fb506",
  storageBucket: "zanama-fb506.firebasestorage.app",
  messagingSenderId: "107245182200",
  appId: "1:107245182200:web:93adfacb67530ef38eaf0d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = "zanama-app-v1";

// --- ICONOS SVG ---
const IconLeaf = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
const IconWater = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);
const IconClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconTrash = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);
const IconCalendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconAlert = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconCalculator = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16.01" y2="14" />
    <line x1="16" y1="18" x2="16.01" y2="18" />
    <line x1="12" y1="14" x2="12.01" y2="14" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
    <line x1="8" y1="14" x2="8.01" y2="14" />
    <line x1="8" y1="18" x2="8.01" y2="18" />
  </svg>
);
const IconCloud = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);
const IconLogout = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// --- DATOS DE BAYAS ---
const BERRY_DB = {
  "Cereza (Picante)": {
    duration: 16,
    waterStart: 4,
    waterEnd: 6,
    waterRequired: 1,
    initialWater: false,
    color: "bg-red-100 text-red-800",
  },
  "Meloc (Dulce)": {
    duration: 16,
    waterStart: 4,
    waterEnd: 6,
    waterRequired: 1,
    initialWater: false,
    color: "bg-pink-100 text-pink-800",
  },
  "Zafre (Amarga)": {
    duration: 16,
    waterStart: 4,
    waterEnd: 6,
    waterRequired: 1,
    initialWater: false,
    color: "bg-blue-100 text-blue-800",
  },
  "Zanama (Final)": {
    duration: 20,
    waterStart: 8,
    waterEnd: 12,
    waterRequired: 1,
    initialWater: true,
    color: "bg-purple-100 text-purple-800",
  },
};

// --- UTILIDADES DE FECHA ---
const formatDate = (date) => {
  return date.toLocaleString("es-ES", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getICSDate = (date) => {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
};

const generateICS = (events) => {
  let ics =
    "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//ZanamaFarmPokeMMO//ES\nCALSCALE:GREGORIAN\n";
  events.forEach((ev) => {
    ics += "BEGIN:VEVENT\n";
    ics += `UID:${Date.now()}-${Math.random().toString(36).substring(2)}@zanamafarm\n`;
    ics += `DTSTAMP:${getICSDate(new Date())}\n`;
    ics += `DTSTART:${getICSDate(ev.start)}\n`;
    ics += `DTEND:${getICSDate(ev.end)}\n`;
    ics += `SUMMARY:${ev.title}\n`;
    ics += `DESCRIPTION:${ev.description}\n`;
    ics +=
      "BEGIN:VALARM\nTRIGGER:-PT0M\nACTION:DISPLAY\nDESCRIPTION:Recordatorio de Cultivo\nEND:VALARM\n";
    ics += "END:VEVENT\n";
  });
  ics += "END:VCALENDAR";
  return ics;
};

const downloadICS = (filename, content) => {
  const blob = new Blob([content], {
    type: "text/calendar;charset=utf-8",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const FarmCalculator = () => {
  const [inv, setInv] = useState({
    spicy: 0,
    verySpicy: 0,
    sweet: 0,
    verySweet: 0,
    bitter: 0,
    veryBitter: 0,
  });

  const handleChange = (field, val) => {
    setInv((prev) => ({ ...prev, [field]: parseInt(val) || 0 }));
  };

  const verySweetUsed = Math.min(156, inv.verySweet);
  const melocPlots3x = 156 - verySweetUsed;
  const sweetNeededForMeloc = verySweetUsed * 1 + melocPlots3x * 3;
  const totalSweetNeeded = sweetNeededForMeloc + 156;
  const verySweetExcess = inv.verySweet - verySweetUsed;
  const sweetExcess = inv.sweet - totalSweetNeeded;

  const veryBitterUsed = Math.min(156, inv.veryBitter);
  const zafrePlots3x = 156 - veryBitterUsed;
  const bitterNeededForZafre = veryBitterUsed * 1 + zafrePlots3x * 3;
  const totalBitterNeeded = bitterNeededForZafre + 156;
  const veryBitterExcess = inv.veryBitter - veryBitterUsed;
  const bitterExcess = inv.bitter - totalBitterNeeded;

  let verySpicyBuyZanama = 0;
  let verySpicyForZanama = inv.verySpicy;
  if (inv.verySpicy < 156) {
    verySpicyBuyZanama = 156 - inv.verySpicy;
  }

  const remainingVerySpicy = Math.max(0, inv.verySpicy - 156);
  const verySpicyForCereza = Math.min(156, remainingVerySpicy);
  const cerezaPlots3x = 156 - verySpicyForCereza;
  const spicyNeededForCereza = verySpicyForCereza * 1 + cerezaPlots3x * 3;

  const verySpicyExcess = remainingVerySpicy - verySpicyForCereza;
  const spicyExcess = inv.spicy - spicyNeededForCereza;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white rounded-2xl p-5 poke-shadow border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <IconCalculator /> Mis Semillas
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Ingresa lo que obtuviste al extraer tus cosechas.
          </p>

          <div className="space-y-3 bg-red-50 p-4 rounded-xl border border-red-100 mb-4">
            <h3 className="text-red-800 font-bold text-sm tracking-wide uppercase">
              🔥 Picantes
            </h3>
            <div>
              <label className="text-xs text-red-600 font-semibold mb-1 block">
                Simples
              </label>
              <input
                type="number"
                min="0"
                value={inv.spicy || ""}
                onChange={(e) => handleChange("spicy", e.target.value)}
                className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div>
              <label className="text-xs text-red-600 font-semibold mb-1 block">
                Muy Picantes
              </label>
              <input
                type="number"
                min="0"
                value={inv.verySpicy || ""}
                onChange={(e) => handleChange("verySpicy", e.target.value)}
                className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div className="space-y-3 bg-pink-50 p-4 rounded-xl border border-pink-100 mb-4">
            <h3 className="text-pink-800 font-bold text-sm tracking-wide uppercase">
              🍬 Dulces
            </h3>
            <div>
              <label className="text-xs text-pink-600 font-semibold mb-1 block">
                Simples
              </label>
              <input
                type="number"
                min="0"
                value={inv.sweet || ""}
                onChange={(e) => handleChange("sweet", e.target.value)}
                className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="text-xs text-pink-600 font-semibold mb-1 block">
                Muy Dulces
              </label>
              <input
                type="number"
                min="0"
                value={inv.verySweet || ""}
                onChange={(e) => handleChange("verySweet", e.target.value)}
                className="w-full px-3 py-2 border border-pink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          </div>

          <div className="space-y-3 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="text-blue-800 font-bold text-sm tracking-wide uppercase">
              🌿 Amargas
            </h3>
            <div>
              <label className="text-xs text-blue-600 font-semibold mb-1 block">
                Simples
              </label>
              <input
                type="number"
                min="0"
                value={inv.bitter || ""}
                onChange={(e) => handleChange("bitter", e.target.value)}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-xs text-blue-600 font-semibold mb-1 block">
                Muy Amargas
              </label>
              <input
                type="number"
                min="0"
                value={inv.veryBitter || ""}
                onChange={(e) => handleChange("veryBitter", e.target.value)}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl p-6 poke-shadow border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3">
            Plan de Siembra (156 Parcelas)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-2">
                Zanamas (Final)
              </h3>
              <ul className="text-sm space-y-1 text-purple-900">
                <li className="flex justify-between">
                  <span>Dulces simples:</span> <strong>156</strong>
                </li>
                <li className="flex justify-between">
                  <span>Amargas simples:</span> <strong>156</strong>
                </li>
                <li className="flex justify-between">
                  <span>Muy Picantes:</span>
                  <strong
                    className={verySpicyBuyZanama > 0 ? "text-red-600" : ""}
                  >
                    156{" "}
                    {verySpicyBuyZanama > 0 && `(Faltan ${verySpicyBuyZanama})`}
                  </strong>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <h3 className="font-bold text-red-800 mb-2">Bayas Cereza</h3>
              <ul className="text-sm space-y-2 text-red-900">
                <li>
                  <strong>{verySpicyForCereza}</strong> parcelas usando: <br />
                  <span className="text-xs opacity-80">
                    1 Picante + 1 Muy Picante
                  </span>
                </li>
                <li>
                  <strong>{cerezaPlots3x}</strong> parcelas usando: <br />
                  <span className="text-xs opacity-80">3 Picantes simples</span>
                </li>
              </ul>
            </div>
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
              <h3 className="font-bold text-pink-800 mb-2">Bayas Meloc</h3>
              <ul className="text-sm space-y-2 text-pink-900">
                <li>
                  <strong>{verySweetUsed}</strong> parcelas usando: <br />
                  <span className="text-xs opacity-80">
                    1 Dulce + 1 Muy Dulce
                  </span>
                </li>
                <li>
                  <strong>{melocPlots3x}</strong> parcelas usando: <br />
                  <span className="text-xs opacity-80">3 Dulces simples</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Bayas Zafre</h3>
              <ul className="text-sm space-y-2 text-blue-900">
                <li>
                  <strong>{veryBitterUsed}</strong> parcelas usando: <br />
                  <span className="text-xs opacity-80">
                    1 Amarga + 1 Muy Amarga
                  </span>
                </li>
                <li>
                  <strong>{zafrePlots3x}</strong> parcelas usando: <br />
                  <span className="text-xs opacity-80">3 Amargas simples</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-white">
          <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
            💰 Excedentes (Qué vender y comprar)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="pb-2">Semilla</th>
                  <th className="pb-2">Simples</th>
                  <th className="pb-2">Variante "Muy"</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="py-3 font-semibold text-red-300">Picantes</td>
                  <td className="py-3">
                    {spicyExcess >= 0 ? (
                      <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded">
                        Vender: {spicyExcess}
                      </span>
                    ) : (
                      <span className="text-red-400 bg-red-900/30 px-2 py-1 rounded">
                        Comprar: {Math.abs(spicyExcess)}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    {verySpicyExcess > 0 ? (
                      <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded">
                        Vender: {verySpicyExcess}
                      </span>
                    ) : verySpicyBuyZanama > 0 ? (
                      <span className="text-red-400 bg-red-900/30 px-2 py-1 rounded">
                        Comprar: {verySpicyBuyZanama}
                      </span>
                    ) : (
                      <span className="text-gray-400">Usadas todas</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-pink-300">Dulces</td>
                  <td className="py-3">
                    {sweetExcess >= 0 ? (
                      <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded">
                        Vender: {sweetExcess}
                      </span>
                    ) : (
                      <span className="text-red-400 bg-red-900/30 px-2 py-1 rounded">
                        Comprar: {Math.abs(sweetExcess)}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    {verySweetExcess > 0 ? (
                      <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded">
                        Vender: {verySweetExcess}
                      </span>
                    ) : (
                      <span className="text-gray-400">Usadas todas</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-blue-300">Amargas</td>
                  <td className="py-3">
                    {bitterExcess >= 0 ? (
                      <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded">
                        Vender: {bitterExcess}
                      </span>
                    ) : (
                      <span className="text-red-400 bg-red-900/30 px-2 py-1 rounded">
                        Comprar: {Math.abs(bitterExcess)}
                      </span>
                    )}
                  </td>
                  <td className="py-3">
                    {veryBitterExcess > 0 ? (
                      <span className="text-green-400 bg-green-900/30 px-2 py-1 rounded">
                        Vender: {veryBitterExcess}
                      </span>
                    ) : (
                      <span className="text-gray-400">Usadas todas</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Sync Code State
  const [syncCode, setSyncCode] = useState(
    localStorage.getItem("zanama_sync_code") || "",
  );
  const [tempCodeInput, setTempCodeInput] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [plantings, setPlantings] = useState([]);

  const [selectedAcc, setSelectedAcc] = useState("");
  const [selectedBerry, setSelectedBerry] = useState("Zanama (Final)");
  const [plantTime, setPlantTime] = useState("");
  const [newAccName, setNewAccName] = useState("");
  const [activeTab, setActiveTab] = useState("timers");

  // 1. Inicializar Autenticación
  useEffect(() => {
    if (!app) {
      setIsAuthLoading(false);
      return;
    }
    const initAuth = async () => {
      try {
        if (
          typeof __initial_auth_token !== "undefined" &&
          __initial_auth_token
        ) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Error authenticating:", error);
        setIsAuthLoading(false);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch de datos en la nube (Usando public path y syncCode)
  useEffect(() => {
    if (!user || !db || !syncCode) return;

    // Escuchar configuracion de Cuentas compartidas por el SyncCode
    const accRef = doc(
      db,
      "artifacts",
      appId,
      "public",
      "data",
      "accounts",
      syncCode,
    );
    const unsubAcc = onSnapshot(
      accRef,
      (docSnap) => {
        if (docSnap.exists() && docSnap.data().list) {
          setAccounts(docSnap.data().list);
        } else {
          // Valores por defecto
          const defaultAccs = ["Cuenta Principal", "Alt 1"];
          setAccounts(defaultAccs);
          setDoc(accRef, { list: defaultAccs }).catch((e) => console.error(e));
        }
      },
      (error) => console.error("Error fetch accounts:", error),
    );

    // Escuchar Cultivos activos compartidos por el SyncCode
    const plantRef = collection(
      db,
      "artifacts",
      appId,
      "public",
      "data",
      `plantings_${syncCode}`,
    );
    const unsubPlant = onSnapshot(
      plantRef,
      (snapshot) => {
        const loaded = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          loaded.push({
            ...data,
            id: doc.id,
            plantTime: new Date(data.plantTimeTimestamp),
          });
        });
        // Ordenar en memoria
        loaded.sort((a, b) => b.plantTime - a.plantTime);
        setPlantings(loaded);
      },
      (error) => console.error("Error fetch plantings:", error),
    );

    return () => {
      unsubAcc();
      unsubPlant();
    };
  }, [user, syncCode]);

  useEffect(() => {
    if (accounts.length > 0 && !selectedAcc) setSelectedAcc(accounts[0]);
  }, [accounts, selectedAcc]);

  // Mutaciones Firestore
  const addAccount = () => {
    if (!user || !db || !syncCode) return;
    const name = newAccName.trim();
    if (name && !accounts.includes(name)) {
      const updated = [...accounts, name];
      setDoc(
        doc(db, "artifacts", appId, "public", "data", "accounts", syncCode),
        { list: updated },
      );
      if (!selectedAcc) setSelectedAcc(name);
      setNewAccName("");
    }
  };

  const removeAccount = (accToRemove) => {
    if (!user || !db || !syncCode) return;
    const updated = accounts.filter((a) => a !== accToRemove);
    setDoc(
      doc(db, "artifacts", appId, "public", "data", "accounts", syncCode),
      { list: updated },
    );
    if (selectedAcc === accToRemove) setSelectedAcc(updated[0] || "");
  };

  const addPlanting = () => {
    if (
      !user ||
      !db ||
      !selectedAcc ||
      !selectedBerry ||
      !plantTime ||
      !syncCode
    )
      return;
    const timeObj = new Date(plantTime);
    const newId =
      Date.now().toString() + Math.random().toString(36).substr(2, 5);

    const newPlanting = {
      account: selectedAcc,
      berry: selectedBerry,
      plantTimeTimestamp: timeObj.getTime(),
      data: BERRY_DB[selectedBerry],
    };

    setDoc(
      doc(
        db,
        "artifacts",
        appId,
        "public",
        "data",
        `plantings_${syncCode}`,
        newId,
      ),
      newPlanting,
    );
    setPlantTime("");
  };

  const removePlanting = (id) => {
    if (!user || !db || !syncCode) return;
    deleteDoc(
      doc(
        db,
        "artifacts",
        appId,
        "public",
        "data",
        `plantings_${syncCode}`,
        id,
      ),
    );
  };

  const handleLoginSync = () => {
    if (tempCodeInput.trim().length > 3) {
      const cleanCode = tempCodeInput
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      setSyncCode(cleanCode);
      localStorage.setItem("zanama_sync_code", cleanCode);
    } else {
      alert("Por favor ingresa un código de al menos 4 caracteres."); // Se usa alert genérico aquí como fallback, pero mejor un msj inline.
    }
  };

  const handleLogoutSync = () => {
    setSyncCode("");
    localStorage.removeItem("zanama_sync_code");
    setAccounts([]);
    setPlantings([]);
  };

  // Timeline logic
  const generateSchedule = (planting) => {
    const t0 = planting.plantTime;
    const dbInfo = planting.data;
    const schedule = [];

    schedule.push({
      type: "plant",
      icon: <IconLeaf />,
      title: `Plantado: ${planting.berry}`,
      time: t0,
      desc: dbInfo.initialWater
        ? "¡Recuerda regar INMEDIATAMENTE al plantar!"
        : "Dejar sin regar por ahora.",
    });

    const waterStart = new Date(
      t0.getTime() + dbInfo.waterStart * 60 * 60 * 1000,
    );
    const waterEnd = new Date(t0.getTime() + dbInfo.waterEnd * 60 * 60 * 1000);
    schedule.push({
      type: "water",
      icon: <IconWater />,
      title: "Momento de Regar",
      time: waterStart,
      endStr: formatDate(waterEnd),
      desc: `Tienes entre las ${formatDate(waterStart).split(",")[1]} y las ${formatDate(waterEnd).split(",")[1]} para regar.`,
    });

    const harvestTime = new Date(
      t0.getTime() + dbInfo.duration * 60 * 60 * 1000,
    );
    const deathTime = new Date(
      t0.getTime() + dbInfo.duration * 2 * 60 * 60 * 1000,
    );
    schedule.push({
      type: "harvest",
      icon: <IconCalendar />,
      title: "¡Lista para Cosechar!",
      time: harvestTime,
      desc: `Cosecha antes del ${formatDate(deathTime)} o la planta morirá.`,
    });

    return { schedule, t0, waterStart, waterEnd, harvestTime, deathTime };
  };

  const handleExportICS = (planting) => {
    const { waterStart, waterEnd, harvestTime, deathTime } =
      generateSchedule(planting);
    const events = [];

    events.push({
      title: `💧 REGAR: ${planting.berry} (${planting.account})`,
      start: waterStart,
      end: new Date(waterStart.getTime() + 30 * 60000),
      description: `Hora de regar tu cuenta: ${planting.account}. \nPlantaste: ${planting.berry}. \nTienes de plazo máximo hasta: ${formatDate(waterEnd)}.`,
    });

    events.push({
      title: `🌾 COSECHAR: ${planting.berry} (${planting.account})`,
      start: harvestTime,
      end: new Date(harvestTime.getTime() + 60 * 60000),
      description: `¡Tus bayas en la cuenta ${planting.account} están listas! \nTienes que cosecharlas antes de ${formatDate(deathTime)} o se marchitarán.`,
    });

    const urgentTime = new Date(deathTime.getTime() - 4 * 60 * 60 * 1000);
    events.push({
      title: `⚠️ URGENTE: Cosecha marchitándose en 4h (${planting.account})`,
      start: urgentTime,
      end: new Date(urgentTime.getTime() + 30 * 60000),
      description: `Si no cosechas las ${planting.berry} en la cuenta ${planting.account} ahora mismo, se perderán en 4 horas.`,
    });

    const icsContent = generateICS(events);
    downloadICS(
      `Cultivo_${planting.account.replace(/\s+/g, "")}_${planting.berry.split(" ")[0]}.ics`,
      icsContent,
    );
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="loader mb-4"></div>
        <h2 className="text-xl font-bold text-gray-700">
          Conectando a la nube...
        </h2>
      </div>
    );
  }

  // Vista de Login si no hay código de sincronización
  if (!syncCode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-200">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconCloud />
          </div>
          <h1 className="text-2xl font-black text-center text-gray-800 mb-2">
            Conectar Dispositivos
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Crea un código secreto para conectar tu PC y tu Celular a la misma
            granja en la nube.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Código de Sincronización
              </label>
              <input
                type="text"
                value={tempCodeInput}
                onChange={(e) => setTempCodeInput(e.target.value)}
                placeholder="Ej: GranjaSecreta123"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                onKeyPress={(e) => e.key === "Enter" && handleLoginSync()}
              />
            </div>
            <button
              onClick={handleLoginSync}
              className="w-full bg-poke-red text-white font-bold py-3 rounded-lg shadow hover:bg-red-700 transition"
            >
              Entrar / Crear Granja
            </button>
          </div>
          <div className="mt-6 p-4 bg-blue-50 text-blue-800 text-xs rounded-lg">
            <strong>Instrucciones:</strong> Abre la app en tu celular, escribe
            exactamente este mismo código, y tus datos se sincronizarán
            mágicamente.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <header className="bg-poke-red text-white py-6 px-4 shadow-lg border-b-4 border-red-900">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-inner border-2 border-gray-300">
              <div className="w-6 h-6 rounded-full border-2 border-black relative bg-white overflow-hidden">
                <div className="w-full h-1/2 bg-red-500 absolute top-0 border-b-2 border-black"></div>
                <div className="w-2 h-2 bg-white rounded-full border-2 border-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                Zanama Farm Cloud
              </h1>
              <p className="text-xs font-medium text-red-200">
                Sala: {syncCode}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-900/50 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-red-800">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>{" "}
              Sincronizado
            </div>
            <button
              onClick={handleLogoutSync}
              className="bg-red-900/50 p-1.5 rounded-full hover:bg-red-800 transition text-white"
              title="Desconectar / Cambiar Código"
            >
              <IconLogout />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex space-x-2 border-b-2 border-gray-200 pb-px overflow-x-auto">
          <button
            onClick={() => setActiveTab("timers")}
            className={`px-6 py-3 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap ${activeTab === "timers" ? "bg-poke-red text-white border-b-0" : "bg-white text-gray-500 hover:bg-gray-100"}`}
          >
            <div className="flex items-center gap-2">
              <IconClock /> Tiempos y Alarmas
            </div>
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-6 py-3 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap ${activeTab === "calculator" ? "bg-poke-red text-white border-b-0" : "bg-white text-gray-500 hover:bg-gray-100"}`}
          >
            <div className="flex items-center gap-2">
              <IconCalculator /> Calculadora de Semillas
            </div>
          </button>

          <button
            onClick={() => (window.location.href = "Guia HO-OH.html")}
            className="px-6 py-3 font-bold text-sm rounded-t-lg transition-colors whitespace-nowrap bg-white text-gray-500 hover:bg-gray-100"
          >
            <div className="flex items-center gap-2">
              <i className="fas fa-feather-alt"></i> Guía Ho-Oh
            </div>
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-4 mt-4 grid grid-cols-1 md:grid-cols-12 gap-6">
        {activeTab === "timers" ? (
          <>
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl p-5 poke-shadow border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <IconLeaf /> Mis Cuentas
                </h2>
                <div className="space-y-2 mb-4">
                  {accounts.map((acc) => (
                    <div
                      key={acc}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg text-sm border border-gray-200"
                    >
                      <span className="font-medium text-gray-700">{acc}</span>
                      <button
                        onClick={() => removeAccount(acc)}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <IconTrash />
                      </button>
                    </div>
                  ))}
                  {accounts.length === 0 && (
                    <p className="text-xs text-gray-400 italic">
                      No hay cuentas. Añade una abajo.
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newAccName}
                    onChange={(e) => setNewAccName(e.target.value)}
                    placeholder="Ej. Alt 1"
                    className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    onKeyPress={(e) => e.key === "Enter" && addAccount()}
                  />
                  <button
                    onClick={addAccount}
                    className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-900 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 poke-shadow border border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <IconClock /> Registrar Plantación
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      Cuenta
                    </label>
                    <select
                      value={selectedAcc}
                      onChange={(e) => setSelectedAcc(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                    >
                      {accounts.map((acc) => (
                        <option key={acc} value={acc}>
                          {acc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      ¿Qué plantaste?
                    </label>
                    <select
                      value={selectedBerry}
                      onChange={(e) => setSelectedBerry(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                    >
                      {Object.keys(BERRY_DB).map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      Fecha y Hora de siembra
                    </label>
                    <input
                      type="datetime-local"
                      value={plantTime}
                      onChange={(e) => setPlantTime(e.target.value)}
                      className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50"
                    />
                  </div>
                  <button
                    onClick={addPlanting}
                    disabled={!selectedAcc || !plantTime}
                    className="w-full bg-poke-red text-white py-3 rounded-lg font-bold shadow-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Registrar en la Nube
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Cultivos Activos ({plantings.length})
              </h2>
              {plantings.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <IconLeaf />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700">
                    No hay cultivos activos
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">
                    Selecciona una cuenta, el tipo de baya y la hora para
                    registrar el cultivo en la nube.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {plantings.map((planting) => {
                    const { schedule, harvestTime } =
                      generateSchedule(planting);
                    const now = new Date();
                    const isDone = now > harvestTime;
                    const progress = Math.min(
                      100,
                      Math.max(
                        0,
                        ((now - planting.plantTime) /
                          (harvestTime - planting.plantTime)) *
                          100,
                      ),
                    );

                    return (
                      <div
                        key={planting.id}
                        className="bg-white rounded-2xl overflow-hidden poke-shadow border border-gray-100 relative animate-fadeIn"
                      >
                        <div
                          className={`px-5 py-3 border-b border-gray-100 flex justify-between items-center ${planting.data.color}`}
                        >
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                              {planting.account}
                            </span>
                            <h3 className="text-lg font-bold">
                              {planting.berry}
                            </h3>
                          </div>
                          <button
                            onClick={() => removePlanting(planting.id)}
                            className="p-2 hover:bg-black/10 rounded-full transition"
                          >
                            <IconTrash />
                          </button>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5">
                          <div
                            className={`h-1.5 transition-all duration-1000 ${isDone ? "bg-green-500" : "bg-poke-red"}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="p-5">
                          <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                            {schedule.map((step, idx) => (
                              <div key={idx} className="relative pl-6">
                                <div
                                  className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white ${step.type === "harvest" ? "bg-green-500 text-white" : step.type === "water" ? "bg-blue-500 text-white" : "bg-gray-800 text-white"}`}
                                >
                                  {step.icon}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-800 text-sm">
                                    {step.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 font-medium mt-0.5">
                                    {formatDate(step.time)}
                                  </p>
                                  <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded border border-gray-100">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-4 border-t border-gray-100 flex justify-between items-center">
                          <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                            <IconAlert /> Exporta las alarmas
                          </div>
                          <button
                            onClick={() => handleExportICS(planting)}
                            className="bg-poke-red text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-red-700 transition flex items-center gap-2"
                          >
                            <IconCalendar /> Añadir al Celular
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>{" "}
                    Guardado automáticamente en la sala:{" "}
                    <strong>{syncCode}</strong>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="md:col-span-12">
            <FarmCalculator />
          </div>
        )}
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
