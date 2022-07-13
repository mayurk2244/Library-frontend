import "./App.css";
import BookTable from "./components/BookTable";

function App() {
  return (
    <div className="container mt-4">
      <header>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Book Details
            </a>
          </div>
        </nav>
      </header>
      <BookTable />
    </div>
  );
}

export default App;
