import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../styles/profile.css";
import Header from "../components/header";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    mealPreference: "",
    fitnessGoal: "",
  });
  const [profileInfo, setProfileInfo] = useState(null); // Store fetched profile info
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user profile from Firestore when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            setProfileInfo(userSnapshot.data()); // Set profile info if it exists
            setFormData(userSnapshot.data()); // Populate form with saved data
          } else {
            console.log("No profile found!");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array, runs only once when component mounts

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      try {
        // Save user profile data to Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, formData, { merge: true }); // Merge ensures existing data isn't overwritten

        setSuccessMessage("Profile updated successfully!");
      } catch (error) {
        console.error("Error saving profile data:", error);
      }
    } else {
      console.error("No user is currently logged in.");
    }
  };

  return (
    <div>
      <Header showGreeting={false} />

      <div className="main-profile-div">
        <div className="profile-info">
            <div className="profile-info-title">User information</div>
          {/* Display fetched profile info */}
          {profileInfo ? (
            <>
              <p>Age: {profileInfo.age}</p>
              <p>Height: {profileInfo.height} cm</p>
              <p>Weight: {profileInfo.weight} kg</p>
              <p>Meal Preference: {profileInfo.mealPreference}</p>
              <p>Fitness Goal: {profileInfo.fitnessGoal}</p>
            </>
          ) : (
            <p>Loading profile...</p> // Show loading message if data is not yet fetched
          )}
        </div>

        <div className="profile-page">
            <h2>Edit Your Profile</h2>

            {successMessage && <p className="success-message">{successMessage}</p>}

            <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="height">Height (cm)</label>
                <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="weight">Weight (kg)</label>
                <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group">
                <label htmlFor="mealPreference">Meal Preference</label>
                <select
                id="mealPreference"
                name="mealPreference"
                value={formData.mealPreference}
                onChange={handleChange}
                required
                >
                <option value="" disabled>
                    Select preference
                </option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="fitnessGoal">Fitness Goal</label>
                <select
                id="fitnessGoal"
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                required
                >
                <option value="" disabled>
                    Select goal
                </option>
                <option value="weightLoss">Weight Loss</option>
                <option value="muscleGain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
                </select>
            </div>

            <button type="submit" className="form-button">
                Save Changes
            </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
