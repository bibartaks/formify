import React from "react"
import { Link, Outlet, Route } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
