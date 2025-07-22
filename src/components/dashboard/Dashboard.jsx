// import React, {useState, useEffect} from 'react'
// import './Dashboard.css';

// const Dashboard = () => {

//   const [repositories, setRepositories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestedRepositories, setSuggestedRepositories] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");

//     const fetchRepositories = async () => {

//       try {
//         const response = await fetch(`http://localhost:3002/repo/user/${userId}`);

//       const data = await response.json();
//       setRepositories(data.repositories);
//       } catch (error) {
//         console.error("Error fetching repositories:", error);
//       }
//     };

//     const fetchSuggestedRepositories = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3002/repo/all`
//         );

//         const data = await response.json();
//         setSuggestedRepositories(data.repositories);
//         console.log(data.repositories);
//       } catch (error) {
//         console.error("Error fetching repositories:", error);
//       }
//     };

//     fetchRepositories();
//     fetchSuggestedRepositories();
//   }, []);

//   useEffect(() => {
//     if(searchQuery == '') {
//       setSearchResults(repositories);
//     } else {
//       const filteredRepo = repositories.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
//       setSearchResults(filteredRepo);
//     }
//   }, [searchQuery, repositories]);

//   return (
//     <section id="dashboard">
//       <aside>
//         {/* <h3>Suggested Repositories</h3>
//         {suggestedRepositories.map((repo) => {
//           return (
//             <div key ={repo._id}>
//               <h4>{repo.name}</h4>
//               <h4>{repo.description}</h4>
//             </div>
//           );
//         })} */}
//         <h3>Suggested Repositories</h3>
//         {Array.isArray(suggestedRepositories) &&
//         suggestedRepositories.length > 0 ? (
//           suggestedRepositories.map((repo, index) => {
//             if (!repo || !repo.name) return null; // skip invalid entries
//             return (
//               <div key={repo._id || index}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description}</h4>
//               </div>
//             );
//           })
//         ) : (
//           <p>No suggested repositories available.</p>
//         )}
//       </aside>
//       <main>
//         {/* <h2>Suggested Repositories</h2>
//         {repositories.map((repo) => {
//           return (
//             <div key={repo._id}>
//               <h4>{repo.name}</h4>
//               <h4>{repo.description}</h4>
//             </div>
//           );
//         })} */}

//         <h2>Suggested Repositories</h2>
//         <div id='search'>
//           <input type='text' placeholder='Search...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
//         </div>
//         {Array.isArray(repositories) && repositories.length > 0 ? (
//           searchResults.map((repo, index) => {
//             if (!repo || !repo.name) return null; // Skip if repo is invalid
//             return (
//               <div key={repo._id || index}>
//                 <h4>{repo.name}</h4>
//                 <h4>{repo.description || "No description available"}</h4>
//               </div>
//             );
//           })
//         ) : (
//           <p>No repositories found.</p>
//         )}
//       </main>
//       <aside>
//         <h3>Upcoming Events</h3>
//         <ul>
//           <li>
//             <p>Tech Conference - Dec 15</p>
//           </li>
//           <li>
//             <p>Developer Meetup - Jan 10</p>
//           </li>
//           <li>
//             <p>React Summit - Feb 20</p>
//           </li>
//         </ul>
//       </aside>
//     </section>
//   );
// }

// export default Dashboard;



import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/user/${userId}`
        );
        const data = await response.json();
        if (Array.isArray(data.repositories)) {
          setRepositories(data.repositories);
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`);
        const data = await response.json();
        if (Array.isArray(data.repositories)) {
          setSuggestedRepositories(data.repositories);
        }
      } catch (error) {
        console.error("Error fetching suggested repositories:", error);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (!Array.isArray(repositories)) {
      setSearchResults([]);
      return;
    }

    if (searchQuery.trim() === "") {
      setSearchResults(repositories);
    } else {
      const filtered = repositories.filter(
        (repo) =>
          typeof repo.name === "string" &&
          repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />

      <section id="dashboard">
        {/* Left Sidebar */}
        <aside>
          <h3>Suggested Repositories</h3>
          {Array.isArray(suggestedRepositories) &&
          suggestedRepositories.length > 0 ? (
            suggestedRepositories.map((repo, index) => {
              if (!repo || typeof repo.name !== "string") return null;
              return (
                <div key={repo._id || index}>
                  <h4>{repo.name}</h4>
                  <h4>{repo.description || "No description available"}</h4>
                </div>
              );
            })
          ) : (
            <p>No suggested repositories available.</p>
          )}
        </aside>

        {/* Main Section */}
        <main>
          <h2>Your Repositories</h2>
          <div id="search">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((repo, index) => {
              if (!repo || typeof repo.name !== "string") return null;
              return (
                <div key={repo._id || index}>
                  <h4>{repo.name}</h4>
                  <h4>{repo.description || "No description available"}</h4>
                </div>
              );
            })
          ) : (
            <p>No repositories found.</p>
          )}
        </main>

        {/* Right Sidebar */}
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>
              <p>Tech Conference - Dec 15</p>
            </li>
            <li>
              <p>Developer Meetup - Jan 10</p>
            </li>
            <li>
              <p>React Summit - Feb 20</p>
            </li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
