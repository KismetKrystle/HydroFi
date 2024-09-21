// This is a mock service. In a real application, this would make API calls to your backend.
export const getUserProfile = async (userId) => {
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Return mock data
    return {
      id: userId,
      name: "John Doe",
      imageUrl: "https://example.com/profile.jpg",
      region: "Southeast Asia",
      lessonLevel: "Intermediate",
      nfts: [
        { id: 1, name: "Hydroponic Pump", imageUrl: "https://example.com/pump.jpg" },
        { id: 2, name: "PVC Pipes", imageUrl: "https://example.com/pipes.jpg" },
      ],
      walletBalance: 100,
      lessonsLearned: [
        "Proper pH balance is crucial for plant growth",
        "LED lights can significantly reduce energy costs",
      ],
      valueCreated: "Created sustainable food sources for 100 families",
      systemsDesigned: 2, // Now represented as a number
    };
  };