const express = require("express");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");
const { User, Course } = require("../database/models");
const z = require("zod");


const router = express.Router();

let signupProps = z.object({
  username: z.string().min(1).max(50).email(),
  password: z
    .string()
    .min(8, "Password must be atleast 8 characters")
    .max(50, "Password must be less than 50 characters"),
});

router.post("/signup", async (req, res) => {
  const parsedInput = signupProps.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ message: parsedInput.error.issues[0].message });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;

  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.get("/me", authenticateJwt, (req, res) => {
  res.json(req.user.username);
});

router.post("/login", async (req, res) => {
  const parsedInput = signupProps.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({ message: parsedInput.error.issues[0].message });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  if (courses) {
    res.json({ courses });
  } else {
    res.json({ message: "Empty" });
  }
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      // user.purchasedCourses.push(course);
      user.cartCourses.push(course);
      await user.save();
      res.json({
        message: "Course added to Cart successfully",
        cartCourse: course,
      });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.delete("/remove-from-cart/:courseId", authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const user = await User.findOne({ username: req.user.username });

  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }

  // Check if the course exists in the user's cart
  const courseIndex = user.cartCourses.indexOf(courseId);

  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found in cart" });
  }

  try {
    // Remove the course from cartCourses
    user.cartCourses.splice(courseIndex, 1);

    await user.save();

    return res.json({ message: "Course removed from cart successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/cartCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "cartCourses"
  );
  if (user) {
    res.json({ cartCourses: user.cartCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});


// Route to move all cart courses to purchased courses
router.post("/purchase-cart-courses", authenticateJwt, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }
    user.purchasedCourses.push(...user.cartCourses);
    user.cartCourses = []; 

    await user.save();

    res.json({ message: "All cart courses moved to purchased courses" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = router;
