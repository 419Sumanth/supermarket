import { useNavigate } from "react-router-dom";

function StockAlertCard({ product }) {
  const navigate = useNavigate();

  const { name, category, quantity, lowStock } = product;

  const isCritical = quantity <= lowStock;
  const isWarning = quantity > lowStock && quantity <= lowStock + 5;

  const borderClass = isCritical
    ? "border-danger"
    : isWarning
    ? "border-warning"
    : "border-secondary";

  const badgeClass = isCritical
    ? "bg-danger"
    : isWarning
    ? "bg-warning text-dark"
    : "bg-secondary";

  return (
    <div className={`card ${borderClass} shadow-sm mb-2`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-1">{name}</h6>
          <small className="text-muted">{category}</small>
          <p className="mb-1">
            Stock: <strong>{quantity}</strong>
          </p>
        </div>

        <div className="text-end">
          <span className={`badge ${badgeClass} mb-2`}>
            {isCritical ? "Critical" : isWarning ? "Low Stock" : "Normal"}
          </span>
          <br />
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => navigate("/admin/stock")}
          >
            Manage Stock
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockAlertCard;
