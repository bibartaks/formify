import React, { useEffect, useState, useRef } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App() {
  const [data, setData] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [name, setName] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [termsError, setTermsError] = useState("")
  const nameInputRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://formify-bibartaks.vercel.app/")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://formify-bibartaks.vercel.app/user"
        )
        const result = await response.json()
        setName(result.name || "")
        setAgreeToTerms(result.agree || false)
        setSelectedOptions(result.sector || "")
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, []) // Removed nameInputRef from dependencies since it doesn't affect the effect

  const handleSelectChange = event => {
    const options = Array.from(event.target.options)
      .filter(option => option.selected)
      .map(option => option.value)

    setSelectedOptions(options)
  }

  const handleCheckboxChange = () => {
    setAgreeToTerms(prevAgreeToTerms => !prevAgreeToTerms)
    setTermsError("")
  }

  const handleSaveClick = async e => {
    e.preventDefault()

    if (!agreeToTerms) {
      setTermsError("Please agree to the terms to continue.")
      return
    }

    try {
      const response = await fetch(
        "https://formify-bibartaks.vercel.app/post/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            sector: selectedOptions,
            agree: agreeToTerms,
          }),
        }
      )

      const result = await response.json()

      console.log("Save/Update Result:", result)

      if (result.acknowledged && result.modifiedCount > 0) {
        toast.success("Saved successfully 🎉", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        console.error("Error saving form:", result) // Log the entire response for further inspection
      }
    } catch (error) {
      console.error("Error saving/updating data:", error)
    }
  }

  const renderOptions = subSector => {
    return subSector.subSectorItems.map(item => (
      <React.Fragment key={item.id}>
        <option value={item.name}>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; {item.name}
        </option>
        {item.items && item.items.length > 0 && renderNestedOptions(item.items)}
      </React.Fragment>
    ))
  }

  const renderNestedOptions = nestedItems => {
    return nestedItems.map(nestedItem => (
      <option value={nestedItem.name} key={nestedItem.id}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;{" "}
        {nestedItem.name}
      </option>
    ))
  }

  return (
    <header>
      <div className="header-container">
        <div className="sidebar"></div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <form>
          <label htmlFor="name">Name</label>
          <input
            ref={nameInputRef}
            type="text"
            name="name"
            id="name"
            className="name-input"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <br />
          <div className="select-container">
            <label htmlFor="sectors">Select sector</label>
            <select
              name="sectors"
              id="sectors"
              onChange={handleSelectChange}
              value={selectedOptions}
              multiple
              size={7}
            >
              {data.map(sector => (
                <optgroup label={sector.name} key={sector.id}>
                  {sector.subSectors.map(subSector => (
                    <React.Fragment key={subSector.id}>
                      <option value={subSector.name} key={subSector.id}>
                        &nbsp;&nbsp;&nbsp;&nbsp;{subSector.name}
                      </option>{" "}
                      {renderOptions(subSector)}
                    </React.Fragment>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <br />
          <label>
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={handleCheckboxChange}
            />{" "}
            Agree to terms
          </label>
          <span className="error-msg">{termsError}</span>
          <br />
          <div className="form-btns">
            <button
              type="submit"
              className="save-btn"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </header>
  )
}
