export default function Footer() {
  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant py-6 text-center mt-auto z-10 shrink-0">
      <p className="text-sm text-on-surface-variant font-bold font-body">
        © {new Date().getFullYear()} SimiMap - Todos los derechos reservados.
      </p>
    </footer>
  );
}
