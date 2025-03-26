const MainPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-blue-900">Welcome to the Homepage!</h1>
                <p className="text-lg mt-4 text-blue-700">This is the main page of your application.</p>
                <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Get Started
                </button>
            </div>
        </div>
    );
}


export default MainPage;