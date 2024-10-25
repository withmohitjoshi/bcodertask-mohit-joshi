import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="page-background">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-title">
            Bcoder Store
          </h1>
          <Link
            to="/products"
            className="button-primary"
          >
            View Products
          </Link>
        </div>
        <div className="card p-6">
          <h2 className="card-title mb-4">
            About Our Store
          </h2>
          <p className="card-description mb-4">
            Welcome to our online store! We offer a wide range of high-quality products at competitive prices. Browse our collection and find exactly what you&apos;re looking for.
          </p>
          <p className="card-description">
            {`Click the "View Products" button to see our full catalog of items.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;