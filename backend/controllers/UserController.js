const { User } = require("../models/user.model");
const Course = require("../models/course.model"); // Correctly import the Course model
const { generateToken } = require("../utils/generatetoken");

const signup = async (req, res) => {
    try {
        const { name, email, role = 'student', password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            role,
            password
        });

        if (!user) {
            return res.status(400).json({
                message: "Error while creating user"
            });
        }

        await generateToken(res, user, "User created successfully");

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide all fields"
            });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        await generateToken(res, user, "Login successful");

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getProfile = async (req, res) => {
    const id = req.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
    await user.populate({
        path: "enrolledCourses.courses",
        select: "title subtitle thumbnail"
    });

    res.status(200).json({
        success: true,
        user:user.toJSON()
    });
};

module.exports = {
    signup,
    login,
    getProfile
};