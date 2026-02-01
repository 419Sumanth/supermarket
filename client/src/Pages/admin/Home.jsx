function Home() {
  // Temporary dummy data
  const stats = {
    products: 5,
    orders: 12,
    lowStock: 2,
  };

  return (
    <>
      <h4>Admin Dashboard</h4>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Products</h6>
            <h3>{stats.products}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Total Orders</h6>
            <h3>{stats.orders}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm p-3">
            <h6>Low Stock Alerts</h6>
            <h3 className="text-danger">{stats.lowStock}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
