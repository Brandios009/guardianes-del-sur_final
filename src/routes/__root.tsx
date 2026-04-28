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
