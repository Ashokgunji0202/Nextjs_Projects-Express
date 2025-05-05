"use client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">

      <section className="bg-[url('https://b.zmtcdn.com/data/pictures/6/20292316/c3775f830999c92b889f37cb970639b0.jpeg')] bg-cover bg-center text-white py-20 px-6 text-center shadow-lg">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Foodie's Delight</h1>
          <p className="text-lg md:text-xl mb-6">Delicious meals crafted with love & tradition</p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300">
            View Menu
          </button>
        </div>
      </section>

      
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-xl mx-auto text-gray-600">
          At Foodie's Delight, we serve mouth-watering dishes inspired by global flavors. Whether you're craving traditional
          cuisine or modern fusion, we have something special for you.
        </p>
      </section>

    
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Dishes</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {id:1, name: "Spicy Ramen", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNkbvbFFhPeqCc1AKFVACCa8DOVmLt-gzXoQ&s" },
            { id:2,name: "Grilled Salmon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8LH8xTKS7bbBQiUqLGATO4tNO--DRw1R9sA&s" },
            {id:3, name: "Veggie Pizza", img: "https://img.freepik.com/free-photo/mix-pizza-with-tomato-slices-mushroom-olive_140725-185.jpg?ga=GA1.1.58624404.1746267760&semt=ais_hybrid&w=740" },
          ].map((dish) => (
            <div key={dish.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img src={dish.img} alt={dish.name} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{dish.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

  
      <section className="py-16 px-6 text-center bg-gray-600 text-black">
        <h2 className="text-3xl font-bold mb-4">Ready to taste the difference?</h2>
        <p className="mb-6">Reserve your table now and enjoy an unforgettable dining experience.</p>
        <button className="bg-white text-red-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-200">
          Book a Table
        </button>
      </section>
    </main>
  );
}
