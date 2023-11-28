import { useEffect, useState } from "react"

export default function UserData() {
  const [userData, setUserData] = useState("")
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://formify-bibartaks.vercel.app/user"
        )
        const result = await response.json()
        setUserData(result)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])
  return (
    <div id="userData">
      <div className="userData-container">
        <div className="userData-box">
          <h1>Database User Data:</h1>
          <h3>Name: {userData.name}</h3>
          <h3>Agree: {userData.agree ? "True" : "False"}</h3>
          <h3>Sectors:</h3>
          <ul>
            {userData?.sector?.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
