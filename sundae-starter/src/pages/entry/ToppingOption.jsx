import { useOrderDetails } from "../../contexts/OrderDetails";

const ToppingOption = ({ name, imagePath }) => {
  const { optionCounts, updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };
  const isChecked = !!optionCounts["toppings"][name];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        flexGrow: "1",
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: ".5rem",
        padding: "1rem",
        cursor: "pointer",
      }}
    >
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <div>
        <input
          type="checkbox"
          id={name}
          onChange={handleChange}
          checked={isChecked}
        />
        <label
          htmlFor={name}
          style={{ fontSize: "1.2rem" }}
        >
          {name}
        </label>
      </div>
    </div>
  );
};

export default ToppingOption;
