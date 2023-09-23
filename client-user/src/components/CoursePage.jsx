import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DownloadIcon from "@mui/icons-material/Download";
import ClosedCaptionIcon from "@mui/icons-material/ClosedCaption";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import "./coursesStyles.css";
import Skeleton from "@mui/material/Skeleton";

function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://course-selling-web-app-tau.vercel.app/users/courses/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setCourse(res.data.course);
      })
      .catch((err) => console.log(err));

    // Fetch the purchased courses
    axios
      .get(
        "https://course-selling-web-app-tau.vercel.app/users/purchasedCourses",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setPurchasedCourses(res.data.purchasedCourses);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Check if the current course is purchased
    const ans = purchasedCourses.some((item) => item._id === id);
    setIsPurchased(ans);
  }, [id, purchasedCourses]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "200px",
        }}
      >
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      </div>
    );
  }

  return (
    <div className="single-course">
      <div className="text-container">
        <div>
          <img
            src={course.imageLink}
            alt={course.imageLink}
            width="300px"
            style={{ borderRadius: "20px" }}
          />
        </div>

        <div>
          <h1 className="course-title">{course.title}</h1>
        </div>

        <div>
          <h3 className="des">{course.description}</h3>
        </div>

        <div>
          {!isPurchased ? (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#bc1c44",
                padding: "10px 20px",
                fontWeight: "700",
                fontSize: "1rem",
                borderRadius: "50px",
              }}
              onClick={() => {
                setIsLoading(true);
                axios
                  .post(
                    `https://course-selling-web-app-tau.vercel.app/users/courses/${id}`,
                    {},
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    toast.success(res.data.message);
                    setPurchasedCourses([
                      ...purchasedCourses,
                      res.data.purchasedCourse,
                    ]);
                    setIsPurchased(true);
                    setIsLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                  });
              }}
            >
              BUY NOW @ ${course.price}
            </Button>
          ) : (
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "green",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                }}
              >
                Purchased
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#101460",
                  padding: "10px 20px",
                  fontWeight: "700",
                  fontSize: "1rem",
                  borderRadius: "50px",
                  marginLeft: "20px",
                }}
              >
                View Content
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <Card
          sx={{ width: "350px" }}
          style={{
            backgroundColor: " #101460",
            color: "white",
            borderRadius: "10px",
            paddingRight: "6px",
            display: "flex",
            padding: "8px",
          }}
        >
          <CardActionArea>
            <CardContent style={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h4" component="div">
                Course Overview
              </Typography>
              <br />
              <Box
                sx={{
                  bgcolor: "background.paper",
                  color: "black",
                  borderRadius: "20px",
                  padding: "20px 5px",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <List style={{ padding: "10px" }}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <SignalCellularAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Beginner to Pro" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <OndemandVideoIcon />
                        </ListItemIcon>
                        <ListItemText primary="20+ Hours of HD video" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FormatListBulletedIcon />
                        </ListItemIcon>
                        <ListItemText primary="150+ Lessons" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <DownloadIcon />
                        </ListItemIcon>
                        <ListItemText primary="Downloadable content" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <ClosedCaptionIcon />
                        </ListItemIcon>
                        <ListItemText primary="English captions" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <MilitaryTechIcon />
                        </ListItemIcon>
                        <ListItemText primary="Certificate of completion" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <AllInclusiveIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lifetime access" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </nav>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default CoursePage;
