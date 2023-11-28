import { useEffect, useState } from "react"

export default function UserData() {
  const [userData, setUserData] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the server
        const response = await fetch(
          "https://formify-bibartaks.vercel.app/user"
        )
        const result = await response.json()
        setUserData(result)
        setLoading(false)
      } catch (error) {
        // Log an error message if data fetching fails
        console.error("Error fetching user data:", error)
        setLoading(false)
      }
    }

    // Call the function to fetch user data when the component mounts
    fetchUserData()
  }, [])

  return (
    <div id="userData">
      {loading ? (
        // Display a loading spinner while waiting for data
        <div className="loading-container">
          <img src="/spinner.gif" width={64} height={64} alt="" />
        </div>
      ) : (
        // Display user data once it's available
        <div className="userData-container">
          <div className="userData-box">
            <h3>Database User Data:</h3>
            <p className="userData-text">
              <span className="userData-text-bold">Name:</span> {userData.name}
            </p>
            <p className="userData-text">
              <span className="userData-text-bold">Agree:</span>{" "}
              {userData.agree ? "True" : "False"}
            </p>
            <p className="userData-text">
              <span className="userData-text-bold">Sectors:</span>
            </p>
            <ul>
              {/* Map through the sector array and display each item in a list */}
              {userData?.sector?.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
