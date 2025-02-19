const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
    return (
        <div className="mt-6 flex justify-between items-center">
            <p className="text-gray-600">Showing 1-4 of 24 transactions</p>
            <div className="flex gap-2">
                <button
                    onClick={onPrevious}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
export default Pagination; 