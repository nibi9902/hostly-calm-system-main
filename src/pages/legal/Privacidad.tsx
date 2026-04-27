import PageShell from "@/components/PageShell";
import { breadcrumbSchema } from "@/lib/seo/schemas";
import { LangLink } from "@/i18n/LangLink";

const LAST_UPDATED = "Abril 2026";
const EMAIL = "hola@hostlylabs.com";
const DPA = "Agencia Española de Protección de Datos (aepd.es)";

export default function Privacidad() {
  return (
    <PageShell
      title="Política de privacidad | Hostly"
      description="Política de privacidad de Hostly. Cómo recogemos, usamos y protegemos tus datos personales de acuerdo con el RGPD y la LOPDGDD."
      path="/privacidad"
      noindex={false}
      schemas={[
        breadcrumbSchema([
          { name: "Hostly", url: "/" },
          { name: "Política de privacidad", url: "/privacidad" },
        ]),
      ]}
    >
      <div className="pt-28 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto prose prose-slate prose-base">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Legal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight mb-2 not-prose">
            Política de privacidad
          </h1>
          <p className="text-sm text-slate-400 mb-10 not-prose">
            Última actualización: {LAST_UPDATED}
          </p>

          <h2>1. Responsable del tratamiento</h2>
          <p>
            <strong>Hostly</strong><br />
            Contacto: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>

          <h2>2. Datos que recogemos</h2>
          <p>Recogemos datos personales en los siguientes supuestos:</p>
          <ul>
            <li><strong>Registro en la app:</strong> nombre, dirección de correo electrónico y contraseña.</li>
            <li><strong>Uso del servicio:</strong> datos de propiedades, reservas y comunicaciones con huéspedes que introduces en la plataforma.</li>
            <li><strong>Comunicaciones:</strong> mensajes que nos envías por correo o formularios de contacto.</li>
            <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador, páginas visitadas y duración de la sesión.</li>
          </ul>

          <h2>3. Finalidad y base legal</h2>
          <ul>
            <li><strong>Prestación del servicio</strong> — ejecución del contrato (art. 6.1.b RGPD).</li>
            <li><strong>Comunicaciones comerciales</strong> — interés legítimo o consentimiento (art. 6.1.f / 6.1.a RGPD). Puedes darte de baja en cualquier momento.</li>
            <li><strong>Análisis y mejora del producto</strong> — interés legítimo (art. 6.1.f RGPD).</li>
            <li><strong>Cumplimiento legal</strong> — obligación legal (art. 6.1.c RGPD).</li>
          </ul>

          <h2>4. Conservación</h2>
          <p>
            Conservamos tus datos mientras mantengas una cuenta activa y durante
            el tiempo necesario para cumplir obligaciones legales (máximo 5 años para
            datos fiscales, según normativa española).
          </p>

          <h2>5. Destinatarios</h2>
          <p>
            No vendemos ni cedemos tus datos a terceros. Los compartimos únicamente con
            proveedores de infraestructura técnica bajo acuerdos de encargado del tratamiento
            (Supabase, Vercel, servicios de correo) y cuando lo exija la ley.
          </p>

          <h2>6. Transferencias internacionales</h2>
          <p>
            Algunos proveedores técnicos procesan datos fuera del Espacio Económico Europeo
            con las garantías adecuadas (cláusulas contractuales tipo de la Comisión Europea).
          </p>

          <h2>7. Tus derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar, suprimir, oponerte, limitar el tratamiento
            y portar tus datos. Para ejercerlos escríbenos a{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> indicando tu solicitud.
          </p>
          <p>
            También puedes reclamar ante la {DPA}.
          </p>

          <h2>8. Cookies</h2>
          <p>
            Usamos cookies técnicas y analíticas. Consulta nuestra{" "}
            <LangLink to="/cookies">Política de cookies</LangLink> para más detalles.
          </p>

          <h2>9. Cambios</h2>
          <p>
            Notificaremos cambios significativos en esta política por correo electrónico
            o mediante aviso en la app con al menos 30 días de antelación.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
