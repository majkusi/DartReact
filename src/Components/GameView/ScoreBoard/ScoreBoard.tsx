function ScoreBoard() {
  const points = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <div className="container mt-4">
      <div className="row">
        {points.map((point) => (
          <div className="col-2 mb-3" key={point}>
            <button className="btn btn-primary w-100">{point}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ScoreBoard;
