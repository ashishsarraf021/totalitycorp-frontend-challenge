import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../store/atoms/user";

function CourseCardCart(props) {
  const navigate = useNavigate();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [cartItems, setCartItems] = useRecoilState(cartState);
  

  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/remove-from-cart/${props.course._id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item._id !== props.course._id)
        );
      } else {
        console.error('Failed to remove course from cart:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while removing course from cart:', error);
    }
  };

  return (
    <div>
      <Card
        sx={{ maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}
        style={{
          border: isMouseOver ? "1px solid #bc1c44" : "1px solid lightsteelblue",
        }}
        onMouseOver={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div>
          <CardMedia
            sx={{ height: 200, width: 350 }}
            image={props.course.imageLink}
            title={props.course.title}
          />
          <CardContent style={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{
                fontWeight: "700",
                color: isMouseOver ? "#bc1c44" : "inherit",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                "-webkit-line-clamp": 2,
                "-webkit-box-orient": "vertical",
              }}
            >
              {props.course.title}
            </Typography>
          </CardContent>
          <div style={{ padding: "8px", borderTop: "1px solid #ccc" }}>
            <Typography
              variant="h6"
              component="div"
              style={{ fontWeight: "900" }}
            >
              ${props.course.price}
            </Typography>
            {/* "Remove from Cart" button */}
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

CourseCardCart.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageLink: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, 
  }).isRequired,
};

export default CourseCardCart;
