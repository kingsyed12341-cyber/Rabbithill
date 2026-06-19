import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// ✅ YOUR SUPABASE DETAILS
const supabaseUrl = "https://bqppmaafalcjabgqnelc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxcHBtYWFmYWxjamFiZ3FuZWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MDAxODMsImV4cCI6MjA5NzM3NjE4M30.VCxyJr1zZCuQ2u_mYLQWAP8Er4CUju8wAy_CcMyNLu8"

const supabase = createClient(supabaseUrl, supabaseKey)

// 🔐 SIGN UP
window.signup = async function () {
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    alert("Signup successful 👍 Check email")
  }
}

// 🔑 LOGIN
window.login = async function () {
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

 if (error) {
  alert(error.message)
} else {
  document.getElementById("user").innerText =
    "Logged in: " + data.user.email

  document.getElementById("logoutBtn").style.display = "block"
}
}

// 👀 CHECK USER
async function checkUser() {
  const { data } = await supabase.auth.getUser()

 if (data.user) {
  document.getElementById("user").innerText =
    "Logged in: " + data.user.email

  document.getElementById("logoutBtn").style.display = "block"
}
}

checkUser()
window.logout = async function () {
  await supabase.auth.signOut()

  document.getElementById("user").innerText = ""
  document.getElementById("logoutBtn").style.display = "none"

  alert("Logged Out Successfully")
}
