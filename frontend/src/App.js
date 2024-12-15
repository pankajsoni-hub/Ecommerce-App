import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Footer from "./components/Footer";
import "./App.css";
import AdminPortal from "./views/AdminPortal";
import Checkout from "./views/Checkout";
function App() {
	return (
		<BrowserRouter>
			<main className="max-w-full">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
                    <Route path="/admin" element={<AdminPortal/>} />
		            <Route path="/checkout" element={<Checkout/>} />
                </Routes>
			</main>
			<div className="max-w-full">
				<Footer />
			</div>
		</BrowserRouter>
	);
}
export default App;
