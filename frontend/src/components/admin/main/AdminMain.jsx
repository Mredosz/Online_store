import ButtonDashboard from "../reusable/Buttons/ButtonDashboard.jsx";

export default function AdminMain() {
  return (
    <div className="flex flex-col h-[calc(100vh-56px)] items-center bg-[url('/admin.png')] bg-cover bg-center">
      <div className="h-1/2 flex flex-col justify-between">
        <h1 className="text-7xl text-white font-bold mt-5 text-center justify-start">
          Admin dashboard
        </h1>
        <div className="flex flex-wrap justify-center items-end space-x-7 space-y-2">
          <ButtonDashboard to="products">Products</ButtonDashboard>
          <ButtonDashboard to="review">Review</ButtonDashboard>
          <ButtonDashboard to="orders">Orders</ButtonDashboard>
          <ButtonDashboard to="users">Users</ButtonDashboard>
          <ButtonDashboard to="category">Category</ButtonDashboard>
          <ButtonDashboard to="reports">Reports</ButtonDashboard>
        </div>
      </div>
    </div>
  );
}
