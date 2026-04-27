import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

const LAST_UPDATED = "Abril 2026";
const EMAIL = "hola@hostlylabs.com";

const cookieTable = [
  {
    name: "Sesión / autenticación",
    type: "Técnica",
    purpose: "Mantener la sesión iniciada en la app.",
    duration: "Sesión",
    thirdParty: "No",
  },
  {
    name: "Google Analytics (_ga, _gid)",
    type: "Analítica",
    purpose: "Medir visitas, páginas más vistas y fuentes de tráfico.",
    duration: "2 años / 24h",
    thirdParty: "Google LLC",
  },
  {
    name: "Preferencias de consentimiento",
    type: "Técnica",
    purpose: "Recordar si aceptaste o rechazaste cookies.",
    duration: "12 meses",
    thirdParty: "No",
  },
];

export default function Cookies() {
  return (
    <PageShell
      title="Política de cookies | Hostly"
      description="Información sobre las cookies que usa Hostly: qué tipos, para qué sirven y cómo gestionarlas."
      path="/cookies"
      schemas={[
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Política de cookies", url: "/cookies" },
        ]),
      ]}
    >
      <div className="pt-28 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto prose prose-slate prose-base">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-2 not-prose">
            Política de cookies
          </h1>
          <p className="text-sm text-slate-400 mb-10 not-prose">
            Última actualización: {LAST_UPDATED}
          </p>

          <h2>¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
            cuando visitas un sitio web. Permiten que el sitio recuerde tus preferencias
            y mejore tu experiencia de uso.
          </p>

          <h2>Cookies que usamos</h2>
          <div className="not-prose overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8fafc] text-left">
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Cookie</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Tipo</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Finalidad</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Duración</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Tercero</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((c, i) => (
                  <tr key={c.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-4 py-3 text-slate-700 font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-slate-500">{c.type}</td>
                    <td className="px-4 py-3 text-slate-500">{c.purpose}</td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{c.duration}</td>
                    <td className="px-4 py-3 text-slate-500">{c.thirdParty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Cookies técnicas necesarias</h2>
          <p>
            Las cookies técnicas son imprescindibles para el funcionamiento básico del sitio.
            No requieren consentimiento según el art. 22.2 LSSI.
          </p>

          <h2>Cookies analíticas</h2>
          <p>
            Usamos Google Analytics para entender cómo se usa el sitio y mejorar el servicio.
            Los datos son anonimizados y no se usan para identificarte personalmente.
            Puedes optar por no participar en{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
              tools.google.com/dlpage/gaoptout
            </a>.
          </p>

          <h2>Cómo gestionar las cookies</h2>
          <p>
            Puedes configurar tu navegador para rechazar o eliminar cookies en cualquier momento.
            Ten en cuenta que desactivar las cookies técnicas puede afectar al funcionamiento del sitio.
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies" target="_blank" rel="noreferrer">Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a></li>
          </ul>

          <h2>Contacto</h2>
          <p>
            Para cualquier pregunta sobre nuestra política de cookies:{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
