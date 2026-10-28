import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <>
      <a className="sr-only skip-link" href="#main-content">
        Skip to content
      </a>
      <AppRoutes />
    </>
  );
}
