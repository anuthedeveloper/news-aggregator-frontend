const Card = () => {
  return (
    <div className="mt-6 w-96">
      <div className="relative h-56 text-gray-600">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </div>
      <div>
        <h5 className="mb-2 text-gray-600">UI/UX Review Check</h5>
        <p className="text-gray-500 font-normal">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </p>
      </div>
      <div className="pt-0">
        <button className="bg-black text-white font-semibold">Read More</button>
      </div>
    </div>
  );
};

export default Card;
