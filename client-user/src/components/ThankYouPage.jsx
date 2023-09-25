import React from "react";
// import { navigate } from "@reach/router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                backgroundColor: "#101460",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="h4"
                component="div"
                style={{
                    color: "white",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: "20px",
                }}
            >
                Thank You
            </Typography>
            <Typography
                variant="body1"
                style={{
                    color: "white",
                    textAlign: "center",
                    margin: "0 20px",
                    fontSize: "1.2rem",
                    marginBottom: "40px",
                }}
            >
                Congratulations on your purchase! 🎉<br />
                You've taken the first step towards expanding your knowledge and skills. 🚀<br />
                Keep learning and achieving your goals. 💪📚
            </Typography>
            <Button
                variant="contained"
                style={{
                    backgroundColor: "#bc1c44",
                    padding: "10px 20px",
                    fontWeight: "700",
                    fontSize: "1rem",
                    borderRadius: "50px",
                    color: "white",
                }}
                onClick={() => navigate("/courses/purchased")}
            >
                Purchased Courses
            </Button>
        </div>
    );
};

export default ThankYouPage;
