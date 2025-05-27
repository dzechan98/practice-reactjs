export const ServicePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Our Services</h1>
      <p className="mb-2">
        Welcome to our services page. We offer a variety of solutions to meet
        your needs.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Service One</h2>
          <p>
            Description of service one. We provide high-quality solutions
            tailored for you.
          </p>
        </div>
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Service Two</h2>
          <p>
            Description of service two. Our experts are here to help you achieve
            your goals.
          </p>
        </div>
        <div className="border p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Service Three</h2>
          <p>
            Description of service three. Innovative and reliable services you
            can trust.
          </p>
        </div>
      </div>
    </div>
  );
};
