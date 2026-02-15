import { useRouter } from "next/router";
import {
  Star,
  MapPin,
  School as Pool,
  UtensilsCrossed,
  Wine,
  Power,
  ChevronRight,
  Camera,
  Image,
  CreditCard,
  Ticket,
  Plane,
  Home,
} from "lucide-react";
import { useEffect, useState } from "react";
import { gethotel, handlehotelbooking } from "@/api";
interface Hotel {
  id: string; // Unique identifier for the hotel
  hotelName: string; // Name of the hotel
  location: string; // Location of the hotel
  pricePerNight: number; // Price per night
  availableRooms: number; // Number of available rooms
  amenities: string; // Amenities provided (comma-separated string or change to string[])
}
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import SignupDialog from "@/components/SignupDialog";
import Loader from "@/components/Loader";
import { setUser } from "@/store";
const BookHotelPage = () => {
  const [quantity, setQuantity] = useState(1);
  //2
  //  STEP 1: Review & Rating state
const [rating, setRating] = useState(0); // 1–5 stars
const [reviewText, setReviewText] = useState("");

  const router = useRouter();
  const { id } = router.query; // Access the hotel ID from the URL
  const [hotels, sethotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.user.user);
  const [open, setopem] = useState(false);
  const dispatch = useDispatch();
  //2nd
  // ⭐ NEW FEATURE: Reply to Reviews (STATE)
const [replyText, setReplyText] = useState("");
const [activeReplyIndex, setActiveReplyIndex] = useState<number | null>(null);

  // ⭐ STEP 1: Review & Rating State
const [userRating, setUserRating] = useState(0);

const [reviewImages, setReviewImages] = useState<File[]>([]);
const [reviews, setReviews] = useState<any[]>([]);
const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    const fetchhotels = async () => {
      try {
        const data = await gethotel();
        const filteredData = data.filter((hotel: any) => hotel.id === id);
        sethotels(filteredData);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchhotels();
  }, []);

  if (loading) {
    return <Loader />;
  }
  const hotel = hotels[0];
  const hotelData = {
    name: "Magnum Resorts- Near Candolim Beach",
    rating: 3,
    maxRating: 5,
    propertyPhotos: 91,
    guestPhotos: 386,
    description:
      "One of the best hotels in North Goa, operating since 2001 catering to international and domestic individual and group travelers.",
    amenities: [
      { icon: <Pool className="w-5 h-5" />, name: "Swimming Pool" },
      { icon: <UtensilsCrossed className="w-5 h-5" />, name: "Restaurant" },
      { icon: <Wine className="w-5 h-5" />, name: "Bar" },
      { icon: <Power className="w-5 h-5" />, name: "Power Backup" },
    ],
    room: {
      type: "Standard Room",
      capacity: "Fits 2 Adults",
      features: [
        "No meals included",
        "10% off on food & beverage services",
        "Complimentary welcome drinks on arrival",
        "Non-Refundable",
      ],
      originalPrice: 8999,
      discountedPrice: 664,
      taxes: 527,
    },
    location: {
      area: "Candolim",
      distance: "7 minutes walk to Candolim Beach",
    },
    reviews: {
      rating: 3.8,
      count: 784,
      text: "Very Good",
    },
  };
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = Number.parseInt(e.target.value);
    setQuantity(
      isNaN(value) ? 1 : Math.max(1, Math.min(value, hotel.availableRooms))
    );
  };
  //2
  // ⭐ STEP 1: Handle star click
const handleStarClick = (value: number) => {
  setRating(value);
};


  const totalPrice = hotel?.pricePerNight * quantity;
  const totalTaxes = hotelData?.room.taxes * quantity;
  const totalDiscounts = hotelData?.room.discountedPrice * quantity;
  const grandTotal = totalPrice + totalTaxes - totalDiscounts;
  const handlebooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await handlehotelbooking(
        user?.id,
        hotel?.id,
        quantity,
        grandTotal
      );
      const updateuser = {
        ...user,
        bookings: [...user.bookings, data],
      };
      dispatch(setUser(updateuser));
      setopem(false);
      setQuantity(1);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  const HotelContent = () => (
    <DialogContent className="sm:max-w-[600px] bg-white">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold flex items-center">
          <Home className="w-6 h-6 mr-2" />
          Hotel Booking Details
        </DialogTitle>
      </DialogHeader>
      <div className="grid gap-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hotel Name */}
          <div className="space-y-2">
            <Label htmlFor="hotelName" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Hotel Name
            </Label>
            <Input id="hotelName" value={hotel.hotelName} readOnly />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </Label>
            <Input id="location" value={hotel.location} readOnly />
          </div>
          {/* Price Per Night */}
          <div className="space-y-2">
            <Label htmlFor="pricePerNight" className="flex items-center">
              <Ticket className="w-4 h-4 mr-2" />
              Price Per Night
            </Label>
            <Input
              id="pricePerNight"
              value={`₹ ${hotel.pricePerNight}`}
              readOnly
            />
          </div>

          {/* Available Rooms */}
          <div className="space-y-2">
            <Label htmlFor="availableRooms" className="flex items-center">
              <Ticket className="w-4 h-4 mr-2" />
              Available Rooms
            </Label>
            <Input id="availableRooms" value={hotel.availableRooms} readOnly />
          </div>

          {/* Number of Rooms to Book */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="flex items-center">
              <Ticket className="w-4 h-4 mr-2" />
              Number of Rooms to Book
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={hotel.availableRooms}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Fare Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-medium">
                ₹ {totalPrice.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Taxes and Extracharges</span>
              <span className="font-medium">
                ₹ {totalTaxes.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-green-600">
              <span className="font-medium">Discounts</span>
              <span className="font-medium">
                - ₹ {Math.abs(totalDiscounts).toLocaleString()}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-lg">
                  ₹ {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4" onClick={handlebooking}>Proceed to Payment</Button>
    </DialogContent>
  );
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-blue-500">
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <a href="/" className="text-blue-500">
              {hotel?.location}
            </a>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{hotel?.hotelName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Title & Rating */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{hotel.hotelName}</h1>
              <div className="flex items-center space-x-1">
                {[...Array(hotelData.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
                {[...Array(hotelData.maxRating - hotelData.rating)].map(
                  (_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-300" />
                  )
                )}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="col-span-2 relative group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800"
                  alt="Hotel Main"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full flex items-center space-x-1">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm">
                    +{hotelData.propertyPhotos} Property Photos
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800"
                    alt="Hotel Room"
                    className="w-full h-[152px] object-cover rounded-lg"
                  />
                </div>
                <div className="relative group cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800"
                    alt="Hotel Amenity"
                    className="w-full h-[152px] object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full flex items-center space-x-1">
                    <Image className="w-4 h-4" />
                    <span className="text-sm">
                      +{hotelData.guestPhotos} Guest Photos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              {hotelData.description}
              <button className="text-blue-500 ml-2">Read more</button>
            </p>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-6">
                {hotelData.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    {amenity.icon}
                    <span>{amenity.name}</span>
                  </div>
                ))}
                <button className="text-blue-500">+ 31 Amenities</button>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                {hotelData.room.type}
              </h3>
              <p className="text-gray-600 mb-4">{hotelData.room.capacity}</p>

              <ul className="space-y-3 mb-6">
                {hotelData.room.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-6">
                {/* Price Per Night */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-800 font-semibold">
                    Price Per Night:
                  </span>
                  <span className="text-lg font-medium text-gray-800">
                    ₹ {totalPrice}
                  </span>
                </div>

                {/* Available Rooms */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-800 font-semibold">
                    Available Rooms:
                  </span>
                  <span className="text-lg font-medium text-gray-800">
                    {hotel.availableRooms}
                  </span>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-gray-800 font-semibold mb-2">
                    Amenities:
                  </h4>
                  <p className="text-gray-600">{hotel.amenities}</p>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 line-through">
                    ₹ {totalPrice}
                  </span>
                  <span className="text-gray-500">Per Night:</span>
                </div>
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span>₹ {grandTotal}</span>
                  <span className="text-sm text-gray-500 font-normal">
                    + ₹ {totalTaxes} taxes & fees
                  </span>
                </div>
              </div>
              <Dialog open={open} onOpenChange={setopem}>
                <DialogTrigger asChild>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mb-3">
                    BOOK THIS NOW
                  </button>
                </DialogTrigger>
                {user ? (
                  <HotelContent />
                ) : (
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Login Required</DialogTitle>
                    </DialogHeader>
                    <p>Please log in to continue with your booking.</p>
                    <SignupDialog
                      trigger={
                        <Button className="w-full">Log In / Sign Up</Button>
                      }
                    />
                  </DialogContent>
                )}
              </Dialog>

              <button className="w-full text-blue-500 text-center">
                14 More Options
              </button>
            </div>

              {/* Rating Card */}
              
            {/* removed the step one code because it was repeated */}
  {/* ⭐ STEP 2: Reviews List */}
<div className="bg-white rounded-xl shadow-lg p-6 mt-6">
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-semibold">Guest Reviews</h3>
    <select
      className="border rounded px-2 py-1 text-sm"
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
    >
      <option value="recent">Most Recent</option>
      <option value="helpful">Most Helpful</option>
    </select>
  </div>

  {reviews.length === 0 && (
    <p className="text-gray-500 text-sm">No reviews yet</p>
  )}

  {reviews.map((review, index) => (
    <div key={index} className="border-t pt-4 mt-4">
      <div className="flex items-center gap-1 mb-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      {/* 2nd */}
      <p className="text-gray-700 text-sm">{review.text}</p>
      {/* ⭐ NEW FEATURE: Reply Button */}
<button
  className="text-xs text-blue-500 mt-2"
  onClick={() =>
    setActiveReplyIndex(activeReplyIndex === index ? null : index)
  }
>
  Reply
</button>

{/* ⭐ Reply Input */}
{activeReplyIndex === index && (
  <div className="mt-2">
    <textarea
      className="w-full border rounded p-2 text-sm"
      placeholder="Write a reply..."
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
    />
    <button
      className="mt-1 bg-blue-500 text-white px-3 py-1 rounded text-xs"
      onClick={() => {
        const updatedReviews = [...reviews];
        updatedReviews[index].replies.push(replyText);
        setReviews(updatedReviews);
        setReplyText("");
        setActiveReplyIndex(null);
      }}
    >
      Submit Reply
    </button>
  </div>
)}

{/* ⭐ Display Replies */}
{review.replies?.map((reply: string, i: number) => (
  <p key={i} className="ml-4 mt-1 text-xs text-gray-600">
    ↳ {reply}
  </p>
))}

<button
  className="text-xs text-red-500 mt-1"
  onClick={() => alert("Review reported for moderation")}
>
  Flag as inappropriate
</button>

    </div>
  ))}
</div>
 {/* ⭐ STEP 3: Add Review */}
<div className="bg-white rounded-xl shadow-lg p-6 mt-6">
  <h3 className="text-lg font-semibold mb-4">Write a Review</h3>

  {/* Rating */}
  <div className="flex gap-1 mb-3">
    {[1,2,3,4,5].map((star) => (
      <Star
        key={star}
        onClick={() => setUserRating(star)}
        className={`w-6 h-6 cursor-pointer ${
          star <= userRating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ))}
  </div>

  {/* Review Text */}
  <textarea
    value={reviewText}
    onChange={(e) => setReviewText(e.target.value)}
    placeholder="Write your experience..."
    className="w-full border rounded-lg p-2 text-sm mb-3"
  />

  {/* Upload Photos */}
  <input
    type="file"
    multiple
    onChange={(e) =>
      setReviewImages(e.target.files ? Array.from(e.target.files) : [])
    }
    className="text-sm mb-3"
  />

  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    onClick={() => {
      if (!userRating || !reviewText) return alert("Fill all fields");
      setReviews([
        {
          rating: userRating,
          text: reviewText,
          helpful: 0,
          replies: [],
        },
        ...reviews,
      ]);
      setUserRating(0);
      setReviewText("");
      setReviewImages([]);
    }}
  >
    Submit Review
  </button>
</div>



            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {hotel.location}
                  </h3>
                </div>
                <button className="text-blue-500">See on Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHotelPage;
