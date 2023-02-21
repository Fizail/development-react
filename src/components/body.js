import { restaurantList } from "./constants";
import RestaurantCard from "./RestaurantCard";
import { useState , useEffect } from "react";
import { async } from "regenerator-runtime";
import Shimmer from "./shimmer";

function filterData(searchText , restaurants) {
const filterData =  restaurants.filter((restaurant) =>
  restaurant.data.name?.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
}
const Body = () => {
  const [allRestaurants , setAllRestaurants] = useState([]);
  const [filteredRestaurants , setFilteredRestaurants] = useState([]);
  const [searchText , setSearchText] = useState("");
  useEffect(()=> {
    // API call
    getRestaurants(); 
  },[]);

  async function getRestaurants () {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=34.0836708&lng=74.7972825&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    console.log(json);
    setAllRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);

  }
  console.log("render");

  // not return component (early return)
  if(!allRestaurants) return null;

  if(filteredRestaurants?.length === 0)
  return <h1>No restaurant matches your filter!!</h1>
  return allRestaurants.length === 0 ? ( <Shimmer /> ) : (
    <>
    <div className="search-container">
      <input type="text" className="search-input" placeholder="Search" value={searchText} onChange ={(e) => {
        setSearchText (e.target.value);
      }}/>
      <button className="search-button" onClick={()=> {
        const data = filterData(searchText , allRestaurants);
        setFilteredRestaurants(data);
        console.log(data);
      }}>
        Search
      </button>
    </div>
    <div className="restaurant-list">
   {filteredRestaurants.map((restaurant) =>{
    return <RestaurantCard {...restaurant.data} key ={restaurant.data.id} />
   })} 
    </div>
    </>
  );
};
export default Body;