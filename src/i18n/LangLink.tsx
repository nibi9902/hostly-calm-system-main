import { Link, type LinkProps } from "react-router-dom";
import { useLang } from "./useLang";

/**
 * <LangLink to="/funcionalidades"> → automàticament prefixa amb /es/ o /ca/.
 * Si el `to` ja té prefix d'idioma o és extern (http), no toca res.
 */
export function LangLink(props: LinkProps & { to: string }) {
  const { localized } = useLang();
  const { to, ...rest } = props;

  // External URLs / mailto / tel: passen tal qual
  const isExternal = /^(https?:|mailto:|tel:|#)/i.test(to);
  const finalTo = isExternal ? to : localized(to);

  return <Link to={finalTo} {...rest} />;
}

export default LangLink;
