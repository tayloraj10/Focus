import NavBar from "../components/nav-bar";

const MainPage: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center h-screen bg-linear-to-b from-blue-500 to-gray-500">
                <div className="text-center">
                </div>
            </div>
        </>
    );
}


export default MainPage;