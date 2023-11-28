import React from "react"
import { Link, Outlet, Route } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { Footer } from "../components/Footer/Footer"

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
