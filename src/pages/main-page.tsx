import NavBar from "../components/nav-bar";

const MainPage: React.FC = () => {
    return (
        <>
        <NavBar />
            <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-900">Welcome to the Homepage!</h1>
                <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Get Started
                </button>
            </div>
            </div>
        </>
    );
}


export default MainPage;