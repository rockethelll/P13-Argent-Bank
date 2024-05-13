import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='error-404'>
      <p>Erreur 404 la page n'existe pas.</p>
      <Link to='/' className='link-error'>
        Retourner sur la page d'accueil
      </Link>
    </div>
  );
};

export default ErrorPage;
