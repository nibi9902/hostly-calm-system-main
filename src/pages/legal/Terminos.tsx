import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";

const LAST_UPDATED = "Abril 2026";
const COMPANY = "Hostly";
const EMAIL = "hola@hostlylabs.com";
const APP_URL = "https://app.hostlylabs.com";

export default function Terminos() {
  return (
    <PageShell
      title="Términos y condiciones | Hostly"
      description="Términos y condiciones del servicio Hostly. Condiciones de uso, suscripción, cancelación y responsabilidades."
      path="/terminos"
      schemas={[
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Términos y condiciones", url: "/terminos" },
        ]),
      ]}
    >
      <div className="pt-28 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto prose prose-slate prose-base">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-2 not-prose">
            Términos y condiciones
          </h1>
          <p className="text-sm text-slate-400 mb-10 not-prose">
            Última actualización: {LAST_UPDATED}
          </p>

          <h2>1. Aceptación</h2>
          <p>
            Al registrarte en Hostly ({APP_URL}) aceptas estos Términos y Condiciones.
            Si no estás de acuerdo, no uses el servicio.
          </p>

          <h2>2. El servicio</h2>
          <p>
            {COMPANY} ofrece una plataforma SaaS para la gestión de apartamentos turísticos
            que incluye: sincronización de calendarios y reservas (channel manager),
            mensajería con huéspedes, check-in digital, cumplimiento normativo (SES, NRUA,
            taxa turística), coordinación de limpiezas y precios dinámicos.
          </p>

          <h2>3. Cuenta y acceso</h2>
          <ul>
            <li>Debes ser mayor de 18 años y proporcionar información veraz al registrarte.</li>
            <li>Eres responsable de mantener la confidencialidad de tu contraseña.</li>
            <li>Una cuenta puede gestionar múltiples propiedades según el plan contratado.</li>
          </ul>

          <h2>4. Prueba gratuita</h2>
          <p>
            Ofrecemos 14 días de prueba gratuita sin necesidad de tarjeta de crédito.
            Al finalizar el periodo de prueba, el servicio se suspende salvo que actives
            un plan de pago.
          </p>

          <h2>5. Precios y facturación</h2>
          <ul>
            <li>El precio es de 40 €/mes por apartamento (37 €/mes a partir de 5 apartamentos).</li>
            <li>La facturación es mensual por adelantado.</li>
            <li>Los precios incluyen IVA salvo que se indique lo contrario.</li>
            <li>Nos reservamos el derecho a modificar precios con 30 días de preaviso.</li>
          </ul>

          <h2>6. Cancelación</h2>
          <p>
            Puedes cancelar en cualquier momento desde la configuración de tu cuenta,
            sin permanencia ni penalización. El acceso se mantiene hasta el final
            del periodo pagado.
          </p>

          <h2>7. Uso aceptable</h2>
          <p>No está permitido:</p>
          <ul>
            <li>Usar el servicio para actividades ilegales.</li>
            <li>Intentar acceder a cuentas de otros usuarios.</li>
            <li>Introducir datos falsos o de terceros sin su consentimiento.</li>
            <li>Realizar ingeniería inversa sobre la plataforma.</li>
          </ul>

          <h2>8. Propiedad intelectual</h2>
          <p>
            Todo el software, diseño y contenido de la plataforma es propiedad de {COMPANY}.
            Los datos que introduces son tuyos; nos concedes una licencia limitada para
            procesarlos con el fin de prestar el servicio.
          </p>

          <h2>9. Limitación de responsabilidad</h2>
          <p>
            {COMPANY} no garantiza que el servicio esté disponible de forma ininterrumpida.
            En ningún caso nuestra responsabilidad superará el importe pagado en los
            últimos 12 meses. No somos responsables de sanciones derivadas del incumplimiento
            normativo del usuario (SES, NRUA, taxa turística), aunque proveamos las herramientas.
          </p>

          <h2>10. Legislación aplicable</h2>
          <p>
            Estos términos se rigen por la ley española. Para cualquier disputa,
            las partes se someten a los juzgados de Barcelona.
          </p>

          <h2>11. Contacto</h2>
          <p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
