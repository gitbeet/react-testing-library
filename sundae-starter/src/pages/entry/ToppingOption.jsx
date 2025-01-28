const ToppingOption = ({ name, imagePath }) => {
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
      <span style={{ fontSize: "1.2rem" }}>{name}</span>
    </div>
  );
};

export default ToppingOption;
