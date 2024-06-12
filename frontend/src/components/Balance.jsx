export const Balance = ({ value }) => {
    return <div className="flex h-14 m-4 border items-center shadow-sm rounded">
        <div className="font-bold text-lg mx-2">
            Your balance : 
        </div>
        <div className="font-bold ml-4 text-lg">
            Rs ₹{value}
        </div>
    </div>
}