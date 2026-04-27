import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

const LAST_UPDATED = "Abril 2026";
const EMAIL = "hola@hostlylabs.com";
const DOMAIN = "hostlylabs.com";

export default function AvisoLegal() {
  return (
    <PageShell
      title="Aviso legal | Hostly"
      description="Aviso legal de Hostly. Información sobre el titular del sitio web hostlylabs.com según la LSSI."
      path="/aviso-legal"
      schemas={[
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Aviso legal", url: "/aviso-legal" },
        ]),
      ]}
    >
      <div className="pt-28 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto prose prose-slate prose-base">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-2 not-prose">
            Aviso legal
          </h1>
          <p className="text-sm text-slate-400 mb-10 not-prose">
            Última actualización: {LAST_UPDATED}
          </p>

          <p>
            En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información
            y del Comercio Electrónico (LSSI), se informa de los siguientes datos del titular
            del sitio web <strong>{DOMAIN}</strong>:
          </p>

          <h2>Datos del titular</h2>
          <ul>
            <li><strong>Denominación:</strong> Hostly</li>
            <li><strong>Correo electrónico:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><strong>Sitio web:</strong> https://{DOMAIN}</li>
          </ul>

          <h2>Objeto y ámbito de aplicación</h2>
          <p>
            El presente aviso legal regula el acceso y uso del sitio web {DOMAIN},
            titularidad de Hostly. El acceso al sitio web implica la aceptación
            de estas condiciones.
          </p>

          <h2>Propiedad intelectual e industrial</h2>
          <p>
            Los contenidos, diseños, textos, imágenes, logotipos y código fuente del sitio
            web son propiedad de Hostly o cuenta con las licencias correspondientes.
            Queda prohibida su reproducción, distribución o comunicación pública
            sin autorización expresa.
          </p>

          <h2>Responsabilidad</h2>
          <p>
            Hostly no garantiza la disponibilidad continuada del sitio ni la ausencia
            de errores en su contenido. No nos hacemos responsables de los daños derivados
            del uso del sitio o de la imposibilidad de acceso al mismo.
          </p>

          <h2>Legislación aplicable</h2>
          <p>
            El presente aviso legal se rige por la legislación española.
            Para la resolución de cualquier controversia relacionada con este sitio,
            las partes se someten a la jurisdicción de los tribunales de Barcelona.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
