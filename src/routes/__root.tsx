import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center panel-pixel p-8">
        <p className="eyebrow mb-3">— Pantalla perdida —</p>
        <h1 className="font-pixel text-[40px] text-accent text-glow mb-3">404</h1>
        <h2 className="font-pixel text-[12px] text-ink uppercase mb-3">
          ▸ Ruta no encontrada
        </h2>
        <p className="font-pixel text-[8px] text-ink-mute normal-case leading-loose mb-6">
          El sendero que buscas se desvaneció en la niebla del cañón.
        </p>
        <Link to="/" className="btn-pixel">
          [ Volver al inicio ]
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Guardianes del Sur — Descubre Nariño" },
      {
        name: "description",
        content:
          "Aventura pixel-art por los lugares mágicos de Nariño: Las Lajas, La Cocha, Galeras y Juanambú.",
      },
      { name: "author", content: "Guardianes del Sur" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Guardianes del Sur — Descubre Nariño" },
      { name: "twitter:title", content: "Guardianes del Sur — Descubre Nariño" },
      { name: "description", content: "Guardianes del Sur is a web application for managing user registrations and data." },
      { property: "og:description", content: "Guardianes del Sur is a web application for managing user registrations and data." },
      { name: "twitter:description", content: "Guardianes del Sur is a web application for managing user registrations and data." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a2a09da5-19c2-4826-a1b4-98cddd7186b5/id-preview-50ca21ec--274e43b3-358a-47c1-9fda-f14fefd5f7aa.lovable.app-1777372076114.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a2a09da5-19c2-4826-a1b4-98cddd7186b5/id-preview-50ca21ec--274e43b3-358a-47c1-9fda-f14fefd5f7aa.lovable.app-1777372076114.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
