import { useEffect, useState } from "react";
import CourseCardCart from "./CourseCardCart";
import { useRecoilState } from "recoil";
import axios from "axios";
import { Main, openState } from "./AppNavBar";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { cartState } from "../store/atoms/user";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

// import Razorpay from "razorpay";


function CartPage() {
  const [open] = useRecoilState(openState);
  const [cartCourses, setCartCourses] = useRecoilState(cartState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/users/cartCourses", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCartCourses(res.data.cartCourses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [setCartCourses]);

  // Calculate total items and total price
  const totalItems = cartCourses.length;
  const totalPrice = cartCourses.reduce((total, course) => total + course.price, 0);

  const handlePayment = async () => {
    try {
      // Make a POST request to the /purchase-cart-courses route
      await axios.post("http://localhost:3000/users/purchase-cart-courses", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setCartCourses([]);
      navigate("/thankyou");
      // Optionally, you can navigate to a thank you page or show a success message to the user
      // Example: history.push("/thank-you");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main open={open}>
      <Typography
        variant="h4"
        component="div"
        style={{
          flexGrow: 1,
          padding: "10px",
          borderRadius: "4px",
          fontWeight: "bold",
          color: "#101460",
          textAlign: "center",
          marginTop: "70px",
          marginLeft: "230px",
        }}
      >
        Cart Courses
      </Typography>
      <div className="all-courses">
        {isLoading ? (
          <div style={{ display: "flex", gap: "20px" }}>
            <Skeleton variant="rectangular" width={345} height={400} />
            <Skeleton variant="rectangular" width={345} height={400} />
            <Skeleton variant="rectangular" width={345} height={400} />
          </div>
        ) : (
          <>
            {cartCourses.length > 0
              ? cartCourses.map((course) => (
                <CourseCardCart key={course._id} course={course} />
              ))
              : "Empty Cart? Upskill Now! 🚀 Discover a World of Knowledge Awaits 📚"}
          </>
        )}
      </div>

      {/* Banner at the bottom */}
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2% 7%",
    backgroundColor: "#101460",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "1px solid #ccc",
    color: "#fff", // Set the text color to white
  }}
>
  <div style={{ display: "flex", alignItems: "center" }}>
    <Typography variant="subtitle1" style={{ marginRight: "80px" }}>
      Total Items: {totalItems}
    </Typography>
    <Typography variant="subtitle1">
      Total Price: ${totalPrice.toFixed(2)}
    </Typography>
  </div>
  {totalPrice > 0 && (
    <Button
      variant="contained"
      style={{
        backgroundColor: "#bc1c44",
        padding: "10px 20px",
        fontWeight: "700",
        fontSize: "1rem",
        borderRadius: "50px",
      }}
      onClick={handlePayment}
    >
      Pay Now
    </Button>
  )}
</div>



    </Main>
  );
}

export default CartPage;
