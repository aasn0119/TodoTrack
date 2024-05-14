import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { ToastContainer } from "react-toastify";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/getTodos/${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTasks(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (authToken) getData();
  }, []);

  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-[800px] rounded-xl mt-[50px] bg-white p-[10px]">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={"Holiday Tick list"} getData={getData} />
          {sortedTasks?.map((task) => (
            <ListItem key={task._id} task={task} getData={getData} />
          ))}
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
