import Header from "./components/Header";
import Main from "./components/Main.jsx";
import { useState, useEffect } from "react";
import supabase from "./database.js";

function App() {
  const [factList, setFactList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  // const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    const getFacts = async () => {
      try {
        setIsLoaded(false)
        let query = supabase.from("jobList").select("*");

        if (selectedCategory !== "all") {
          query = query.eq("category", selectedCategory);
        }

        let { data: facts, error } = await query
          // .limit(10)
          // .order("votesInteresting", { ascending: false });

        if (error) {
          throw new Error(error.message);
        }

        setFactList(facts);
        setIsLoaded(true);
        // setIsFilter(false)
      } catch (error) {
        console.error("Error fetching facts:", error.message);
      }
    };
    getFacts();
  }, [selectedCategory]);

  return (
    <div>
      <Header setFactList={setFactList} factList={factList} />
      <Main
        factList={factList}
        setFactList={setFactList}
        isLoaded={isLoaded}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default App;
