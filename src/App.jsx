import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import EventsList from "./pages/EventsList";
import EventsDetail from "./pages/EventsDetail";
import CreateEvent from "./pages/CreateEvent";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import EventsListAdmin from "./pages/EventsListAdmin";
import EventsDetailAdmin from "./pages/EventsDetailAdmin";
import EditEventsAdmin from "./pages/EditEventsAdmin";
import PastEvents from "./pages/PastEvents";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // if page is refreshed, session storafe is still the same
  // to remain logged in after refresh, get loggedIn from storage on mount
  useEffect(() => {
    if (window.sessionStorage.getItem("isLoggedIn") === "true"){
      setIsLoggedIn(true);
      setUserName(window.sessionStorage.getItem("userName").slice(1,-1));
    }
  }, []);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/events" element={<EventsList />}></Route>
        <Route path="/events/:eventId" element={<EventsDetail />}></Route>
        <Route path="/events/create" element={<CreateEvent />}></Route>
        <Route
          path="/admin"
          element={
            <EventsListAdmin
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              userName={userName}
              setUserName={setUserName}
            />
          }
        ></Route>
        <Route path="/admin/:eventId" element={<EventsDetailAdmin />}></Route>
        <Route path="/past" element={<PastEvents />}></Route>
        <Route
          path="/admin/:eventId/edit"
          element={<EditEventsAdmin />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
