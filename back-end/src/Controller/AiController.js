import cohere from "../config/OpenAi.js";
import { GettingMenteeById } from "../Services/User.service.js";

export const GenerateBio = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExist = await GettingMenteeById(id);

    if (!UserExist) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const { role, skills, name } = UserExist;
    const prompt = `Write a professional and concise bio for ${name}, who is a ${role} skilled in ${skills.join(
      ", "
    )} and it should be in 100words and give bio as a first person like i am writing not he is or she is , it should be i am . and don't use `;

    const result = await cohere.generate({
      model: "command", // Use "command-nightly" only if you're approved
      prompt,
      max_tokens: 150,
    });

    const bio = result.generations[0].text.trim(); // ✅ fixed this line

    return res.status(201).json({
      message: "Bio generated successfully",
      success: true,
      bio,
    });
  } catch (error) {
    console.error("Cohere bio generation error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
