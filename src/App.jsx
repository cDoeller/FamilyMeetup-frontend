import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import EventsList from "./pages/EventsList";
import EventsDetail from "./pages/EventsDetail";
import CreateEvent from "./pages/CreateEvent";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/events" element={<EventsList />}></Route>
        <Route path="/events/:eventId" element={<EventsDetail />}></Route>
        <Route path="/events/create" element={<CreateEvent />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
