import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="max-w-md mx-auto px-5 py-16 text-center">
      <h2 className="text-6xl font-bold text-food-primary">404</h2>
      <p className="mt-3 mb-5">Ops! Essa página não existe.</p>
      <Link to="/" className="text-food-dark hover:underline">
        Voltar para a Home
      </Link>
    </div>
  );
}

export default NotFound;
