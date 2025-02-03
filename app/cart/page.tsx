import ProtectedRoute from "../context/ProtectedRoute"

function page() {
  return (
    <ProtectedRoute>
    <div>page</div>
    </ProtectedRoute>
  )
}

export default page