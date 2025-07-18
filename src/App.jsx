import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import Homepage from "./pages/Home";
import AboutPage from "./pages/About";
import NotFound from "./pages/NotFound";
import CoinDetails from "./pages/CoinDetails";

import Header from "./components/Header";

const API_URL = import.meta.env.VITE_COINS_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_Cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error("Failed to fetch data!");
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
