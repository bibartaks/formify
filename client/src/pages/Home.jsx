import React, { useEffect, useState } from "react"

function App() {
  const [data, setData] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [name, setName] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const handleSelectChange = event => {
    const options = Array.from(event.target.options)
      .filter(option => option.selected)
      .map(option => option.value)

    setSelectedOptions(options)
  }

  const handleCheckboxChange = () => {
    setAgreeToTerms(!agreeToTerms)
  }

  const renderOptions = subSector => {
    return subSector.subSectorItems.map(item => (
      <React.Fragment key={item.id}>
        <option value={item.name}>&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</option>
        {item.items && item.items.length > 0 && renderNestedOptions(item.items)}
      </React.Fragment>
    ))
  }

  const renderNestedOptions = nestedItems => {
    return nestedItems.map(nestedItem => (
      <option value={nestedItem.name} key={nestedItem.id}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{nestedItem.name}
      </option>
    ))
  }

  return (
    <>
      <form>
        <legend>Form Details</legend>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <br />
        <label htmlFor="sectors">Sectors</label>
        <select
          name="sectors"
          id="sectors"
          onChange={handleSelectChange}
          value={selectedOptions}
          multiple
        >
          {data.map(sector => (
            <optgroup label={sector.name} key={sector.id}>
              {sector.subSectors.map(subSector => (
                <React.Fragment key={subSector.id}>
                  <option value={subSector.name} key={subSector.id}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{subSector.name}
                  </option>
                  {renderOptions(subSector)}
                </React.Fragment>
              ))}
            </optgroup>
          ))}
        </select>
        <br />
        <br />
        <label>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={handleCheckboxChange}
          />{" "}
          Agree to terms
        </label>
        <br />
        <br />
        <input type="submit" value="Save" />
      </form>
    </>
  )
}

export default App
